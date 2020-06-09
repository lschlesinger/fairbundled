import HttpService from "./HttpService";

export default class ProductService {
    static BASE_URL = "/api/product";

    constructor() {}

    static async getProducts(search = "") {
        return HttpService.get(`${this.BASE_URL}/${search}`);
    }

    static async createProduct(product) {
        return HttpService.post(`${this.BASE_URL}/`, product);
    }

    static async getProduct(productId) {
        return HttpService.get(`${this.BASE_URL}/${productId}`)
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
}
