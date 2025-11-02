import express from "express";
import { getUserSetting, updateUserSetting } from "../controllers/userSettingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getUserSetting);
router.put("/", protect, updateUserSetting);
router.get("/me", protect, getUserSetting);

export default router;
