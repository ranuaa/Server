import mongoose from "mongoose";


const CareerSchema = mongoose.Schema({
    dateStart : {
        type: String,
    },
    dateEnd : {
        type: String,
    },
    career: {
        type: String,
    },
    userId : {
        type: String
    }
}, { timestamps: true })

const CareerModel = mongoose.model("Career", CareerSchema)
export default CareerModel