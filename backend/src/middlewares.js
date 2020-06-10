import jwt from "jsonwebtoken";
import config from "./config";

const checkAuthentication = (req, res, next) => {
    // check "Authorization" header for bearer token
    let token = "";
    if (req.headers.authorization) {
        const tokenType = "Bearer ";
        token = req.headers.authorization.substring(tokenType.length);
    }

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });
    }

    // verifies secret and checks expiration date
    jwt.verify(token, config.auth.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'Unauthorized',
                message: 'Failed to authenticate token.'
            });
        }

        // if verification succeeds, save userId to request for use in other routes
        req.userId = decoded.id;
        req.municipalityId = decoded.municipality ? decoded.municipality._id : null;
        req.supplierId = decoded.supplier ? decoded.supplier._id : null;
        next();
    });
};

/**
 * check if authenticated user has municipality id
 * (place after checkAuthentication middleware)
 *
 * @param req
 * @param res
 * @param next
 */
const checkMunicipality = (req, res, next) => {
    if (req.municipalityId) {
        next();
    } else {
        return res.status(403).send({
            error: 'Forbidden',
            message: 'Missing rights for requested action.'
        });
    }
};

/**
 * check if authenticated user has supplier id
 * (place after checkAuthentication middleware)
 *
 * @param req
 * @param res
 * @param next
 */
const checkSupplier = (req, res, next) => {
    if (req.supplierId) {
        next();
    } else {
        return res.status(403).send({
            error: 'Forbidden',
            message: 'Missing rights for requested action.'
        });
    }
};

export default {
    checkAuthentication,
    checkMunicipality,
    checkSupplier
}
