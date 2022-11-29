import moment from "moment";
import absensiModel from "../Models/AbsensiModel.js";
import userModel from "../Models/UserModel.js";


//create absensi
export const createAbsensi = async(req,res) => {
    const todayDate = moment(new Date()).format("DD-MM-YYYY")
console.log(todayDate)
    const dataToday = await absensiModel.findOne({userId: req.user._id, date : todayDate})
    if(dataToday) return res.status(403).json("Anda sudah absen")
    try {
        const newAbsensi = new absensiModel({...req.body, userId : req.user._id})
            const data = await newAbsensi.save()
            await userModel.findByIdAndUpdate(req.user._id, { 
                $push : { dataAbsensi : data._id }
             }, {new: true})
            res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//get absensi 
export const getAllAbsensi = async(req,res) => {
    try {
        const data = await absensiModel.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//get absensi 
export const getUserAbsensi = async(req,res) => {
    const {id} = req.params
    try {
        const data = await absensiModel.find({userId : id})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//delete absensi
export const deleteAbsensi = async(req,res) => {
    const {id} = req.params
    try {
        const data = await absensiModel.findByIdAndDelete(id)
        res.status(200).json("Success delete data")
    } catch (error) {
        res.status(500).json(error.message)
    }
}