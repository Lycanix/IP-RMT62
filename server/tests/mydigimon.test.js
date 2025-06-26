const { MyDigimon, User, sequelize } = require("../models");

describe("Simple MyDigimon Model CRUD", () => {
	let user;

	beforeAll(async () => {
		await sequelize.sync({ force: true });
		user = await User.create({
			name: "Test User",
			email: "simple@mail.com",
			password: "test123",
		});
	});

	it("can create MyDigimon", async () => {
		const digimon = await MyDigimon.create({
			digimonName: "Agumon",
			img: "https://digimon.shadowsmith.com/img/agumon.jpg",
			level: "Rookie",
			attribute: "Vaccine",
			userId: user.id,
		});
		expect(digimon.id).toBeDefined();
		expect(digimon.digimonName).toBe("Agumon");
	});

	it("can find MyDigimon by PK", async () => {
		const digimon = await MyDigimon.create({
			digimonName: "Gabumon",
			img: "https://digimon.shadowsmith.com/img/gabumon.jpg",
			level: "Rookie",
			attribute: "Data",
			userId: user.id,
		});
		const found = await MyDigimon.findByPk(digimon.id);
		expect(found).not.toBeNull();
		expect(found.digimonName).toBe("Gabumon");
	});

	it("can update MyDigimon", async () => {
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

	it("can delete MyDigimon", async () => {
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
});
