const
  Q             = require('q'),
  _             = require('underscore'),
  DriverService = require('../services/driver-service');

var DriverForm = function(params) {
  this.params = params;
};

DriverForm.prototype = _.extend(DriverForm.prototype, {
  valid: function() {

  }
});

module.exports = DriverForm
