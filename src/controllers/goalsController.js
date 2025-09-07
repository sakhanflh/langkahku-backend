import Goals from "../models/goalsModel.js";

export const tambahGoal = async (req, res) => {
    try {
        const goal = new Goals(req.body);
        await goal.save();
        res.status(201).json({ message: "Goal berhasil ditambahkan", data: goal });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambah goal", error: error.message });
    }
};

export const getGoals = async (req, res) => {
    try {
        const goals = await Goals.find();
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil goals", error: error.message });
    }
};

export const getGoalById = async (req, res) => {
    try {
        const goal = await Goals.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal tidak ditemukan" });
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil goal", error: error.message });
    }
};

export const updateGoal = async (req, res) => {
    try {
        const goal = await Goals.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!goal) return res.status(404).json({ message: "Goal tidak ditemukan" });
        res.json({ message: "Goal berhasil diperbarui", data: goal });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui goal", error: error.message });
    }
};

export const hapusGoal = async (req, res) => {
    try {
        const goal = await Goals.findByIdAndDelete(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal tidak ditemukan" });
        res.json({ message: "Goal berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus goal", error: error.message });
    }
};
