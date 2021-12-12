let Sequelize = require('sequelize');
let sequelize;
if (process.env.NODE_ENV == undefined) process.env.NODE_ENV = 'itdoestmatter';
if (process.env.NODE_ENV.trim() === 'test') {
  sequelize = new Sequelize('car_apptest', 'root', 'Kappa123!', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
  });
  // console.log('basi test');
} else {
  sequelize = new Sequelize('car_app123', 'root', 'Kappa123!', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
  });
  // console.log('basi kanoniki');
}
//test db car_apptest

module.exports = sequelize;
