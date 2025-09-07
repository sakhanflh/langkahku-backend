import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    prioritas: { type: String, enum: ["rendah", "sedang", "tinggi"], default: "sedang" },
    selesai: { type: Boolean, default: false },
    dibuat: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
