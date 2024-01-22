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

export default router;
