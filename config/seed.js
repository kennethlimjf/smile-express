const
  db    = require('../models'),
  async = require('async'),
  _     = require('underscore'),
  Q     = require('q'),
  faker = require('faker');

var Seed = function(){};

Seed.prototype = _.extend(Seed.prototype, {
  run: function() {
    var _this = this;

    _this.createUsers      = _.range(20).map(n => _this.createUser);
    _this.createAdminUsers = _.range(1).map(n => _this.createAdminUser);
    _this.tasks            = _this.createUsers.concat(_this.createAdminUsers);

    this
      .forceSync()
      .then(function(){
        async.parallel(_this.tasks, _this.done);
      });
  },

  forceSync: function() {
    this.forceSyncDeferred = Q.defer();
    var _this = this;

    db.sequelize
      .sync({ force: true })
      .then(function() {
        _this.synced(null, true);
      });

    return this.forceSyncDeferred.promise;
  },

  synced: function(err, result) {
    if(err) {
      this.forceSyncDeferred.reject(err);
    } else {
      this.forceSyncDeferred.resolve(result);
    }
  },

  createUser: function(callback) {
    db.User
      .create({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        nickname: faker.name.findName(),
        shortDesc: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        phone: faker.phone.phoneNumber()
      })
      .then(function(user) {
        db.Profile
          .create({
            UserId: user.id,
            profileType: 'DriverProfile',
            data: {
              languagesSpoken: ['English', 'Khmer'],
              languagesWritten: ['Khmer'],
              drivingExperience: 10,
              cities: ['Siem Reap', 'Phnom Penh'],
              vehicles: ['Tuk Tuk', 'Car', 'Mini Bus']
            }
          })
          .then(function(){
            callback(null, true);
          });
      });
  },

  createAdminUser: function(callback) {
    db.AdminUser
      .create({
        email: 'admin',
        password: 'admin'
      })
      .then(function() {
        callback(null, true);
      });
  },

  done: function(err) {
    if(err) { throw err; }
    else { console.log('Seed Complete!'); }
  }
});

new Seed().run();
