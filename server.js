/**
 * Server - This is the Node.js Server.
 * @object
 */
var express = require('express');
var fs = require('fs');
var cmsRouter = require('./routes/cms-router.js');
var app = express();
var config = JSON.parse(fs.readFileSync('./config/config.json'));
var server = new cmsRouter.mount(config, app);
console.log(server);
