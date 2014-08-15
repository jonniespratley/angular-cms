// web.js
var express = require("express");
var logfmt = require("logfmt");
var httpProxy = require('http-proxy');
var app = express();
var port = process.env.PORT || 5000;


app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/dist'));
app.use('/', express.directory('/dist'));

var http = require('http'),
  httpProxy = require('http-proxy');

//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(port);
