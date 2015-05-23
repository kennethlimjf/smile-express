const
  express       = require('express'),
  router        = express.Router(),
  db            = require('../../models'),
  uploaders     = require('../../uploaders'),
  DriverQuery   = require('../../queries/driver-query'),
  DriverForm    = require('../../forms/driver-form'),
  DriverService = require('../../services/driver-service');

router.param('userId', function(request, response, next, userId) {
  if(userId !== 'new') {
    new DriverQuery()
      .find(userId)
      .then(function(driver) {
        request.driver = driver;
        return next();
      });
  } else {
    return next();
  }
});

router
  // GET /admin/drivers
  .get('/admin/drivers', function(request, response) {
    new DriverQuery()
      .findAll()
      .then(function(drivers){
        response.addLocals({
          drivers: drivers,
          notice: request.flash('notice')
        });
        response.render('admin/drivers');
      })
      .fail(function(err){
        response.render('error', { error: err.message });
      });
  })

  // GET /admin/drivers/:userId
  .get('/admin/drivers/:userId', function(request, response, next) {
    if(request.params.userId === 'new') { return next(); }
    response.render('admin/drivers/show', { driver: request.driver });
  })

  // GET /admin/drivers/new
  .get('/admin/drivers/new', function(request, response) {
    var
      formUrl    = '/admin/drivers',
      driver     = new DriverService().build(),
      formParams = {
        driver:  driver,
        formUrl: formUrl,
        action: 'new'
      };

    var form = new DriverForm(formParams);
    response.addLocals({ notice: request.flash('notice') })
    response.render('admin/drivers/new', { form: form });
  })

  // POST /admin/drivers
  .post('/admin/drivers', function(request, response) {
    var
      formUrl    = '/admin/drivers/' + request.params.userId + '?_method=PUT',
      driver     = new DriverService().build(),
      formParams = {
        driver:     driver,
        formUrl:    formUrl,
        submitData: request.body,
        action:     'create'
      };

    var form = new DriverForm(formParams);
    form.save().then(function(){
      request.flash('notice', 'Driver updated');
      response.redirect('/admin/drivers');
    });
  })

  // GET /admin/drivers/:userId/edit
  .get('/admin/drivers/:userId/edit', function(request, response) {
    var
      formUrl = '/admin/drivers/' + request.params.userId + '?_method=PUT',
      formParams = {
        formUrl: formUrl,
        driver:  request.driver,
        action:  'edit'
      };

    var form = new DriverForm(formParams);
    response.addLocals({ notice: request.flash('notice') });
    response.render('admin/drivers/edit', { form: form });
  })

  // PUT /admin/drivers/:userId/update
  .put('/admin/drivers/:userId', uploaders.handleUploads, function(request, response) {
    var
      formUrl    = '/admin/drivers/' + request.params.userId + '?_method=PUT',
      formParams = { formUrl: formUrl, driver: request.driver, submitData: request.body, action: 'update' },
      form       = new DriverForm(formParams);

    form.save().then(function() {
      request.flash('notice', 'Driver updated');
      response.redirect('/admin/drivers/' + request.params.userId + '/edit');
    });
  })

  // DELETE /admin/drivers/:userId
  .delete('/admin/drivers/:userId', function(request, response) {
    new DriverService()
      .destroy(request.driver)
      .then(function() {
        request.flash('notice', 'Driver destroyed');
        response.redirect('/admin/drivers');
      });
  });

module.exports = router;
