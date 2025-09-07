import express from "express";
import { tambahGoal, getGoals, getGoalById, updateGoal, hapusGoal } from "../controllers/goalsController.js";

const router = express.Router();

router.post("/", tambahGoal);
router.get("/", getGoals);
router.get("/:id", getGoalById);
router.put("/:id", updateGoal);
router.delete("/:id", hapusGoal);

export default router;
