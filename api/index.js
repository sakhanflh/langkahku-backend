import express from "express";
import serverless from "serverless-http";
import connectDB from "../src/config/db.js";

const app = express();

// Middleware untuk connect DB sekali saja
let isDBConnected = false;
app.use(async (req, res, next) => {
    if (!isDBConnected) {
        await connectDB();
        isDBConnected = true;
    }
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "🚀 API berjalan di Vercel!" });
});

export default serverless(app);
