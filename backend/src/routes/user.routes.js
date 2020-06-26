import express from "express";
import UserController from "../controllers/user.controller";
import middlewares from "../middlewares";

const router = express.Router();

// get one user by ObjectId
router.get(
    "/:id",
    middlewares.checkAuthentication,
    middlewares.checkSupplier,
    UserController.getUsersOfSupplier
);
export default router;
