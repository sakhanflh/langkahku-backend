import express from "express";
import { tambahNotif, getNotifikasi, tandaiDibaca } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", tambahNotif);
router.get("/", getNotifikasi);
router.put("/:id", tandaiDibaca);

export default router;
