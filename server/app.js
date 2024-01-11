const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const payRoutes = require("./routes/payRoutes");
const errorHandler = require("./middleware/error");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.CLIENT_SERVER_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ], // Allowed headers
  credentials: true,
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URL);

app.use('/auth',authRoutes)
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use('/pay',payRoutes)

app.use("/", (req, res, next) => {
  res.send("Welcome to Library Management System");
});
app.use(errorHandler);
const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
  console.log("App is running in the port:" + port);
});
