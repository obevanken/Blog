'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   queryInterface.addColumn("users", "encrypt_password", Sequelize.STRING),
   queryInterface.addColumn("users", "email", Sequelize.STRING),
   queryInterface.addColumn("users", "admin", Sequelize.BOOLEAN)
  },

  down: (queryInterface, Sequelize) => {
   queryInterface.removeColumn("users", "encrypt_password"),
   queryInterface.removeColumn("users", "email"),
   queryInterface.removeColumn("users", "admin")
  }
};
