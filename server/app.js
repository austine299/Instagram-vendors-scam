import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load env variables early

import connectDB from "./db.js";
import authRoutes from "./Auth.js";

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

