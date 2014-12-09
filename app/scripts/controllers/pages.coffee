'use strict'

angular.module('angularCmsApp')
  .controller 'PagesCtrl', ($scope, $log, pages, DataService, cmsNotify) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
    $scope.pages = pages
    $scope.page = {}

    #Select page
    $scope.selectPage = (p) ->
      $scope.page = p
      $log.info(p)

    #Get pages
    $scope.getPages = () ->
      DataService.fetch('pages').then((res) ->
        $scope.pages = res.data
      )

    #Save page
    $scope.save = (p) ->
      p.modified = new Date() if p._id?
      p.created = new Date() unless p._id?
      DataService.save('pages', p).then((res) ->
        $scope.getPages()
        $scope.page = {}
        cmsNotify( '.alerts', 'success', 'Success!', "Page Update.", 5000)
        $log.info(res)
      )

    #Delete page
    $scope.remove = (p) ->
      DataService.destroy('pages', p).then((res)->
        $scope.getPages()
        $log.info('Page deleted', res)
      )
