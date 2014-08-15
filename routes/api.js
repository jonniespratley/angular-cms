/* ======================[ @TODO: 
 This file brings in all routes used by the app.

 ]====================== */

//Set express.app
exports.app = null;
var mongoose = require('mongoose/');
var config = require('./config');
	db = mongoose.connect(config.creds.mongoose_auth),
	Schema = mongoose.Schema;
	
	
	// require restify and bodyParser to read Backbone.js syncs
	var restify = require('restify');  
	var server = restify.createServer();
		server.use(restify.bodyParser());
	
	// Create a schema for our data
	var MessageSchema = new Schema({
	  message: String,
	  date: Date
	});
	// Use the schema to register a model with MongoDb
	mongoose.model('Message', MessageSchema); 
	var Message = mongoose.model('Message');
	
	// This function is responsible for returning all entries for the Message model
	function getMessages(req, res, next) {
	  // Resitify currently has a bug which doesn't allow you to set default headers
	  // This headers comply with CORS and allow us to server our response to any origin
	  res.header("Access-Control-Allow-Origin", "*"); 
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  // .find() without any arguments, will return all results
	  // the `-1` in .sort() means descending order
	  Message.find().sort('date', -1).execFind(function (arr,data) {
	    res.send(data);
	  });
	}



	function postMessage(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  // Create a new message model, fill it up and save it to Mongodb
	  var message = new Message();
	  message.message = req.params.message;
	  message.date = new Date();
	  message.save(function () {
	    res.send(req.body);
	  });
	}



	// Set up our routes and start the server
	server.get('/messages', getMessages);
	server.post('/messages', postMessage);











var express = require('express');
var app = express();
app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
	app.use(function(err, req, res, next){
	  console.error(err.stack);
	  res.send(500, 'Something broke!');
	});
	
	// simple logger
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});
	
});
app.get('/', function(req, res) {	
    res.send('Hello My.AppMatrix');
});



//curl -d '{ "name" : "This is a name" }' -H "Content-Type: application/json" http://dev.appmatrix.us:3000/myappmatrix/posts

var wines = require('./routes/generic');
app.get('/wines', wines.Resource.findAll);
app.post('/wines', wines.Resource.add);
app.put('/wines/:id', wines.Resource.update);
app.get('/wines/:id', wines.Resource.findById);
app.post('/wines/:id', wines.Resource.destroy);



var accounts = require('./routes/accounts');
 app.get('/accounts', accounts.Resource.findAll);
 app.post('/accounts', accounts.Resource.add);
 app.put('/accounts/:id', accounts.Resource.update);
 app.get('/accounts/:id', accounts.Resource.findById);
 app.post('/accounts/:id', accounts.Resource.destroy);
 

 var analytics = require('./routes/analytics');
 app.get('/analytics', analytics.Resource.findAll);
 app.post('/analytics', analytics.Resource.add);
 app.put('/analytics/:id', analytics.Resource.update);
 app.get('/analytics/:id', analytics.Resource.findById);
 app.post('/analytics/:id', analytics.Resource.destroy);

 var applications = require('./routes/applications');
 app.get('/applications', applications.Resource.findAll);
 app.post('/applications', applications.Resource.add);
 app.put('/applications/:id', applications.Resource.update);
 app.get('/applications/:id', applications.Resource.findById);
 app.post('/applications/:id', applications.Resource.destroy);

  var posts = require('./routes/posts');
  app.get('/posts', posts.Resource.findAll);
  app.post('/posts', posts.Resource.add);
  app.put('/posts/:id', posts.Resource.update);
  app.get('/posts/:id', posts.Resource.findById);
  app.post('/posts/:id', posts.Resource.destroy);

  var logs = require('./routes/logs');
 app.get('/logs', logs.Resource.findAll);
 app.post('/logs', logs.Resource.add);
  app.put('/logs/:id', logs.Resource.update);
  app.get('/logs/:id', logs.Resource.findById);
  app.post('/logs/:id', logs.Resource.destroy);

  var notifications = require('./routes/notifications');
  app.get('/notifications', notifications.Resource.findAll);
  app.post('/notifications', notifications.Resource.add);
  app.put('/notifications/:id', notifications.Resource.update);
  app.get('/notifications/:id', notifications.Resource.findById);
  app.post('/notifications/:id', notifications.Resource.destroy);


//Start to listen for requests
app.listen(8181);
console.log('Server Listening on port 8181', 'Resource listening on ' + wines.Resource.host);