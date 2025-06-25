const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const mydigimonController = require("../controllers/mydigimonController");

// Semua endpoint di-protect auth
router.get("/", auth, mydigimonController.getAll);
router.post("/", auth, mydigimonController.create);
router.patch("/:id/feed", auth, mydigimonController.feed);
router.patch("/:id/train", auth, mydigimonController.train);
router.patch("/:id/play", auth, mydigimonController.play);
router.delete("/:id", auth, mydigimonController.destroy);

module.exports = router;
