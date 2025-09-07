import Saving from "../models/savingModel.js";

export const getSavings = async (req, res) => {
    try {
        const savings = await Saving.find();
        res.json(savings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createSaving = async (req, res) => {
    try {
        const saving = new Saving(req.body);
        await saving.save();
        res.status(201).json({ message: "Saving berhasil ditambahkan", data: saving });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateSaving = async (req, res) => {
    try {
        const saving = await Saving.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!saving) return res.status(404).json({ message: "Saving tidak ditemukan" });
        res.json({ message: "Saving berhasil diperbarui", data: saving });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteSaving = async (req, res) => {
    try {
        const saving = await Saving.findByIdAndDelete(req.params.id);
        if (!saving) return res.status(404).json({ message: "Saving tidak ditemukan" });
        res.json({ message: "Saving berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
