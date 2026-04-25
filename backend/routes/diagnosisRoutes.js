import express from "express";
import { diagnoseDisease } from "../controllers/diagnosisController.js";

const router = express.Router();

router.post("/diagnose", diagnoseDisease);

export default router;