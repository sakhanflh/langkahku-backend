import express from "express";
import {
    tambahTransaksi,
    getTransaksi,
    getTransaksiById,
    updateTransaksi,
    hapusTransaksi
} from "../controllers/keuanganController.js";

const router = express.Router();

router.post("/", tambahTransaksi);
router.get("/", getTransaksi);
router.get("/:id", getTransaksiById);
router.put("/:id", updateTransaksi);
router.delete("/:id", hapusTransaksi);

export default router;
