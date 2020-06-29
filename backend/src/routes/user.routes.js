import express from "express";
import UserController from "../controllers/user.controller";
import middlewares from "../middlewares";

const router = express.Router();

// get all users of the entity associated with the requesting user (either municipality users or supplier users)
router.get(
    "/",
    middlewares.checkAuthentication,
    UserController.getUsersOfEntity
);
export default router;
