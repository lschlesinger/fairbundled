import express from "express";
import OrderController from "../controllers/order.controller";
import middlewares from "../middlewares";

const router = express.Router();

// get all orders of a municipality associated with requesting user (req.municipalityId)
router.get(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    OrderController.getOrders
);

// get one order by orderId as user associated with the municipality created that order
router.get('/:id',
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    OrderController.getOrder
);

// submit a certain order by Id as municipality
router.put("/:id",
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    OrderController.submitOrder
);

// create an order as municipality
router.post(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    OrderController.createOrder
);

export default router;
