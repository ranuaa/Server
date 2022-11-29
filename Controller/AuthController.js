import userModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Sign Up User
export const singUp = async(req,res) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    const {email, upline} = req.body
    try {
        const oldUser = await userModel.findOne({email : email.toLowerCase()})
        if(oldUser) return res.status(400).json("user telah terdaftar")
        if(req.file){
            const photo = req.file.filename
            const photoUrl = `assets/${photo}`
            const newUser = new userModel({...req.body, password : hash, profilePicture: photoUrl, email : email.toLowerCase()})
            await newUser.save()
        }else{
            const newUser = new userModel({...req.body, password : hash, email : email.toLowerCase()})
            await newUser.save()
        }
        const User = await userModel.findOne({email : email.toLowerCase()})
        const {password, ...other} = User._doc
        res.status(200).json({
            message : "User Has been Created",
            data : other
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// Sign In
export const logIn = async(req,res) => {
    try {
        const {email} = req.body
        const user = await userModel.findOne({email : email.toLowerCase()}).populate('downline').populate('upline').populate("careerHistory").populate("dataAbsensi")
        if(user){
            const valid = await bcrypt.compare(req.body.password, user.password)
            if(!valid) return res.status(403).json("password salah")
            if(!user.activeAccount) return res.status(403).json("Your Accont is still pending, contact our Upline")
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                isAdmin : user.isAdmin
            }, process.env.JWT_KEY)
            const {password, ...details} = user._doc
            res.status(200).json({
                message: "Success login",
                data : {...details, token}
            })
        }else{
            res.status(404).json("user not found")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// Get  Approve User 

export const GetApprovalUser = async(req,res) => {
    try {
        const findUser = await userModel.find({upline : req.user._id, activeAccount : false})
        res.status(200).json({
            data: findUser
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//Approve user 
export const ApproveUser = async (req,res) => {
    const {id} = req.params
    const data = await userModel.findById(id)
    try {
        if ( data.upline != req.user._id ) return res.status(403).json("Foriden Access")
        await userModel.findByIdAndUpdate(id, {
            $set : { activeAccount : true }
        })
        await userModel.findByIdAndUpdate(data.upline, {
            $push : { downline : data._id }
        })
        res.status(200).json("User Approved")
    } catch (error) {
        res.status(500).json(error.message)
    }
}