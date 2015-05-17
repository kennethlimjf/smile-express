module.exports = function(request, response, next) {
  // Save authenticated admin user in different key to avoid being overwritten
  request.authedAdminUser = request.user
  next();
}
