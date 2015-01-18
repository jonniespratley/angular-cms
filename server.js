/**
 * Server - This is the Node.js Server.
 * @object
 */
var express = require('express');
var fs = require('fs');
var cmsRouter = require('./routes/cms-router.js');
var app = express();
var config = JSON.parse(fs.readFileSync('./config/config.json'));

//Test if services
if(process.env.VCAP_SERVICES){
  var cloudServices = JSON.parse(process.env.VCAP_SERVICES);

  console.warn('cloud services', cloudServices);
  //var dbcreds = services['mongodb'][0].credentials;
}
var port = process.env.PORT || 1339;
var host = process.env.VCAP_APP_HOST || "127.0.0.1";
config.host = host;
config.port = port;
var server = new cmsRouter.mount(config, app);
console.log(server);
