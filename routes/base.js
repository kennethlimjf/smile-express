const
  _               = require('underscore'),
  express         = require('express'),
  router          = express.Router();

router
  .all('*', function(request, response, next){
    response.addLocals({
      authedAdminUser: request.authedAdminUser,
      csrfToken:       request.csrfToken()
    });
    next();
  })

  .get('/', function(request, response, next) {
    response.render('home', { title: 'Express' });
  });

module.exports = router;
