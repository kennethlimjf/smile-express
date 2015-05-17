'use strict';

module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define(
    'Profile', {
      UserId:      DataTypes.INTEGER,
      profileType: DataTypes.STRING,
      data:        DataTypes.JSONB,
      createdAt:   DataTypes.DATE,
      updatedAt:   DataTypes.DATE
    }
  );

  return Profile;
};
