import HttpService from "./HttpService";

export default class PositionService {
    static BASE_URL = "/api/order";

    constructor() {}

    static async getOrders() {
        return HttpService.get(`${this.BASE_URL}/`);
    }
    static async submitOrder(orderId) {
        return HttpService.put(`${this.BASE_URL}/${orderId}`);
    }
    static async createOrder(qty, productId) {
        return HttpService.post(`${this.BASE_URL}/`, { qty, productId });
    }
}
