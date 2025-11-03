import express from "express";
import { handleSaweriaWebhook, getTopDonatur } from "../controllers/donasiController.js";

const router = express.Router();

// Webhook Saweria akan mengirim data ke sini
router.post("/webhook/saweria", handleSaweriaWebhook);

// Frontend akan mengambil leaderboard dari sini
router.get("/donasi/top", getTopDonatur);

export default router;
