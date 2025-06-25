require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");

let access_token;

beforeAll(async () => {
	const res = await request(app)
		.post("/google-login")
		.send({ idToken: process.env.TEST_GOOGLE_ID_TOKEN });

	access_token = res.body.access_token;
	console.log("access_token:", access_token);
});

describe("POST /google-login", () => {
	it("should return access_token when given valid token", async () => {
		const res = await request(app)
			.post("/google-login")
			.send({ idToken: process.env.TEST_GOOGLE_ID_TOKEN });

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("access_token");
		expect(res.body).toHaveProperty("name");
	});

	it("should return 401 when token is invalid", async () => {
		const res = await request(app)
			.post("/google-login")
			.send({ idToken: "invalid.token.value" });

		expect(res.statusCode).toBe(401);
		expect(res.body).toHaveProperty("error");
	});
});
