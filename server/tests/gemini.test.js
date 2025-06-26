jest.mock("axios");
const axios = require("axios");
const { getGeminiRecommendation } = require("../helpers/gemini.helper");

describe("gemini.helper.js", () => {
	it("should return recommendation from Gemini API", async () => {
		axios.post.mockResolvedValue({ data: { result: "Agumon" } });
		const result = await getGeminiRecommendation("recommend me a digimon");
		expect(result).toBe("Agumon");
	});
});
