'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyDigimon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MyDigimon.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  MyDigimon.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			digimonName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			img: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			level: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			attribute: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			hunger: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 50,
			},
			power: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 50,
			},
			happiness: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 50,
			},
		},
		{
			sequelize,
			modelName: "MyDigimon",
		}
	);
  return MyDigimon;
};