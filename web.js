// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/dist'));
app.use('/', express.directory('/dist'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

