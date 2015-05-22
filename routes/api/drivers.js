const
  express          = require('express'),
  router           = express.Router(),
  DriverQuery      = require('../../queries/driver-query'),
  DriverSerializer = require('../../serializers/driver-serializer');

router.param('userId', function(request, response, next, userId) {
  new DriverQuery()
    .find(userId)
    .then(function(driver) {
      request.driver = driver;
      return next();
    });
});

router
  // Find all drivers [GET /api/drivers]
  .get('/api/drivers', function(request, response) {
    new DriverQuery()
      .findAll()
      .then(function(drivers) {
        var serializedDrivers = drivers.map(d => new DriverSerializer(d).toJSON());
        var payload = { drivers: serializedDrivers };
        response.send(payload);
      });
  })

  // Find a driver [GET /api/drivers/:id]
  .get('/api/drivers/:userId', function(request, response){
    var payload = { driver: new DriverSerializer(request.driver).toJSON() };
    response.send(payload);
  });

module.exports = router;
