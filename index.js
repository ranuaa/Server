import express from 'express'
import cors from 'cors'
import path from 'path'
import morgan  from 'morgan'
import dotenv from 'dotenv'
import { dbconnection } from './db/dbconfig.js'
import { fileURLToPath } from 'url'
import AuthRoutes from './Routes/Auth.js'
import UserRoutes from './Routes/User.js'
import CareerRoutes from './Routes/CareerHistory.js'
import AbsensiRoutes from './Routes/Absensi.js'
import MasterAppaisalRoute from './Routes/AppraisalMater.js'
import UserAppraisalRoute from './Routes/UserAppraisal.js'

//config
const app = express()
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({extended: true }))
app.use(express.urlencoded({extended: true }))
app.use( express.static(__dirname))

// Connection to DB
const PORT = process.env.PORT
dbconnection()
app.listen(PORT, () => console.log("Serrver is runningon Port " + PORT))
//

//routes
app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/career', CareerRoutes)
app.use('/api/absensi', AbsensiRoutes)
app.use('/api/appraisal', UserAppraisalRoute)
app.use('/api/appraisalmaster', MasterAppaisalRoute)



app.get('/', async(req,res) => {
    res.send("Okeee")
})