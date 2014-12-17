'use strict';
describe('Service: cmsAuthService', function() {
  var cmsAuthService, httpBackend, successfulResponse, unsuccessfulResponse;
  beforeEach(module('angularCmsApp'));
  cmsAuthService = null;
  httpBackend = null;
  successfulResponse = {
    "success": true,
    "result": {
      "_id": "537e75385b11c600e0968da7",
      "email": "test1@email.com",
      "password": "9bfc2a094175a37a07c41986aa9ab4350c2c31ab",
      "metadata": {
        "avatar": "",
        "name": "Jonnie Dollas"
      }
    }
  };
  unsuccessfulResponse = {
    status: false,
    error: true,
    message: 'No user found!'
  };
  beforeEach(inject(function(_cmsAuthService_, _$httpBackend_) {
    cmsAuthService = _cmsAuthService_;
    return httpBackend = _$httpBackend_;
  }));
  it('should define the Auth Service', function() {
    return expect(!!cmsAuthService).toBe(true);
  });
  describe('Successful login', function() {
    beforeEach(function() {
      return httpBackend.whenPOST('/api/v2/users/login').respond(successfulResponse);
    });
    return it('should resolve a promise on successful auth', function() {
      var user;
      user = null;
      expect(user).toBeNull();
      return cmsAuthService.authorize({
        email: 'test@email.com',
        password: 'fred'
      }).then(function(data) {
        user = data.results;
        expect(user).not.toBeNull();
        return expect(user.email).toBe('test@email.com');
      });
    });
  });
  describe('Unsuccessful login', function() {
    beforeEach(function() {
      return httpBackend.whenPOST('/api/v2/users/login').respond(unsuccessfulResponse);
    });
    return it('should reject a promise on unsuccessful auth', function() {});
  });
  describe('Successful registration', function() {
    beforeEach(function() {
      return httpBackend.whenPOST('/api/v2/users/register').respond(successfulResponse);
    });
    return it('should resolve a promise on successful registration', function() {
      return cmsAuthService.register({
        username: 'admin',
        password: 'admin'
      });
    });
  });
  return describe('Unsuccessful registration', function() {
    beforeEach(function() {
      return httpBackend.whenPOST('/api/v2/users/register').respond(unsuccessfulResponse);
    });
    return it('should reject a promise on unsuccessful registration', function() {});
  });
});
