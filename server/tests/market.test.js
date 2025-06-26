require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");

let access_token;

beforeAll(async () => {
	// Register user test (abaikan error jika sudah ada)
	await request(app).post("/google-login/register").send({
		name: "Test User",
		email: "test@mail.com",
		password: "test123",
	});
	// Login user dan dapatkan token
	const res = await request(app)
		.post("/google-login/login")
		.send({ email: "test@mail.com", password: "test123" });
	access_token = res.body.token;
});

afterAll(async () => {
	// Hapus semua MyDigimon milik user test
	await MyDigimon.destroy({ where: {}, truncate: true });
});

describe("Market Endpoints", () => {
	it("GET /market - should return list of digimons", async () => {
		const res = await request(app)
			.get("/market")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body[0]).toHaveProperty("name");
		expect(res.body[0]).toHaveProperty("level");
		expect(res.body[0]).toHaveProperty("attribute");
	});

	it("GET /market/recommendation - should return recommendation from AI", async () => {
		const res = await request(app)
			.get("/market/recommendation")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("recommendation");
	});

	it("GET /market/recommendation - should fail without token", async () => {
		const res = await request(app).get("/market/recommendation");
		expect([401, 403]).toContain(res.statusCode);
	});
});
