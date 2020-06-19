import express from "express";
import OrderController from "../controllers/order.controller";
import middlewares from "../middlewares";

const router = express.Router();

// order routes
// get all orders of one municipality
router.get(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    OrderController.getOrders
);
// get a certain order
//router.get('/:id', OrderController.getOrder);

router.put("/:id", OrderController.submitOrder);
router.post(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    OrderController.createOrder
);
export default router;
