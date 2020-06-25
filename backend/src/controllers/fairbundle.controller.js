import Fairbundle from "../models/fairbundle.model";
import OrderPosition from "../models/order-position.model";

class FairbundleController {

    /**
     * Find all Fairbundle by Id and if added query with productId to find all fairbundles available for one product
     * @param req: qty
     * @param res: array of fairbundle objects
     */
    static getFairbundles(req, res) {
        const query = {};
        if (!!req.query.product) {
            query['product'] = req.query.product;
        }
        Fairbundle.find(query)
            .populate("product")
            .populate("positions")
            .then((fairbundles) => {
                res.status(200).json(fairbundles);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    /**
     * Find Fairbundle by Id and add Order Position
     * @param req: qty
     * @param res: fairbundle object
     */
    static getFairbundle(req, res) {
        Fairbundle.findById(req.params.id)
            .populate("product")
            .populate("positions")
            .then((fairbundle) => {
                res.status(200).json(fairbundle);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    /**
     * First create Fairbundle as Order then create OrderPosition of product with selected quantity and add OrderPosition to Positions in Fairbundle
     * @param req: qty, productId, expiration, expirationAction, targetPrice
     * @param res: created fairbundle object
     */
    static createFairbundle(req, res) {
        const fairbundle = {
            positions: [],
            submission: null,
            municipality: req.municipalityId,
            expiration: req.body.expiration,
            expirationAction: req.body.expirationAction,
            targetPrice: req.body.targetPrice,
            bundlers: [req.municipalityId],
            product: req.body.productId
        };
        Fairbundle.create(fairbundle)
            .then((fairbundle) => {
                const position = {
                    qty: req.body.qty,
                    product: req.body.productId,
                    user: req.userId,
                    order: fairbundle._id
                };
                OrderPosition.create(position).then((position) => {
                    fairbundle.positions.push(position);
                    fairbundle.save((f) => {
                        res.status(201).json(fairbundle)
                    })
                });
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    /**
     * Find Fairbundle by Id and add OrderPosition to join with selected quantity
     * @param req: qty
     * @param res: updated fairbundle object
     */
    static joinFairbundle(req, res) {
        Fairbundle.findById(req.params.id)
            .then((fairbundle) => {
                const orderPosition = {
                    qty: req.body.qty,
                    product: fairbundle.product._id,
                    user: req.userId,
                    order: fairbundle._id,
                };
                OrderPosition.create(orderPosition).then((position) => {
                    fairbundle.positions.push(position._id);

                    if (fairbundle.bundlers.find(b => b == req.municipalityId) == null) {
                        fairbundle.bundlers.push(req.municipalityId);
                    }

                    fairbundle.save(() => {
                        res.status(201).json(fairbundle);
                    });
                });
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default FairbundleController;
