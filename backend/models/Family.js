module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    family_name: {
      type: DataTypes.STRING,
    },
  });
  Family.associate = (models) => {
    Family.belongsToMany(models.User, {
      through: 'UsersFamily',
      as: 'users',
      foreignKey: 'familyId',
    });
  };
  return Family;
};
