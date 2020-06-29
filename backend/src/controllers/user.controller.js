import User from "../models/user.model";

class UserController {
    /**
     * Find Users of the entity (supplier or municipality) associated with the requesting user
     * @param req
     * @param res: array of users belonging to this supplier/municipality
     */
    static getUsersOfEntity(req, res) {
        if (req.municipalityId) {
            // requesting user belongs to municipality --> find all other users associated with this municipality
            User.find({municipality: req.municipalityId})
                .select('email')
                .then((user) => {
                    res.status(200).json(user);
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
        } else if (req.supplierId) {
            User.find({supplier: req.supplierId})
                .select('email')
                .then((user) => {
                    res.status(200).json(user);
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }

    }
}

export default UserController;
