import mongoose from "mongoose";

const savingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 }
}, { timestamps: true });

const Saving = mongoose.model("Saving", savingSchema);
export default Saving;
