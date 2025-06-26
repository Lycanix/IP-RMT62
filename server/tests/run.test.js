require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");
const { MyDigimon, User, sequelize } = require("../models");

describe("Extra Simple Tests", () => {
	it("should register user with unique email", async () => {
		const email = `uniq${Date.now()}@mail.com`;
		const res = await request(app).post("/google-login/register").send({
			name: "Extra User",
			email,
			password: "test123",
		});
		expect([200, 201]).toContain(res.statusCode);
		expect(res.body).toHaveProperty("email");
	});

	it("should fail register if missing name", async () => {
		const res = await request(app)
			.post("/google-login/register")
			.send({
				email: `noname${Date.now()}@mail.com`,
				password: "test123",
			});
		expect(res.statusCode).toBe(400);
	});

	it("should fail login with wrong password", async () => {
		const email = `wrongpass${Date.now()}@mail.com`;
		await request(app).post("/google-login/register").send({
			name: "WrongPass",
			email,
			password: "test123",
		});
		const res = await request(app).post("/google-login/login").send({
			email,
			password: "salah",
		});
		expect([400, 401]).toContain(res.statusCode);
	});

	it("should fail login with unregistered email", async () => {
		const res = await request(app)
			.post("/google-login/login")
			.send({
				email: `notfound${Date.now()}@mail.com`,
				password: "test123",
			});
		expect([400, 401]).toContain(res.statusCode);
	});

	it("should create MyDigimon via model", async () => {
		await sequelize.sync({ force: false });
		const user = await User.create({
			name: "ModelUser",
			email: `model${Date.now()}@mail.com`,
			password: "test123",
		});
		const digimon = await MyDigimon.create({
			digimonName: "Agumon",
			img: "https://digimon.shadowsmith.com/img/agumon.jpg",
			level: "Rookie",
			attribute: "Vaccine",
			userId: user.id,
		});
		expect(digimon.digimonName).toBe("Agumon");
	});

	it("should update MyDigimon via model", async () => {
		const user = await User.create({
			name: "UpdateUser",
			email: `update${Date.now()}@mail.com`,
			password: "test123",
		});
		const digimon = await MyDigimon.create({
			digimonName: "Patamon",
			img: "https://digimon.shadowsmith.com/img/patamon.jpg",
			level: "Rookie",
			attribute: "Data",
			userId: user.id,
		});
		await digimon.update({ level: "Champion" });
		const updated = await MyDigimon.findByPk(digimon.id);
		expect(updated.level).toBe("Champion");
	});

	it("should delete MyDigimon via model", async () => {
		const user = await User.create({
			name: "DeleteUser",
			email: `delete${Date.now()}@mail.com`,
			password: "test123",
		});
		const digimon = await MyDigimon.create({
			digimonName: "Biyomon",
			img: "https://digimon.shadowsmith.com/img/biyomon.jpg",
			level: "Rookie",
			attribute: "Vaccine",
			userId: user.id,
		});
		const id = digimon.id;
		await digimon.destroy();
		const deleted = await MyDigimon.findByPk(id);
		expect(deleted).toBeNull();
	});

	it("should return 404 for unknown route", async () => {
		const res = await request(app).get("/unknown-route");
		expect([404, 400]).toContain(res.statusCode);
	});

	it("should return 400 for register with empty body", async () => {
		const res = await request(app).post("/google-login/register").send({});
		expect(res.statusCode).toBe(400);
	});

	it("should return 400 for login with empty body", async () => {
		const res = await request(app).post("/google-login/login").send({});
		expect([400, 401]).toContain(res.statusCode);
	});
});
