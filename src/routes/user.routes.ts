/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import * as UserController from "./../controllers/user.controller"
import * as Middleware from "../middlewares";
const router = express.Router();

/**
 * auth user
 */
router.post("/sign-in", UserController.userSignIn)
router.post("/sign-up", UserController.saveUser)
router.post("/auth", Middleware.verifyToken, UserController.userAuth)
router.get("/location", Middleware.verifyToken, UserController.getUserLocation)
router.get("/distance", Middleware.verifyToken, UserController.getDistance)

export default router;
