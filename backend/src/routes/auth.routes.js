import express from "express";
import { verifyToken } from "../middlewares/authJws.js";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
} from "../middlewares/verifySignUp.js";
import { register, login, refreshToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post([checkDuplicateUsernameOrEmail, checkRolesExisted], register);
router.route("/login").post(verifyToken, login);
router.route("/refreshToken").post(refreshToken);

export default router;