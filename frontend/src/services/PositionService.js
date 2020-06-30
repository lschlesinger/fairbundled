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
        if (positions?.length > 1) {
            for (const p in positions) {
                const position = positions[p];
                if (
                    position.order.submission &&
                    new Date(position.order.submission) < new Date()
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

    static getUniqueProducts(resultArray, positions) {
        positions.forEach((position) => {
            if (resultArray.indexOf(position.product._id) < 0) {
                resultArray.push(position.product._id);
            }
        });
        return resultArray;
    }

    static getUniqueOrders(resultArray, positions) {
        positions.forEach((position) => {
            if (resultArray.indexOf(position.order._id) < 0) {
                resultArray.push(position.order._id);
            }
        });
        return resultArray;
    }

    static getPositionsValue(result, positions) {
        positions.forEach((position) => {
            const reachedPriceLevel = position.product.priceLevel.filter((pl) => pl.minQty <= position.qty);
            const bestPrice = reachedPriceLevel.length > 0 ? reachedPriceLevel.reduce((a, b) => Math.min(a, b.unitPrice), Number.MAX_SAFE_INTEGER) : null;
            const price = position.order.finalUnitPrice ? position.order.finalUnitPrice : bestPrice;
            result += price * position.qty;
        });
        return result;
    }

    // Calculates all necessary information in the municipality account view
    static async getPositionsInfo(municipality) {
        // array of submitted fairbundle order positions
        let fairbundlesSubmittedPositions = 0;
        // array of pending fairbundles
        let fairbundlesPending = 0;
        // array of submitted direct order positions
        let directOrdersSubmittedPositions = 0;
        // unique products bought by municipality in fairbundle
        let fairbundleProductsBought = [];
        // unique products bought by municipality in direct order
        let directProductsBought = [];
        // unique fairbundle orders
        let fairbundlesSubmitted = [];
        // unique direct orders
        let directOrdersSubmitted = [];
        // sum of spending for fairbundles
        let fairbundleSpendings = 0;
        // sum of spendings for directOrders
        let directOrderSpendings = 0;

        let positions = await this.getPositions();

        if (positions?.length > 1) {
            fairbundlesSubmittedPositions = positions.filter((position) => position.order.submission && position.order.__t);
            fairbundlesPending = positions.filter((position) => !position.order.submission && position.order.__t);
            directOrdersSubmittedPositions = positions.filter((position) => position.order.submission && !position.order.__t);
            fairbundleProductsBought = this.getUniqueProducts(fairbundleProductsBought, fairbundlesSubmittedPositions);
            directProductsBought = this.getUniqueProducts(directProductsBought, directOrdersSubmittedPositions);
            directOrdersSubmitted = this.getUniqueOrders(directOrdersSubmitted, directOrdersSubmittedPositions);
            fairbundlesSubmitted = this.getUniqueOrders(fairbundlesSubmitted, fairbundlesSubmittedPositions);
            fairbundleSpendings = this.getPositionsValue(fairbundleSpendings, fairbundlesSubmittedPositions);
            directOrderSpendings = this.getPositionsValue(directOrderSpendings, directOrdersSubmittedPositions);

            municipality.noPosition = false;
        } else {
            municipality.noPosition = true;
        }
        //save all calculations in municipality json and return municipaliy
        municipality.fairbundleProductsBought = fairbundleProductsBought;
        municipality.directProductsBought = directProductsBought;
        municipality.fairbundlesSubmittedPositions = fairbundlesSubmittedPositions;
        municipality.fairbundlesPending = fairbundlesPending;
        municipality.directOrdersSubmittedPositions = directOrdersSubmittedPositions;
        municipality.directOrdersSubmitted = directOrdersSubmitted;
        municipality.fairbundlesSubmitted = fairbundlesSubmitted;
        municipality.fairbundleSpendings = fairbundleSpendings;
        municipality.directOrderSpendings = directOrderSpendings;
        return municipality;
    }
}
