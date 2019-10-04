const Sequelize = require('sequelize');
const sequelize = require('../dbSettings/sequelize');
const User = require('./User');

const Family = sequelize.define('family', {
  family_name: {
    type: Sequelize.STRING,
  },
});
// Family.belongsToMany(User, {
//   through: 'userFamilys',
//   as: 'users',
//   foreignKey: 'familyId',
// });

module.exports = Family;
