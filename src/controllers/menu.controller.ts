/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import MenuModel from "../models/menu.model";
import CustomResponse from "../dtos/custome.response";


export const saveMenu = async (req: express.Request, res: express.Response) => {
    try {
        const menu = req.body;
        const menuModel = new MenuModel({
            name: menu.name,
            description: menu.description,
            image: menu.image
        })
        await menuModel.save().then(r => {
            res.status(200).send("Menu create successfully !");
        }).catch(error => {
            res.status(100).send(`Error ${error}`);
        })
    }catch (error) {
        res.status(100).send(`Error ${error}`);
    }
}

export const getAllMenu = async (req:express.Request, res:express.Response) => {
    try {
        let size = 10;
        let menus = await MenuModel.find().limit(size).skip(10 * (1 - 1));
        let count = await MenuModel.countDocuments();
        let pages = Math.ceil(count / size);

        res.status(200).send(
            new CustomResponse(
                200,
                "Get all menus successfully !",
                menus,
                pages)
        );
    } catch (error) {
        res.status(100).send(`Error ${error}`);
    }
}
