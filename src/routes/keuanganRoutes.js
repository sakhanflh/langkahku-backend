import express from "express";
import { editPengeluaranManual, getKeuangan, hapusPengeluaranManual, tambahPengeluaranManual } from "../controllers/keuanganController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getKeuangan); // fetch semua keuangan user
router.post("/pengeluaran", protect, tambahPengeluaranManual); // tambah pengeluaran manual
router.put("/pengeluaran/edit", protect, editPengeluaranManual);
router.delete("/pengeluaran/delete", protect, hapusPengeluaranManual);

export default router;
