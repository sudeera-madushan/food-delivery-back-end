/**
 * author : Sudeera Madushan
 * date : 1/16/2024
 * project : food-delivery-back-end
 */
import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";

export const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {

    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json('Invalid token')
    }
    try {
        const data = jwt.verify(token, process.env.SECRET as Secret);
        res.tokenData = data;
        next();
    } catch (error) {
        return res.status(401).json('Invalid token')
    }
}
