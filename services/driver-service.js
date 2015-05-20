const
  Q  = require('q'),
  _  = require('underscore'),
  db = require('../models');

var DriverService = function() {};

DriverService.prototype = _.extend(DriverService.prototype, {
  update: function(models) {
    var _this = this;
    this.deferred = Q.defer();

    db.sequelize.transaction(function(t) {
      return models.user
                   .save({}, { transaction: t })
                   .then(function(user){
                      return models.profile.save({}, { transaction: t });
                   });
    })
    .then(function(result) {
      // Transaction success and committed
      _this.deferred.resolve(true);
    })
    .catch(function(err) {
      // Transaction failed and rolled-back
      _this.deferred.reject(false);
    });

    return this.deferred.promise;
  }
});

module.exports = DriverService
