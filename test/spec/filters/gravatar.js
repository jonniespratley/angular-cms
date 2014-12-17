'use strict';
describe('Filter: gravatar', function() {
  var gravatar;
  beforeEach(module('angularCmsApp'));
  gravatar = {};
  beforeEach(inject(function($filter) {
    return gravatar = $filter('gravatar');
  }));
  return it('should return the hashed url', function() {
    var text;
    text = 'jonniespratley@gmail.com';
    return expect(gravatar(text)).toBe('http://www.gravatar.com/avatar/f6112e781842d6a2b4636b35451401ff');
  });
});
