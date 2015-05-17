const
  path       = require('path'),
  express    = require('express'),
  middleware = require('./middleware'),
  router     = require('./routes');

var app = express();

// Use handlebars template
middleware.handlebars(app);

// Setup middleware and routes
app
  .set('x-powered-by', false)
  .use(middleware.responseTime)
  .use(middleware.sass)
  .use(middleware.favicon)
  .use(middleware.static)
  .use(middleware.methodOverride)
  .use(middleware.compression)
  .use(middleware.logger)
  .use(middleware.bodyParser.json)
  .use(middleware.bodyParser.urlencoded)
  .use(middleware.cookieParser)
  .use(middleware.session)
  .use(middleware.csrf)
  .use(middleware.flash)
  .use(middleware.adminAuth.passport.initialize())
  .use(middleware.adminAuth.passport.session())
  .use(middleware.requestHelper)
  .use(middleware.responseHelper)
  .use(router)
  .use(middleware.errorHandler(app));

module.exports = app;
