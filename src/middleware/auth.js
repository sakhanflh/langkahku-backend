import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // format: Bearer <token>
    if (!token) return res.status(401).json({ message: "Akses ditolak, tidak ada token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // simpan data user
        next();
    } catch (error) {
        res.status(401).json({ message: "Token tidak valid" });
    }
};
