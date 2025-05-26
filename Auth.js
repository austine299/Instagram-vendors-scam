import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import connectDB from "./db.js";
import User from "./user.js";
import multer from "multer";
import jwt from "jsonwebtoken";

// Configure storage
const storage = multer.memoryStorage(); // Or use diskStorage to save to disk
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://instagram-vendors-frontend.onrender.com",
    credentials: true,
  })
);

connectDB();

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
  const user = await User.findOne({ email});

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
        updates.productImage = req.files.productImage[0].buffer.toString("base64");
      }

      // If password is being updated, hash it
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(decoded.id, updates, { new: true }).select("-password");
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
      businessName:user.businessName,
      shopAddress: user.shopAddress,
      email:user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile?.toString("base64"),
      productImage: user.productImage?.toString("base64"),
    }));
    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch data" });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

export default app;
