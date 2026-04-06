const express = require("express");
const {connectDB} = require("./connect")
const urlRoute = require("./routes/url")
const cors = require("cors");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

const MongoURI = process.env.MONGO_URI;
connectDB(MongoURI).then(()=> console.log("mongoDB connected"))

// Middleware
app.use(express.json())

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://127.0.0.1:5173",
    "http://localhost:5173",
].filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        // Allow non-browser requests and both local dev hosts.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({ status: "ok", message: "URL Shortener API is running" });
});

app.use("/url", urlRoute)
app.use("/", urlRoute)

app.listen(PORT, ()=>console.log(`Server started at ${PORT}`))
