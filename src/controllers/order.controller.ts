import express from "express";
import OrderModel, {IOrder, OrderStates} from "../models/order.model";
import CustomResponse from "../dtos/custome.response";
import menuModel, {IMenu} from "../models/menu.model";
import {ObjectId} from "mongoose";
import RestaurantModel from "../models/restaurant.model";
import MenuModel from "../models/menu.model";

/**
 * author : Sudeera Madushan
 * date : 1/22/2024
 * project : food-delivery-back-end
 */
export const getUserOrders = async (req: express.Request, res: any) => {



    try {
        let user = res.tokenData.user;

        let orders:IOrder[] = await OrderModel.find({user: user._id});
        let data = [];
        for (let i = 0; i < orders.length; i++) {
            let cart = orders[i].cart;
            let newCart=[]
            for (let i of cart) {
                let item = await menuModel.findOne({_id:i.menu});
                if (item) {
                    newCart.push({menu:item,qty:i.qty, price:i.price})
                }
            }
            let restaurant = await RestaurantModel.findOne({_id:orders[i].restaurant})
            data.push({
                user: user._id,
                restaurant: restaurant,
                cart: newCart,
                location: orders[i].location,
                address: orders[i].address,
                distance: orders[i].distance,
                totalCost: orders[i].totalCost,
                deliveryCost: orders[i].deliveryCost,
                taxCost: orders[i].taxCost,
                toPayCost: orders[i].toPayCost,
                states: orders[i].states
            })
        }



        res.status(200).send(new CustomResponse(
            200,
            "Orders find success",
            data.reverse()))
    }catch (e) {
        res.status(100).send(`Error ${e}`);
    }
}
export const getOrdersByRestaurant = async (req: express.Request, res: any) => {



    try {
        let restaurant = res.tokenData.restaurant;

        let orders:IOrder[] = await OrderModel.find({restaurant: restaurant._id});
        let data = [];
        for (let i = 0; i < orders.length; i++) {
            let cart = orders[i].cart;
            let newCart=[]
            for (let i of cart) {
                let item = await menuModel.findOne({_id:i.menu});
                if (item) {
                    newCart.push({menu:item,qty:i.qty, price:i.price})
                }
            }
            let restaurant = await RestaurantModel.findOne({_id:orders[i].restaurant})
            data.push({
                _id: orders[i]._id,
                user: orders[i].user,
                restaurant: restaurant,
                cart: newCart,
                location: orders[i].location,
                address: orders[i].address,
                distance: orders[i].distance,
                totalCost: orders[i].totalCost,
                deliveryCost: orders[i].deliveryCost,
                taxCost: orders[i].taxCost,
                toPayCost: orders[i].toPayCost,
                ordered: orders[i].ordered,
                states: orders[i].states
            })
        }



        res.status(200).send(new CustomResponse(
            200,
            "Orders find success",
            data.reverse()))
    }catch (e) {
        res.status(100).send(`Error ${e}`);
    }
}
export const conformOrder = async (req: express.Request, res: any) => {
    try {

        let find = await OrderModel.findById(req.body._id);

        if (!find) {
            return res.status(404).send(new CustomResponse(404, "Order not found."));
        }

        find.states = OrderStates.CONFIRMED;
        await find.save();

        res.status(200).send(new CustomResponse(100, "Order confirmed successfully."));
    } catch (error) {
        console.log(error);
        res.status(500).send(new CustomResponse(500, "Something went wrong."));
    }

}
export const cookedOrder = async (req: express.Request, res: any) => {
    try {

        let find = await OrderModel.findById(req.body._id);

        if (!find) {
            return res.status(404).send(new CustomResponse(404, "Order not found."));
        }

        find.states = OrderStates.PREPARED;
        await find.save();

        res.status(200).send(new CustomResponse(100, "Order prepared successfully."));
    } catch (error) {
        console.log(error);
        res.status(500).send(new CustomResponse(500, "Something went wrong."));
    }

}
export const completeOrder = async (req: express.Request, res: any) => {
    try {

        let find = await OrderModel.findById(req.body._id);

        if (!find) {
            return res.status(404).send(new CustomResponse(404, "Order not found."));
        }

        find.states = OrderStates.COMPLETE;
        console.log(find)
        await find.save();

        res.status(200).send(new CustomResponse(100, "Order complete successfully."));
    } catch (error) {
        console.log(error);
        res.status(500).send(new CustomResponse(500, "Something went wrong."));
    }

}
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
            ordered: body.ordered,
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
