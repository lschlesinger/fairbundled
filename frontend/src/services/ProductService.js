import HttpService from "./HttpService";

export default class ProductService {
    static BASE_URL = "/api/product";

    constructor() {}

    static async getProducts(search = "") {
        return HttpService.get(`${this.BASE_URL}/${search}`);
    }

    static async createProduct(product) {
        return await HttpService.post(`${this.BASE_URL}/`, product);
    }

    static async getProduct(productId) {
        return HttpService.get(`${this.BASE_URL}/${productId}`);
    }

    static getSmallestPrice(products) {
        const smallestPriceProducts = [];
        for (const p in products) {
            const product = products[p];
            product.smallestPrice = Number.MAX_VALUE;
            for (let i = 0; i < product.priceLevel.length; i++) {
                product.smallestPrice = Math.min(
                    product.smallestPrice,
                    product.priceLevel[i].unitPrice
                );
            }
            smallestPriceProducts.push(product);
        }
        return smallestPriceProducts;
    }

    static getMaxPriceLevel(product) {
        if (product === null) {
            return null;
        }

        let max = Math.max(
            ...product.priceLevel.map((p) => p.unitPrice)
        );

        return product.priceLevel.find((p) => p.unitPrice === max);
    }

    static async getActiveSupplierProducts(supplier) {
        let activeProducts = 0;
        let products = await this.getProducts("");
        for (const p in products) {
            const product = products[p];
            if (product.supplier === supplier._id) {
                activeProducts++;
            }
        }
        supplier.activeProducts = activeProducts;
        return supplier;
    }
}
