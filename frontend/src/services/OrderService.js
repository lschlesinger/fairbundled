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

    static getPositionValue(position) {
        let value = 0;
        const reachedPriceLevel = position.product.priceLevel.filter((pl) => pl.minQty <= position.qty);
        const bestPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER) : null;
        const price = position.order.finalUnitPrice ? position.order.finalUnitPrice : bestPrice;
        value += price * position.qty;
        return value;
    }

    static getPositionsValue(positions) {
        let result = 0;
        positions.forEach((position) => {
            let value = this.getPositionValue(position);
            result += value;
        });
        return result;
    }

    static getPositionsSavings(positions) {
        let resultArray = [];
        positions.forEach((position) => {
            let value = this.getPositionValue(position);
            let maxPrice = position.product.priceLevel.reduce((a, b) => Math.max(a, b.unitPrice), 0);
            let regValue = maxPrice * position.qty;
            let savingAbsolute = regValue - value;
            let savingPercentage = (savingAbsolute / regValue);
            let entry = {
                savingAbsolute: savingAbsolute,
                savingPercentage: savingPercentage
            };
            resultArray.push(entry);
        });
        return resultArray;
    }
}
