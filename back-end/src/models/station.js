const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = require('../util/database');

const Station = sequelize.define('station', {
  idStation: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // idStationOperator: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
});

module.exports = Station;
