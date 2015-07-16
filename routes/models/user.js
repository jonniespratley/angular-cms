// app/models/user.js
// load the things we need
//var mongoose = require( 'mongoose' );
var bcrypt = require( 'bcrypt-nodejs' );
var hash = bcrypt.hashSync("bacon");




// create the model for users and expose it to our app
module.exports = function(config, app){
	// define the schema for our user model
	this.Schema = {
		id: String,
		provider: String,
		displayName: String,
		name: Object,
		emails: Array,
		photos: Array,
		username: String,
		email: String,
		password: String,
		active: Boolean,
		meta: Object,
		token: String,
		created_at: Date,
		updated_at: Date,
		local: {
			email: String,
			password: String,
		},
		facebook: {
			id: String,
			token: String,
			email: String,
			name: String
		},
		twitter: {
			id: String,
			token: String,
			displayName: String,
			username: String
		},
		google: {
			id: String,
			token: String,
			email: String,
			name: String
		}

	} ;
	// methods ======================
	this.method = function(name, cb){
		this[name] = cb;
		console.log('adding method', name);
	}
	// generating a hash
	this.method( 'generateHash', function (password) {
		return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
	});

	// checking if password is valid
	this.method( 'validPassword', function (password) {
		return bcrypt.compareSync( password, this.password );
	});

	this.method( 'findOrCreate', function (profile, fn) {
		console.warn( 'findOrCreate', profile );
		this.findByEmail( profile.emails[0], function (err, user) {
			fn( user );
		} );
	});

	this.method( 'findByUsername', function (username, fn) {
		console.warn( 'findByUsername', username );
		this.find( {username: username}, function (err, data) {
			if (err) {
				fn( false, err );
			}
			fn( data );
		} );
	} );

	this.method( 'findByEmail', function (email, fn) {
		console.warn( 'findByEmail', email );
		for (var i = 0, len = users.length; i < len; i++) {
			var user = users[i];
			if (user.email === email) {
				return fn( null, user );
			}
		}
		return fn( null, null );
	} );

	this.method('find', function(user){
		console.log('find this uer', user);
	})


};
