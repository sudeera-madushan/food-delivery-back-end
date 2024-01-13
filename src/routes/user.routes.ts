/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import * as UserController from "./../controllers/user.controller"
const router = express.Router();

/**
 * auth user
 */
router.post("/auth", UserController.userAuth)

export default router;
