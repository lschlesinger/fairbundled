import HttpService from "./HttpService";

export default class ProductService {

    static BASE_URL = '/api/product';

    constructor() {
    }

    static async getProducts(search = '') {
        return HttpService.get(`${this.BASE_URL}/${search}`);
    }

    static async createProduct(name, description, ean, images, deliveryDays, priceLevel, certificates, category) {
        const product = {name, description, ean, images, deliveryDays, priceLevel, certificates, category};
        return HttpService.post(`${this.BASE_URL}/`, product);
    }
}
