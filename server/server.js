const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);
	console.log(`Server running at http://localhost:${PORT}`);
});
