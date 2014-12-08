var   cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      session      = require('express-session'),
      RestResource = require('./rest');

module.exports = function (config, app) {
  "use strict";

  app.get(config.apiBase + '/plugins', RestResource.plugins);
  app.get(config.apiBase + '/readme', RestResource.readme);
  app.get(config.apiBase, RestResource.index);

  //Always users table
  app.post(config.apiBase + '/users/login', bodyParser.json(), RestResource.login);
  app.post(config.apiBase + '/users/register', bodyParser.json(), RestResource.register);
  app.post(config.apiBase + '/users/session', bodyParser.json(), RestResource.session);

  //Dynamic REST
  app.get(config.apiBase + '/:db/:collection/:id?', RestResource.get)
  app.post(config.apiBase + '/:db/:collection/:id?', bodyParser.json(), RestResource.add)
  app.put(config.apiBase + '/:db/:collection/:id?', bodyParser.json(), RestResource.edit)
  app.delete(config.apiBase + '/:db/:collection/:id?',RestResource.destroy);
};
