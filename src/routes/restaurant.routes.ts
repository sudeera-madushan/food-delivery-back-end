/**
 * author : Sudeera Madushan
 * date : 1/16/2024
 * project : food-delivery-back-end
 */
import express from "express";
import * as RestaurantController from "../controllers/restaurant.controller";

import * as Middleware from "../middlewares";
const router = express.Router();

/**
 * save menu
 */
router.post("/sign-up", RestaurantController.saveRestaurant)
router.post("/auth", RestaurantController.authRestaurant)
router.get("/with-menu", Middleware.verifyToken, RestaurantController.getAllRestaurantWithMenu)

export default router;
