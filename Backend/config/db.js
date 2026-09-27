const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
        console.warn("MONGO_URI / MONGODB_URI environment variable is missing.");
        return;
    }
    try {
        await mongoose.connect(uri.trim(), {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

module.exports = connectDB;