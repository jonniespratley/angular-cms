'use strict';
describe('Filter: markdown', function() {
  var markdown;
  beforeEach(module('angularCmsApp'));
  markdown = {};
  beforeEach(inject(function($filter) {
    return markdown = $filter('markdown');
  }));
  return xit('should return the input prefixed with "markdown filter:"', function() {
    var text;
    return text = '#H1';
  });
});
