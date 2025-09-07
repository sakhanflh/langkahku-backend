import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    mood: { type: String, enum: ["senang", "sedih", "marah", "tenang", "lelah"], required: true },
    catatan: { type: String },
    tanggal: { type: Date, default: Date.now },
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;
