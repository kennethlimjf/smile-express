const
  path    = require('path'),
  sass    = require('node-sass-middleware');
  appPath = process.cwd();

module.exports = sass({
  src:         appPath,
  dest:        path.join(appPath, '/public'),
  debug:       true,
  outputStyle: 'compressed',
  prefix:      '/prefix'
})
