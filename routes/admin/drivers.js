const
  express     = require('express'),
  router      = express.Router(),
  db          = require('../../models'),
  DriverQuery = require('../../queries/driver-query');

router.param('userId', function(request, response, next, userId) {
  new DriverQuery()
    .find(userId)
    .then(function(driver) {
      request.driver = driver;
      return next();
    });
});

router
  // GET /admin/drivers
  .get('/admin/drivers', function(request, response) {
    new DriverQuery()
      .findAll()
      .then(function(drivers){
        response.addLocals({ drivers: drivers });
        response.render('admin/drivers');
      })
      .fail(function(err){
        response.render('error', { error: err.message });
      });
  })

  // GET /admin/drivers/:userId
  .get('/admin/drivers/:userId', function(request, response) {
    response.render('admin/drivers/show', { driver: request.driver });
  })

  // GET /admin/drivers/:userId/edit
  .get('/admin/drivers/:userId/edit', function(request, response) {
    response.render('admin/drivers/edit', { driver: request.driver });
  })

  // GET /admin/drivers/new
  .get('/admin/drivers', function(request, response) {
      var driverForm = new DriverForm(null);
      response.render('/admin/users/new')
  })

  // POST /admin/drivers
  .post('/admin/drivers', function(request, response) {
    var formParams;
    var form = new DriverForm(request, response);

    if(form.valid()) {
      form.save().then(function(response){
        response.redirect('admin/users');
      });
    } else {
      response.addLocals({ errors: form.errorMessages() });
      response.render('/admin/users/new');
    }
  });

module.exports = router;
