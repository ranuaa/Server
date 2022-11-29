import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
export const dbconnection = async() => {
    try {
         mongoose.connect("mongodb+srv://Admin:Gemolong123@cluster0.4wlk5uv.mongodb.net/itc_db_appraisal?retryWrites=true&w=majority")
    } catch (error) {
        console.log(error)
    }
}
