import Donasi from "../models/donasiModel.js";

// 🟢 menerima webhook dari Saweria
export const handleSaweriaWebhook = async (req, res) => {
    try {
        console.log("📩 Webhook Saweria diterima:", req.body);

        const data = req.body;
        if (!data || !data.donation) {
            return res.status(400).json({ message: "Payload tidak valid" });
        }

        const donasiData = {
            nama: data.donation.name || "Anonim",
            jumlah: Number(data.donation.amount) || 0,
            pesan: data.donation.message || "",
            platform: "Saweria",
        };

        console.log("📦 Data donasi yang akan disimpan:", donasiData);

        const donasi = new Donasi(donasiData);
        await donasi.save();

        console.log("✅ Donasi tersimpan ke database");
        res.status(200).json({ message: "OK" });
    } catch (error) {
        console.error("❌ Gagal memproses webhook:", error);
        res.status(500).json({ message: error.message });
    }
};


// 🏆 ambil leaderboard donatur (10 tertinggi)
export const getTopDonatur = async (req, res) => {
    try {
        const topDonatur = await Donasi.find().sort({ amount: -1 }).limit(10);
        res.json(topDonatur);
    } catch (error) {
        console.error("Error ambil leaderboard:", error);
        res.status(500).json({ success: false });
    }
};
