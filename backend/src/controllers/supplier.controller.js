import Supplier from "../models/supplier.model";

class SupplierController {

    static getSuppliers(req, res) {
        Supplier.find({})
            .then((suppliers) => {
                res.status(200).json(suppliers);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default SupplierController;
