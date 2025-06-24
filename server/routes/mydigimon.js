const express = require("express");
const router = express.Router();
const controller = require("../controllers/mydigimonController");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.patch("/:id/feed", controller.feed);
router.patch("/:id/train", controller.train);
router.patch("/:id/play", controller.play);
router.delete("/:id", controller.destroy);

module.exports = router;
