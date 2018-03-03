'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
    }
  }, {});
  users.associate = function(models) {
     users.hasMany(models.articles, {foreignKey: "user_id"});
  };
  return users;
};
