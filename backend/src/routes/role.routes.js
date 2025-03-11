// import express from "express";
// import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/role.controller.js";
// import { verifyToken, isAdmin, isModerator } from "../middlewares/authJws.js";

// const router = express.Router();

// // Admin: Lấy danh sách tất cả users
// router.route("/users").get([verifyToken, isAdmin], getAllUsers);

// // Admin & Moderator: Lấy user theo ID
// router.route("/users/:id").get([verifyToken, isModerator], getUserById);

// // Admin & Moderator: Cập nhật user
// router.route("/users/:id").put([verifyToken, isModerator], updateUser);

// // Admin: Xóa user
// router.route("/users/:id").delete([verifyToken, isAdmin], deleteUser);

// export default router;
