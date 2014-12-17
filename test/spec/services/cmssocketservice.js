'use strict';
describe('Service: cmsSocketService', function() {
  var cmsSocketService;
  beforeEach(module('angularCmsApp'));
  cmsSocketService = {};
  beforeEach(inject(function(_cmsSocketService_) {
    return cmsSocketService = _cmsSocketService_;
  }));
  return it('should do something', function() {
    return expect(!!cmsSocketService).toBe(true);
  });
});
