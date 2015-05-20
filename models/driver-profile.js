'use strict';

var
  _             = require('underscore'),
  profileSchema = require('./profile/base-profile');

module.exports = function(sequelize, DataTypes) {

  var modelName = 'DriverProfile';
  var schemaDefinition = profileSchema(DataTypes);
  schemaDefinition.unshift(modelName);

  var driverMethods = {
    getterMethods: {
      languagesSpoken: function() {
        return this.data.languagesSpoken;
      },
      languagesWritten: function() {
        return this.data.languagesWritten;
      },
      cities: function() {
        return this.data.cities;
      },
      vehicles: function() {
        return this.data.vehicles;
      },
      drivingExperience: function() {
        return this.data.drivingExperience;
      }
    },

    setterMethods: {
      languagesSpoken: function(languagesSpoken) {
        this.data.languagesSpoken = languagesSpoken;
        this.setDataValue('data', this.data);
      },
      languagesWritten: function(languagesWritten) {
        this.data.languagesWritten = languagesWritten;
        this.setDataValue('data', this.data);
      },
      cities: function(cities) {
        this.data.cities = cities;
        this.setDataValue('data', this.data);
      },
      vehicles: function(vehicles) {
        this.data.vehicles = vehicles;
        this.setDataValue('data', this.data);
      },
      drivingExperience: function(drivingExperience) {
        this.data.drivingExperience = drivingExperience;
        this.setDataValue('data', this.data);
      }
    },

    instanceMethods: {
      hasSpoken: function(value) {
        return _.contains(this.languagesSpoken, value);
      },
      hasWritten: function(value) {
        return _.contains(this.languagesWritten, value);
      },
      hasCity: function(value) {
        return _.contains(this.cities, value);
      },
      hasVehicle: function(value) {
        return _.contains(this.vehicles, value);
      },
      addSpoken: function(value) {
        if (!this.hasSpoken(value)) {
          this.languagesSpoken = this.languagesSpoken.concat(value);
        }
      },
      addWritten: function(value) {
        if (!this.hasWritten(value)) {
          this.languagesWritten = this.languagesWritten.concat(value);
        }
      },
      addCity: function(value) {
        if (!this.hasCity(value)) {
          this.cities = this.cities.concat(value);
        }
      },
      addVehicle: function(value) {
        if (!this.hasVehicle(value)) {
          this.vehicles = this.vehicles.concat(value);
        }
      },
      removeSpoken: function(value) {
        this.languagesSpoken = _.without(this.languagesSpoken, value);
      },
      removeWritten: function(value) {
        this.languagesWritten = _.without(this.languagesWritten, value);
      },
      removeCities: function(value) {
        this.cities = _without(this.cities, value);
      },
      removeVehicles: function(value) {
        this.vehicles = _without(this.vehicles, value);
      },
    }
  };
  _.extend(_.last(schemaDefinition), driverMethods);

  return sequelize.define.apply(sequelize, schemaDefinition);
};
