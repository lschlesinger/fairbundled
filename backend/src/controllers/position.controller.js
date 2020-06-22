import OrderPosition from "../models/order-position.model";
import { Order } from "../models/order.model";
import OrderController from "./order.controller";

class PositionController {
    /**
     * Find all OrderPositions of products provided by supplier associated with requesting user (=req.supplierId)
     * @param req: -
     * @param res: array of OrderPositions with populated submission field (from respective order)
     */
    static getPositions(req, res) {
        OrderPosition.find()
            .populate({
                path: "product",
                match: {
                    supplier: req.supplierId,
                },
            })
            .populate({
                path: "order",
                match: {
                    position: req._id,
                },
                select: ["submission", "municipality"],
            })
            .then((positions) => {
                res.status(200).json(positions);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }

    /**
     * Find only, currently unsubmitted order of municipality associated with requesting user (=req.municipalityId)
     * create a OrderPosition with product and quantity and update Order with this OrderPosition
     * @param req: qty, productId
     * @param res: updated order object
     */
    static addPosition(req, res) {
        const query = {};
        query["municipality"] = req.municipalityId;
        query["submission"] = null;
        Order.findOne(query)
            .populate({
                path: "positions",
                populate: {
                    path: "product",
                    match: {
                        _id: req.body.productId,
                    },
                },
            })
            .then((order) => {
                // check if there is no currently unsubmitted order, if so create new order
                if (!order) {
                    OrderController.createOrder(req, res);
                }
                // if order found, add position to existing unsubmitted order, Note: there can be several positions of one product in one order
                else {
                    const orderPosition = {
                        qty: req.body.qty,
                        product: req.body.productId,
                        user: req.userId,
                        order: order._id,
                    };
                    OrderPosition.create(orderPosition)
                        .then((position) => {
                            // if one unsubmitted order is found
                            order.positions.push(position._id);
                            order.save(() => {
                                res.status(201).json(order);
                            });
                        })
                        .catch((err) => {
                            res.status(400).send(err);
                        });
                }
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
}

export default PositionController;
