const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./connect");
const urlRoute = require("./routes/url");

const app = express();

// DB connection control
let isConnected = false;
async function connect() {
  if (!isConnected) {
    await connectDB(process.env.MONGO_URI);
    isConnected = true;
  }
}

// Middleware
app.use(async (req, res, next) => {
  await connect();
  next();
});

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API running" });
});

app.use("/url", urlRoute);

module.exports = serverless(app);