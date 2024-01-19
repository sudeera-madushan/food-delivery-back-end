/**
 * author : Sudeera Madushan
 * date : 1/18/2024
 * project : food-delivery-back-end
 */
import {Document, Schema, model} from "mongoose";

export interface IUser extends Document{
    fullName:string,
    nic:string,
    email:string,
    username:string,
    mobile:number,
    password:string,
    location:{ latitude: number; longitude: number } | null,
    address:string
}
const userSchema = new Schema<IUser>({
    fullName: {type: String, required: true},
    nic: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    mobile: {type: Number, required: true},
    password: {type: String, required: true},
    location: {type: { latitude: Number, longitude: Number }, required:true},
    address: {type: String, required: true},
})

const UserModel = model("User", userSchema);

export default UserModel;

