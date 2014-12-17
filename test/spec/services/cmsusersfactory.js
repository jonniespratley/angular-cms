'use strict';
describe('Service: cmsUsersFactory', function() {
  var cmsUsersFactory;
  beforeEach(module('angularCmsApp'));
  cmsUsersFactory = {};
  beforeEach(inject(function(_cmsUsersFactory_) {
    return cmsUsersFactory = _cmsUsersFactory_;
  }));
  return it('should do something', function() {
    return expect(!!cmsUsersFactory).toBe(true);
  });
});
