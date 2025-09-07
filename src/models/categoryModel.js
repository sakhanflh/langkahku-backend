import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // contoh: "Makan", "Transportasi", "Tabungan", "Bayar Hutang"
    type: { type: String, enum: ["pemasukan", "pengeluaran"], required: true }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;
