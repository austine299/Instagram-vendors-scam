// import dns from "dns";
// dns.setDefaultResultOrder("ipv4first");

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const URL = process.env.MONGO_URL;
  console.log("🔗 MongoDB URI loaded");

  try {
    const conn = await mongoose.connect(URL, { family: 4 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Mongoose connection error:", error);
    process.exit(1); // use 1 for failure
  }
};

export default connectDB;
