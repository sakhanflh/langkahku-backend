import UserSetting from "../models/UserSetting.js";

// ✅ Ambil setting user
export const getUserSetting = async (req, res) => {
    try {
        const setting = await UserSetting.findOne({ userId: req.user.id });

        if (!setting) {
            return res.status(200).json({
                fuelPrice: 10000,
                savingPercentage: 10,
                message: "Default setting digunakan",
            });
        }

        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil setting", error: error.message });
    }
};

export const updateUserSetting = async (req, res) => {
    try {
        const { fuelPrice, savingPercentage } = req.body;

        if (fuelPrice <= 0 || savingPercentage < 0 || savingPercentage > 100) {
            return res.status(400).json({ message: "Input tidak valid" });
        }

        const setting = await UserSetting.findOneAndUpdate(
            { userId: req.user.id },
            { fuelPrice, savingPercentage },
            { new: true, upsert: true } // akan buat baru jika belum ada
        );

        res.json({ message: "Setting berhasil disimpan", setting });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan setting", error: error.message });
    }
};
