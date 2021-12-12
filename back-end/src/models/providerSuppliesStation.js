const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = require('../util/database');

const ProviderSuppliesStation = sequelize.define('providerSuppliesStation', {
  idProviderSuppliesStation: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = ProviderSuppliesStation;
