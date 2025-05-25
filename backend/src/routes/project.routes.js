import express from 'express';
import {
  createProject,
  findAllProject,
  findOneProject,
  updateProject,
  deleteProject,
  deleteAllProject,

  addMember,
  updateMember,
  removeMember,
  getProjectMembers,
 
} from '../controllers/project.controller.js';
import { isAdmin, verifyToken, } from '../middlewares/authJws.js';


const router = express.Router();

// proejct
router.route('/').get(verifyToken, findAllProject); // ok
router.route('/create').post(verifyToken, createProject) // ok
router.route("/:id").get(verifyToken, findOneProject).put(updateProject); //ok
router.route("/:id").delete(verifyToken, deleteProject); // ok
router.route("/").delete(verifyToken, deleteAllProject); // ok


// project member
router.route("/:id/members").post(verifyToken, addMember); // thêm
router.route("/:id/members").put(verifyToken, updateMember); // sửa
router.route("/:id/members").delete(verifyToken, removeMember); // xóa
router.route("/:id/members").get(verifyToken, getProjectMembers); // lấy danh sách thành viên một project




export default router;