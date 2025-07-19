import express from 'express';
import { CreatePatient, GetPatient } from '../controller/patient.controller.js';

const PatientRoutes = express.Router()

PatientRoutes.post('/create',CreatePatient)
PatientRoutes.get('/getPatient',GetPatient)


export default PatientRoutes;