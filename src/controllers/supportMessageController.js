import jwt from "jsonwebtoken";
import supportMessageModel from "../models/supportMessageModel.js";

export const createSupport = async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ message: "Nama dan pesan wajib diisi" });
        }

        const newSupport = new supportMessageModel({ name, message });
        await newSupport.save();

        res.status(201).json({
            message: "Dukungan berhasil dikirim!",
            data: newSupport,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengirim dukungan", error });
    }
};

export const getSupports = async (req, res) => {
    try {
        // Coba baca token dari cookie (jika ada)
        const token = req.cookies?.token;
        let userId = null;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        }

        const messages = await supportMessageModel.find().sort({ pinned: -1, createdAt: -1 });

        // Tambahkan flag likedByCurrentUser untuk setiap pesan
        const enhancedMessages = messages.map((msg) => {
            const isLiked = userId && msg.likedBy.includes(userId);
            return {
                ...msg.toObject(),
                likedByCurrentUser: !!isLiked,
            };
        });

        res.status(200).json(enhancedMessages);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data dukungan", error });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const support = await supportMessageModel.findById(req.params.id);
        if (!support) return res.status(404).json({ message: "Pesan tidak ditemukan" });

        const alreadyLiked = support.likedBy.includes(userId);

        if (alreadyLiked) {
            // 🔹 Jika sudah like → batalkan like
            support.likes = Math.max(0, support.likes - 1); // cegah minus
            support.likedBy = support.likedBy.filter(id => id.toString() !== userId);
        } else {
            // 🔹 Jika belum like → tambahkan
            support.likes += 1;
            support.likedBy.push(userId);
        }

        await support.save();

        // 🔹 Tambahkan flag likedByCurrentUser agar FE tahu status terbaru
        res.json({
            ...support.toObject(),
            likedByCurrentUser: !alreadyLiked,
        });
    } catch (err) {
        res.status(500).json({ message: "Gagal toggle like", error: err.message });
    }
};



// Pin message (admin only misalnya)
export const pinMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await supportMessageModel.updateMany({}, { pinned: false });
        const pinned = await supportMessageModel.findByIdAndUpdate(id, { pinned: true }, { new: true });
        res.status(200).json(pinned);
    } catch (error) {
        res.status(500).json({ message: "Gagal menyematkan pesan", error });
    }
};
