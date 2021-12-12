const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = require('../util/database');

const Vehicle = sequelize.define('vehicle', {
  idVehicle: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kilometres: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  releaseYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  usableBatterySize: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Vehicle;
