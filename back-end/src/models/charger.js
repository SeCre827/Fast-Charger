const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = require('../util/database');

const Charger = sequelize.define('charger', {
  idCharger: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isBusy: Sequelize.BOOLEAN,
  isFunctioning: Sequelize.BOOLEAN,
  // idChargerOperator: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
});

module.exports = Charger;
