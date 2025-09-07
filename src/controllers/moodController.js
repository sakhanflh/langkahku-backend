import Mood from "../models/moodModel.js";

export const tambahMood = async (req, res) => {
    try {
        const mood = new Mood(req.body);
        await mood.save();
        res.status(201).json({ message: "Mood berhasil dicatat", data: mood });
    } catch (error) {
        res.status(500).json({ message: "Gagal mencatat mood", error: error.message });
    }
};

export const getMoods = async (req, res) => {
    try {
        const moods = await Mood.find();
        res.json(moods);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil mood", error: error.message });
    }
};

export const hapusMood = async (req, res) => {
    try {
        const mood = await Mood.findByIdAndDelete(req.params.id);
        if (!mood) return res.status(404).json({ message: "Mood tidak ditemukan" });
        res.json({ message: "Mood berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus mood", error: error.message });
    }
};
