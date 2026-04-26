
import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Existing Routes
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// ✅ NEW Routes (ADD THESE)
import diagnosisRoutes from "./routes/diagnosisRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// DB + Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// https://health-care-system-j57w.vercel.app/



// Existing APIs
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// ✅ NEW APIs (ADD THESE)
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/image", imageRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Server Start
app.listen(port, () => {
  console.log(`🚀 Server started on PORT: ${port}`);
});