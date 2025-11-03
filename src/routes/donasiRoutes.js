import express from "express";
import { handleSaweriaWebhook, getTopDonatur, getAllDonasi } from "../controllers/donasiController.js";

const router = express.Router();

// Webhook Saweria akan mengirim data ke sini
router.post("/webhook/saweria", handleSaweriaWebhook);

router.get("/", getAllDonasi);
// Frontend akan mengambil leaderboard dari sini
router.get("/top", getTopDonatur);

export default router;
