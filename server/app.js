const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const mydigimonRoutes = require("./routes/mydigimon");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/google-login", authRouter);

app.use("/mydigimons", mydigimonRoutes);

module.exports = app;
