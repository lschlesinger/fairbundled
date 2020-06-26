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

}

export default FairbundleService;
