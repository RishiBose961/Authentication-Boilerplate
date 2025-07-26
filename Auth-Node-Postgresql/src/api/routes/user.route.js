import express from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.middleware.js";
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/me", authenticateUser, getUserProfile);

export default router;
