import HttpService from "./HttpService";
import ProductService from "./ProductService";

export default class FairbundleService {
    static BASE_URL = "/api/fairbundle";

    constructor() {
    }

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

    static async joinFairbundle(fairbundleId, qty) {
        return HttpService.put(`${this.BASE_URL}/${fairbundleId}`, {qty});
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

    static getPresentedFairbundle(fairbundles) {
        let presentedFairbundle = null;
        let max_bundlers = -Infinity;
        fairbundles.forEach((fairbundle) => {
            if (
                new Set(fairbundle.bundlers).size > max_bundlers &&
                fairbundle.submission === null && fairbundle.cancellation === null
            ) {
                max_bundlers = new Set(fairbundle.bundlers).size;
                presentedFairbundle = fairbundle;
            }
        });
        return presentedFairbundle;
    }


    static getFairbundleCharacteristics(fairbundle) {
        let currentQuantity = fairbundle.positions.reduce(function (r, a) {
            return r + a.qty;
        }, 0);
        let requiredQuantity = fairbundle.product.priceLevel.find(
            (l) => l.unitPrice === fairbundle.targetPrice
        ).minQty;

        let bundleCompletion = (currentQuantity / requiredQuantity) * 100;

        let maxPrice = ProductService.getMaxPriceLevel(fairbundle.product)?.unitPrice;

        let savings = (
            1 -
            fairbundle.targetPrice / maxPrice
        ).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
        });


        let currentDate = new Date();
        let diffTime =
            Date.parse(fairbundle.expiration) - currentDate.getTime(); // in milliseconds
        let remainingDays = Math.floor(diffTime / 86400000); // days
        let remainingHrs = Math.floor((diffTime % 86400000) / 3600000); // hours
        let remainingMins = Math.round(((diffTime % 86400000) % 3600000) / 60000); // minutes
        let remainingTime = null;
        if (remainingDays >= 1) {
            remainingTime = remainingDays + " Tage";
        } else {
            remainingTime = remainingHrs + " Std. " + remainingMins + " Min."; // + diffTime.getMinutes() + diffTime.getSeconds();
        }

        let bundlerCount = new Set(fairbundle.bundlers).size;
        let bundlerStatus = null;
        if (bundlerCount === 1) {
            bundlerStatus = bundlerCount + " teilnehmende Kommune";
        } else {
            bundlerStatus = bundlerCount + " teilnehmende Kommunen";
        }


        let fairbundleCharacteristics = {
            maxPrice: maxPrice,
            currentQuantity: currentQuantity,
            requiredQuantity: requiredQuantity,
            bundleCompletion: bundleCompletion,
            savings: savings,
            remainingTime: remainingTime,
            bundlerStatus: bundlerStatus,
        };

        return fairbundleCharacteristics
    }
}
