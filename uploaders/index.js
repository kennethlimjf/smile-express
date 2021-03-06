const
  _              = require('underscore'),
  async          = require('async'),
  AvatarUploader = require('./avatar-uploader'),
  WallUploader   = require('./wall-uploader');

var UploadsHandler = function(request, next) {
  this.request         = request;
  this.uploads         = [];
  this.uploadsComplete = next;
};

UploadsHandler.prototype = _.extend({
  enqueue: function(uploader) {
    var _this = this;
    var task = function(callback) {
      uploader
        .processUpload.call(uploader, _this.request)
        .then(function(){
          callback(null, true);
        });
    };
    this.uploads.push(task);
  },

  processUploads: function() {
    async.parallel(this.uploads, this.done.bind(this));
  },

  done: function() {
    this.uploadsComplete();
  }
});

var handleUploads = function(request, response, next) {
  var uploadsHandler = new UploadsHandler(request, next);

  if(request.files.avatar !== undefined) {
    var avatarUploader = new AvatarUploader();
    uploadsHandler.enqueue(avatarUploader);
  }
  if(request.files.wall !== undefined) {
    var wallUploader = new WallUploader();
    uploadsHandler.enqueue(wallUploader);
  }

  uploadsHandler.processUploads();
};

module.exports = {
  AvatarUploader: AvatarUploader,
  WallUploader:   WallUploader,
  handleUploads:  handleUploads
};
