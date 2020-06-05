import HttpService from "./HttpService";

export default class ProductService {

    static BASE_URL = '/api/product';

    constructor() {
    }

    static async getProducts(search = '') {
        return HttpService.get(`${this.BASE_URL}/${search}`);
    }

    static async createProduct(product) {
        return HttpService.post(`${this.BASE_URL}/`, product);
    }
}
