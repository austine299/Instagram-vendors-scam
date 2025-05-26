// const mongoose = required("mongoose");
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  instagramHandle: { type: String, required: false },
  instagramLink: { type: String, required: false },
  businessName: { type: String, required: false },
  shopAddress: { type: String, required: false },
  email: { type: String,unique: true, required: true },
  productImage: {type: String, required: false},
  profile: {type: String, required: false},
  phoneNumber: {type: String, required: false},
  password: {type: String, required: true}, 
});     

export default mongoose.model("UserInfo", UserSchema);