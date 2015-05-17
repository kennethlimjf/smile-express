const
  session    = require('express-session'),
  RedisStore = require('connect-redis')(session);

module.exports = session({
  secret: 'smile_secret',
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    host: 'localhost',
    port: 6379
  })
});
