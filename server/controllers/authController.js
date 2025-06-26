const { hashPassword, comparePassword } = require("../helpers/jwt.helper");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
	async register(req, res, next) {
		try {
			const { email, password } = req.body;
			const hashed = await hashPassword(password);
			const user = await User.create({ email, password: hashed });
			res.status(201).json({ id: user.id, email: user.email });
		} catch (err) {
			next(err);
		}
	},

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });
			if (!user || !(await comparePassword(password, user.password))) {
				return res.status(401).json({ error: "Invalid credentials" });
			}
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
			res.json({ token });
		} catch (err) {
			next(err);
		}
	},

	async googleLogin(req, res, next) {
		try {
			const { idToken } = req.body;
			if (!idToken) return res.status(400).json({ error: "Missing idToken" });

			// Verifikasi token Google
			const ticket = await client.verifyIdToken({
				idToken,
				audience: process.env.GOOGLE_CLIENT_ID,
			});
			const payload = ticket.getPayload();
			const email = payload.email;

			// Cari atau buat user di database
			let user = await User.findOne({ where: { email } });
			if (!user) {
				user = await User.create({
					email,
					password: "", // atau random string, karena login via Google
					name: payload.name || "",
				});
			}

			// Generate JWT
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

			res.json({ token });
		} catch (err) {
			next(err);
		}
	},

	async profile(req, res, next) {
		try {
			const user = await User.findByPk(req.user.id, {
				attributes: ["id", "email", "name"],
			});
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			res.json(user);
		} catch (err) {
			next(err);
		}
	},
};
