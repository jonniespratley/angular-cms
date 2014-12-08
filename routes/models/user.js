
var User = function () {};

User.findOrCreate = function (profile, fn) {
  console.warn('findOrCreate', profile);
  User.findByEmail(profile.emails[0], function (err, user) {
    fn(user);
  });
};
User.findById = function (id, fn) {
  var idx = id - 1;
  console.warn('findById', id);
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
};
User.findByUsername = function (username, fn) {
  var defer = q.defer();
  console.warn('findByUsername', username);
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      defer.resolve(user);
    } else {
      console.warn('user not found', username);
    }
  }
  return defer.promise;
};
User.findByEmail = function (email, fn) {
  console.warn('findByEmail', email);
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.email === email) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};
module.exports = User;
