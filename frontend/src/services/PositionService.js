import HttpService from "./HttpService";

export default class PositionService {
    static BASE_URL = "/api/position";

    constructor() {
    }

    static async getPositions() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    static async addPosition(qty, productId) {
        return HttpService.post(`${this.BASE_URL}/`, {qty, productId});
    }

    // Calculates all necessary information in the supplier account view
    static async getSalesInfo(supplier) {
        const FIXED_FEE = 0.5;
        const VAR_FEE1 = 0.05;
        const VAR_FEE2 = 0.03;
        const VAR_FEE3 = 0.02;

        // counts products sold per order
        let productsSold = 0;
        // adds up the quantities per order
        let qtySold = 0;
        //total sum of all revenue made ever
        let revenue = 0;
        //contains all products sold with product info and total qty per product and total revenue per product
        let orderedProducts = [];
        //different fees
        let totalFixedFee = 0;
        let monthlyFixedFee = 0;
        let totalVariableFee = 0;
        let monthlyVariableFee = 0;
        let positions = await this.getPositions();
        if (Array.isArray(positions) && positions.length) {
            for (const p in positions) {
                const position = positions[p];
                if (
                    position.order.submission &&
                    new Date(position.order.submission) < new Date() &&
                    supplier._id === position.product.supplier
                ) {
                    productsSold++;
                    qtySold += position.qty;
                    let priceL = 0;
                    for (
                        let i = 0;
                        i < position.product.priceLevel.length;
                        i++
                    ) {
                        if (
                            position.qty >= position.product.priceLevel[i].qty
                        ) {
                            priceL = i;
                        } else {
                            break;
                        }
                    }
                    //temp Revenue
                    let tempRevenue =
                        position.qty *
                        position.product.priceLevel[priceL].unitPrice;
                    // add tempRevenue to total revenue
                    revenue += tempRevenue;
                    //calculate monthly fees
                    if (
                        new Date(position.order.submission) >
                        new Date().setDate(new Date().getDate() - 30)
                    ) {
                        monthlyFixedFee += FIXED_FEE;
                        if (tempRevenue < 100) {
                            monthlyVariableFee += tempRevenue * VAR_FEE1;
                        } else if (tempRevenue > 10000) {
                            monthlyVariableFee += tempRevenue * VAR_FEE3;
                        } else {
                            monthlyVariableFee += tempRevenue * VAR_FEE2;
                        }
                    }
                    //calculate total fees
                    totalFixedFee += FIXED_FEE;
                    if (tempRevenue < 100) {
                        totalVariableFee += tempRevenue * VAR_FEE1;
                    } else if (tempRevenue > 10000) {
                        totalVariableFee += tempRevenue * VAR_FEE3;
                    } else {
                        totalVariableFee += tempRevenue * VAR_FEE2;
                    }
                    //add qty and revenue to overall qty and revenue
                    let tie = false;
                    for (const op in orderedProducts) {
                        if (
                            orderedProducts[op].product.id ===
                            position.product._id
                        ) {
                            orderedProducts[op].qty += position.qty;
                            orderedProducts[op].revenue += tempRevenue;
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
                }
            }

            supplier.bestseller = this.determineBestseller(orderedProducts);
            supplier.noPosition = false;
        } else {
            supplier.noPosition = true;
        }
        //save all calculations in supplier json and return supplier
        supplier.productsSold = productsSold;
        supplier.revenue = revenue;
        supplier.qtySold = qtySold;
        supplier.monthlyFixedFee = monthlyFixedFee;
        supplier.monthlyVariableFee = monthlyVariableFee;
        supplier.totalFixedFee = totalFixedFee;
        supplier.totalVariableFee = totalVariableFee;
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

    // Calculates all necessary information in the municipality account view
    static async getOrderInfo(municipality) {
        //counts unique products bought by municipality
        let productsBought = 0;
        // counts only products ordered within fairbundle
        let fairbundleProductsBought = 0;
        // counts only products ordered within direct order
        let directProductsBought = 0;
        //counts submitted orders
        let ordersSubmitted = 0;
        // counts only fairbundle orders
        let fairbundlesSubmitted = 0;
        // counts only direct orders
        let directOrdersSubmitted = 0;
        //total sum of all spendings
        let spendings = 0;
        // sum of spending for fairbundles
        let fairbundleSpendings = 0;
        // sum of spendings for directOrders
        let directOrderSpendings = 0;

        let positions = await this.getPositions();

        if (positions && positions.length > 1) {

            municipality.noPosition = false;
        } else {
            municipality.noPosition = true;
        }
        //save all calculations in municipality json and return municipaliy
        municipality.productsBought = productsBought;
        municipality.fairbundleProductsBought = fairbundleProductsBought;
        municipality.directProductsBought = directProductsBought;
        municipality.ordersSubmitted = ordersSubmitted;
        municipality.fairbundlesSubmitted = fairbundlesSubmitted;
        municipality.directOrdersSubmitted = directOrdersSubmitted;
        municipality.spendings = spendings;
        municipality.fairbundleSpendings = fairbundleSpendings;
        municipality.directOrderSpendings = directOrderSpendings;
        return municipality;
    }
}
