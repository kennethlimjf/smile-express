const
  path   = require('path'),
  exphbs = require('express-handlebars');

module.exports = function(app) {
  app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'hbs');
};
