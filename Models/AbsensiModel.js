import mongoose from "mongoose";
import moment from "moment";

const todayDate = moment().format("DD-MM-YYYY")
const timeToday = moment().format("h:mm:ss")

const absensiSchema = mongoose.Schema({
    date : {
        type: String,
        default : todayDate
    },
    time: {
        type: String,
        default: timeToday
    },
    userId : {
        type: String
    }
}, { timestamps: true })

const absensiModel = mongoose.model("Absensi", absensiSchema)
export default absensiModel