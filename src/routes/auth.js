import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouter = express.Router();

// REGISTER
authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // cek user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email sudah terdaftar" });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // buat user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Registrasi berhasil" });
    } catch (error) {
        res.status(500).json({ message: "Error registrasi", error: error.message });
    }
});

// LOGIN
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // cek user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

        // cek password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Password salah" });

        // buat token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Login berhasil", token });
    } catch (error) {
        res.status(500).json({ message: "Error login", error: error.message });
    }
});

export default authRouter;
