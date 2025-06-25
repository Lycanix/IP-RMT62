const { hashPassword, comparePassword } = require("../helpers/jwt.helper");
const { User } = require("../models");
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
			// Implementasi Google OAuth sesuai kebutuhan
			res.json({ message: "Google login not implemented" });
		} catch (err) {
			next(err);
		}
	},
};
