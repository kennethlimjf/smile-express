'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Profiles', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

        UserId:      { type: Sequelize.INTEGER, required: true },
        profileType: { type: Sequelize.STRING, required: true },
        data:        { type: Sequelize.JSONB, default: {} },
        createdAt:   Sequelize.DATE,
        updatedAt:   Sequelize.DATE
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Profiles');
  }
};
