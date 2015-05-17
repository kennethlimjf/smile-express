const
  path    = require('path'),
  express = require('express');

module.exports = express.static(path.join(process.cwd(), 'public'));
