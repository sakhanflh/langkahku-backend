import mongoose from "mongoose";

const donasiSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Donasi", donasiSchema);
