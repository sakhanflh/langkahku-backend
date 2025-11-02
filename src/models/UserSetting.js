import mongoose from "mongoose";

const userSettingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        fuelPrice: {
            type: Number,
            default: 10000,
        },
        savingPercentage: {
            type: Number,
            default: 10,
        },
    },
    { timestamps: true }
);

export default mongoose.model("UserSetting", userSettingSchema);
