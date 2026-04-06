const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./connect");
const urlRoute = require("./routes/url");

const app = express();

// ✅ CORS must be FIRST — before any other middleware
const corsOptions = {
  origin: "https://url-xi87.vercel.app", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ explicitly handle preflight for ALL routes

// DB connection middleware (after CORS)
let isConnected = false;
async function connect() {
  if (!isConnected) {
    await connectDB(process.env.MONGO_URI);
    isConnected = true;
  }
}

app.use(async (req, res, next) => {
  await connect();
  next();
});

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API running" });
});

app.use("/url", urlRoute);

module.exports = serverless(app);