/* global define */
define([
	'intern!object',
	'intern/chai!assert',
	'intern/dojo/node!request'
], function (registerSuite, assert, request) {
	'use strict';
	registerSuite({
		name: 'cms-rest',
		'GET - /collection - should return array of items': function () {
			this.skip();
		},
		'GET - /collection/:id - should return object item': function () {
			this.skip();
		},
		'POST - /collection - should return object on success': function () {
			this.skip();
		},
		'PUT - /collection/:id - should return object on success': function () {
			this.skip();
		}
	});
});
