const Sequelize = require('sequelize');
const sequelize = require('../dbSettings/sequelize');

const GroupUsers = sequelize.define('GroupUsers', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Family',
      key: 'id',
    },
  },
});
module.exports = GroupUsers;
