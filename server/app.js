import express from "express";
import dotenv from "dotenv";
dotenv.config(); // ✅ MUST come before anything else that uses env vars

import connectDB from "./db.js";
import authRoutes from "./Auth.js";

connectDB();

const app = express();
app.use(express.json());
app.use(authRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
