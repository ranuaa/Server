import express from 'express'
import { logIn, singUp, GetApprovalUser,ApproveUser } from '../Controller/AuthController.js'
import { verify } from '../middlewares/Auth.js'
import UploadMidleware from '../middlewares/Upload.js'

const router = express.Router()

// Register User
router.post('/register', UploadMidleware.single('profilePicture'), singUp)

//Sign Up
router.post('/login', UploadMidleware.single("profilePicture"),logIn)

//get aproval user
router.get('/approval', verify, GetApprovalUser)

// aprove user
router.post('/approval/:id', verify, ApproveUser)

export default router