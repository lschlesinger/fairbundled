import OrderPosition from "../models/position.model";
import {Order} from "../models/order.model";
import OrderController from "./order.controller";
import Product from "../models/product.model";
import Fairbundle from "../models/fairbundle.model";

class PositionController {
    /**
     * Find all OrderPositions of products provided by supplier associated with requesting user (=req.supplierId)
     * or ordered by municipality associated with requesting user
     * @param req: -
     * @param res: array of OrderPositions with populated product and order field
     */
    static getPositions(req, res) {
        const customizedSupplierMatch = {};
        const customizedMunicipalityMatch = {};
        if (req.supplierId) {
            customizedSupplierMatch["supplier"] = req.supplierId;
        } else if (req.municipalityId) {
            customizedMunicipalityMatch['municipality'] = req.municipalityId;
        }
        OrderPosition.find()
            .populate({
                path: "product",
                match: customizedSupplierMatch,
                select: ["supplier", "priceLevel", "name", "certificates", "categories"]
            })
            .populate({
                path: "order",
                match: customizedMunicipalityMatch,
                select: ["submission", "municipality", "__t", "cancellation", "finalUnitPrice"],
            })
            .lean()
            .then((positions) => {
                positions = positions.filter(
                    (position) => position.product !== null
                );
                if (req.municipalityId) {
                    positions = positions.filter(
                        (position) => position.order !== null
                    );
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
                        }
                    })

            })
            .catch((err) => {
                res.status(400).json({message: err.message});
            });
    }
}

export default PositionController;
