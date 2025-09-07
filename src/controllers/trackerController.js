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

        const bensin = roundToNearest((kmNum / avgNum) * 10000, 1000);
        const tabungan = roundToNearest(pendapatanNum * 0.1, 1000);

        const pendapatanBersih = roundToNearest(
            pendapatanNum - (bensin + tabungan) - servisNum,
            1000
        );

        // // Hitung bensin
        // const bensin = (km / avgKmPerLiter) * 10000;

        // // Hitung tabungan (10% dari pendapatan)
        // const tabungan = pendapatan * 0.1;

        // // Hitung pendapatan bersih
        // const pendapatanBersih = pendapatan - (bensin + tabungan) - servis;

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
        const data = await Tracker.find().sort({ tanggal: -1 }); // terbaru dulu
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

        const data = await Tracker.findByIdAndUpdate(
            req.params.id,
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
        const data = await Tracker.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "Data tracker tidak ditemukan" });
        res.json({ message: "Data tracker berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus data tracker", error: error.message });
    }
};
