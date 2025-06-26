const { hashPassword, comparePassword } = require("../helpers/jwt.helper");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
	async register(req, res, next) {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				return res
					.status(400)
					.json({ error: "Name, email, and password are required" });
			}
			const hashed = await hashPassword(password);
			const user = await User.create({ name, email, password: hashed });
			res.status(201).json({ id: user.id, email: user.email });
		} catch (err) {
			if (err.name === "SequelizeUniqueConstraintError") {
				return res.status(400).json({ error: "Email already used" });
			}
			if (err.name === "SequelizeValidationError") {
				return res.status(400).json({ error: err.errors[0].message });
			}
			next(err);
		}
	},

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return res
					.status(400)
					.json({ error: "Email and password are required" });
			}
			const user = await User.findOne({ where: { email } });
			if (!user || !user.password) {
				return res.status(401).json({ error: "Invalid credentials" });
			}
			if (!(await comparePassword(password, user.password))) {
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
				const randomPassword = await hashPassword(
					Math.random().toString(36).slice(-8)
				); // <-- perbaikan di sini
				user = await User.create({
					email,
					password: randomPassword, // <-- gunakan hash random, bukan ""
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
