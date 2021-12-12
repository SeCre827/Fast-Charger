const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = require('../util/database');

const userIsStationOperator = sequelize.define('userIsStationOperator', {
  userIsStationOperator: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = userIsStationOperator;
