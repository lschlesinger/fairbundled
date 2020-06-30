import HttpService from "./HttpService";

export default class PositionService {
    static BASE_URL = "/api/order";

    constructor() {
    }

    static async getOrders() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    static async submitOrder(orderId) {
        return HttpService.put(`${this.BASE_URL}/${orderId}`);
    }

    static async createOrder(qty, productId) {
        return HttpService.post(`${this.BASE_URL}/`, {qty, productId});
    }

    static getPositionsValue(positions){
        let result = 0;
        positions.forEach((position) => {
            const reachedPriceLevel = position.product.priceLevel.filter((pl) => pl.minQty <= position.qty);
            const bestPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER) : null;
            const price = position.order.finalUnitPrice ? position.order.finalUnitPrice : bestPrice;
            result += price * position.qty;
        });
        return result;
    }

}
