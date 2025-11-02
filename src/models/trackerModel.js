import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema({
    tanggal: { type: Date, default: Date.now },
    km: { type: Number, required: true },
    order: { type: Number, required: true },
    pendapatan: { type: Number, required: true },
    avgKmPerLiter: { type: Number, required: true },
    bensin: { type: Number, required: true },
    tabungan: { type: Number, required: true },
    servis: { type: Number, default: 0 }, 
    pendapatanBersih: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Tracker = mongoose.model("Tracker", trackerSchema);
export default Tracker;
