'use strict';
describe('Service: cmsSessionService', function() {
  var cmsSessionService;
  beforeEach(module('angularCmsApp'));
  cmsSessionService = {};
  beforeEach(inject(function(_cmsSessionService_) {
    var Cmssessionservice;
    return Cmssessionservice = _cmsSessionService_;
  }));
  return it('should do something', function() {
    return expect(!!cmsSessionService).toBe(true);
  });
});
