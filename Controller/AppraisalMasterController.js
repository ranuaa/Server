import appraisalMasterModel from "../Models/AppraisalsMaster.js";

//create new Appraisal 
export const addNewMaster = async(req,res) => {
    try {
        const newData = new appraisalMasterModel(req.body)
        const data = await newData.save()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//get all appraisal data 
export const getAllAppraisal = async(req,res) => {
    try {
        const data = await appraisalMasterModel.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//get single appraisal 
export const getSingleApraisal = async(req,res) => {
    const {id} = req.params
    try {
        const data = await appraisalMasterModel.findById(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//edit appraisal 
export const editAppraisal = async(req,res) => {
    const {id} = req.params
    try {
        const data = await appraisalMasterModel.findByIdAndUpdate(id, req.body, {new : true})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//delete appraisal
export const deleteAprraisal = async(req,res) => {
    const {id} = req.params
    try {
        await appraisalMasterModel.findByIdAndDelete(id)
        res.status(200).json("Success delete")
    } catch (error) {
        res.status(500).json(error.message)
    }
}