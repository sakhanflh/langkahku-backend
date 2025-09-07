import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    pesan: { type: String, required: true },
    dibaca: { type: Boolean, default: false },
    dibuat: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
