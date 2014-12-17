'use strict';
angular.module('angularCmsApp').controller('UsersCtrl', function($scope, DataService) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.user = {
    username: null,
    email: null,
    password: null,
    role: 'member',
    created_at: new Date(),
    updated_at: new Date(),
    metadata: {
      avatar: '',
      name: null,
      about: null
    }
  };
  $scope.users = [];
  $scope.groups = ['Admin', 'Member', 'Public'];
  $scope.getGroups = function() {
    return DataService.fetch('groups').then(function(res) {
      $scope.groups = res.data;
      return console.log(data);
    });
  };
  $scope.selectUser = function(user) {
    return $scope.user = user;
  };
  $scope.getUsers = function() {
    return DataService.fetch('users').then(function(res) {
      $scope.users = res.data;
      if (!$scope.groups) {
        return $scope.getGroups();
      }
    });
  };
  $scope.deleteUser = function(index, user) {
    var ask;
    ask = confirm("Delete " + user.email + "?");
    if (ask) {
      return DataService.destroy('users', user).then(function(res) {
        $scope.users.pop(index);
        return $scope.getUsers();
      });
    }
  };
  return $scope.addUser = function(user) {
    if (user.password) {
      delete user.password;
    }
    user.updated_at = new Date();
    return DataService.save('users', user).then(function(data) {
      $('#user-modal').modal('hide');
      $scope.getUsers();
      if (!user._id) {
        $scope.users.push(user);
      }
      return $scope.user = {};
    });
  };
});
