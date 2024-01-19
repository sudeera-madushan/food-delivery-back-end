/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import CustomResponse from "../dtos/custome.response";
import jwt, {Secret} from "jsonwebtoken";
import bcrypt from "bcryptjs";
import process from "process";
import RestaurantModel, {IRestaurant} from "../models/restaurant.model";
import UserModel, {IUser} from "../models/user.model";
const {SECRET } = process.env;
export const userAuth = async (req:express.Request, res:any) => {
    res.status(200).send(
        new CustomResponse(
            200,
            "Login success",
            res.tokenData));
}
export const userSignIn = async (req: express.Request, res: express.Response) => {
    try {

        let request_body = req.body
        let find: IUser | null = await UserModel.findOne({username: request_body.username});
        if(find) {

            let isMatch = await bcrypt.compare(request_body.password, find.password)

            if(isMatch) {

                let user = {
                    _id:find._id,
                    username:find.username,
                }

                const expiresIn = '1w';

                jwt.sign({user}, process.env.SECRET as Secret, {expiresIn}, (err: any, token: any) => {

                    if(err) {
                        res.status(100).send(
                            new CustomResponse(100, "Something went wrong")
                        );
                    } else {

                        let res_body = {
                            user: user,
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
            let find: IRestaurant | null = await RestaurantModel.findOne({username: request_body.username});
            if (find) {
                let isMatch = await bcrypt.compare(request_body.password, find.password)

                if (isMatch) {

                    let restaurant = {
                        _id: find._id,
                        username: find.username,
                    }

                    const expiresIn = '1w';

                    jwt.sign({restaurant}, process.env.SECRET as Secret, {expiresIn}, (err: any, token: any) => {

                        if (err) {
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


            }else {


                res.status(404).send(
                    new CustomResponse(404, "User not found")
                );
            }
        }

    } catch (error) {
        res.status(100).send("Error");
    }
}

export const saveUser = async (req: express.Request, res: express.Response) => {
    try {
        const rest = req.body;

        bcrypt.hash(rest.password, 8, async function (err, hash) {
            if (err) {
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            }
            const resModel: IUser = new UserModel({
                fullName: rest.fullName,
                nic: rest.nic,
                email: rest.email,
                username: rest.username,
                mobile: rest.mobile,
                password:hash,
                location: rest.location,
                address: rest.address

            })
            await resModel.save().then(r => {
                res.status(200).send("User create successfully !");
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
