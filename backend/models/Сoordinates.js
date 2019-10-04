const Sequelize = require('sequelize');
const sequelize = require('../dbSettings/sequelize');

const Сoordinates = sequelize.define('coordinate', {
  accuracy: {
    type: Sequelize.DECIMAL,
  },
  altitude: {
    type: Sequelize.DECIMAL,
  },
  heading: {
    type: Sequelize.DECIMAL,
  },
  latitude: {
    type: Sequelize.DECIMAL,
  },
  longitude: {
    type: Sequelize.STRING,
  },
  speed: {
    type: Sequelize.DECIMAL(10, 2),
  },

  timestamp: {
    type: Sequelize.DATE,
  },
});

module.exports = Сoordinates;
