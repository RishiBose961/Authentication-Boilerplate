import express from "express";
import prisma from "../config/prisma.js"; // Adjust the path as necessary
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// Import all routes
import userRoutes from "./api/routes/user.route.js"; // Adjust the path as necessary

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Test DB connection (optional route)
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("An error occurred");
  }
});

// Routes
app.use("/api/users", userRoutes);

export default app;
