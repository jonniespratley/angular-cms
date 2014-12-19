'use strict';
angular.module('angularCmsApp').controller('PagesCtrl', function($scope, $log, pages, DataService, cmsNotify) {
  $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  $scope.pages = pages;
  $scope.page = {};
  $scope.selectPage = function(p) {
    $scope.page = p;
    return $log.info(p);
  };
  $scope.getPages = function() {
    return DataService.fetch('pages').then(function(res) {
      return $scope.pages = res.data;
    });
  };
  $scope.save = function(p) {
    if (p._id != null) {
      p.modified = new Date();
    }
    if (p._id == null) {
      p.created = new Date();
    }
    return DataService.save('pages', p).then(function(res) {
      $scope.getPages();
      $scope.page = {};
      cmsNotify('.alerts', 'success', 'Success!', 'Page Update.', 5000);
      return $log.info(res);
    });
  };
  $scope.remove = function(p) {
    return DataService.destroy('pages', p).then(function(res) {
      $scope.getPages();
      return $log.info('Page deleted', res);
    });
  };
  return $scope.pageSchema = {
    'fields': [
      {
        'type': 'text',
        'name': 'title',
        'displayName': 'Title:',
        'validation': {
          'messages': {},
          'required': true,
          'minlength': 2,
          'maxlength': 18
        },
        'placeholder': 'Enter title here',
        'tooltip': 'Enter the page title here'
      }, {
        'type': 'selectlist',
        'name': 'parent',
        'displayName': 'Parent:',
        'options': [
          {
            'value': '1',
            'text': 'Option 1'
          }, {
            'value': '2',
            'text': 'Option 2'
          }, {
            'value': '3',
            'text': 'Option 3'
          }
        ],
        'value': '1'
      }, {
        'type': 'selectlist',
        'name': 'template',
        'displayName': 'Template:',
        'options': [
          {
            'value': '1',
            'text': 'Option 1'
          }, {
            'value': '2',
            'text': 'Option 2'
          }, {
            'value': '3',
            'text': 'Option 3'
          }
        ],
        'value': '1'
      }, {
        'type': 'textarea',
        'name': 'body',
        'displayName': 'Body:',
        'validation': {
          'messages': {}
        },
        'placeholder': 'Enter body here',
        'tooltip': 'Enter page body here'
      }, {
        'type': 'checkboxlist',
        'name': 'status',
        'displayName': 'Status:',
        'options': [
          {
            'value': 'published',
            'text': 'Published'
          }, {
            'value': 'draft',
            'text': 'Draft'
          }, {
            'value': 'private',
            'text': 'Private'
          }
        ],
        'value': 'draft',
        'tooltip': 'Select the page status'
      }
    ]
  };
});
