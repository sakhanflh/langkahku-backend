import express from "express";
import { login, register } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Check session
router.get("/check", verifyToken, (req, res) => {
    res.json({ success: true, user: req.user });
});

// Logout (hapus cookie)
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.json({ success: true, message: "Logout berhasil" });
});

export default router;
