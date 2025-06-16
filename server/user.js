// const mongoose = required("mongoose");
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  instagramHandle: { type: String },
  instagramLink: { type: String },
  businessName: { type: String },
  shopAddress: { type: String },
  email: { type: String, unique: true, required: true },
  productImage: { type: String },
  profile: { type: String },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  bankName: { type: String },
  bankCode: { type: String },
  accountNumber: { type: String },
  accountName: { type: String } 
});     

export default mongoose.model("UserInfo", UserSchema);