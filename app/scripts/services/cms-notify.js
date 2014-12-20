'use strict';
angular.module('angularCmsApp').factory('cmsNotify', [
  '$timeout', '$q', function($timeout, $q) {
    var notices, notify;
    notices = [];
    notify = function(el, type, title, msg, timeout) {
      var alert;
      notices.push({
        type: type,
        title: title,
        msg: msg
      });
      alert = "<div class=\"alert alert-" + type + " alert-dismissable\"> \n	<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button> \n	<strong>" + title + "</strong> " + msg + "\n</div>";
      if (el) {
        angular.element(el).prepend(alert);
      } else {
        angular.element('.container').prepend(alert);
      }
      if (timeout) {
        return $timeout(function() {
          return angular.element('.alert').fadeOut().remove();
        }, timeout);
      }
    };
    return notify;
  }
]);
