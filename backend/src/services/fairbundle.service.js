import Fairbundle from "../models/fairbundle.model";
import FAIRBUNDLES from "./fairbundle.data";
import Municipality from "../models/municipality.model";
import Product from "../models/product.model";
import OrderPosition from "../models/position.model";

class FairbundleService {

    static async createInitialFairbundles() {
        // get copy of all fairbundles
        const fairbundles = [...FAIRBUNDLES];

        // iterate over fairbundles
        for (const i in fairbundles) {
            const fairbundle = fairbundles[i];
            const bundlers = [];
            // set bundlers array
            if (fairbundle.bundlers && fairbundle.bundlers.length > 0) {
                for (const j in fairbundle.bundlers) {
                    const bundler = fairbundle.bundlers[j];
                    const bundlerb = await Municipality.findOneAndUpdate(bundler, bundler, {
                        upsert: true,
                        new: true
                    });
                    bundlers.push(bundlerb._id);
                }
                // set municipality field: set municipality as first bundler
                fairbundle.municipality = bundlers[0];
            }
            fairbundle.bundlers = bundlers;

            // set product field
            if (fairbundle.product) {
                fairbundle.product = (await Product.findOne({name: fairbundle.product}))._id;
            }

            // set positions array
            const positions = [];
            if (fairbundle.positions && fairbundle.positions.length > 0) {
                for (const p in fairbundle.positions) {
                    const position = fairbundle.positions[p];
                    position.product = (await Product.findOne({name: position.product}))._id;
                    const positionp = await OrderPosition.findOneAndUpdate(position, position, {
                        upsert: true,
                        new: true
                    });
                    positions.push(positionp._id);
                }
            }
            fairbundle.positions = positions;

            let c = await Fairbundle.findOneAndUpdate(fairbundle, fairbundle, {upsert: true});
        }

        console.log("Initial Fairbundles created.")
    }

    static submitFairbundles() {
        // find Fairbundle that have reached expiration and was not yet cancelled
        Fairbundle.find({submission: null, cancellation: null, expiration: {$lte: new Date()}})
            .populate({
                path: "product",
                select: ["priceLevel"],
            })
            .populate({
                path: "positions"
            })
            .then((fairbundles) => {
                fairbundles.forEach((fairbundle) => {
                    const reachedQty = fairbundle.positions.reduce((a, b) => a + b.qty, 0);
                    const targetPriceLevel = fairbundle.product.priceLevel.find((pl) => pl.unitPrice === fairbundle.targetPrice);
                    const reachedPriceLevel = fairbundle.product.priceLevel.filter((pl) => pl.minQty <= reachedQty);
                    const bestPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER): null;
                    // fairbundle didn't reach the target quantity
                    if (reachedQty < targetPriceLevel.minQty) {
                        if (fairbundle.expirationAction === 'force' && bestPrice) {
                            // set finalUnitPrice to bestPriceLevel that is reached in quantity if action is force and submit
                            fairbundle.finalUnitPrice = bestPrice;
                            fairbundle.submission = new Date();
                            fairbundle.save((f) => {
                                console.log('Submitted fairbundle.')
                            });
                        } else if (fairbundle.expirationAction === 'cancel' || !bestPrice) {
                            fairbundle.cancellation = new Date();
                            fairbundle.save((f) => {
                                console.log('Canceled fairbundle.')
                            });
                        }
                    } else {
                        // fairbundle did reach the target quantity
                        // set finalUnitPrice to min(targetPrice and unitPrice reached with quantity) and submit fairbundle
                        fairbundle.finalUnitPrice = Math.min(bestPrice, fairbundle.targetPrice);
                        fairbundle.submission = new Date();
                        fairbundle.save(() => {
                            console.log('Submitted fairbundle.')
                        });
                    }
                });
            })
            .catch((err) => {
                console.log('Failed to run job on fairbundles.')
            })
    }
}

export default FairbundleService;
