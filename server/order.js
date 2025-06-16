import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  customer: {
    name: String,
    email: String
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfo",
    required: true
  },
  amount: { type: Number, required: true },
  productDescription: { type: String },
  status: {
    type: String,
    enum: [
      "pending_payment",
      "pending_delivery",
      "delivered",
      "cancelled",
      "refunded",
      "paid_to_vendor"
    ],
    default: "pending_payment"
  },
  paymentReference: { type: String },
  paymentConfirmed: { type: Boolean, default: false },
  deliveryConfirmedByCustomer: { type: Boolean, default: false },
  vendorPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
