import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { register } from "../controllers/auth.controller.js";
import { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } from "../middlewares/authJws.js";

const router = express.Router();


// Admin: tạo user
router.route("/create-user").post([verifyToken, isAdmin], register);

// Admin: Lấy danh sách tất cả users
router.route("/").get([verifyToken, isAdmin], getAllUsers);

// Admin & Moderator: Lấy user theo ID
router.route("/:id").get([verifyToken, isModeratorOrAdmin], getUserById);

// Admin & Moderator: Cập nhật user
router.route("/:id").put([verifyToken, isModeratorOrAdmin], updateUser);

// Admin: Xóa user
router.route("/:id").delete([verifyToken, isAdmin], deleteUser);

export default router;
