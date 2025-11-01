import mongoose from "mongoose";

const pengeluaranManualSchema = new mongoose.Schema({
    kategori: { type: String, required: true },
    nominal: { type: Number, required: true },
    catatan: { type: String },
})


const keuanganSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tanggal: { type: Date, default: Date.now },
    pendapatan: { type: Number, required: true },
    bensin: { type: Number, required: true },
    tabungan: { type: Number, required: true },
    servis: { type: Number, default: 0 },
    pendapatanBersih: { type: Number, required: true },
    pengeluaranManual: { type: [pengeluaranManualSchema], default: [] },
});

const Keuangan = mongoose.model("Keuangan", keuanganSchema);

export default Keuangan;
