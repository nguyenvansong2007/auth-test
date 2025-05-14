import express from "express";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignUp.js";
import { register, login, refreshToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post([checkDuplicateUsernameOrEmail, checkRolesExisted], register);
router.route("/login").post(login);
router.route("/refreshToken").post(refreshToken);

export default router;