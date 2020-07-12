import HttpService from "./HttpService";

export default class FairbundleService {
    static BASE_URL = "/api/fairbundle";

    constructor() {}

    static async getFairbundles() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    static async getFairbundlesByProductId(productId) {
        return HttpService.get(`${this.BASE_URL}/?product=${productId}`);
    }

    static getFairbundleFlags(products, fairbundles) {
        const flaggedProducts = [];
        for (const p in products) {
            const product = products[p];
            product.hasFairbundle = false;
            for (const f in fairbundles) {
                const fairbundle = fairbundles[f];
                if (
                    new Date(fairbundle.expiration) > new Date() &&
                    fairbundle.product?._id === product._id
                ) {
                    product.hasFairbundle = true;
                    break;
                }
            }
            flaggedProducts.push(product);
        }
        return flaggedProducts;
    }

    static getPresentedFairbundle(fairbundles) {
        let PresentedFairbundle;
        let max_bundlers = -Infinity;
        fairbundles.forEach((fairbundle) => {
            if (
                fairbundle.bundlers.length > max_bundlers &&
                fairbundle.submission === null
            ) {
                max_bundlers = fairbundle.bundlers.length;
                PresentedFairbundle = fairbundle;
            }
        });
        return PresentedFairbundle;
    }

    static async joinFairbundle(fairbundleId, qty) {
        return HttpService.put(`${this.BASE_URL}/${fairbundleId}`, { qty });
    }

    static async createFairbundle(
        qty,
        productId,
        expiration,
        expirationAction,
        targetPrice
    ) {
        return HttpService.post(`${this.BASE_URL}/`, {
            qty,
            productId,
            expiration,
            expirationAction,
            targetPrice,
        });
    }
}
