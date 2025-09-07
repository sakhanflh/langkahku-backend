import express from "express";
import { tambahMood, getMoods, hapusMood } from "../controllers/moodController.js";

const router = express.Router();

router.post("/", tambahMood);
router.get("/", getMoods);
router.delete("/:id", hapusMood);

export default router;
