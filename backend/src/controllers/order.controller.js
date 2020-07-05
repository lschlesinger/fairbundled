import {Order} from "../models/order.model";
import OrderService from "../services/order.service";

class OrderController {
    /**
     * Find orders of municipality associated with requesting user (=req.municipalityId)
     * @param req: -
     * @param res: array of orders
     */
    static getOrders(req, res) {
        const query = {};
        query["municipality"] = req.municipalityId;
        query["__t"] = {$ne: "Fairbundle"};
        Order.find(query)
            .populate({
                path: 'positions',
                populate: ({
                    path: 'product',
                    select: ['priceLevel', 'name']
                }),
            })
            .then((orders) => {
                res.status(200).json(orders);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

    /**
     * Find certain order of municipality associated with requesting user (=req.municipalityId) by OrderId
     * @param req: -
     * @param res: order
     */
    static getOrder(req, res) {
        const query = {};
        query.municipality = req.municipalityId;
        query._id = req.params.id;
        Order.find(query)
            .populate("positions")
            .then((order) => {
                res.status(200).json(order);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

    /**
     * Find order of req.params.id and created by municipality associated with requesting user (req.municipalityId)
     * then update submission with current date
     * @param req: -
     * @param res: updated order object
     */
    static submitOrder(req, res) {
        const date = new Date();
        const query = {};
        query.municipality = req.municipalityId;
        query._id = req.params.id;
        Order.findOneAndUpdate(query, {submission: date}, {new: true})
            .populate({
                path: 'positions',
                populate: ({
                    path: 'product',
                    select: ['priceLevel']
                }),
            })
            .then((order) => {
                res.status(201).json(order);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send(err);
            });
    }

    /**
     * First create order then create position of product with selected quantity and add position to Order
     * @param req: qty, productId
     * @param res: created order object
     */
    static createOrder(req, res) {
        const product = {
            productId: req.body.productId,
            qty: req.body.qty,
        };
        OrderService.createOrder(product, req.userId, req.municipalityId)
            .then((order) => {
                res.status(201).json(order);
            })
            .catch((err) => {
                res.status(400).json({message: err.message});
            });
    }
}

export default OrderController;
