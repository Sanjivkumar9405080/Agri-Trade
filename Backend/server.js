const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const farmerProductRoutes = require("./routes/farmerProductRoutes");
const consumerRoutes = require("./routes/consumerRoutes");
const profileRoutes = require("./routes/profileRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
}));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

app.use(async (req, res, next) => {
    try {
        await connectDB();
    } catch (e) {
        console.error("DB Middleware Error:", e);
    }
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "KisanSetu Backend is running", status: "OK" });
});

app.get("/api", (req, res) => {
    res.status(200).json({ message: "KisanSetu Backend API is running", status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", consumerRoutes);
app.use("/api/farmer/products", farmerProductRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/consumer", consumerRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;