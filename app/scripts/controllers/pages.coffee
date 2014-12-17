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

    #Page Form Schema
    $scope.pageSchema = {
      "fields": [
        {
          "type": "text",
          "name": "title",
          "displayName": "Title:",
          "validation": {
            "messages": {},
            "required": true,
            "minlength": 2,
            "maxlength": 18
          },
          "placeholder": "Enter title here",
          "tooltip": "Enter the page title here"
        },
        {
          "type": "selectlist",
          "name": "parent",
          "displayName": "Parent:",
          "options": [
            {
              "value": "1",
              "text": "Option 1"
            },
            {
              "value": "2",
              "text": "Option 2"
            },
            {
              "value": "3",
              "text": "Option 3"
            }
          ],
          "value": "1"
        },
        {
          "type": "selectlist",
          "name": "template",
          "displayName": "Template:",
          "options": [
            {
              "value": "1",
              "text": "Option 1"
            },
            {
              "value": "2",
              "text": "Option 2"
            },
            {
              "value": "3",
              "text": "Option 3"
            }
          ],
          "value": "1"
        },
        {
          "type": "textarea",
          "name": "body",
          "displayName": "Body:",
          "validation": {
            "messages": {}
          },
          "placeholder": "Enter body here",
          "tooltip": "Enter page body here"
        },
        {
          "type": "checkboxlist",
          "name": "status",
          "displayName": "Status:",
          "options": [
            {
              "value": "published",
              "text": "Published"
            },
            {
              "value": "draft",
              "text": "Draft"
            },
            {
              "value": "private",
              "text": "Private"
            }
          ],
          "value": "draft",
          "tooltip": "Select the page status"
        }
      ]
    }
