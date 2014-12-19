'use strict';

/**
  * @ngdoc service
  * @name angularCmsApp.cmsSocketService
  * @description
  * # cmsSocketService
  * Service in the angularCmsApp.
 */
angular.module('angularCmsApp').service('cmsSocketService', function() {
  var WebSocketClient;
  WebSocketClient = function(options) {
    var _ws;
    _ws = void 0;
    _ws = new WebSocket(options.endpoint, options.protocol);
    _ws.onmessage = function(e) {
      return console.log(e.data);
    };
    _ws.onerror = function(e) {
      return console.log(e);
    };
    _ws.onclose = function(e) {
      return console.log(e);
    };
    _ws.onopen = function(e) {
      _ws.send('update');
    };
    return {
      instance: _ws,
      close: function() {
        return _ws.close();
      },
      send: function(obj) {
        var err;
        try {
          _ws.send(obj);
        } catch (_error) {
          err = _error;
          throw err;
        }
      }
    };
  };
  return WebSocketClient;
});
