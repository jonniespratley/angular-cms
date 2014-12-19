'use strict';
describe('Service: cmsSocketService', function () {
	var cmsSocketService;
	beforeEach(module('angularCmsApp'));
	cmsSocketService = {};
	beforeEach(inject(function (_cmsSocketService_) {
		cmsSocketService = _cmsSocketService_;
	}));
	it('should do something', function () {
		expect(!!cmsSocketService).toBe(true);
	});
});
