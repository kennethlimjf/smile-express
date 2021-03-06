const
  Q             = require('q'),
  db            = require('../models'),
  _             = require('underscore'),
  DriverService = require('../services/driver-service');

var DriverForm = function(params) {
  this.submitData = params.submitData;
  this.formUrl    = params.formUrl;
  this.driver     = params.driver;
  this.action     = params.action;
  this.data       = {};

  this._setFormData();
};

DriverForm.prototype = _.extend(DriverForm.prototype, {
  excludeKeys:     ['id', 'passwordDigest', 'createdAt', 'updatedAt'],
  spokenOptions: [
    { key: 'spoken_english',  value: 'English',  checked: null },
    { key: 'spoken_mandarin', value: 'Mandarin', checked: null },
    { key: 'spoken_khmer',    value: 'Khmer',    checked: null }
  ],
  writtenOptions: [
    { key: 'written_english',  value: 'English',  checked: null },
    { key: 'written_mandarin', value: 'Mandarin', checked: null },
    { key: 'written_khmer',    value: 'Khmer',    checked: null }
  ],
  vehicleOptions:  [
    { key: 'vehicle_tuktuk',  value: 'Tuk Tuk',  checked: null },
    { key: 'vehicle_minibus', value: 'Mini Bus', checked: null },
    { key: 'vehicle_car',     value: 'Car',      checked: null }
  ],
  cityOptions:     [
    { key: 'city_siemreap',  value: 'Siem Reap',  checked: null },
    { key: 'city_phnompenh', value: 'Phnom Penh', checked: null }
  ],

  save: function() {
    this.process();

    if (this.action === 'create') {
      return this.create();
    } else if (this.action === 'update') {
      return this.update();
    }
  },

  create: function() {
    this.deferred = Q.defer();
    var callback = function(result) {
      this.deferred.resolve(result);
    }.bind(this);

    new DriverService()
      .save({ user: this.driver.user, profile: this.driver.profile  })
      .then(callback);

    return this.deferred.promise;
  },

  update: function() {
    this.deferred = Q.defer();
    var callback = function(result) {
      this.deferred.resolve(result);
    }.bind(this);

    new DriverService()
      .save({ user: this.driver.user, profile: this.driver.profile })
      .then(callback);

    return this.deferred.promise;
  },

  _setFormData: function() {
    this._setUserData();
    this._setProfileData();
  },

  _userKeys: function() {
    return _.difference(this.driver.user.options.attributes, this.excludeKeys);
  },

  _setUserData: function() {
    var _this = this;
    this._userKeys().forEach(key => _this.data[key] = _this.driver.user[key]);
  },

  _setProfileData: function() {
    this.cityOptions[0].checked = this.driver.profile.hasCity('Siem Reap');
    this.cityOptions[1].checked = this.driver.profile.hasCity('Phnom Penh');
    this.data.cityOptions = this.cityOptions;

    this.vehicleOptions[0].checked = this.driver.profile.hasVehicle('Tuk Tuk');
    this.vehicleOptions[1].checked = this.driver.profile.hasVehicle('Mini Bus');
    this.vehicleOptions[2].checked = this.driver.profile.hasVehicle('Car');
    this.data.vehicleOptions = this.vehicleOptions;

    this.spokenOptions[0].checked = this.driver.profile.hasSpoken('English');
    this.spokenOptions[1].checked = this.driver.profile.hasSpoken('Mandarin');
    this.spokenOptions[2].checked = this.driver.profile.hasSpoken('Khmer');
    this.data.spokenOptions = this.spokenOptions;

    this.writtenOptions[0].checked = this.driver.profile.hasWritten('English');
    this.writtenOptions[1].checked = this.driver.profile.hasWritten('Mandarin');
    this.writtenOptions[2].checked = this.driver.profile.hasWritten('Khmer');
    this.data.writtenOptions = this.writtenOptions;

    this.data.drivingExperience = this.driver.profile.drivingExperience;
  },

  process: function() {
    this._processUser();
    this._processProfile();
  },

  _processUser: function() {
    var _this = this;
    var user = this.driver.user
    var userKeys = Object.keys(db.User.tableAttributes);
    var keys = _.difference(userKeys, this.excludeKeys);
    keys.forEach(function(key) {
      user.setDataValue(key, _this.submitData[key]);
    });
  },

  _processProfile: function() {
    this.driver.profile.data.cities           = [];
    this.driver.profile.data.vehicles         = [];
    this.driver.profile.data.languagesSpoken  = [];
    this.driver.profile.data.languagesWritten = [];

    if(this.submitData.hasOwnProperty("city_siemreap")) { this.driver.profile.addCity("Siem Reap"); }
    if(this.submitData.hasOwnProperty("city_phnompenh")) { this.driver.profile.addCity("Phnom Penh"); }

    if(this.submitData.hasOwnProperty("vehicle_tuktuk")) { this.driver.profile.addVehicle("Tuk Tuk"); }
    if(this.submitData.hasOwnProperty("vehicle_minibus")) { this.driver.profile.addVehicle("Mini Bus"); }
    if(this.submitData.hasOwnProperty("vehicle_car")) { this.driver.profile.addVehicle("Car"); }

    if(this.submitData.hasOwnProperty("spoken_english")) { this.driver.profile.addSpoken("English"); }
    if(this.submitData.hasOwnProperty("spoken_mandarin")) { this.driver.profile.addSpoken("Mandarin"); }
    if(this.submitData.hasOwnProperty("spoken_khmer")) { this.driver.profile.addSpoken("Khmer"); }

    if(this.submitData.hasOwnProperty("written_english")) { this.driver.profile.addWritten("English"); }
    if(this.submitData.hasOwnProperty("written_mandarin")) { this.driver.profile.addWritten("Mandarin"); }
    if(this.submitData.hasOwnProperty("written_khmer")) { this.driver.profile.addWritten("Khmer"); }

    this.driver.profile.drivingExperience = this.submitData['drivingExperience'];
  },

  toString: function() {
    return JSON.stringify(this.data);
  }
});

module.exports = DriverForm;
