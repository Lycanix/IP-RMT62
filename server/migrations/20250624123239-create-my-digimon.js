'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyDigimons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      digimonName: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      hunger: {
        type: Sequelize.INTEGER
      },
      power: {
        type: Sequelize.INTEGER
      },
      happiness: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MyDigimons');
  }
};