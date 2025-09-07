import express from "express";
import { tambahData, getData, hapusData, updateData } from "../controllers/trackerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, tambahData);
router.get("/", protect, getData);
router.put("/:id", protect, updateData)
router.delete("/:id", protect, hapusData);

export default router;
