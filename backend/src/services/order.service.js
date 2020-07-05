import {Order} from "../models/order.model";
import OrderPosition from "../models/position.model";

class OrderService {

    /**
     * First create order then create position of product with selected quantity and add position to Order
     *
     */
    static async createOrder(product, userId, municipalityId) {
        let order = {
            positions: [],
            submission: null,
            municipality: municipalityId,
            cancellation: null,
        };
        order = await Order.create(order);
        let position = {
            qty: product.qty,
            product: product.productId,
            user: userId,
            order: order._id,
        };
        position = await OrderPosition.create(position);
        order.positions.push(position);
        order = await order.save((order));
        return order;
    }

}

export default OrderService;
