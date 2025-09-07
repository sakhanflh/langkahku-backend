import Notification from "../models/notificationModel.js";

export const tambahNotif = async (req, res) => {
    try {
        const notif = new Notification(req.body);
        await notif.save();
        res.status(201).json({ message: "Notifikasi berhasil ditambahkan", data: notif });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambah notifikasi", error: error.message });
    }
};

export const getNotifikasi = async (req, res) => {
    try {
        const notifikasi = await Notification.find().sort({ dibuat: -1 });
        res.json(notifikasi);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil notifikasi", error: error.message });
    }
};

export const tandaiDibaca = async (req, res) => {
    try {
        const notif = await Notification.findByIdAndUpdate(req.params.id, { dibaca: true }, { new: true });
        if (!notif) return res.status(404).json({ message: "Notifikasi tidak ditemukan" });
        res.json({ message: "Notifikasi ditandai sudah dibaca", data: notif });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui notifikasi", error: error.message });
    }
};
