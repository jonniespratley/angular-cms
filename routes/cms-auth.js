var passport = require('passport'),
	express = require('express'),
	BasicStrategy = require('passport-http').Strategy,
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	path = require('path'),
	q = require('q'),
	flash = require('express-flash'),
	DS = require('jps-ds').DS;


	module.exports = function(config, app){
		console.warn('cms-auth');
	};
