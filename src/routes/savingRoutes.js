import express from "express";
import { getSavings, createSaving, updateSaving, deleteSaving } from "../controllers/savingController.js";

const router = express.Router();

router.get("/", getSavings);
router.post("/", createSaving);
router.put("/:id", updateSaving);
router.delete("/:id", deleteSaving);

export default router;
