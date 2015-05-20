var pageNotFoundError = function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

var internalErrorDevelopment = function(err, request, response, next) {
  response.status(err.status || 500);
  response.render('error', {
    message: err.message,
    error: err,
    stack: err.stack
  });
};

var internalErrorProduction = function(err, request, response, next){
  response.status(err.status || 500);
  response.render('error', {
    message: err.message,
    error: {}
  });
};

module.exports = function(app) {
  if (app.get('env') === 'development') {
    return [pageNotFoundError, internalErrorDevelopment];
  } else {
    return [pageNotFoundError, internalErrorProduction];
  }
};
