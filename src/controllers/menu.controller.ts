/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import MenuModel, {IMenu} from "../models/menu.model";
import CustomResponse from "../dtos/custome.response";
import {ObjectId} from "mongodb";

export const saveMenu = async (req: express.Request, res: any) => {
    try {
        let user_id = res.tokenData.user._id;
        const menu = req.body;
        const menuModel: IMenu = new MenuModel({
            image: menu.image,
            foodName: menu.foodName,
            description: menu.description,
            price: menu.price,
            openTime: menu.openTime,
            closeTime: menu.closeTime,
            size:menu.size,
            restaurant: new ObjectId(user_id)
        })
        await menuModel.save().then(r => {
            res.status(200).send("Menu create successfully !");
        }).catch(error => {
            console.log(error)
            res.status(100).send(`Error ${error}`);
        })
    }catch (error) {
        res.status(100).send(`Error ${error}`);
    }
}
export const updateMenu = async (req: express.Request, res: express.Response) => {
    try {
        const menu = req.body;

        let find = await MenuModel.find({_id: menu._id })
        console.log(menu)
        if(find) {
            await MenuModel.findOneAndUpdate({_id: menu._id}, {
                    image: menu.image,
                    foodName: menu.foodName,
                    description: menu.description,
                    price: menu.price,
                    openTime: menu.openTime,
                    closeTime: menu.closeTime,
                    size:menu.size
            })
                .then(r => {

                    console.log(MenuModel.find({_id: menu.id }))
                    res.status(200).send(
                        new CustomResponse(100, "Menu updated successfully.")
                    )
                }).catch(error => {
                    console.log(error)
                    res.status(100).send(
                        new CustomResponse(100, "Something went wrong.")
                    )
                })

        } else {
            res.status(401).send(
                new CustomResponse(401, "Access denied")
            )
        }

        // const menuModel: IMenu = new MenuModel({
        //     image: menu.image,
        //     foodName: menu.foodName,
        //     description: menu.description,
        //     price: menu.price,
        //     openTime: menu.openTime,
        //     closeTime: menu.closeTime,
        //     size:menu.size
        //
        // })
        // await menuModel.save().then(r => {
        //     res.status(200).send("Menu create successfully !");
        // }).catch(error => {
        //     console.log(error)
        //     res.status(100).send(`Error ${error}`);
        // })
    }catch (error) {
        res.status(100).send(`Error ${error}`);
    }
}

export const getAllMenu = async (req:express.Request, res:any) => {
    try {
        let user_id = res.tokenData.user._id;

        let size = 10;
        let menus = await MenuModel.find({restaurant:user_id}).limit(size).skip(10 * (1 - 1));
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
