import express from "express";
import serverless from "serverless-http";
import connectDB from "../src/config/db.js";

const app = express();

// Connect sekali saat serverless function diinisialisasi
await connectDB();

app.get("/", (req, res) => {
    res.send("🚀 API berjalan di Vercel!");
});

export default serverless(app);
