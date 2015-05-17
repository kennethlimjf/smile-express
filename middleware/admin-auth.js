const
  passport       = require('passport'),
  LocalStrategy  = require('passport-local').Strategy,
  models         = require('../models'),
  adminLoginPath = '/admin'

passport.serializeUser(function(user, done) {
  if(user.__options.name.singular === 'AdminUser') {
    done(null, { userId: user.id, admin: true });
  } else {
    done(null, false, { message: 'Not authorized' });
  }
});

passport.deserializeUser(function(passportSession, done){
  if(passportSession.admin) {
    models.AdminUser
      .find(passportSession.userId)
      .then(function(user) {
        done(null, user);
      });
  } else {
    done(null, false, { message: 'Not authorized' });
  }
});

passport.use(new LocalStrategy(
  function(email, password, done) {
    models.AdminUser
      .find({ where: { email: email }})
      .then(function(user) {
        if(!user) { return done(null, false, { message: 'Invalid email/password' }); }
        if(user.authenticate(password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid email/password' });
        }
      });
  }
));

var isAuthed = function (request, response, next) {
  if(request.isAuthenticated()) { return next(); }
  response.redirect(adminLoginPath);
}

var authenticate = passport.authenticate(
  'local', {
    failureRedirect: adminLoginPath,
    failureFlash: true
  });

module.exports = {
  authenticate: authenticate,
  isAuthed:     isAuthed,
  passport:     passport
}
