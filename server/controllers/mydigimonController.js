const { MyDigimon } = require("../models");
const { mapLevelToAttribute } = require("../helpers/mapLevelToAttribute");

module.exports = {
	// GET all MyDigimons
	async getAll(req, res, next) {
		try {
			const digimons = await MyDigimon.findAll({
				where: { userId: req.user.id },
				order: [["id", "ASC"]],
			});
			res.json(digimons);
		} catch (err) {
			next(err);
		}
	},

	// POST (add Digimon to user's collection)
	async create(req, res, next) {
		try {
			const { digimonName, img, level } = req.body;
			const attribute = mapLevelToAttribute(level);

			const newDigimon = await MyDigimon.create({
				userId: req.user.id,
				digimonName,
				img,
				level,
				attribute,
				hunger: 0,
				power: 0,
				happiness: 0,
			});

			res.status(201).json(newDigimon);
		} catch (err) {
			next(err);
		}
	},

	// PATCH - feed
	async feed(req, res, next) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findOne({
				where: { id, userId: req.user.id },
			});
			if (!digimon) throw new Error("Digimon not found");

			digimon.hunger += 1;
			await digimon.save();
			res.json(digimon);
		} catch (err) {
			next(err);
		}
	},

	// PATCH - train
	async train(req, res, next) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findOne({
				where: { id, userId: req.user.id },
			});
			if (!digimon) throw new Error("Digimon not found");

			digimon.power += 1;
			await digimon.save();
			res.json(digimon);
		} catch (err) {
			next(err);
		}
	},

	// PATCH - play
	async play(req, res, next) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findOne({
				where: { id, userId: req.user.id },
			});
			if (!digimon) throw new Error("Digimon not found");

			digimon.happiness += 1;
			await digimon.save();
			res.json(digimon);
		} catch (err) {
			next(err);
		}
	},

	// DELETE
	async destroy(req, res, next) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findOne({
				where: { id, userId: req.user.id },
			});
			if (!digimon) throw new Error("Digimon not found");

			await digimon.destroy();
			res.json({ message: "Digimon deleted successfully" });
		} catch (err) {
			next(err);
		}
	},
};
