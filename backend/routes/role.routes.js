import express from "express";
import roleController from "../controllers/role.controller.js";
import authJwt from "../middlewares/authJws.js";

const router = express.Router();

// Admin: Lấy danh sách tất cả users
router.get("/users", authJwt.verifyToken, authJwt.isAdmin, roleController.getAllUsers);

// Admin & Moderator: Lấy user theo ID
router.get("/users/:id", authJwt.verifyToken, authJwt.isModerator, roleController.getUserById);

// Admin & Moderator: Cập nhật user
router.put("/users/:id", authJwt.verifyToken, authJwt.isModerator, roleController.updateUser);

// Admin: Xóa user
router.delete("/users/:id", authJwt.verifyToken, authJwt.isAdmin, roleController.deleteUser);

export default router;
