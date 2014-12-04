'use strict'

angular.module('angularCmsApp')
  .controller 'PagesCtrl', ($scope, DataService) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
    $scope.page = {}
    #Select user
    $scope.selectPage = (p) ->
      $scope.page = p

    #Get users
    $scope.getPages = () ->
      DataService.fetch('pages').then((res) ->
        $scope.pages = res.data
      )

    #Add user to database
    $scope.save = (p) ->
      DataService.save('pages', p).then((data) ->
        $scope.getPages()
        $scope.page = {}
        console.log(data)
      )
