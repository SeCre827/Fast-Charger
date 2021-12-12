const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = require('../util/database');

const StationOffersDiscountCharger = sequelize.define(
  'stationOffersDiscountCharger',
  {
    idStationOffersDiscountCharger: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    discount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  }
);

module.exports = StationOffersDiscountCharger;
