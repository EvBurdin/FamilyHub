const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  `postgres://${process.env.dbUser}:${process.env.dbPassword}@134.209.82.36:5432/familyhub`,
);

module.exports = sequelize;
