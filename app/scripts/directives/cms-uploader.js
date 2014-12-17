
/**
@ngdoc directive
@name angularCmsApp.directive:cmsUploader
@element div
@function
@description
	This is an example uploader.
 */
'use strict';
angular.module('angularCmsApp').directive('cmsUploader', function() {
  var postLink;
  return {
    scope: {
      ngModel: '='
    },
    template: '<div class="uploader">\n  <div class="uploader-dropzone">\n    <h4>Drop files here</h4>\n    <p>\n      <span>or</span>\n    </p>\n    <button id="uploader-btn" class="btn btn-default">Select files</button>\n    <input id="uploader-input" type="file" name="files[]" multiple />\n  </div>\n</div>',
    restrict: 'E',
    replace: true,
    transclude: false,
    require: '^?ngModel',
    link: postLink = function($scope, $element, $attrs, ngModel) {
      var Uploader;
      Uploader = function() {
        this.files = [];
        this.inputEl = document.getElementById('uploader-input');
        this.input = $element.find('#uploader-input');
        this.input.hide();
        $element.find('button').bind('click', (function(_this) {
          return function(e) {
            return _this.input.trigger('click');
          };
        })(this));
        this.inputEl.addEventListener('change', (function(_this) {
          return function(e) {
            var file, _i, _len, _ref, _results;
            _this.files = _this.inputEl.files;
            _ref = _this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              file = _ref[_i];
              _results.push(_this.uploadFile(file));
            }
            return _results;
          };
        })(this));
        return this.uploadFile = function(file) {
          var form, transferCanceled, transferComplete, transferFailed, updateProgress, xhr;
          form = new FormData();
          form.append('files[]', file);
          xhr = new XMLHttpRequest();
          updateProgress = function(oEvent) {
            var percentComplete;
            console.log(oEvent.loaded, oEvent.total);
            if (oEvent.lengthComputable) {
              percentComplete = oEvent.loaded / oEvent.total;
              return console.log(percentComplete);
            } else {
              return console.log(event);
            }
          };
          transferComplete = function(evt) {
            return console.warn("The transfer is complete.");
          };
          transferFailed = function(evt) {
            return console.error("An error occurred while transferring the file.");
          };
          transferCanceled = function(evt) {
            return console.warn("The transfer has been canceled by the user.");
          };
          xhr.addEventListener("progress", updateProgress, false);
          xhr.addEventListener("load", transferComplete, false);
          xhr.addEventListener("error", transferFailed, false);
          xhr.addEventListener("abort", transferCanceled, false);
          xhr.onload = function() {
            return console.log('Upload complete');
          };
          xhr.open('POST', $attrs.action, true);
          xhr.send(form);
          return console.log('Upload ', file);
        };
      };
      return new Uploader();
    }
  };
});
