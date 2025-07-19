import express from 'express';
import { storage } from '../config/cloudinary.js';
import multer from 'multer';
import {image}  from '../controller/image.controller.js';


const ImageRouter = express.Router()


const upload = multer({storage:storage})


ImageRouter.post('/image',upload.single('image'),image)


export default ImageRouter;