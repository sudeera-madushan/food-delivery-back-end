/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import {Document, Schema, model, ObjectId} from "mongoose";

interface IRestaurant extends Document{
    name: string,
    address: string,
    location: string,
    description: string,
}

const restaurantSchema = new Schema<IRestaurant>({
    name : {type: String, required: true},
    address : {type: String, required: true},
    location : {type: String, required: true},
    description: {type: String, required: true}
})

const MenuModel = model("Restaurant", restaurantSchema);

export default MenuModel;

