import CareerModel from "../Models/Careerhistory.js";
import userModel from "../Models/UserModel.js";

//create new career 
export const CreateCareer = async(req,res) => {
    const {id} = req.params
    const user = await userModel.findById(req.user._id)
    const downline = await userModel.findById(id)
    console.log(user)
    try {
        if(req.user.isAdmin || req.user._id === id || req.user._id === user.upline) {
            const newCarerr = new CareerModel({...req.body, userId:id})
            await newCarerr.save()
            await userModel.findByIdAndUpdate(id, { 
                $push : { careerHistory : newCarerr._id }
             }, {new: true})
             const data = await userModel.findById(id)
             return res.status(200).json(data)
        }else{
            return res.status(403).json("foerbiden")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//delete Career history
export const deleteCareerHisory = async(req,res) => {
    const {id} = req.params
    const data = await CareerModel.findById(id)
    const user = await userModel.findById(req.user._id)
    if(req.user.isAdmin || req.user._id === data.userId || req.user._id === user.upline) {
        try {
            await userModel.findByIdAndUpdate(req.user._id, {
                $pull : { careerHistory : id }
            })
            await CareerModel.findByIdAndDelete(id)
            return res.status(200).json("Success delete")
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }else{
        return res.status(403).json("Forbiden")
    }
}