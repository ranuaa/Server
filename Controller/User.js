import userModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'

// get all user 
export const getAllUser = async(req,res) => {
    try {
        const data = await userModel.find({activeAccount : true}).populate('downline').populate('upline').populate("careerHistory").populate("dataAbsensi").populate("appraisal").populate('downline.appraisal').populate('downline.careerHistory').populate('downline.upline')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//get single user 
export const getSingleUser = async(req,res) => {
    const {id} = req.params
    try {
        const data = await userModel.findById(id).populate('downline').populate('downline.appraisal').populate('downline.careerHistory').populate('downline.upline').populate('upline').populate("careerHistory").populate("dataAbsensi").populate("appraisal")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//delete user 
export const deleteUser = async(req,res) => {
    const {id} = req.params
    if(!req.user.isAdmin) return res.status(403).json("Forbiden Access")
    try {
        const data = await userModel.findById(id)
        await userModel.findByIdAndUpdate(data.upline, {
            $pull : { downline : data._id }
        })
        await userModel.findByIdAndDelete(id)
        res.status(200).json("Success delete user")
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const UpdateUserInfo = async(req,res) => {
    const {id} = req.params
    let {email, profilePicture} = req.body
    if(id === req.user.id || req.user.isAdmin){
     try {
         if(req.body.password){
             const salt = await bcrypt.genSalt(10)
             req.body.password = await bcrypt.hash(req.body.password, salt)
            }
         if(req.body.upline){
            const data = await userModel.findById(id)
            await userModel.findByIdAndUpdate(data.upline, {
                $pull : { downline: data._id }
            })
            await userModel.findByIdAndUpdate(id, {
                $set : {upline : req.body.upline}
            })
         }
         if(req.file){
            const photo = req.file.filename
            const photoUrl = `assets/${photo}`
            await userModel.findByIdAndUpdate(id, {
                $set: {profilePicture : photoUrl}
            })
        }
        const {careerHistory, ...other} = req.body
        const user = await userModel.findByIdAndUpdate(id, other, {new: true})
        res.status(200).json(user)
     } catch (error) {
        res.status(500).json(error.message)
     }
    }else{
        res.status(403).json("Forbiden access")
    }
}