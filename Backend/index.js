import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import ConnectDB from './src/config/db.js';
import PatientRoutes from './src/routes/patient.routes.js';
import StaffRoutes from './src/routes/staff.routes.js';

const app =express()
dotenv.config()
const port = process.env.PORT
app.use(express.json())
app.use(cors())
ConnectDB()

// PATIENTROUTES
app.use('/api',PatientRoutes)

// STAFFROUTES
app.use('/api',StaffRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})