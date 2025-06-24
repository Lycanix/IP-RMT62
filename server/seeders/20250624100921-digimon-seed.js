"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const { data } = await axios.get(
			"https://digimon-api.vercel.app/api/digimon"
		);

		const digimons = data.map((d) => ({
			name: d.name,
			img: d.img,
			level: d.level,
			createdAt: new Date(),
			updatedAt: new Date(),
		}));

		await queryInterface.bulkInsert("Digimons", digimons, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Digimons", null, {});
	},
};
