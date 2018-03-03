'use strict';
module.exports = (sequelize, DataTypes) => {
  var articles = sequelize.define('articles', {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    }
  }, {});
  articles.associate = function(models) {
      articles.belongsTo(models.users, {foreignKey: "user_id"});
  };
  return articles;
};
