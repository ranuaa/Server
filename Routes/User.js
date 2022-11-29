import express from 'express'
import { deleteUser, getAllUser, getSingleUser, UpdateUserInfo } from '../Controller/User.js'
import { verify } from '../middlewares/Auth.js'
import UploadMidleware from '../middlewares/Upload.js'

const router = express.Router()
// get all user
router.get('/', getAllUser)
// get single User
router.get('/:id' , getSingleUser)
//delete User
router.delete('/:id', verify, deleteUser)
// edit user
router.put('/:id', UploadMidleware.single('profilePicture'), verify, UpdateUserInfo)
export default router;


