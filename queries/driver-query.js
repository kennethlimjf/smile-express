const
  db    = require('../models'),
  _     = require('underscore'),
  Q     = require('q'),
  async = require('async');

var DriverQuery = function(){};

DriverQuery.prototype = _.extend(DriverQuery.prototype, {
  findAll: function() {
    this.deferred = Q.defer();

    _.bindAll(this, '_findAllDriverProfiles', '_findAllUsers', '_filterDrivers', '_result');
    async.waterfall([
      this._findAllDriverProfiles,
      this._findAllUsers,
      this._filterDrivers,
    ], this._result);

    return this.deferred.promise;
  },

  find: function(userId) {
    this.userId = userId;
    this.deferred = Q.defer();

    _.bindAll(this, '_findUser', '_filterDriver', '_result');
    async.waterfall([
      this._findUser,
      this._filterDriver,
    ], this._result);

    return this.deferred.promise;
  },

  _findAllDriverProfiles: function(next) {
    db.Profile
      .findAll({ where: { profileType: 'DriverProfile' } })
      .then(function(profiles) {
        next(null, profiles);
      });
  },

  _findAllUsers: function(profiles, next) {
    userIds = profiles.map( p => p.UserId );
    db.User
      .findAll({
        include: [{ model: db.Profile, as: 'Profiles' }],
        where:   { id: { $in: userIds } }
      })
      .then(function(users) {
        next(null, users);
      });
  },

  _filterDrivers: function(users, next) {
    var drivers = _.map(users, this._driverView);
    next(null, drivers);
  },

  _findUser: function(next) {
    db.User
      .find({
        include: [{ model: db.Profile, as: 'Profiles' }],
        where:   { id: this.userId }
      })
      .then(function(user) {
        next(null, user);
      });
  },

  _filterDriver: function(user, next){
    next(null, this._driverView(user));
  },

  _driverView: function(user) {
    var driver = { user: user, profile: user.Profiles[0] };
    return driver;
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
