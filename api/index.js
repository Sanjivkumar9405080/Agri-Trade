const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../Backend/config/db");
const authRoutes = require("../Backend/routes/authRoutes");
const farmerRoutes = require("../Backend/routes/farmerRoutes");
const farmerProductRoutes = require("../Backend/routes/farmerProductRoutes");
const consumerRoutes = require("../Backend/routes/consumerRoutes");
const profileRoutes = require("../Backend/routes/profileRoutes");
const uploadRoutes = require("../Backend/routes/uploadRoutes");

const app = express();

// Allowed origins list
const allowedOrigins = [
  "https://agri-trade.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000"
];

// Universal CORS & Preflight middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin) {
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".netlify.app") ||
      origin.endsWith(".vercel.app") ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:") ||
      (process.env.CLIENT_URL && origin === process.env.CLIENT_URL.replace(/\/+$/, ""))
    ) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  // Answer preflight immediately with 200
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Database connection middleware for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (e) {
    console.error("DB Middleware Error:", e);
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "AgriTrade Backend is running", status: "OK" });
});

app.get("/api", (req, res) => {
  res.status(200).json({ message: "AgriTrade Backend API is running", status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", consumerRoutes);
app.use("/api/farmer/products", farmerProductRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/consumer", consumerRoutes);
app.use("/api/profile", profileRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    message: "Server error",
    error: err.message || "An unexpected error occurred"
  });
});

module.exports = app;
