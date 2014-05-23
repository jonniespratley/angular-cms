angular.module("angularCmsApp").provider "DataServiced", 
 DataServiceProvider = ->
  DataServiceFactory = undefined
  options = undefined
  @options = (value) ->
    options = !!value
    
    

  @$get = [
    "options"
    DataServiceFactory = (options) ->
      new DataService(options)
  ]
  return
