import mongoose from "mongoose";

const goalsSchema = new mongoose.Schema({
    judul: { type: String, required: true },
    deskripsi: { type: String },
    targetTanggal: { type: Date },
    tercapai: { type: Boolean, default: false },
    dibuat: { type: Date, default: Date.now },
});

const Goals = mongoose.model("Goals", goalsSchema);
export default Goals;
