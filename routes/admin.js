const
  _             = require('underscore'),
  express       = require('express'),
  router        = express.Router(),
  driversRouter = require('./admin/drivers'),
  adminAuth     = require('../middleware/admin-auth');

router
   // GET /admin
  .get('/admin', function(request, response, next) {
    if(request.isAuthenticated()) {
      response.redirect('/admin/dashboard');
    } else {
      response.addLocals({
        csrfToken: request.csrfToken(),
        error:     request.flash('error'),
        notice:    request.flash('notice')
      });
      response.render('admin/index');
    }
  })

  // POST /admin/login
  .post('/admin/login', adminAuth.authenticate, function(request, response, next) {
    response.redirect('/admin/dashboard');
  })

  // DELETE /admin/logout
  .delete('/admin/logout', adminAuth.isAuthed, function(request, response, next) {
    request.logout();
    request.flash('notice', 'Logged Out')
    response.redirect('/admin');
  })

  // GET /admin/dashboard
  .get('/admin/dashboard', adminAuth.isAuthed, function(request, response, next) {
    response.render('admin/dashboard');
  })

  // VERB /admin/drivers*
  .use(adminAuth.isAuthed, driversRouter);

module.exports = router;
