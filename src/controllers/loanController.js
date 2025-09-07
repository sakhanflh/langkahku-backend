import Loan from "../models/loanModel.js";

export const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find();
        res.json(loans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createLoan = async (req, res) => {
    try {
        const loan = new Loan(req.body);
        await loan.save();
        res.status(201).json({ message: "Loan berhasil ditambahkan", data: loan });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!loan) return res.status(404).json({ message: "Loan tidak ditemukan" });
        res.json({ message: "Loan berhasil diperbarui", data: loan });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        if (!loan) return res.status(404).json({ message: "Loan tidak ditemukan" });
        res.json({ message: "Loan berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
