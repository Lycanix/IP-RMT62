require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const mydigimonRoutes = require("./routes/mydigimon");
const marketRouter = require("./routes/market");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/google-login", authRouter);
app.use("/market", marketRouter);
app.use("/mydigimons", mydigimonRoutes);

// Error handler global
app.use(errorHandler);

module.exports = app;
