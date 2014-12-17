var DataServiceProvider;

angular.module("angularCmsApp").provider("cmsDataServiceProvider", DataServiceProvider = function() {
  var DataServiceFactory, options;
  DataServiceFactory = void 0;
  options = void 0;
  this.options = function(value) {
    return options = !!value;
  };
  this.$get = [
    "options", DataServiceFactory = function(options) {
      return new cmsDataService(options);
    }
  ];
});
