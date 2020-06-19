import OrderPosition from "../models/order-position.model";

class PositionController {
    static getPositions(req, res) {
        const query = {};
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
}
export default PositionController;
