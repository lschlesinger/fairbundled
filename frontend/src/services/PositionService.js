import HttpService from "./HttpService";

export default class PositionService {
    static BASE_URL = "/api/position";

    constructor() {}

    static async getPositions() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    // Calculates all necessary information in the supplier account view
    static async getSalesInfo(supplier) {
        // counts products sold per order
        let productsSold = 0;
        // adds up the quantities per order
        let qtySold = 0;
        //total sum of all revenue made ever
        let revenue = 0;
        //contains all products sold with product info and total qty per product and total revenue per product
        let orderedProducts = [];
        let positions = await this.getPositions();
        for (const p in positions) {
            const position = positions[p];
            if (
                position.order &&
                new Date(position.order.submission) < new Date() &&
                supplier._id === position.product.supplier
            ) {
                productsSold++;
                qtySold += position.qty;
                let priceL = 0;
                for (let i = 0; i < position.product.priceLevel.length; i++) {
                    if (position.qty >= position.product.priceLevel[i].qty) {
                        priceL = i;
                    } else {
                        break;
                    }
                }
                let tie = false;
                for (const op in orderedProducts) {
                    if (
                        orderedProducts[op].product.id === position.product._id
                    ) {
                        orderedProducts[op].qty += position.qty;
                        orderedProducts[op].revenue +=
                            position.qty *
                            position.product.priceLevel[priceL].unitPrice;
                        tie = true;
                        break;
                    }
                }
                //if product isnt inside the orderedProducts array yet it will be added
                if (!tie) {
                    let tempProduct = {
                        product: position.product,
                        qty: position.qty,
                        revenue:
                            position.qty *
                            position.product.priceLevel[priceL].unitPrice,
                    };
                    orderedProducts.push(tempProduct);
                }
                revenue =
                    revenue +
                    position.qty *
                        position.product.priceLevel[priceL].unitPrice;
            }
        }
        supplier.productsSold = productsSold;
        supplier.revenue = revenue;
        supplier.qtySold = qtySold;
        supplier.bestseller = this.determineBestseller(orderedProducts);
        return supplier;
    }
    // determines the bestseller in terms of qty & revenue
    static determineBestseller(orderedProducts) {
        let bestQty = 0;
        let bestRevenue = 0;
        let bestQtyProduct = 0;
        let bestRevenueProduct = 0;
        for (let i = 0; i < orderedProducts.length; i++) {
            if (orderedProducts[i].qty > bestQty) {
                bestQty = orderedProducts[i].qty;
                bestQtyProduct = i;
            }
            if (orderedProducts[i].revenue > bestRevenue) {
                bestRevenue = orderedProducts[i].revenue;
                bestRevenueProduct = i;
            }
        }
        return {
            qtyBestseller: orderedProducts[bestQtyProduct],
            revenueBestseller: orderedProducts[bestRevenueProduct],
        };
    }
}
