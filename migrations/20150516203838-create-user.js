'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Users', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

        email:          { type: Sequelize.STRING, unique: true, required: true },
        passwordDigest: Sequelize.STRING,
        firstName:      Sequelize.STRING,
        lastName:       Sequelize.STRING,
        nickname:       Sequelize.STRING,
        shortDesc:      Sequelize.TEXT,
        description:    Sequelize.TEXT,
        phone:          Sequelize.STRING,
        status:         { type: Sequelize.STRING, defaultValue: 'active' },
        available:      { type: Sequelize.BOOLEAN, defaultValue: true },
        avatarUrl:      Sequelize.STRING,
        videoUrl:       Sequelize.STRING,
        source:         Sequelize.STRING,
        facebookUrl:    Sequelize.STRING,
        wechatId:       Sequelize.STRING,
        whatsappId:     Sequelize.STRING,
        createdAt:      Sequelize.DATE,
        updatedAt:      Sequelize.DATE
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
