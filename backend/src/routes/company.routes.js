import express from 'express';
import {
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getAllCompanies
} from '../controllers/company.controller.js';

import { verifyModerator, verifyToken, isAdmin } from '../middlewares/authJws.js';

const router = express.Router();

// Tạo công ty mới - chỉ moderator
router.post('/create', [verifyToken, isAdmin], createCompany);



// Lấy danh sách tất cả công ty (Admin)
router.get('/', [verifyToken, isAdmin], getAllCompanies);

// Lấy chi tiết một công ty theo ID
router.get('/:id', [verifyToken, isAdmin], getCompanyById);

// Cập nhật thông tin công ty
router.put('/:id', [verifyToken, isAdmin], updateCompany);

// Xóa công ty
router.delete('/:id', [verifyToken, isAdmin], deleteCompany);

export default router;