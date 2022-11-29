import mongoose from "mongoose";
import moment from "moment";

const todayDate = moment().format("DD/MM/YYYY")

const userSchema = mongoose.Schema(
    {
        fullName : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique: true
        },
        phoneNumber : {
            type : String,
            default : "-"
        },
        address : {
            type : String,
            default : "-"
        },
        joinDate : {
            type :String,
            default: "-"
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        profilePicture : {
            type: String
        },
        dataAbsensi : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : "Absensi"
        }],
        appraisal : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "UserAppraisal"
        }],
        careerHistory : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : "Career"
        }],
        upline: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        downline: [{
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        }],
        activeAccount:{
            type: Boolean,
            default: false
        },
        createdAt : {
            type: Date,
            immutable : true,
            default: () => Date.now()
        },
        updatedAt : {
            type: Date,
            default: () => Date.now()
        }
    },
    { timestamps: true }
)

const userModel = mongoose.model("User", userSchema);
export default userModel