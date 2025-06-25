const axios = require("axios");

async function getGeminiRecommendation(prompt) {
	const url =
		"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
	try {
		const response = await axios.post(
			url,
			{
				contents: [
					{
						parts: [{ text: prompt }],
					},
				],
			},
			{
				headers: { "Content-Type": "application/json" },
				params: { key: process.env.GEMINI_API_KEY },
			}
		);
		// Ambil hasil rekomendasi dari response Gemini
		return (
			response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
			"Tidak ada rekomendasi."
		);
	} catch (err) {
		throw new Error("Gagal mendapatkan rekomendasi dari Gemini");
	}
}

module.exports = { getGeminiRecommendation };
