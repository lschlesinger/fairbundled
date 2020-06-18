import {Order} from "../models/order.model";
import OrderPosition from "../models/order-position.model";

class OrderController {

    static getOrders(req, res) {
        const query = {};
        query['municipality'] = req.municipalityId;
        Order.find(query)
            .populate("positions")
            .populate("product")
            .then((orders) => {
                res.status(200).json(orders);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
    /**
     * First create order then create position of product with selected quantity and add position to Order
     * @param req: qty, productId
     * @param res
     */
    static createOrder(req, res) {
        const order = {
            positions: [],
            submission: null,
            municipality: req.municipalityId,
        };
        Order.create(order)
            .then((order) => {
                const position = {
                    qty: req.body.qty,
                    product: req.body.productId,
                    user: req.userId,
                    order: order._id
                };
                OrderPosition.create(position)
                    .then((position) => {
                        order.positions.push(position);
                        order.save((f) => {
                            res.status(201).json(order)
                        })
                    });
            })
            .catch((err) => {
            res.status(400).send(err);
        })
    }

}

export default OrderController;
