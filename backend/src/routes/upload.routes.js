import express from 'express';
import checkUploadFile from '../middlewares/upload.js';
import {uploadFile} from "../controllers/upload.controller.js";
import {verifyToken} from '../middlewares/authJws.js';
const router = express.Router();

router.route('/').post(checkUploadFile.single('file'), uploadFile);


export default router;