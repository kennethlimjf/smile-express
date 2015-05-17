'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'AdminUsers', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

        email:          { type: Sequelize.STRING, unique: true, required: true },
        passwordDigest: { type: Sequelize.STRING, required: true },
        status:         { type: Sequelize.STRING, defaultValue: 'active' },
        createdAt:      Sequelize.DATE,
        updatedAt:      Sequelize.DATE
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('AdminUsers');
  }
};
