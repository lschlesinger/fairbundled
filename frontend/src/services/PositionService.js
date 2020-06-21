import HttpService from "./HttpService";

export default class PositionService {
    static BASE_URL = "/api/position";

    constructor() {}

    static async getPositions() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    static async getSalesInfo(supplier) {
        let productsSold = 0;
        let revenue = 0;
        let positions = await this.getPositions();
        for (const p in positions) {
            const position = positions[p];
            if (
                position.order &&
                new Date(position.order.submission) < new Date()
            ) {
                productsSold++;
                let priceL = 0;
                for (let i = 0; i < position.product.priceLevel.length; i++) {
                    if (position.qty >= position.product.priceLevel[i].qty) {
                        priceL = i;
                    } else {
                        break;
                    }
                }
                revenue =
                    revenue +
                    position.qty *
                        position.product.priceLevel[priceL].unitPrice;
            }
        }
        supplier.productsSold = productsSold;
        supplier.revenue = revenue;
        return supplier;
    }
}
