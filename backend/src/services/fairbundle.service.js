import Fairbundle from "../models/fairbundle.model";

class FairbundleService {

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
                    const bestPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER) : null;
                    // fairbundle didn't reach the target quantity
                    if (reachedQty < targetPriceLevel.minQty) {
                        if (fairbundle.expirationAction === 'force' && bestPrice) {
                            // set finalUnitPrice to bestPriceLevel that is reached in quantity if action is force and submit
                            fairbundle.finalUnitPrice = bestPrice;
                            fairbundle.submission = new Date();
                            fairbundle.finalReachedQty = reachedQty;
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
                        fairbundle.finalReachedQty = reachedQty;
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
