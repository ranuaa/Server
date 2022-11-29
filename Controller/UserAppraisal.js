import userApprasialModel from "../Models/UserAppraisalsData.js"
import userModel from "../Models/UserModel.js"

export const addUserAppraisal = async(req,res) => {
    const {id} = req.params
    const user = await userModel.findById(id)
    if(req.user.isAdmin || req.user._id === user.upline){
        try {
            const newData = new userApprasialModel({...req.body, userId : id })
            const data = await newData.save()
             await userModel.findByIdAndUpdate(id, {
                $push : {appraisal : data._id}
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }else{
        res.status(404).json("Forbidden")
    }
}


export const deleteUserAppraisal = async(req,res) => {
    const {id} = req.params
    const data = await userApprasialModel.findById(id)
    try {
        await userModel.findByIdAndUpdate(data.userId, {
            $pull : { appraisal : id }
        })
        await userApprasialModel.findByIdAndDelete(id)
        res.status(200).json("Success delete")
    } catch (error) {
        res.status(500).json(error.message)
    }
}