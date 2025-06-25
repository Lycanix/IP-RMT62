const express = require("express");
const axios = require("axios");
const { mapLevelToAttribute } = require("../helpers/mapLevelToAttribute");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const { data } = await axios.get(
			"https://digimon-api.vercel.app/api/digimon"
		);
		// attribute static
		const mapped = data.map((d) => ({
			name: d.name,
			image: d.img,
			level: d.level,
			attribute: mapLevelToAttribute(d.level),
		}));
		res.json(mapped);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Market fetch failed", error: err.message });
	}
});

router.post("/buy", async (req, res) => {
    try {
      const { name, image, attribute } = req.body;
      const userId = req.user.id; // pastikan pakai middleware authentication
  
      const newDigimon = await MyDigimon.create({
        name,
        image,
        attribute,
        power: 1,
        hunger: 0,
        happiness: 5,
        userId,
      });
  
      res.status(201).json(newDigimon);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post("/buy", async (req, res) => {
		try {
			const { name, image, attribute } = req.body;
			const userId = req.user.id; // pastikan pakai middleware authentication

			const newDigimon = await MyDigimon.create({
				name,
				image,
				attribute,
				power: 1,
				hunger: 0,
				happiness: 5,
				userId,
			});

			res.status(201).json(newDigimon);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	});

module.exports = router;
