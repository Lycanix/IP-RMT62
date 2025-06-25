const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// === Google Login ===
router.post("/", async (req, res) => {
	try {
		const { idToken } = req.body;

		const ticket = await client.verifyIdToken({
			idToken,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();

		const [user] = await User.findOrCreate({
			where: { email: payload.email },
			defaults: { name: payload.name },
		});

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "24h" }
		);

		res.json({ access_token: token, name: user.name });
	} catch (err) {
		res
			.status(401)
			.json({ error: "Invalid Google Login", message: err.message });
	}
});

// === Manual Login ===
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user || user.password !== password) {
			throw new Error("Invalid email or password");
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET
		);

		res.json({ access_token: token });
	} catch (err) {
		res.status(401).json({ error: "Unauthorized", message: err.message });
	}
});

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await User.create({ name, email, password });

		res.status(201).json({ message: "User registered", userId: user.id });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
