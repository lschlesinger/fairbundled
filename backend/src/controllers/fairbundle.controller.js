import Fairbundle from "../models/faribundle.model";

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

    static createFairbundle(req, res) {
        Fairbundle.create(req.body)
            .then((fairbundle) => {
                res.status(201).json(fairbundle);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default FairbundleController;
