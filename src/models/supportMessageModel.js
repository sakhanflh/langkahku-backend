import mongoose from "mongoose";

const SupportMessageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        pinned: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("SupportMessage", SupportMessageSchema);
