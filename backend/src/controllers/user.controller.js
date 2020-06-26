import User from "../models/user.model";

class UserController {
    /**
     * Find Users by ObjectID (supplier or municipality)
     * @param req
     * @param res: array of users belonging to this supplier/municipality
     */
    static getUsersOfSupplier(req, res) {
        User.find({ supplier: req.params.id })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
}

export default UserController;
