const
  _  = require('underscore'),
  S  = require('string'),
  db = require('../models');

var DriverSerializer = function(driver) {
  this.driver = driver;
};

DriverSerializer.prototype = _.extend(DriverSerializer.prototype, {
  blacklist: ['passwordDigest'],

  toJSON: function() {
    var _this = this;
    var json = {};

    var keys = _.difference(Object.keys(db.User.tableAttributes), this.blacklist);
    keys.forEach(k => (json[S(k).underscore()] = _this.driver.user[k]));

    var dataKeys = Object.keys(this.driver.profile.data);
    dataKeys.forEach(k => (json[S(k).underscore()] = _this.driver.profile.data[k]));

    return json;
  }
});

module.exports = DriverSerializer;
