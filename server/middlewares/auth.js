const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async function (req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ error: "Unauthorized", message: "No token provided" });
		}

		const token = authHeader.split(" ")[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findByPk(payload.id);
		if (!user) {
			return res
				.status(401)
				.json({ error: "Unauthorized", message: "User not found" });
		}

		req.user = { id: user.id, email: user.email, name: user.name };
		next();
	} catch (err) {
		res.status(401).json({ error: "Unauthorized", message: err.message });
	}
};
