import express from 'express';
import { CreatePatient, GetPatient, UpdatePatient } from '../controller/patient.controller.js';

const PatientRoutes = express.Router()

PatientRoutes.post('/create',CreatePatient)
PatientRoutes.get('/getPatient',GetPatient)
PatientRoutes.patch('/:id',UpdatePatient)


export default PatientRoutes;