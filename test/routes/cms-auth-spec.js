/* global define */
define([
	'intern!object',
	'intern/chai!assert',
	'intern/dojo/node!request'
], function (registerSuite, assert, request) {
	'use strict';
	registerSuite({
		name: 'cms-auth',
		'should have /auth/login route': function () {
			this.skip();
		},
		'should have /auth/register route': function () {
			this.skip();
		},
		'should have /auth/me route': function () {
			this.skip();
		}
	});
});
