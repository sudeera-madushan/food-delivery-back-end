/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
import {Document, Schema, model, ObjectId} from "mongoose";

export interface IRestaurant extends Document{
    _id?: ObjectId
    restaurantName:string,
    ownerNIC:string,
    ownerFullName:string,
    username:string,
    email:string,
    mobile:number,
    password:string,
    location:{ latitude: number; longitude: number },
    address:string
}
const restaurantSchema = new Schema<IRestaurant>({
    restaurantName: {type: String, required: true},
    ownerNIC: {type: String, required: true},
    ownerFullName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: Number, required: true},
    password: {type: String, required: true},
    location: {type: { latitude: Number, longitude: Number }, required:true},
    address: {type: String, required: true},
})

const RestaurantModel = model("Restaurant", restaurantSchema);

export default RestaurantModel;

