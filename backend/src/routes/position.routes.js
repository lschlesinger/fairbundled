import express from "express";
import PositionController from "../controllers/position.controller";
import middlewares from "../middlewares";

const router = express.Router();

// get all positions of products provided by the supplier associated with requesting user (req.supplierId)
router.get(
    "/",
    middlewares.checkAuthentication,
    PositionController.getPositions
);

// add one position to the only, currently unsubmitted order of the municipality associated with the requesting user
router.post(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    PositionController.addPosition
);


export default router;
