import express from "express";
import PositionController from "../controllers/position.controller";
import middlewares from "../middlewares";

const router = express.Router();

// order routes
// get all orders of one municipality
router.get(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkSupplier,
    PositionController.getPositions
);

export default router;
