/**
 * author : Sudeera Madushan
 * date : 1/12/2024
 * project : food-delivery-back-end
 */
import express, {Express} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import process from "process";
import cors from "cors";
import MenuRoutes from "./routes/menu.routes"
import UserRoutes from "./routes/user.routes"
import dotenv from "dotenv"

dotenv.config()
const {MONGO_URL } = process.env;

const app:Express = express();

mongoose.connect(MONGO_URL as string);

const db:mongoose.Connection = mongoose.connection;
app.use(bodyParser.json());

app.use(cors ({ origin: "*" }))

app.listen(8080, ():void => {
    console.log("Server started from port 8080 !")
});

db.on('error',(error):void => {
    console.log("DB Connection error ! ", error)
})

db.on('open',():void => {
    console.log("DB Connection Successfully ! ")
})

app.use('/api/v1/menu', MenuRoutes)

app.get("/api/v1/user", UserRoutes)
