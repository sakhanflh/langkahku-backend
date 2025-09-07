import express from "express";
import serverless from "serverless-http";
import connectDB from "../src/config/db.js";

const app = express();

// Middleware
app.use(express.json());

// Connect ke MongoDB (biar nggak connect berkali-kali di serverless)
let isConnected;
async function connect() {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
}
app.use(async (req, res, next) => {
    await connect();
    next();
});

// Routes contoh
app.get("/", (req, res) => {
    res.json({ message: "API berjalan di Vercel 🚀" });
});

// ✅ ini yang penting: default export harus function
export default serverless(app);
