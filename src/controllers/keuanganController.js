import Keuangan from "../models/keuanganModel.js";
import Loan from "../models/loanModel.js";
import Saving from "../models/savingModel.js";

// Tambah transaksi
export const tambahTransaksi = async (req, res) => {
    const session = await Keuangan.startSession();
    session.startTransaction();
    try {
        const { jenis, kategori, jumlah, relatedId } = req.body;

        const transaksi = new Keuangan(req.body);
        await transaksi.save({ session });

        // jika transaksi terkait savings
        if (jenis === "tabungan" && relatedId) {
            const saving = await Saving.findByIdAndUpdate(
                relatedId,
                { $inc: { current: jumlah } },
                { new: true, session }
            );
            if (!saving) throw new Error("Saving tidak ditemukan");
        }

        //jika transaksi terkait loans
        if (jenis === "pinjaman" && relatedId) {
            const loan = await Loan.findByIdAndUpdate(
                relatedId,
                { $inc: { paid: jumlah } },
                { new: true, session }
            );
            if (!loan) throw new Error("Loan tidak ditemukan");
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: "Transaksi berhasil ditambahkan", data: transaksi });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Gagal menambah transaksi", error: error.message });
    }
};

// Ambil semua transaksi
export const getTransaksi = async (req, res) => {
    try {
        const transaksi = await Keuangan.find();
        res.json(transaksi);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data transaksi", error: error.message });
    }
};

// Ambil transaksi berdasarkan ID
export const getTransaksiById = async (req, res) => {
    try {
        const transaksi = await Keuangan.findById(req.params.id);
        if (!transaksi) return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        res.json(transaksi);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil transaksi", error: error.message });
    }
};

// Update transaksi
export const updateTransaksi = async (req, res) => {
    try {
        const transaksi = await Keuangan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaksi) return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        res.json({ message: "Transaksi berhasil diperbarui", data: transaksi });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui transaksi", error: error.message });
    }
};

// Hapus transaksi
export const hapusTransaksi = async (req, res) => {
    try {
        const transaksi = await Keuangan.findByIdAndDelete(req.params.id);
        if (!transaksi) return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        res.json({ message: "Transaksi berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus transaksi", error: error.message });
    }
};
