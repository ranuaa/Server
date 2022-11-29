import mongoose from "mongoose";
import moment from "moment";


const todayDate = moment().format("DD-MM-YYYY")

const userApprasialSchema = mongoose.Schema({
    userId : String,
    score : String,
    points : [],
    date: {
        type: String,
        default: todayDate
    }
}, {timestapms : true}  )

const userApprasialModel = mongoose.model("UserAppraisal", userApprasialSchema)
export default userApprasialModel