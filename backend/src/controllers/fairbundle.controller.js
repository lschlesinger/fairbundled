import Fairbundle from "../models/fairbundle.model";
import OrderPosition from "../models/order-position.model";

class FairbundleController {

    static getFairbundles(req, res) {
        const query = {};
        if (!!req.query.product) {
            query['product'] = req.query.product;
        }
        Fairbundle.find(query)
            .then((fairbundles) => {
                res.status(200).json(fairbundles);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }

    /**
     * First create fairbundle as order then create position of product with selected quantity and add position to FairbundleOrder
     * @param req: qty, productId, expiration, expirationAction, targetPrice
     * @param res
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
     * Find Fairbundle by Id and add Order Position
     * @param req: qty, productId, expiration, expirationAction, targetPrice
     * @param res
     */
    static joinFairbundle(req, res) {
        Fairbundle.findById(req.params.id)
            .then((fairbundle) => {
                const orderPosition = {
                    qty: req.body.qty,
                    product: fairbundle.product._id,
                    user: req.userId
                };
                OrderPosition.create(orderPosition).then((position) => {
                    fairbundle.positions.push(position._id);
                    fairbundle.bundlers.push(req.municipalityId);
                    fairbundle.save((f) => {
                        res.status(201).json(fairbundle);
                    });
                });


            })
            .catch((err) => {
                console.log(err);
                res.status(400).send(err);
            })
    }
}

export default FairbundleController;
