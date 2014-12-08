// app/models/user.js
// load the things we need
var mongoose = require( 'mongoose' );
var bcrypt = require( 'bcrypt-nodejs' );

// define the schema for our user model
var UserSchema = mongoose.Schema( {
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

} );

// methods ======================
// generating a hash
UserSchema.method( 'generateHash', function (password) {
	return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
});

// checking if password is valid
UserSchema.method( 'validPassword', function (password) {
	return bcrypt.compareSync( password, this.password );
});

UserSchema.method( 'findOrCreate', function (profile, fn) {
	console.warn( 'findOrCreate', profile );
	UserSchema.findByEmail( profile.emails[0], function (err, user) {
		fn( user );
	} );
});

UserSchema.method( 'findByUsername', function (username, fn) {
	console.warn( 'findByUsername', username );
	this.find( {username: username}, function (err, data) {
		if (err) {
			fn( false, err );
		}
		fn( data );
	} );
} );

UserSchema.method( 'findByEmail', function (email, fn) {
	console.warn( 'findByEmail', email );
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.email === email) {
			return fn( null, user );
		}
	}
	return fn( null, null );
} );

// create the model for users and expose it to our app
module.exports = mongoose.model( 'User', UserSchema );