import prisma from "../../../config/prisma.js";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { hashPassword } from "../../utils/password.utils.js";

export const registerUserService = async ({ email, password }) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = await hashPassword(password, salt);

  // Create new user
  const savedUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      salt,
    },
  });

  return savedUser;
};

export const loginUserService = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { message: "User no exists with this email." };
  }

  const hashedPassword = await hashPassword(password, user.salt);
  if (hashedPassword === user.password) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    return {
      _id: user.id,
      email: user.email,
      token,
      message: "User logged in successfully",
    };
  }
};

export const getUserProfileService = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, createdAt: true, updatedAt: true },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return user;
};
