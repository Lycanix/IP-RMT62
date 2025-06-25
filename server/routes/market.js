const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const marketController = require("../controllers/marketController");

router.post("/buy", auth, marketController.buyDigimon);
router.get("/recommendation", auth, marketController.recommendation);

module.exports = router;
