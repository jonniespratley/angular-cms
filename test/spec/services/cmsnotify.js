'use strict';
describe('Service: cmsNotify', function() {
  var cmsNotify;
  beforeEach(module('angularCmsApp'));
  cmsNotify = {};
  beforeEach(inject(function(_cmsNotify_) {
    return cmsNotify = _cmsNotify_;
  }));
  return it('should do something', function() {
    return expect(!!cmsNotify).toBe(true);
  });
});
