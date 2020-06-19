import OrderPosition from "../models/order-position.model";

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
}
export default PositionController;
