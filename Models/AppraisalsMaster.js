import mongoose from "mongoose";
import moment from "moment";


const todayDate = moment().format("DD/MM/YYYY")

const appraisalMasterSchema = mongoose.Schema({
  point_1: String,
  value_1 : Number,
  point_2: String,
  value_2 : Number,
  point_3: String,
  value_3 : Number,
  point_4: String,
  value_4 : Number,
  point_5: String,
  value_5 : Number
  
}, {timestapms : true}  )

const appraisalMasterModel = mongoose.model("ApprisalMaster", appraisalMasterSchema)
export default appraisalMasterModel
