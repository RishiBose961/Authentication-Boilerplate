import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createUserSchema } from "../validators/user.validator.js";

const router = express.Router();

router.post("/signup", validate(createUserSchema), registerUser);

router.post("/login", loginUser);

router.get("/me", authenticateUser, getUserProfile);

export default router;
