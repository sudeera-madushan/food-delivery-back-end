/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import {Document, Schema, model, ObjectId} from "mongoose";

export interface IMenu extends Document{
    image: string,
    foodName: string,
    description: string,
    price: number,
    openTime: string,
    closeTime: string,
    size: string[] | null,
    isActive: boolean,
    restaurant: ObjectId
}

const menuSchema = new Schema<IMenu>({
    image : {type: String, required: true},
    foodName : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: Number, required: true},
    openTime : {type: String, required: true},
    closeTime : {type: String, required: true},
    size: {type:[], required: false},
    isActive : {type: "Boolean", required: true},
    restaurant : {type: Schema.Types.ObjectId , required: false, ref: "Restaurant"}
})

const MenuModel = model("Menu", menuSchema);

export default MenuModel;

