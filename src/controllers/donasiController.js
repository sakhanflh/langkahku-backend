import Donasi from "../models/donasiModel.js";

// 🟢 menerima webhook dari Saweria
export const handleSaweriaWebhook = async (req, res) => {
    try {
        const { event, data } = req.body;

        if (event === "donation.create") {
            const { name, amount, message, created_at } = data;

            await Donasi.create({
                name,
                amount,
                message,
                created_at,
            });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error pada webhook Saweria:", error);
        res.status(500).json({ success: false });
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
