"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("MyDigimons", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			digimonName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			img: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			level: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			attribute: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			hunger: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			power: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			happiness: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("MyDigimons");
	},
};
