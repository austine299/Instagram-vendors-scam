import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes  from "./Auth.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
dotenv.config();
  
connectDB();



app.listen(5000, () => {
  console.log(`server running on port 5000`);
});
