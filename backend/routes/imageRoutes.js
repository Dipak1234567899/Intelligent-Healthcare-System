import express from "express";
import multer from "multer";
import { detectFromImage } from "../controllers/imageController.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/upload", upload.single("image"), detectFromImage);

export default router;