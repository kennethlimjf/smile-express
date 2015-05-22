const
  _  = require('underscore'),
  db = require('../models');

var DriverSerializer = function(driver) {
  this.driver = driver;
};

DriverSerializer.prototype = _.extend(DriverSerializer.prototype, {
  blacklist: ['passwordDigest'],

  toJSON: function() {
    var json = {};
    var keys = _.difference(Object.keys(db.User.tableAttributes), this.blacklist);
    var _this = this;

    keys.forEach(k => (json[k] = _this.driver.user[k]));
    json.data = this.driver.profile.data;
    return json;
  }
});

module.exports = DriverSerializer;
