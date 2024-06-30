/**
 * author : Sudeera Madushan
 * date : 2/4/2024
 * project : food-delivery-back-end
 */
import {connectedUsers, globalSocket, io} from "../index";





export const emitWebSocket = (event: string ,userId: string, message: string) => {
    if (globalSocket) {
        const userSocketId = connectedUsers[userId];
        if (userSocketId) {
            io.to(userSocketId).emit(event, message);
        } else {
            console.log(`User ${userId} is not connected`);
        }
    }
}
