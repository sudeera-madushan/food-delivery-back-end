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
import UserModel from "../models/user.model";
import {getDistancesFromOrigin, Location} from "../util/distance"
import MenuModel from "../models/menu.model";

const getNearRestaurants =  (async (loc: Location): Promise<IRestaurant[]>=> {
    let restaurants: IRestaurant[] = await RestaurantModel.find();
    let body: IRestaurant[] = [];


    const originLocation: Location = {latitude: loc.latitude, longitude: loc.longitude};
    let destinationLocations: Location[] = [];

    restaurants.map((r, i) => {
        destinationLocations.push({
            latitude: r.location.latitude, longitude: r.location.longitude
        })
    })
    if (destinationLocations.length > 0) {
        let distances: number[] = [];
        await getDistancesFromOrigin(originLocation, destinationLocations)
            .then((d) => {
                distances = d;
                // console.log('Distances from origin to destinations:', distances.map((distance, index) => `Location ${index + 2}: ${distance} km`));
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        distances.map((value, index) => {
            if (value < 11) {
                body.unshift(restaurants[index])
            }
        })
        return body;
    }
    return [];
})

export const getAllRestaurantWithMenu = async (req: express.Request, res:any) => {
    try {
        let user_id = res.tokenData.user._id;

        let user = await UserModel.findOne({_id:user_id});

        if (user){
            if (user.location) {
                let restaurants = await getNearRestaurants(user.location)
                let body:any = []

                for (let i = 0; i < restaurants.length; i++) {
                    body.unshift(
                        {
                            restaurant: restaurants[i],
                            menus: await MenuModel.find({restaurant: restaurants[i]._id})
                        })
                }
                res.status(200).send(
                    new CustomResponse(
                        200,
                        "Get all restaurant successfully !",
                        body)
                );
            }
        }
    }catch (error) {
        res.status(100).send(`Error ${error}`);
    }
}


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
        let find: IRestaurant | null = await RestaurantModel.findOne({username: request_body.username});
        if(find) {

            let isMatch = await bcrypt.compare(request_body.password, find.password)

            if(isMatch) {

                let restaurant = {
                    _id:find._id,
                    username:find.username,
                }

                const expiresIn = '1w';

                jwt.sign({restaurant}, process.env.SECRET as Secret, {expiresIn}, (err: any, token: any) => {

                    if(err) {
                        res.status(100).send(
                            new CustomResponse(100, "Something went wrong")
                        );
                    } else {

                        let res_body = {
                            restaurant: restaurant,
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

