/**
 * author : Sudeera Madushan
 * date : 1/27/2024
 * project : food-delivery-back-end
 */
import {NextFunction, Request, Response} from "express";

const tryCatch = (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res);
    } catch (er) {
        console.log(er)
        return next(er);
    }
}
export default tryCatch;
