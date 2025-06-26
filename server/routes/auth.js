const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authentication = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google", authController.googleLogin);
router.get("/profile", authentication, authController.profile);

module.exports = router;
