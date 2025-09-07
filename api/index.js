import express from "express";
import serverless from "serverless-http";
import connectDB from "../src/config/db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 API berjalan di Vercel!");
});

// Hubungkan ke DB hanya sekali
let connected = false;
app.use(async (req, res, next) => {
    if (!connected) {
        await connectDB();
        connected = true;
    }
    next();
});

export default serverless(app);
