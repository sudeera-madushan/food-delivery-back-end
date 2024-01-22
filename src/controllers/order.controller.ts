import express from "express";
import OrderModel, {IOrder, OrderStates} from "../models/order.model";

/**
 * author : Sudeera Madushan
 * date : 1/22/2024
 * project : food-delivery-back-end
 */
export const saveOrder = async (req: express.Request, res: any) => {
    try {
        let body = req.body;
        let orderModel:IOrder = new OrderModel({
            user: res.tokenData.user._id,
            restaurant: body.restaurant,
            cart: body.cart,
            location: body.location,
            address: body.address,
            distance: body.distance,
            totalCost: body.totalCost,
            deliveryCost: body.deliveryCost,
            taxCost: body.taxCost,
            toPayCost: body.toPayCost,
            states: OrderStates.ORDERED
        });
        await orderModel.save().then(r => {
            res.status(200).send("Order create successfully !");
        }).catch(error => {
            console.log(error);
            res.status(100).send(`Error ${error}`);
        })
    }catch (e){
        console.log(e)
        res.status(100).send(`Error ${e}`);
    }
}
