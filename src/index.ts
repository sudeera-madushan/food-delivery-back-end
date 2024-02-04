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
import RestaurantRoutes from "./routes/restaurant.routes"
import OrderRoutes from "./routes/order.routes"
import dotenv from "dotenv";
import { Server , Socket } from 'socket.io';
import { createServer } from 'http';
import {userSignIn} from "./controllers/user.controller";

dotenv.config()
const {MONGO_URL } = process.env;

export const app:Express = express();
const server = createServer(app);
export const io =  new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

export const connectedUsers: { [userId: string]: string } = {};
export let globalSocket: Socket | null = null;

export const emitWebSocket = (event : string ,userId:string) => {
    if (globalSocket) {
        const userSocketId = connectedUsers[userId];
        if (userSocketId) {
            io.to(userSocketId).emit(event, userId);
        } else {
            console.log(`User ${userId} is not connected`);
        }
    }
}

 io.on('connection', (socket) => {
    console.log('a user connected');
    globalSocket = socket;
     socket.on('userSignIn', (userId: string) => {
         console.log('User registered:', userId);
         connectedUsers[userId] = socket.id;
     });

     socket.on('disconnect', () => {
         console.log('User disconnected');
         const userId = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket.id);
         if (userId) {
             delete connectedUsers[userId];
         }
     });

});



server.listen(8080, ():void => {
    console.log("Server started from port 8080 !")
});
mongoose.connect(MONGO_URL as string);

const db:mongoose.Connection = mongoose.connection;
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors ({ origin: "*" }))


db.on('error',(error):void => {
    console.log("DB Connection error ! ", error)
})

db.on('open',():void => {
    console.log("DB Connection Successfully ! ")
})

app.use('/api/v1/menu', MenuRoutes)

app.use("/api/v1/user", UserRoutes)
app.use("/api/v1/order", OrderRoutes)

app.use("/api/v1/restaurant", RestaurantRoutes)

// app.post("/api/v1/*" , (req, res) => {
//     console.log(req)
// })


