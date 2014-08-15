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
