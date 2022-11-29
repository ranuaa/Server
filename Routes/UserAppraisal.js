import { addUserAppraisal, deleteUserAppraisal } from "../Controller/UserAppraisal.js";
import express from 'express'
import { verify } from "../middlewares/Auth.js";

const router = express.Router()

//create
router.post('/:id', verify, addUserAppraisal)

//delete
router.delete('/:id', verify, deleteUserAppraisal)

router.get('/', async(req,res) => {
    res.send('okeee')
})

export default router;

