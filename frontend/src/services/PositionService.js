import HttpService from "./HttpService";
import OrderService from "./OrderService";
import CertificateService from "./CertificateService";

export default class PositionService {
    static BASE_URL = "/api/position";

    constructor() {}

    static async getPositions() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    static async addPosition(qty, productId) {
        return HttpService.post(`${this.BASE_URL}/`, { qty, productId });
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
        if (positions?.length > 0) {
            for (const p in positions) {
                const position = positions[p];
                if (
                    position.order.submission &&
                    new Date(position.order.submission) < new Date()
                ) {
                    productsSold++;
                    qtySold += position.qty;
                    let price = position.order.finalUnitPrice;
                    if (position.order.finalUnitPrice == null) {
                        let priceL = 0;
                        for (
                            let i = 0;
                            i < position.product.priceLevel.length;
                            i++
                        ) {
                            if (
                                position.qty >=
                                position.product.priceLevel[i].qty
                            ) {
                                priceL = i;
                            } else {
                                break;
                            }
                        }
                        price = position.product.priceLevel[priceL].unitPrice;
                    }

                    //temp Revenue
                    let tempRevenue = position.qty * price;
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
                            orderedProducts[op].product._id ===
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
                            revenue: position.qty * price,
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
        let uniquePr;
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

    static getUniqueProducts(positions) {
        let resultArray = [];
        positions.forEach((position) => {
            if (resultArray.indexOf(position.product._id) < 0) {
                resultArray.push(position.product._id);
            }
        });
        return resultArray;
    }

    static getUniqueOrders(positions) {
        let resultArray = [];
        positions.forEach((position) => {
            if (
                resultArray.filter((entry) => entry._id === position.order._id)
                    .length === 0
            ) {
                resultArray.push(position.order);
            }
        });
        return resultArray;
    }

    static getDirectOrderValues(orders, positions) {
        let resultArray = [];
        orders.forEach((order) => {
            let orderPositions = positions.filter(
                (pos) => pos.order._id === order._id
            );
            let orderValue = OrderService.getPositionsValue(orderPositions);
            let orderEntry = {
                order: order,
                value: orderValue,
            };

            resultArray.push(orderEntry);
        });
        return resultArray;
    }

    static getFairbundlesPending(positions) {
        let fbPositions = positions.filter(
            (position) =>
                !position.order.submission &&
                !position.order.cancellation &&
                position.order.__t
        );
        let resultArray = [];
        let positionOrders = [];
        fbPositions.forEach((position) => {
            // there is already a position of the same order
            if (positionOrders.includes(position.order._id)) {
                let updatedPosition = resultArray.find(
                    (p) => p.order._id === position.order._id
                );
                updatedPosition.qty = updatedPosition.qty + position.qty;
                let foundIndex = resultArray.findIndex(
                    (p) => p.order._id === position.order._id
                );
                resultArray[foundIndex] = updatedPosition;
            } else {
                positionOrders.push(position.order._id);
                resultArray.push(position);
            }
        });
        return resultArray;
    }

    // Calculates all necessary information in the municipality account view
    static async getPositionsInfo(municipality) {
        // array of submitted fairbundle order positions
        let fairbundlesSubmittedPositions = 0;
        // array of pending fairbundles
        let fairbundlesPending = [];
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
        let fairbundleSavings = [];
        // sum of spendings for directOrders
        let directOrderSpendings = 0;
        // value of each direct order
        let directOrderValues = [];
        // certificates of ordered products (not unique)
        let certificates = [];

        let positions = await this.getPositions();

        if (positions?.length > 0) {
            fairbundlesSubmittedPositions = positions.filter(
                (position) => position.order.submission && position.order.__t
            );
            fairbundlesPending = this.getFairbundlesPending(positions);
            directOrdersSubmittedPositions = positions.filter(
                (position) => position.order.submission && !position.order.__t
            );
            fairbundleProductsBought = this.getUniqueProducts(
                fairbundlesSubmittedPositions
            );
            directProductsBought = this.getUniqueProducts(
                directOrdersSubmittedPositions
            );
            directOrdersSubmitted = this.getUniqueOrders(
                directOrdersSubmittedPositions
            );
            fairbundlesSubmitted = this.getUniqueOrders(
                fairbundlesSubmittedPositions
            );
            fairbundleSpendings = OrderService.getPositionsValue(
                fairbundlesSubmittedPositions
            );
            fairbundleSavings = OrderService.getPositionsSavings(
                fairbundlesSubmittedPositions
            );
            directOrderSpendings = OrderService.getPositionsValue(
                directOrdersSubmittedPositions
            );
            directOrderValues = this.getDirectOrderValues(
                directOrdersSubmitted,
                directOrdersSubmittedPositions
            );
            certificates = CertificateService.getPositionsCertificates(
                positions
            );

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
        municipality.fairbundleSavings = fairbundleSavings;
        municipality.directOrderSpendings = directOrderSpendings;
        municipality.directOrderValues = directOrderValues;
        municipality.certificates = certificates;
        return municipality;
    }
}
