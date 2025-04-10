import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/CRUD.controller.js";
import { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } from "../middlewares/authJws.js";
import { register } from "../controllers/auth.controller.js"

const router = express.Router();


// Admin: tạo user
router.route("/users").post([verifyToken, isAdmin], createUser);

// Admin: Lấy danh sách tất cả users
router.route("/users").get([verifyToken, isAdmin], getAllUsers);

// Admin & Moderator: Lấy user theo ID
router.route("/users/:id").get([verifyToken, isModeratorOrAdmin], getUserById);

// Admin & Moderator: Cập nhật user
router.route("/users/:id").put([verifyToken, isModeratorOrAdmin], updateUser);

// Admin: Xóa user
router.route("/users/:id").delete([verifyToken, isAdmin], deleteUser);

export default router;
