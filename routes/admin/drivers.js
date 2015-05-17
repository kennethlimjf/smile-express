const
  express     = require('express'),
  router      = express.Router(),
  db          = require('../../models'),
  DriverQuery = require('../../queries/driver-query');

router.param('userId', function(request, response, next, userId) {
  new DriverQuery()
    .find(userId)
    .then(function(user) {
      request.user = user;
      return next();
    });
});

router
  // GET /admin/drivers
  .get('/admin/drivers', function(request, response, next) {
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
  .get('/admin/drivers/:userId', function(request, response, next) {
    response.render('admin/drivers/show', { driver: request.user });
  })

  // GET /admin/drivers/new
  .get('/admin/drivers', function(request, response, next) {
      var driverForm = new DriverForm(null);
      response.render('/admin/users/new')
  })

  // POST /admin/drivers
  .post('/admin/drivers', function(request, response, next) {
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
