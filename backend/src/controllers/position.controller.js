import OrderPosition from "../models/position.model";
import {Order} from "../models/order.model";
import Product from "../models/product.model";
import Fairbundle from "../models/fairbundle.model";
import OrderService from "../services/order.service";

class PositionController {
    /**
     * Find all OrderPositions of products provided by supplier associated with requesting user (=req.supplierId)
     * or ordered by municipality associated with requesting user
     * @param req: -
     * @param res: array of OrderPositions with populated product and order field
     */
    static getPositions(req, res) {
        OrderPosition.find()
            .populate({
                path: "user",
                select: ["municipality"]
            })
            .populate({
                path: "product",
                select: ["supplier", "priceLevel", "name", "certificates", "categories"],
                populate: {
                    path: "certificates"
                },
            })
            .populate({
                path: "order",
                populate: {path: "positions"},
            })
            .lean()
            .then((positions) => {
                if (req.supplierId) {
                    positions = positions.filter(
                        (position) => position.product.supplier.toString() === req.supplierId
                    );
                } else if (req.municipalityId) {
                    // return only those positions that are associated with users' municipality (both fairbundle positions and regular order postiions)
                    positions = positions.filter((position) => position.user.municipality.toString() === req.municipalityId);
                }
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
        // find product requested product
        Product.findById(req.body.productId)
            .lean()
            .then((product) => {
                // search lowest minQty in products priceLevel --> lower bound for order
                const minQty = product.priceLevel.reduce((min, p) => Math.min(p.minQty, min), product.priceLevel[0].minQty);
                // check if requested quantity is higher than lower bound
                if (minQty > req.body.qty) {
                    throw new Error(`Order quantity must exceed product minQty of ${minQty}`);
                }
                const query = {};
                query["municipality"] = req.municipalityId;
                query["submission"] = null;
                // only search for direct orders
                query["__t"] = {$ne: "Fairbundle"};
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
                        // check if there is no currently unsubmitted direct order, if so create new order
                        if ((!order)) {
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
                        }
                    })

            })
            .catch((err) => {
                res.status(400).json({message: err.message});
            });
    }
}

export default PositionController;
