'use strict';

describe('Service: Api', function () {

  // load the service's module
  beforeEach(module('angularCmsApp'));

  // instantiate service
  var Api;
  beforeEach(inject(function (_Api_) {
    Api = _Api_;
  }));

  it('should do something', function () {
    expect(!!Api).toBe(true);
  });

});
