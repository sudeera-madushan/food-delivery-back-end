/**
 * author : Sudeera Madushan
 * date : 1/22/2024
 * project : food-delivery-back-end
 */
import * as Middleware from "../middlewares";
import * as OrderController from "../controllers/order.controller";
import express from "express";
const router = express.Router();


router.post("/save", Middleware.verifyToken, OrderController.saveOrder)
router.get("/all", Middleware.verifyToken, OrderController.getUserOrders)
router.get("/my-all", Middleware.verifyToken, OrderController.getOrdersByRestaurant)
router.post("/conform", Middleware.verifyToken, OrderController.conformOrder)
router.post("/cooked", Middleware.verifyToken, OrderController.cookedOrder)
router.post("/complete", Middleware.verifyToken, OrderController.completeOrder)

export default router;
