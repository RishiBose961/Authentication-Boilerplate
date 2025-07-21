import express from "express";
import dotenv from "@dotenvx/dotenvx";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables from .env file

import userRoutes from "./api/routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Check the server status
app.get("/", (req, res) => {
  res.send("Welcome to the Auth Node MongoDB API");
});

// Routes
app.use("/api/users", userRoutes);

export default app;
