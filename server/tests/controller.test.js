const authController = require("../controllers/authController");
const mydigimonController = require("../controllers/mydigimonController");
const marketController = require("../controllers/marketController");

jest.mock("../models", () => ({
	User: {
		create: jest.fn(),
		findOne: jest.fn(),
		findByPk: jest.fn(),
	},
	MyDigimon: {
		findAll: jest.fn(),
		findOne: jest.fn(),
		create: jest.fn(),
	},
}));
jest.mock("../helpers/mapLevelToAttribute", () => ({
	mapLevelToAttribute: jest.fn(() => "Vaccine"),
}));
jest.mock("../helpers/gemini.helper", () => ({
	getGeminiRecommendation: jest.fn(() => Promise.resolve("Agumon")),
}));
jest.mock("axios");

const { User, MyDigimon } = require("../models");
const { mapLevelToAttribute } = require("../helpers/mapLevelToAttribute");
const { getGeminiRecommendation } = require("../helpers/gemini.helper");
const axios = require("axios");

function mockRes() {
	return {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};
}
function mockNext() {
	return jest.fn();
}

describe("authController", () => {
	afterEach(() => jest.clearAllMocks());

	it("register - success", async () => {
		User.create.mockResolvedValue({ id: 1, email: "a@mail.com" });
		const req = { body: { name: "A", email: "a@mail.com", password: "123" } };
		const res = mockRes();
		const next = mockNext();
		await authController.register(req, res, next);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({ id: 1, email: "a@mail.com" });
	});

	it("register - missing field", async () => {
		const req = { body: { email: "", password: "" } };
		const res = mockRes();
		const next = mockNext();
		await authController.register(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it("register - unique constraint", async () => {
		User.create.mockRejectedValue({ name: "SequelizeUniqueConstraintError" });
		const req = { body: { name: "A", email: "a@mail.com", password: "123" } };
		const res = mockRes();
		const next = mockNext();
		await authController.register(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it("register - validation error", async () => {
		User.create.mockRejectedValue({
			name: "SequelizeValidationError",
			errors: [{ message: "Invalid" }],
		});
		const req = { body: { name: "A", email: "a@mail.com", password: "123" } };
		const res = mockRes();
		const next = mockNext();
		await authController.register(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it("register - unknown error", async () => {
		User.create.mockRejectedValue({ name: "OtherError" });
		const req = { body: { name: "A", email: "a@mail.com", password: "123" } };
		const res = mockRes();
		const next = mockNext();
		await authController.register(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("login - missing field", async () => {
		const req = { body: { email: "" } };
		const res = mockRes();
		const next = mockNext();
		await authController.login(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it("login - user not found", async () => {
		User.findOne.mockResolvedValue(null);
		const req = { body: { email: "a@mail.com", password: "123" } };
		const res = mockRes();
		const next = mockNext();
		await authController.login(req, res, next);
		expect(res.status).toHaveBeenCalledWith(401);
	});

	it("login - user found but no password", async () => {
		User.findOne.mockResolvedValue({ id: 1, email: "a@mail.com" });
		const req = { body: { email: "a@mail.com", password: "123" } };
		const res = mockRes();
		const next = mockNext();
		await authController.login(req, res, next);
		expect(res.status).toHaveBeenCalledWith(401);
	});

	it("login - password mismatch", async () => {
		const { comparePassword } = require("../helpers/jwt.helper");
		User.findOne.mockResolvedValue({
			id: 1,
			email: "a@mail.com",
			password: "hashed",
		});
		jest
			.spyOn(require("../helpers/jwt.helper"), "comparePassword")
			.mockResolvedValue(false);
		const req = { body: { email: "a@mail.com", password: "wrong" } };
		const res = mockRes();
		const next = mockNext();
		await authController.login(req, res, next);
		expect(res.status).toHaveBeenCalledWith(401);
		comparePassword.mockRestore();
	});

	it("login - success", async () => {
		const { comparePassword } = require("../helpers/jwt.helper");
		User.findOne.mockResolvedValue({
			id: 1,
			email: "a@mail.com",
			password: "hashed",
		});
		jest
			.spyOn(require("../helpers/jwt.helper"), "comparePassword")
			.mockResolvedValue(true);
		const req = { body: { email: "a@mail.com", password: "123" } };
		const res = mockRes();
		const next = mockNext();
		await authController.login(req, res, next);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({ token: expect.any(String) })
		);
		comparePassword.mockRestore();
	});

	it("profile - user not found", async () => {
		User.findByPk.mockResolvedValue(null);
		const req = { user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await authController.profile(req, res, next);
		expect(res.status).toHaveBeenCalledWith(404);
	});

	it("profile - success", async () => {
		User.findByPk.mockResolvedValue({ id: 1, email: "a@mail.com", name: "A" });
		const req = { user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await authController.profile(req, res, next);
		expect(res.json).toHaveBeenCalledWith({
			id: 1,
			email: "a@mail.com",
			name: "A",
		});
	});
});

describe("mydigimonController", () => {
	afterEach(() => jest.clearAllMocks());

	it("getAll - success", async () => {
		MyDigimon.findAll.mockResolvedValue([{ id: 1 }]);
		const req = { user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.getAll(req, res, next);
		expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
	});

	it("getAll - error", async () => {
		MyDigimon.findAll.mockRejectedValue(new Error("DB error"));
		const req = { user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.getAll(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("create - success", async () => {
		MyDigimon.create.mockResolvedValue({ id: 1 });
		const req = {
			user: { id: 1 },
			body: { digimonName: "Agumon", img: "img", level: "Rookie" },
		};
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.create(req, res, next);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({ id: 1 });
	});

	it("create - error", async () => {
		MyDigimon.create.mockRejectedValue(new Error("DB error"));
		const req = {
			user: { id: 1 },
			body: { digimonName: "Agumon", img: "img", level: "Rookie" },
		};
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.create(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("feed - not found", async () => {
		MyDigimon.findOne.mockResolvedValue(null);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.feed(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("feed - success", async () => {
		const digimon = { hunger: 1, save: jest.fn(), ...{} };
		MyDigimon.findOne.mockResolvedValue(digimon);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.feed(req, res, next);
		expect(digimon.save).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith(digimon);
	});

	it("train - not found", async () => {
		MyDigimon.findOne.mockResolvedValue(null);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.train(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("train - success", async () => {
		const digimon = { power: 1, save: jest.fn(), ...{} };
		MyDigimon.findOne.mockResolvedValue(digimon);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.train(req, res, next);
		expect(digimon.save).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith(digimon);
	});

	it("play - not found", async () => {
		MyDigimon.findOne.mockResolvedValue(null);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.play(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("play - success", async () => {
		const digimon = { happiness: 1, save: jest.fn(), ...{} };
		MyDigimon.findOne.mockResolvedValue(digimon);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.play(req, res, next);
		expect(digimon.save).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith(digimon);
	});

	it("destroy - not found", async () => {
		MyDigimon.findOne.mockResolvedValue(null);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.destroy(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("destroy - success", async () => {
		const digimon = { destroy: jest.fn() };
		MyDigimon.findOne.mockResolvedValue(digimon);
		const req = { params: { id: 1 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.destroy(req, res, next);
		expect(digimon.destroy).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith({
			message: "Digimon deleted successfully",
		});
	});
});

describe("marketController", () => {
	afterEach(() => jest.clearAllMocks());

	it("getMarketDigimons - success", async () => {
		axios.get.mockResolvedValue({
			data: [{ name: "Agumon", img: "img", level: "Rookie" }],
		});
		const req = {};
		const res = mockRes();
		const next = mockNext();
		await marketController.getMarketDigimons(req, res, next);
		expect(res.json).toHaveBeenCalled();
	});

	it("getMarketDigimons - error", async () => {
		axios.get.mockRejectedValue(new Error("API error"));
		const req = {};
		const res = mockRes();
		const next = mockNext();
		await marketController.getMarketDigimons(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("buyDigimon - missing field", async () => {
		const req = { body: {}, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await marketController.buyDigimon(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it("buyDigimon - success", async () => {
		MyDigimon.create.mockResolvedValue({ id: 1 });
		const req = {
			body: { digimonName: "Agumon", img: "img", level: "Rookie" },
			user: { id: 1 },
		};
		const res = mockRes();
		const next = mockNext();
		await marketController.buyDigimon(req, res, next);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({ id: 1 });
	});

	it("buyDigimon - error", async () => {
		MyDigimon.create.mockRejectedValue(new Error("DB error"));
		const req = {
			body: { digimonName: "Agumon", img: "img", level: "Rookie" },
			user: { id: 1 },
		};
		const res = mockRes();
		const next = mockNext();
		await marketController.buyDigimon(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("recommendation - success", async () => {
		MyDigimon.findAll.mockResolvedValue([
			{ digimonName: "Agumon", attribute: "Vaccine" },
		]);
		const req = { user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await marketController.recommendation(req, res, next);
		expect(res.json).toHaveBeenCalledWith({ recommendation: "Agumon" });
	});

	it("recommendation - error", async () => {
		MyDigimon.findAll.mockRejectedValue(new Error("DB error"));
		const req = { user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await marketController.recommendation(req, res, next);
		expect(next).toHaveBeenCalled();
	});
});
