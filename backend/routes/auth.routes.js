import express from "express";
import authJws from "../middlewares/authJws.js";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;