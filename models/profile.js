'use strict';

var profileSchema = require('./profile/base-profile');

module.exports = function(sequelize, DataTypes) {

  var modelName = 'Profile';
  var schemaDefinition = profileSchema(DataTypes);
  schemaDefinition.unshift(modelName);

  return sequelize.define.apply(sequelize, schemaDefinition);
};
