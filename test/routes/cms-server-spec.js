/* global define */
define([
	'intern!object',
	'intern/chai!assert',
	'intern/dojo/node!request'
], function (registerSuite, assert, request) {
	'use strict';
	registerSuite({
		name: 'cms-server',
		'should have /proxy route': function () {
			this.skip();
		}
	});
});
