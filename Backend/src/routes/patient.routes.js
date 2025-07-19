import express from 'express';
import { CreatePatient } from '../controller/patient.controller.js';

const PatientRoutes = express.Router()

PatientRoutes.post('/create',CreatePatient)


export default PatientRoutes;