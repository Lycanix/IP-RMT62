const { MyDigimon } = require("../models");

module.exports = {
	// GET all MyDigimons
	async getAll(req, res) {
		try {
			const digimons = await MyDigimon.findAll({
				where: { userId: req.user.id }, // sementara hardcode (sudah fix)
				order: [["id", "ASC"]],
			});
			res.json(digimons);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	// POST (buy Digimon)
	async create(req, res) {
		try {
			const { digimonName, img, level } = req.body;

			const newDigimon = await MyDigimon.create({
				userId: 1, // sementara hardcode
				digimonName,
				img,
				level,
				hunger: 0,
				power: 0,
				happiness: 0,
			});

			res.status(201).json(newDigimon);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	// PATCH - feed
	async feed(req, res) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findByPk(id);
			if (!digimon) throw new Error("Digimon not found");

			digimon.hunger += 1;
			await digimon.save();
			res.json(digimon);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	// PATCH - train
	async train(req, res) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findByPk(id);
			if (!digimon) throw new Error("Digimon not found");

			digimon.power += 1;
			await digimon.save();
			res.json(digimon);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	// PATCH - play
	async play(req, res) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findByPk(id);
			if (!digimon) throw new Error("Digimon not found");

			digimon.happiness += 1;
			await digimon.save();
			res.json(digimon);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	// DELETE
	async destroy(req, res) {
		try {
			const { id } = req.params;
			const digimon = await MyDigimon.findByPk(id);
			if (!digimon) throw new Error("Digimon not found");

			await digimon.destroy();
			res.json({ message: "Digimon deleted successfully" });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
};
