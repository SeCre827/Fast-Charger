// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

clear();
// const date = require('moment');

global.__basedir = __dirname;

// load routes
const adminRoutes = require('./routes/adminRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const authRoutes = require('./routes/authRoutes');

//Sequelize
const sequelize = require('./util/database');

// import database models
const Charger = require('./models/charger');
const Provider = require('./models/provider');
const ProviderSuppliesStation = require('./models/providerSuppliesStation');
const Station = require('./models/station');
const Transaction = require('./models/transaction');
const User = require('./models/user');
const Vehicle = require('./models/vehicle');
const TokenBlacklist = require('./models/tokenBlacklist');
// const userIsStationOperator = require('./models/userIsStationOperator');
// const VehicleChargedTransaction = require('./models/vehicleChargedTransaction');
// const StationHostCharger = require('./models/stationHostCharger');
// const StationOffersDiscountCharger = require('./models/stationOffersDiscountCharger');
// const UserHasVehicle = require('./models/userHasVehicle');

const app = express();

//Midleware for parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting up cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization,XOBSERVATORY-AUTH'
  );
  // res.setHeader('xobservatory-auth', '*');
  next();
});

// TODO ROUTES
// basic endpoint app.use('/evcharge/api)
app.use('/pog', (req, res, next) => {
  console.log('In the starting point!');
  res.send('<h1>Hello From fuck me up!</h1>');
  next();
});

// login/logout routes
app.use('/evcharge/api', authRoutes);
//admin routes
app.use('/evcharge/api/admin', adminRoutes);
//session routes
app.use('/evcharge/api', sessionRoutes);

// provider suppliers M:N
Provider.belongsToMany(Station, {
  through: ProviderSuppliesStation,
  foreignKey: 'idProvider',
  constraints: true,
  onDelete: 'SET NULL',
});
Station.belongsToMany(Provider, {
  through: ProviderSuppliesStation,
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'SET NULL',
});

// Station - Chargers 1: M
Station.hasMany(Charger, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'SET NULL',
});
Charger.belongsTo(Station, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'SET NULL',
});

//for stationOffersDiscountCharger.js Station - Discounts M:N

//for transaction.js  Anything else - Transaction 1 - M
User.hasMany(Transaction, {
  foreignKey: 'idUser',
  constraints: true,
  onDelete: 'SET NULL',
});
Charger.hasMany(Transaction, {
  foreignKey: 'idCharger',
  constraints: true,
  onDelete: 'SET NULL',
});
Transaction.belongsTo(Charger, {
  foreignKey: 'idCharger',
  constraints: true,
  onDelete: 'SET NULL',
});

Station.hasMany(Transaction, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'SET NULL',
});
Transaction.belongsTo(Station, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'SET NULL',
});
Provider.hasMany(Transaction, {
  foreignKey: 'idProvider',
  constraints: true,
  onDelete: 'SET NULL',
});
Transaction.belongsTo(Provider, {
  foreignKey: 'idProvider',
  constraints: true,
  onDelete: 'SET NULL',
});
Vehicle.hasMany(Transaction, {
  foreignKey: 'idVehicle',
  constraints: true,
  onDelete: 'SET NULL',
});
Transaction.belongsTo(Vehicle, {
  foreignKey: 'idVehicle',
  constraints: true,
  onDelete: 'SET NULL',
});

// User - Vehicle 1 - M
User.hasMany(Vehicle, {
  foreignKey: 'idUser',
  constraints: true,
  onDelete: 'SET NULL',
});
Vehicle.belongsTo(User, {
  foreignKey: 'idUser',
  constraints: true,
  onDelete: 'SET NULL',
});
// User - Station 1 - M
User.hasMany(Station, {
  foreignKey: 'idStationOperator',
  constraints: true,
  onDelete: 'SET NULL',
});
Station.belongsTo(User, {
  foreignKey: 'idStationOperator',
  constraints: true,
  onDelete: 'SET NULL',
});

// console.log('we are in');
sequelize
  .sync({ force: false }) // if i have this on true it drops all tables when it starts
  .then(result => {
    //console.log(result);
    const port = 8765;
    app.listen(port);
    console.log(
      chalk.yellow(
        figlet.textSync('Bridged!', {
          horizontalLayout: 'full',
        })
      )
    );
    console.log(
      chalk.redBright(
        `💀 DEFINITELY NOT Secure Server running on port ${port}! 💀`
      )
    );
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;
