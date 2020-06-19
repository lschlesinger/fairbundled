import OrderPosition from "../models/order-position.model";

class PositionController {
    static getPositions(req, res) {
        const queury = {};
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
            })
            .then((positions) => {
                res.status(200).json(positions);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
}
export default PositionController;
