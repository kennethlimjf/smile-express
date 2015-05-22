const
  express       = require('express'),
  router        = express.Router(),
  driversRouter = require('./api/drivers');

router

  // VERB /admin/drivers*
  .use(driversRouter);

module.exports = router;
