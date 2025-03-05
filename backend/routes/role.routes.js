import express from "express";
import roleController from "../controllers/role.controller.js";
import authJwt from "../middlewares/authJws.js";

const router = express.Router();

// Admin: Lấy danh sách tất cả users
router.route("/users").get(authJwt.verifyToken, authJwt.isAdmin, roleController.getAllUsers);

// Admin & Moderator: Lấy user theo ID
router.route("/users/:id").get(authJwt.verifyToken, authJwt.isModerator, roleController.getUserById);

// Admin & Moderator: Cập nhật user
router.route("/users/:id").put(authJwt.verifyToken, authJwt.isModerator, roleController.updateUser);

// Admin: Xóa user
router.route("/users/:id").delete(authJwt.verifyToken, authJwt.isAdmin, roleController.deleteUser);

export default router;
