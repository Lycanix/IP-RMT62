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
      // define association here
    }
  }
  MyDigimon.init({
    userId: DataTypes.INTEGER,
    digimonName: DataTypes.STRING,
    img: DataTypes.STRING,
    level: DataTypes.STRING,
    hunger: DataTypes.INTEGER,
    power: DataTypes.INTEGER,
    happiness: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyDigimon',
  });
  return MyDigimon;
};