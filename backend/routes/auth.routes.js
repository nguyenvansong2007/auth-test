import express from "express";
import authJws from "../middlewares/authJws.js";
import { register, login, } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", authJws, login);

export default router;