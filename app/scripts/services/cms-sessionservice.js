angular.module('angularCmsApp').service('cmsSessionService', [
  '$q', '$rootScope', '$cookieStore', '$location', '$log', function($q, $rootScope, $cookieStore, $location, $log) {
    var SessionService, getUserAuthenticated, setUserAuthenticated, userIsAuthenticated;
    userIsAuthenticated = $cookieStore.get('App.session');
    setUserAuthenticated = function(value) {
      window.sessionStorage.setItem('userIsAuthenticated', value);
      $cookieStore.put('App.session', value);
      userIsAuthenticated = value;
      return $log.info("user is authorized: " + userIsAuthenticated.authorized);
    };
    getUserAuthenticated = function() {
      window.sessionStorage.getItem('userIsAuthenticated');
      $log.info("user is authorized: " + userIsAuthenticated.authorized);
      return userIsAuthenticated.authorized;
    };
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      var i, msg, _results;
      $rootScope.$emit('session:route:start', {
        event: event,
        next: next,
        current: current
      });
      angular.element('.active').removeClass('active');
      _results = [];
      for (i in window.routes) {
        if (next.indexOf(i) !== -1) {
          if (window.routes[i].requireLogin && !getUserAuthenticated()) {
            msg = "You need to be authenticated to see this page!";
            $log.warn(msg);
            event.preventDefault();
            $rootScope.$emit('session:unauthorized', event);
            _results.push($location.path('/'));
          } else {
            angular.element('a[href="#' + $location.path() + '"]').addClass('active');
            _results.push($rootScope.$emit('session:authorized', event));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    SessionService = {
      adapter: null,
      session: $cookieStore.get('App.session'),
      isAuthenticated: false,
      getUserAuthenticated: getUserAuthenticated,
      setUserAuthenticated: setUserAuthenticated,
      getSession: function() {
        if ($cookieStore.get('App.session')) {
          return $cookieStore.get('App.session');
        } else {
          return {};
        }
      },
      setSession: function(value) {
        return $cookieStore.put('App.session', value);
      },
      login: function(user) {
        var _ref;
        $rootScope.$emit('session:login', user);
        return (_ref = SessionService.adapter) != null ? typeof _ref.login === "function" ? _ref.login(user) : void 0 : void 0;
      },
      logout: function(user) {
        var _ref;
        $rootScope.$emit('session:logout', user);
        SessionService.setUserAuthenticated(user);
        return (_ref = SessionService.adapter) != null ? typeof _ref.logout === "function" ? _ref.logout(user) : void 0 : void 0;
      },
      register: function(user) {
        var _ref;
        $rootScope.$emit('session:register', user);
        return (_ref = SessionService.adapter) != null ? typeof _ref.register === "function" ? _ref.register(user) : void 0 : void 0;
      },
      routeResolver: function() {}
    };
    return SessionService;
  }
]);
