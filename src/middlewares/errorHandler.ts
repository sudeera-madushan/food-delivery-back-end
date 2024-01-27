import CustomResponse from "../dtos/custome.response";
import {Response} from "express";
import {Error} from "mongoose";

/**
 * author : Sudeera Madushan
 * date : 1/27/2024
 * project : food-delivery-back-end
 */

class NotFoundError extends Error{
    private _statusCode:number;

    constructor(message: string = "Not Found") {
        super(message);
        this.name = "NotFoundError";
        this._statusCode = 404;
    }


    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode(value: number) {
        this._statusCode = value;
    }
}

const errorHandler = (err: any, req: any, res: Response, next:any) => {
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode || 404).send({
            statusCode: err.statusCode || 404,
            msg: err.message,
        });
    }
    // if (err instanceof UnAuthorizedError) {
    //     return res.status(err.statusCode || 401).send({
    //         statusCode: err.statusCode || 401,
    //         msg: err.message,
    //     });
    // }
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const response = new CustomResponse(100, "Something went wrong.")
    return res.status(statusCode).send(response);
}
export default errorHandler;
