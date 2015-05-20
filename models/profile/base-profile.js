'use strict';

module.exports = function(DataTypes) {
  return [
    {
      UserId:      DataTypes.INTEGER,
      profileType: DataTypes.STRING,
      data:        DataTypes.JSONB,
      createdAt:   DataTypes.DATE,
      updatedAt:   DataTypes.DATE
    },
    {
      tableName: 'Profiles'
    }
  ];
};
