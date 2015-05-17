var db = require("../models");

db.sequelize
  .sync({force: true})
  .then(function() {
    createUser();
    createAdminUser();
  });

function createUser() {
  db.User
    .create({
      email: 'john@smith.com',
      firstName: 'John',
      lastName: 'Smith',
      nickname: 'Johnny',
      shortDesc: 'This is a short description',
      description: 'This is a description',
      phone: '+12345678'
    })
    .then(function(user) {
      user1 = user;
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
        });
    });
}

function createAdminUser() {
  db.AdminUser
    .create({
      email: 'admin',
      password: 'admin'
    })
}
