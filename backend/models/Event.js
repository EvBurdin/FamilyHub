module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      toWhom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: [''] },
      },
    },
  );
  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: 'toWhom' });
    Event.belongsTo(models.User, { foreignKey: 'user' });
  };
  return Event;
};
