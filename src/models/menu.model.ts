/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import {Document, Schema, model, ObjectId} from "mongoose";

interface IMenu extends Document{
    name: string,
    description: string,
    image: string,
    restaurant: ObjectId
}

const menuSchema = new Schema<IMenu>({
    name : {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    restaurant: {type: Schema.Types.ObjectId , required: true, ref: "Restaurant"}
})

const MenuModel = model("Menu", menuSchema);

export default MenuModel;

