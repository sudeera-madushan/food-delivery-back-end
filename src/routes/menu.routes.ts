/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import * as MenuController from "./../controllers/menu.controller"
const router = express.Router();

/**
 * save menu
 */
router.post("/save", MenuController.saveMenu)

/**
 * get all menu
 */
router.get("/all", MenuController.getAllMenu)

export default router;
