const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("../server/connect");
const urlRoute = require("../server/routes/url");

const app = express();

// Connect DB (IMPORTANT: avoid multiple connections)
connectDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  }
}));

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API running on Vercel" });
});

app.use("/url", urlRoute);

// Export as serverless function
module.exports = serverless(app);