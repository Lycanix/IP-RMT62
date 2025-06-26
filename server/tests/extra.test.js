require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");

describe("Auth Endpoints", () => {
	it("POST /google-login/register - should register user", async () => {
		const res = await request(app).post("/google-login/register").send({
			name: "Test User",
			email: "test100@mail.com",
			password: "test123",
		});
		expect([200, 201]).toContain(res.statusCode);
		expect(res.body).toHaveProperty("email");
	});

	it("POST /google-login/register - should fail if email already used", async () => {
		await request(app).post("/google-login/register").send({
			name: "Test User",
			email: "testdupe@mail.com",
			password: "test123",
		});
		const res = await request(app).post("/google-login/register").send({
			name: "Test User",
			email: "testdupe@mail.com",
			password: "test123",
		});
		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty("error");
	});

	it("POST /google-login/login - should login user", async () => {
		await request(app).post("/google-login/register").send({
			name: "Login User",
			email: "login@mail.com",
			password: "test123",
		});
		const res = await request(app).post("/google-login/login").send({
			email: "login@mail.com",
			password: "test123",
		});
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("token");
	});
});
