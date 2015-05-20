const
  db    = require('../models'),
  _     = require('underscore'),
  Q     = require('q'),
  async = require('async');

var DriverQuery = function(){};

DriverQuery.prototype = _.extend(DriverQuery.prototype, {
  findAll: function() {
    this.deferred = Q.defer();

    _.bindAll(this, '_findAllDriverProfiles', '_findAllUsers', '_result');
    async.waterfall([
      this._findAllDriverProfiles,
      this._findAllUsers
    ], this._result);

    return this.deferred.promise;
  },

  find: function(userId) {
    this.userId = userId;
    this.deferred = Q.defer();

    _.bindAll(this, '_findUser', '_result');
    async.waterfall([
      this._findUser,
    ], this._result);

    return this.deferred.promise;
  },

  _findAllDriverProfiles: function(next) {
    db.DriverProfile
      .findAll({
        include: [{ model: db.User, as: 'User' }],
        where: { profileType: 'DriverProfile' }
      })
      .then(function(profiles) {
        next(null, profiles);
      });
  },

  _findAllUsers: function(profiles, next) {
    users = profiles.map( p => ({ user: p.User, profile: p }));
    next(null, users);
  },

  _findUser: function(next) {
    db.User
      .find({
        include: [{ model: db.DriverProfile, as: 'DriverProfile' }],
        where:   { id: this.userId }
      })
      .then(function(user) {
        next(null, {user: user, profile: user.DriverProfile});
      });
  },

  _result: function(err, result) {
    if(err) {
      this.deferred.reject(err);
    } else {
      this.deferred.resolve(result);
    }
  }
});

module.exports = DriverQuery;
