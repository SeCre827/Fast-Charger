const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TokenBlacklist = sequelize.define('tokenBlacklist', {
  idToken: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = TokenBlacklist;
