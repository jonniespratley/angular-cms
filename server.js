/**
 * Server - This is the Node.js Server.
 * @object
 */

var fs = require('fs');
var cmsRouter = require('./routes/cms-router.js');

var config = JSON.parse(fs.readFileSync('./config/config.json'));

//Test if services
if (process.env.VCAP_SERVICES) {
  var cloudServices = JSON.parse(process.env.VCAP_SERVICES);

  console.warn('cloud services', cloudServices);
  //var dbcreds = services['mongodb'][0].credentials;
}

var port = process.env.PORT || config.port;
var host = process.env.VCAP_APP_HOST || "127.0.0.1";
config.host = host;
config.port = port;

var express = require('express');
var app = express();
var router = new cmsRouter(config, app);
router.mount();

app.listen(port, function() {
  console.log('express server listening on port: ' + port);
});
