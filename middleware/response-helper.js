const _ = require('underscore');

var addLocals = function(locals) {
  this.locals = _.extend(this.locals, locals);
}

module.exports = function(request, response, next) {
  response = _.extend(response, {
    addLocals: addLocals
  });
  next();
}
