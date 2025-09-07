import mongoose from "mongoose";

const keuanganSchema = new mongoose.Schema({
    jenis: { type: String, enum: ["pemasukan", "pengeluaran", "tabungan", "pinjaman"], required: true },
    kategori: { type: String, required: true },
    jumlah: { type: Number, required: true },
    catatan: { type: String },
    tanggal: { type: Date, default: Date.now },

    relatedId: { type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true });

const Keuangan = mongoose.model("Keuangan", keuanganSchema);

export default Keuangan;
