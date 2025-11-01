import Keuangan from "../models/keuanganModel.js";

export const getKeuangan = async (req, res) => {
    try {
        const data = await Keuangan.find({ user: req.user.id }).sort({ tanggal: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data keuangan", error: error.message });
    }
};

export const tambahPengeluaranManual = async (req, res) => {
    try {
        const { keuanganId, kategori, nominal, catatan } = req.body;

        const keuangan = await Keuangan.findOne({ _id: keuanganId, user: req.user.id });
        if (!keuangan) return res.status(404).json({ message: "Data keuangan tidak ditemukan" });

        keuangan.pengeluaranManual.push({ kategori, nominal, catatan });

        const totalPengeluaranManual = keuangan.pengeluaranManual.reduce((acc, item) => acc + item.nominal, 0);
        keuangan.pendapatanBersih = keuangan.pendapatanBersih - nominal;

        await keuangan.save();

        res.json({ message: "Pengeluaran manual berhasil ditambahkan", keuangan });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan pengeluaran manual", error: error.message });
    }
};


export const editPengeluaranManual = async (req, res) => {
    try {
        const { keuanganId, pengeluaranId, kategori, nominal, catatan } = req.body;

        const keuangan = await Keuangan.findOne({ _id: keuanganId, user: req.user.id });
        if (!keuangan) return res.status(404).json({ message: "Data keuangan tidak ditemukan" });

        const pengeluaran = keuangan.pengeluaranManual.id(pengeluaranId);
        if (!pengeluaran) return res.status(404).json({ message: "Pengeluaran manual tidak ditemukan" });

        // Hitung selisih nominal
        const selisih = nominal - pengeluaran.nominal;

        // Update field
        pengeluaran.kategori = kategori || pengeluaran.kategori;
        pengeluaran.nominal = nominal;
        pengeluaran.catatan = catatan || pengeluaran.catatan;

        // Update pendapatan bersih
        keuangan.pendapatanBersih -= selisih; // jika nominal naik, bersih berkurang; jika turun, bersih naik

        await keuangan.save();

        res.json({ message: "Pengeluaran manual berhasil diperbarui", keuangan });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengedit pengeluaran manual", error: error.message });
    }
};

// Hapus pengeluaran manual
export const hapusPengeluaranManual = async (req, res) => {
    try {
        const { keuanganId, pengeluaranId } = req.body;

        const keuangan = await Keuangan.findOne({ _id: keuanganId, user: req.user.id });
        if (!keuangan) return res.status(404).json({ message: "Data keuangan tidak ditemukan" });

        const pengeluaran = keuangan.pengeluaranManual.id(pengeluaranId);
        if (!pengeluaran) return res.status(404).json({ message: "Pengeluaran manual tidak ditemukan" });

        // Tambahkan nominal kembali ke pendapatanBersih
        keuangan.pendapatanBersih += pengeluaran.nominal;
        keuangan.pengeluaranManual.pull(pengeluaranId);
        
        await keuangan.save();

        res.json({ message: "Pengeluaran manual berhasil dihapus", keuangan });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus pengeluaran manual", error: error.message });
    }
};