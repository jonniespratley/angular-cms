'use strict';

/**
@module AuthService
@description
This service will take care of authentication of a user, common methods include:
* authorize
* logout
* register
* forgot
* currentUser
 */
angular.module('angularCmsApp').service('cmsAuthService', function($q, $http, $log, $rootScope, $cookieStore, $location, cmsSessionService, cmsNotify) {
  var cmsAuthService;
  return cmsAuthService = {
    endpoint: '/api/v2',

    /**
    		authorize - I handle authorizing a user.
     */
    authorize: function(user) {
      return $http.post(this.endpoint + "/login", user);
    },

    /**
    		session - I handle getting a session.
     */
    session: function() {
      return $http.get(this.endpoint + "/session");
    },

    /**
    			register - I handle register a user.
     */
    register: function(user) {
      $log.info('trying to register', user);
      return $http.post(this.endpoint + "/register", user).then((function(_this) {
        return function(res) {
          $log.info(res);
          return _this.authorize(res.data);
        };
      })(this), function(err) {
        $log.error(err);
        return cmsNotify('.message', 'danger', 'Error!', err.data.message, 4000);
      });
    },

    /**
    			Logout method to clear the session.
    			@param {Object} user - A user model containing remember
     */
    logout: function(user) {
      cmsSessionService.setUserAuthenticated(null);
      return $rootScope.apply(function() {
        return $location.reload();
      });
    },

    /**
     			Login
     */
    login: function(user) {
      return this.authorize(user).then(function(res) {
        var session;
        cmsNotify('.login-message', 'success', 'Success!', "Welcome back.", 5000);
        session = {
          user: res.data,
          authorized: true
        };
        cmsSessionService.setSession(session);
        $rootScope.App.session = session;
        $log.info('login-result', res);
        return $rootScope.App.location.path('/dashboard');
      }, function(err) {
        $log.error(err);
        return cmsNotify('.login-message', 'danger', 'Error!', err.data.message);
      });
    }
  };
});
