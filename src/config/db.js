import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        isConnected = true;
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
};

export default connectDB;
