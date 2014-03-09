'use strict'

angular.module('angularCmsApp')
  .controller 'SettingsCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
    $scope.config = Config
    $scope.tabs = [
    		title: 'General'
    		content: ''
    	,
    		title: 'Client'
    		content: ''
    ]
