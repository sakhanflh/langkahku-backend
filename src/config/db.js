import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = conn.connections[0].readyState;
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
};

export default connectDB;
