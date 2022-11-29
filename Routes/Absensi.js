import { createAbsensi, getAllAbsensi, getUserAbsensi, deleteAbsensi } from "../Controller/AbsensiController.js";
import express from 'express'
import { verify } from "../middlewares/Auth.js";

const router = express.Router()

//create new absensi
router.post('/', verify ,createAbsensi)
//get all
router.get('/', verify, getAllAbsensi)
//get single
router.get('/:id', verify, getUserAbsensi)
//delete
router.delete('/:id', verify, deleteAbsensi)

export default router
