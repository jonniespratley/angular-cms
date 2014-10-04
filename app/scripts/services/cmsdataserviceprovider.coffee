###*
@ngdoc service
@name angularCmsApp.service:cmsDataServiceProvider
@function
@description
This is the description.
###
angular.module("angularCmsApp").provider "cmsDataServiceProvider",
 DataServiceProvider = ->
  DataServiceFactory = undefined
  options = undefined
  @options = (value) ->
    options = !!value
  @$get = [
    "options"
    DataServiceFactory = (options) ->
      new cmsDataService(options)
  ]
  return
