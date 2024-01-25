/**
 * author : Sudeera Madushan
 * date : 1/22/2024
 * project : food-delivery-back-end
 */
import {Document, Schema, model, ObjectId} from "mongoose";

export enum OrderStates {
    ORDERED = 'ORDERED',
    CONFIRMED = 'CONFIRMED',
    PREPARED = 'PREPARED',
    DELIVER = 'DELIVER',
    COMPLETE = 'COMPLETE',
    CANCELED = 'CANCELED'
}

export interface IOrder extends Document{
    user: ObjectId
    restaurant: ObjectId
    cart: {menu : ObjectId, qty: number, price: number}[],
    location: { latitude: number; longitude: number },
    address: string,
    distance: number,
    totalCost: number,
    deliveryCost: number,
    taxCost: number,
    toPayCost: number,
    ordered:Date,
    states: OrderStates
}
const orderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        restaurant: { type: Schema.Types.ObjectId, required: true, ref: "Restaurant" },
        cart: [
            {
                menu: { type: Schema.Types.ObjectId, required: true },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        address: { type: String, required: true },
        distance: { type: Number, required: true },
        totalCost: { type: Number, required: true },
        deliveryCost: { type: Number, required: true },
        taxCost: { type: Number, required: true },
        toPayCost: { type: Number, required: true },
        ordered: {type: "Date", required:true},
        states: {
            type: String,
            enum: Object.values(OrderStates),
            required: true,
        },
    }
);

const OrderModel = model<IOrder>('Order', orderSchema);

export default OrderModel;

