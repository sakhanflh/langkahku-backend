// middleware/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Ambil dari cookie

    if (!token) {
        return res.status(401).json({ success: false, message: "Tidak ada token, akses ditolak" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token tidak valid" });
    }
};
