const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = require('../util/database');

const userHasVehicle = sequelize.define('userHasVehicle', {
  idUserHasVehicle: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = userHasVehicle;
