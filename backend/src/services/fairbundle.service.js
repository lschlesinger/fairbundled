import Fairbundle from "../models/faribundle.model";
import FAIRBUNDLES from "./fairbundle.data";
import Municipality from "../models/municipality.model";
import Product from "../models/product.model";

class FairbundleService {

    static async createInitialFairbundles(){
        // get copy of all fairbundles
        const fairbundles = [...FAIRBUNDLES];

        // iterate over categories
        for (const i in fairbundles) {
            const fairbundle = fairbundles[i];
            const bundlers = [];
            if (fairbundle.bundlers) {
                for (const j in fairbundle.bundlers) {
                    const bundler = fairbundle.bundlers[j];
                    const bundlerb = await Municipality.findOneAndUpdate(bundler, bundler, {upsert: true, new: true});
                    bundlers.push(bundlerb);
                }
            }
            fairbundle.bundlers = bundlers;

            if (fairbundle.product){
                fairbundle.product = await Product.findOne({name: fairbundle.product});
            }

            let c = await Fairbundle.findOneAndUpdate(fairbundle, fairbundle, {upsert: true});
        }

        console.log("Initial Fairbundles created.")
    }

}

export default FairbundleService;
