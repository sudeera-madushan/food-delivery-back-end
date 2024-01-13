/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import express from "express";
import CustomResponse from "../dtos/custome.response";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import process from "process";
const {SECRET } = process.env;
export const userAuth = async (req:express.Request, res:express.Response) => {

    let user = req.body;
    const expiresIn = '1d'
    jwt.sign({user}, SECRET as string, {expiresIn}, (error: any, token: any) => {

        if (error) {
            res.status(100).send(
                new CustomResponse(
                    100,
                    "Something went wrong !")
            );
        } else {
            bcrypt.hash(user.password, 8, (error: any, hash: any) => {
                if (error){

                }else {
                    user.password = hash
                    let res_body = {
                        user: user,
                        token: token
                    }
                    res.status(200).send(
                        new CustomResponse(
                            200,
                            "Get all menus successfully !",
                            res_body)
                    );
                }
            })

        }
    })
}
