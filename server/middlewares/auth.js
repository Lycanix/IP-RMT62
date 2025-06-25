const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async function (req, res, next) {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) throw new Error("Unauthorized");

		const payload = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findByPk(payload.id);
		if (!user) throw new Error("User not found");

		req.user = { id: user.id, email: user.email };
		next();
	} catch (err) {
		res.status(401).json({ error: "Unauthorized", message: err.message });
	}
};
