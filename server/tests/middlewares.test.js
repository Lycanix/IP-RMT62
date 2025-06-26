const authController = require("../controllers/authController");
const marketController = require("../controllers/marketController");
const mydigimonController = require("../controllers/mydigimonController");
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");

// Mock req, res, next
function mockRes() {
	return {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};
}
function mockNext() {
	return jest.fn();
}

describe("Controller & Middleware 100% Coverage", () => {
	it("authController.register - missing field", async () => {
		const req = { body: { email: "", password: "" } };
		const res = mockRes();
		const next = mockNext();
		await authController.register(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it("authController.login - missing field", async () => {
		const req = { body: { email: "" } };
		const res = mockRes();
		const next = mockNext();
		await authController.login(req, res, next);
		expect(res.status).toHaveBeenCalledWith(400);
	});

	it("marketController.getMarket - error branch", async () => {
		const req = {};
		const res = mockRes();
		const next = mockNext();
		await marketController.getMarket(req, res, next); // Akan masuk next(err) jika error
		expect(next).toHaveBeenCalled();
	});

	it("marketController.getRecommendation - error branch", async () => {
		const req = { user: { id: null } };
		const res = mockRes();
		const next = mockNext();
		await marketController.getRecommendation(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("mydigimonController.create - missing field", async () => {
		const req = { body: {}, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.create(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("mydigimonController.findAll - error branch", async () => {
		const req = { user: { id: null } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.findAll(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("mydigimonController.update - error branch", async () => {
		const req = { params: { id: 99999 }, body: {}, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.update(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("mydigimonController.delete - error branch", async () => {
		const req = { params: { id: 99999 }, user: { id: 1 } };
		const res = mockRes();
		const next = mockNext();
		await mydigimonController.delete(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("auth middleware - no token", () => {
		const req = { headers: {} };
		const res = mockRes();
		const next = mockNext();
		auth(req, res, next);
		expect(res.status).toHaveBeenCalledWith(401);
	});

	it("auth middleware - invalid token", () => {
		const req = { headers: { authorization: "Bearer salah" } };
		const res = mockRes();
		const next = mockNext();
		auth(req, res, next);
		expect(res.status).toHaveBeenCalledWith(401);
	});

	it("errorHandler - custom error", () => {
		const err = new Error("Test error");
		const req = {};
		const res = mockRes();
		const next = mockNext();
		errorHandler(err, req, res, next);
		expect(res.status).toHaveBeenCalledWith(500);
	});
});
