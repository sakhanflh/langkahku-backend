import Tracker from "../models/trackerModel.js";

// CREATE
export const tambahData = async (req, res) => {
    try {
        const { km, order, pendapatan, avgKmPerLiter, servis = 0 } = req.body;

        if (!avgKmPerLiter) {
            return res.status(400).json({ message: "avgKmPerLiter wajib diisi" });
        }


        const kmNum = Number(km);
        const avgNum = Number(avgKmPerLiter);
        const pendapatanNum = Number(pendapatan);
        const servisNum = Number(servis || 0);

        function roundToNearest(num, nearest) {
            return Math.round(num / nearest) * nearest;
        }

        const harga_bensin = 10000;
        const bensin = roundToNearest((kmNum / avgNum) * harga_bensin, 1000);
        const tabungan = roundToNearest(pendapatanNum * 0.1, 1000);

        const pendapatanBersih = roundToNearest(
            pendapatanNum - (bensin + tabungan) - servisNum,
            1000
        );

        const data = new Tracker({
            tanggal: req.body.tanggal || Date.now(),
            km,
            order,
            pendapatan,
            avgKmPerLiter,
            bensin,
            tabungan,
            servis,
            pendapatanBersih,
            user: req.user.id,
        });

        await data.save();
        res.status(201).json({ message: "Data tracker berhasil ditambahkan", data });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambah data tracker", error: error.message });
    }
};

// READ
export const getData = async (req, res) => {
    try {
        const data = await Tracker.find({ user: req.user.id }).sort({ tanggal: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data tracker", error: error.message });
    }
};

// UPDATE
export const updateData = async (req, res) => {
    try {
        const { km, order, pendapatan, avgKmPerLiter, servis = 0 } = req.body;

        if (!avgKmPerLiter) {
            return res.status(400).json({ message: "avgKmPerLiter wajib diisi" });
        }

        // Hitung ulang
        const bensin = Math.round((km / avgKmPerLiter) * 10000);
        const tabungan = Math.round(pendapatan * 0.1);
        const pendapatanBersih = Math.round(pendapatan - (bensin + tabungan) - servis);

        const data = await Tracker.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            {
                tanggal: req.body.tanggal || Date.now(),
                km,
                order,
                pendapatan,
                avgKmPerLiter,
                bensin,
                tabungan,
                servis,
                pendapatanBersih,
            },
            { new: true }
        );

        if (!data) return res.status(404).json({ message: "Data tracker tidak ditemukan" });

        res.json({ message: "Data tracker berhasil diperbarui", data });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui data tracker", error: error.message });
    }
};

// DELETE
export const hapusData = async (req, res) => {
    try {
        const data = await Tracker.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!data) return res.status(404).json({ message: "Data tracker tidak ditemukan" });
        res.json({ message: "Data tracker berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus data tracker", error: error.message });
    }
};
