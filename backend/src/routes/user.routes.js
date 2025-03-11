import express from "express";
import {
  verifyToken,
  isAdmin,
  isModerator,
} from "../middlewares/authJws.js";

import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/test/all").get(allAccess);
router.route("/test/user").get(verifyToken, userBoard); // User
router.route("/test/admin").get([verifyToken, isAdmin], adminBoard); // Admin
router.route("/test/moderator").get([verifyToken, isModerator], moderatorBoard); // Moderator

export default router;