const Sequelize = require('sequelize');
// const { SET_DEFERRED } = require('sequelize/types/lib/deferrable');
const moment = require('moment');

const sequelize = require('../util/database');

const Transaction = sequelize.define('transaction', {
  idTransaction: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  energy: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  isInOffers: Sequelize.BOOLEAN,
  time: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Transaction;
