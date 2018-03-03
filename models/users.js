'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    encrypt_password: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
    }
  }, {
    setterMethods: {
      password: async (value) => {
        try{
        var salt = await bcrypt.genSalt(10);
        var passwordToSave = await bcrypt.hash(value, salt);
        await this.setDataValue('encrypt_password', passwordToSave);
      }catch(err){
        console.error(err);
      }
    },
      instanceMethods:{
        verifyPass: async (pass) => {
          try{
            var result = await bcrypt.compare(pass, this.encrypt_password);
            return result;
          } catch(err){
            console.log(err);
          }
        }
      }
    }
  });
  users.associate = function(models) {
     users.hasMany(models.articles, {foreignKey: "user_id"});
  };
  return users;
};
