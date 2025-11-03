import express from "express";
import { createSupport, getSupports, toggleLike } from "../controllers/supportMessageController.js";

const router = express.Router();

router.post("/", createSupport);

router.get("/", getSupports);

router.patch("/:id/like", toggleLike);

export default router;
