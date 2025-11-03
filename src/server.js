import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import keuanganRoutes from "./routes/keuanganRoutes.js";
import trackerRoutes from "./routes/trackerRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import authRouter from "./routes/auth.js";
import loanRoutes from "./routes/loanRoutes.js";
import savingRoutes from "./routes/savingRoutes.js";
import userSettingRoutes from "./routes/userSettingRoutes.js";
import supportMessageRoutes from "./routes/supportMessageRoutes.js";
import donasiRoutes from "./routes/donasiRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();

const app = express();

app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://langkahku-nine.vercel.app", "https://langkahku.sakhanaufal.id"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/keuangan", keuanganRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/savings", savingRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/settings", userSettingRoutes)
app.use("/api/support-message", supportMessageRoutes)
app.use("/api/donasi", donasiRoutes)
app.get("/", (req, res) => {
    res.send("🚀 API Langkahku Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

export default app;