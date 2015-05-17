const
  _      = require('underscore'),
  models = require('../models');

var DriverService = function() {
};

DriverService.prototype = _.extend(DriverService.prototype, {
  create: function(userParams, profileParams) {
  },

  update: function(userParams, profileParams) {
  },

  destroyUser: function(user) {
  },

  destroyProfile: function(profile) {
  }
});

module.exports = DriverService
