'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    'User', {
      email:          DataTypes.STRING,
      passwordDigest: DataTypes.STRING,
      firstName:      DataTypes.STRING,
      lastName:       DataTypes.STRING,
      nickname:       DataTypes.STRING,
      shortDesc:      DataTypes.TEXT,
      description:    DataTypes.TEXT,
      phone:          DataTypes.STRING,
      status:         { type: DataTypes.STRING, defaultValue: "active" },
      available:      { type: DataTypes.BOOLEAN, defaultValue: true },
      avatarUrl:      DataTypes.STRING,
      videoUrl:       DataTypes.STRING,
      source:         DataTypes.STRING,
      facebookUrl:    DataTypes.STRING,
      wechatId:       DataTypes.STRING,
      whatsappId:     DataTypes.STRING,
      createdAt:      DataTypes.DATE,
      updatedAt:      DataTypes.DATE
    }
  );

  return User;
};
