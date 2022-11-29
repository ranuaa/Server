import express from 'express'
import { verify } from '../middlewares/Auth.js'
import { addNewMaster, editAppraisal, deleteAprraisal, getAllAppraisal, getSingleApraisal } from '../Controller/AppraisalMasterController.js'

const router = express.Router()

//get all
router.get('/', verify ,getAllAppraisal)
//get single
router.get('/:id', verify ,getSingleApraisal)
//create
router.post('/', verify ,addNewMaster)
//edit
router.put('/:id', verify ,editAppraisal)
//delete
router.delete('/:id', verify ,deleteAprraisal)

export default router