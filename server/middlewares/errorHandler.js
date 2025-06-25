module.exports = (err, req, res, next) => {
	// Default status code
	let status = err.status || 500;
	let message = err.message || "Internal Server Error";

	// Optional: log error for debugging
	if (process.env.NODE_ENV !== "production") {
		console.error(err);
	}

	res.status(status).json({ error: message });
};
