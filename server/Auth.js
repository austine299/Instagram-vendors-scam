import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import connectDB from "./db.js";
import User from "./user.js";
import Order from "./order.js";
import multer from "multer";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Configure storage
const storage = multer.memoryStorage(); // Or use diskStorage to save to disk
const upload = multer({ storage });

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://instagram-vendors-frontend.onrender.com",
      "https://instagram-vendors-vendor.onrender.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ], // ✅ allow your frontend
    credentials: true, // ✅ important if using cookies or authorization headers
  })
);

const SECRET = "secret123";

// ✅ SIGNUP
app.post(
  "/signup",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      fullName,
      instagramHandle,
      instagramLink,
      businessName,
      shopAddress,
      email,
      phoneNumber,
      password,
      bankName,
      bankCode,
      accountNumber,
      accountName,
    } = req.body;
    const existing = await User.findOne({ instagramHandle });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImage = req.files?.profile?.[0]?.buffer;
    const productImage = req.files?.productImage?.[0]?.buffer;

    const profileBase64 = profileImage ? profileImage.toString("base64") : null;
    const productBase64 = productImage ? productImage.toString("base64") : null;

    console.log("Profile Buffer:", profileImage);
    console.log("Product Buffer:", productImage);

    const user = new User({
      fullName,
      instagramHandle,
      phoneNumber,
      instagramLink,
      businessName,
      shopAddress,
      email,
      password: hashedPassword,
      bankName,
      bankCode,
      accountNumber,
      accountName,
      profile: profileBase64,
      productImage: productBase64,
    });
    await user.save();
    res.json({ msg: "User created" });
  }
);

// ✅ LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "Invalid handle" });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  res.json({ token });

  // res.json({ handle: user.instagramHandle, msg: "Login successful" });
});

app.get("/myAccount", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch {
    res.sendStatus(403);
  }
});

app.put(
  "/profile",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
  ]),
  async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
      const decoded = jwt.verify(token, SECRET);
      const updates = { ...req.body };

      // Handle file uploads
      if (req.files?.profile?.[0]) {
        updates.profile = req.files.profile[0].buffer.toString("base64");
      }
      if (req.files?.productImage?.[0]) {
        updates.productImage =
          req.files.productImage[0].buffer.toString("base64");
      }

      // If password is being updated, hash it
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(decoded.id, updates, {
        new: true,
      }).select("-password");
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(403).json({ msg: "Invalid token or update failed" });
    }
  }
);

app.get("/vendors", async (req, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map((user) => ({
      _id: user._id,
      fullName: user.fullName,
      instagramHandle: user.instagramHandle,
      instagramLink: user.instagramLink,
      businessName: user.businessName,
      shopAddress: user.shopAddress,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile?.toString("base64"),
      productImage: user.productImage?.toString("base64"),
    }));
    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch data" });
  }
});

app.post("/api/initiate-checkout", async (req, res) => {
  const { amount, customer, vendorId, productDescription } = req.body;
  const reference = `order_${Date.now()}`;

  console.log("✅ Initiating Korapay Checkout with:", {
    amount,
    customer,
    vendorId,
    productDescription,
    reference,
  });

  try {
    const response = await axios.post(
      "https://api.korapay.com/merchant/api/v1/charges/initialize",

      {
        amount,
        currency: "NGN",
        reference,
        redirect_url:
          "https://instagram-vendors-frontend.onrender.com/#/confirmOrder",
        customer,
        metadata: {
          vendorId,
          productDescription,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    await Order.create({
      orderId: reference,
      customer,
      vendorId,
      amount,
      productDescription,
      status: "pending_payment",
    });
    const checkoutUrl = response.data.data.checkout_url;
    res.json({ checkoutUrl });
  } catch (err) {
    console.error("❌ Korapay error:", err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data || "Failed to initiate payment",
    });
  }
});

app.post("/api/payment-webhook", async (req, res) => {
  const { event, data } = req.body;

  if (event === "charge.success") {
    const reference = data.reference;

    await Order.findOneAndUpdate(
      { orderId: reference },
      { status: "pending_delivery", paymentConfirmed: true }
    );
  }
 
  res.sendStatus(200);
});

app.get("/api/orders", async (req, res) => {
   try {
    const { vendorId } = req.query;
    if (!vendorId) return res.status(400).json({ error: "Vendor ID is required" });

    const orders = await Order.find({ vendorId});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.post("/api/confirm-delivery", async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findOne({ orderId }).populate("vendorId");
  if (!order || order.vendorPaid)
    return res.status(400).json({ error: "Invalid order" });

  const { accountNumber, bankCode, fullName } = order.vendorId;

  await axios.post(
    "https://api-sandbox.korapay.com/checkout",

    {
      reference: `payout_${Date.now()}`,
      amount: order.amount,
      currency: "NGN",
      recipient: {
        type: "bank_account",
        name: fullName,
        account_number: accountNumber,
        bank_code: bankCode,
      },
      narration: `Escrow payout for Order ${order.orderId}`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`,
      },
    }
  );

  order.status = "paid_to_vendor";
  order.vendorPaid = true;
  order.deliveryConfirmedByCustomer = true;
  await order.save();

  res.json({ message: "Payout completed" });
});
export default app;
