import express from 'express'
import { CreateCareer, deleteCareerHisory } from '../Controller/CareerHistory.js' 
import { verify } from '../middlewares/Auth.js'

const router = express.Router()

//create career

router.post('/:id', verify, CreateCareer)

// delete career

router.delete('/:id', verify, deleteCareerHisory)

export default router