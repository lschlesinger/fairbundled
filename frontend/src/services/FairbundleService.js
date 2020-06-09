import HttpService from "./HttpService";

export default class FairbundleService {

    static BASE_URL = '/api/fairbundle';

    constructor() {
    }

    static async getFairbundles() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    static getFairbundleFlags(products, fairbundles) {
        const flaggedProducts = [];
        for (const p in products) {
            const product = products[p];
            product.hasFairbundle = false;
            for (const f in fairbundles) {
                const fairbundle = fairbundles[f];
                if (new Date(fairbundle.expiration) > new Date() && fairbundle.product === product._id) {
                    product.hasFairbundle = true;
                    break;
                }
            }
            flaggedProducts.push(product);
        }
        return flaggedProducts;
    }
}
