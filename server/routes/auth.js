const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const client = new OAuth2Client();

router.post("/", async (req, res) => {
	try {
		const { idToken } = req.body;

		const ticket = await client.verifyIdToken({
			idToken,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		// Cari atau buat user di DB
		const [user, created] = await User.findOrCreate({
			where: { email: payload.email },
			defaults: { name: payload.name },
		});

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
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

module.exports = router;
