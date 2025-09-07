import express from "express";
import { tambahData, getData, hapusData, updateData } from "../controllers/trackerController.js";

const router = express.Router();

router.post("/", tambahData);
router.get("/", getData);
router.put("/:id", updateData)
router.delete("/:id", hapusData);

export default router;
