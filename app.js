import express from "express";
import dotenv from "dotenv";
dotenv.config(); // ✅ MUST come before anything else that uses env vars

import connectDB from "./db.js";
import authRoutes from "./Auth.js";

connectDB();

const app = express();
app.use(express.json());
app.use(authRoutes);

app.listen(5000, () => {
  console.log(`✅ Server running on port 5000`);
});
