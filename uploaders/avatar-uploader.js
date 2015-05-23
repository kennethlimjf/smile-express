const
  Q        = require('q'),
  _        = require('underscore'),
  async    = require('async'),
  path     = require('path'),
  moment   = require('moment'),
  papercut = require('papercut');

papercut.configure(function(){
  papercut.set('storage', 'file');
  papercut.set('directory', path.join(__dirname, '/../public/images/uploads/avatar'));
  papercut.set('url', '/images/uploads/avatar');
  papercut.set('extension', 'jpg');
});

var AvatarUploader = papercut.Schema(function() {
  this.version({
    name: 'avatar',
    size: '250x250',
    process: 'resize'
  });
});

AvatarUploader.prototype = _.extend(AvatarUploader.prototype, {
  filename: function() {
    var
      userId = (this.request.driver === undefined) ? '_' : this.request.driver.user.id ,
      time   = moment().format('YYYYMMDDhhmmss');

    return userId + '-' + time;
  },

  processUpload: function(request) {
    this.request  = request;
    this.filename = this.filename();
    this.deferred = Q.defer();

    async.waterfall([
      this.startProcess.bind(this),
    ], this.done);

    return this.deferred.promise;
  },

  startProcess: function(next) {
    this.completeProcess = next;
    this.process(
      this.filename,
      this.request.files.avatar.path,
      this.handleProcessComplete.bind(this)
    );
  },

  handleProcessComplete: function(err, images) {
    this.request.body.avatarUrl = images.avatar;
    this.completeProcess();
  },

  done: function() {
    this.deferred.resolve();
  }
});

module.exports = AvatarUploader;
