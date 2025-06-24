const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mydigimonRoutes = require("./routes/mydigimon");
app.use("/mydigimons", mydigimonRoutes);

module.exports = app;
