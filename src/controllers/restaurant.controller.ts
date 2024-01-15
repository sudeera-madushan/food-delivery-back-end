/**
 * author : Sudeera Madushan
 * date : 1/16/2024
 * project : food-delivery-back-end
 */
import express from "express";
import bcrypt from "bcryptjs";
import CustomResponse from "../dtos/custome.response";
import RestaurantModel, {IRestaurant} from "../models/restaurant.model";
import process from "process";
import jwt, {Secret} from "jsonwebtoken";

export const saveRestaurant = async (req: express.Request, res: express.Response) => {
    try {
        const rest = req.body;

        bcrypt.hash(rest.password, 8, async function (err, hash) {
            if (err) {
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            }
            const resModel: IRestaurant = new RestaurantModel({
                restaurantName: rest.restaurantName,
                ownerNIC: rest.ownerNIC,
                ownerFullName: rest.ownerFullName,
                username: rest.username,
                email: rest.email,
                mobile: rest.mobile,
                password:hash,
                location: rest.location,
                address: rest.address

            })
            await resModel.save().then(r => {
                res.status(200).send("Menu create successfully !");
            }).catch(error => {
                console.log(error)
                res.status(100).send(`Error ${error}`);
            })
        });

    }catch (error) {
        console.log(error)
        res.status(100).send(`Error ${error}`);
    }
}

export const authRestaurant = async (req: express.Request, res: express.Response) => {
    try {

        let request_body = req.body
        let restaurant: IRestaurant | null = await RestaurantModel.findOne({username: request_body.username});
        if(restaurant) {

            let isMatch = await bcrypt.compare(request_body.password, restaurant.password)

            if(isMatch) {

                let user = {
                    _id:restaurant._id,
                    username:restaurant.username,
                }

                const expiresIn = '1w';

                jwt.sign({user}, process.env.SECRET as Secret, {expiresIn}, (err: any, token: any) => {

                    if(err) {
                        res.status(100).send(
                            new CustomResponse(100, "Something went wrong")
                        );
                    } else {

                        let res_body = {
                            restaurant: user,
                            accessToken: token
                        }

                        res.status(200).send(
                            new CustomResponse(200, "Access", res_body)
                        );
                    }

                })
            } else {
                res.status(401).send(
                    new CustomResponse(401, "Invalid credentials")
                );
            }
        } else {
            res.status(404).send(
                new CustomResponse(404, "User not found")
            );
        }

    } catch (error) {
        res.status(100).send("Error");
    }
}
