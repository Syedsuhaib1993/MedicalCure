import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import ConnectDB from './src/config/db.js';
import PatientRoutes from './src/routes/patient.routes.js';
import StaffRoutes from './src/routes/staff.routes.js';
import ImageRouter from './src/routes/image.routes.js';

const app =express()
const port = process.env.PORT

const allowedOrigins = [
  "http://localhost:5173",
  "https://medical-cure.vercel.app"
];

const corsOptions = {
  origin: allowedOrigins, // your frontend domain!
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(express.json(corsOptions))
app.use(cors())

dotenv.config()
ConnectDB()

// PATIENTROUTES
app.use('/api',PatientRoutes)

// STAFFROUTES
app.use('/api',StaffRoutes)

// IMAGErOUTES
app.use('/api',ImageRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})