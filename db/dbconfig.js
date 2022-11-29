import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
export const dbconnection = async() => {
    try {
         mongoose.connect(process.env.MONGO_DB)
    } catch (error) {
        console.log(error)
    }
}
