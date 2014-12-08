var passport = require('passport'),
  BasicStrategy = require('passport-http').Strategy,
  LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require('passport-google').Strategy,
  log = require('npmlog'),
  express = require('express'),
  path = require('path'),
  q = require('q'),
  flash = require('express-flash'),
  User = require('./models/user'),
  cookieParser = require('cookie-parser'),
  bodyParser   = require('body-parser'),
  session      = require('express-session');


module.exports = function(config, app){


  if (!app) {
    throw new Error('Must provide express application!');
  }


  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });


  /*	*/

  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a username and password), and invoke a callback
  //   with a user object.  In the real world, this would query a database;
  //   however, in this example we are using a baked-in set of users.
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (username, password, done) {
    process.nextTick(function () {
      console.warn('find by username');
      User.findByUsername(username).then(function (user) {
        return done(null, user);
      }, function (err) {
        return done(null, false);
      });
    });
  }
));

  /**/
  passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:8181/auth/google/return', realm: 'http://localhost:8181/'
  },
  function (identifier, profile, done) {
    console.warn('googleCallback', profile);
    profile.openId = identifier;
    User.findOrCreate(profile, function (err, user) {
      done(err, user);
    });
  }
  ));


  app.use(express.static(path.resolve(__dirname, '../www')));
  //app.set('views', path.resolve(__dirname, '../www'));
  //app.set('view engine', 'ejs');
  //app.engine('ejs', require('ejs-locals'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'angular-cms',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());


  app.get('/api/me', passport.authenticate('basic', {session: false}), function (req, res) {
    res.json(req.user);
  });

  app.all('*', function (req, res, next) {
    console.warn('cmsAuth', req.params);
    next();
  });

  app.get('/', function (req, res) {
    res.render('index', {user: req.user, message: 'Please login', status: 'info'});
  });

  app.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', {user: req.user});
  });

  app.get('/login', function (req, res) {
    res.render('login', {user: req.user, message: 'Please login', status: 'warning'});
  });


  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })
);

app.get('/auth/user', ensureAuthenticated, function (req, res) {
  res.json(200, req.user);
});

app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect(options.apiBase);
});


// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

}
