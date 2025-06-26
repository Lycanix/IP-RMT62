const { MyDigimon } = require("../models");
const { mapLevelToAttribute } = require("../helpers/mapLevelToAttribute");
const { getGeminiRecommendation } = require("../helpers/gemini.helper");

exports.buyDigimon = async (req, res, next) => {
	try {
		const { digimonName, img, level } = req.body;

		if (!digimonName || !img || !level) {
			return res
				.status(400)
				.json({ error: "digimonName/img/level is required" });
		}

		const attribute = mapLevelToAttribute(level);

		const newDigimon = await MyDigimon.create({
			digimonName,
			img,
			level,
			attribute,
			power: 50,
			hunger: 50,
			happiness: 50,
			userId: req.user.id,
		});

		res.status(201).json(newDigimon);
	} catch (err) {
		next(err);
	}
};

exports.recommendation = async (req, res, next) => {
	try {
		const myDigimons = await MyDigimon.findAll({
			where: { userId: req.user.id },
			attributes: ["digimonName", "attribute"],
		});

		const attributes = [...new Set(myDigimons.map((d) => d.attribute))];
		const prompt = `Saya punya Digimon dengan attribute: ${attributes.join(
			", "
		)}. Rekomendasikan Digimon yang cocok untuk saya beli berikutnya.`;

		const recommendation = await getGeminiRecommendation(prompt);

		res.json({ recommendation });
	} catch (err) {
		next(err);
	}
};
