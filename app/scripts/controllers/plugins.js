'use strict';
angular.module('angularCmsApp').controller('PluginsCtrl', function($scope) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.plugins = [
    {
      id: 1,
      title: 'Google Chart Widgets',
      description: 'This plugin brings Google Charts to the dashboard, configurable settings to visualize any content type.',
      enabled: true
    }, {
      id: 2,
      title: 'Twitter Widget',
      description: 'This plugin enables your Twitter feed on your dashboard and public stream widgets for your pages.',
      enabled: true
    }
  ];
});
