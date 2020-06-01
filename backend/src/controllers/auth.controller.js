import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config";
import UserService from "../services/user.service";


class AuthController {
    static login(req, res) {
        User.findOne({email: req.body.email})
            .then((user) => {
                const isPasswordValid = user.comparePassword(req.body.password);
                if (!isPasswordValid) return res.status(401).json({token: null});

                // if user is found and password is valid
                // create a token
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    municipalityId: user.municipality || '',
                    supplierId: user.supplier || ''
                }, config.auth.jwtSecret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({token: token});
            })
            .catch((err) => {
                res.status(404).json({
                    error: 'User Not Found',
                    message: err.message
                });
            })
    }

    static register(req, res) {
        UserService.registerUser(req.body)
            .then((user) => {
                res.status(200).json({});
            })
            .catch((err) => {
                if (err.code === 11000) {
                    res.status(400).json({
                        error: 'User exists',
                        message: err.message
                    })
                } else {
                    res.status(500).json({
                        error: 'Internal server error',
                        message: err.message
                    })
                }
            })
    }
}

export default AuthController;
