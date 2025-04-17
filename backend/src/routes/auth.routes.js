import express from "express";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignUp.js";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();
// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
//   next();
// });
router.route("/register").post([checkDuplicateUsernameOrEmail, checkRolesExisted], register);
router.route("/login").post(login);
// router.route("/refreshToken").post(refreshToken);

export default router;