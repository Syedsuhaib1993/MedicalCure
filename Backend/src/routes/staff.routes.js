import express from 'express';
import { createStaff, deleteStaff, getStaff, getStaffById, loginStaff, updateStaff } from '../controller/staff.controller.js';

const StaffRoutes = express.Router()


StaffRoutes.post('/staff',createStaff)
StaffRoutes.get('/get',getStaff)
StaffRoutes.get('/:id',getStaffById)
StaffRoutes.put('/:id',updateStaff)
StaffRoutes.delete('/:id',deleteStaff)
StaffRoutes.post('/login',loginStaff)


export default StaffRoutes;
