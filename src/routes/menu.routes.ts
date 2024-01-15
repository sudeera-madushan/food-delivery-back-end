/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import * as MenuController from "./../controllers/menu.controller"
import * as Middleware from "../middlewares";
const router = express.Router();

/**
 * save menu
 */
router.post("/save", Middleware.verifyToken, MenuController.saveMenu)

/**
 * get all menu
 */
router.get("/all", Middleware.verifyToken, MenuController.getAllMenu)

/**
 * update menu
 */
router.put("/update", MenuController.updateMenu)

export default router;
