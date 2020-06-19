import express from "express";
import PositionController from "../controllers/position.controller";
import middlewares from "../middlewares";

const router = express.Router();

// get all positions of products provided by the supplier associated with requesting user (req.supplierId)
router.get(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkSupplier,
    PositionController.getPositions
);

export default router;
