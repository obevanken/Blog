'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    encrypt_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    setterMethods: {
      password: function(v) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(v, salt);
        this.setDataValue('encrypt_password', hash);
      }
    }
  });

  users.prototype.verifyPass = function(pass){
  return bcrypt.compareSync(pass, this.encrypt_password);
  };

  users.associate = function(models) {
    users.hasMany(models.articles, {
      foreignKey: "user_id"
    });
  };
  
  return users;
};
