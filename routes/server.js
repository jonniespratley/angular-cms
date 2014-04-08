// Module dependencies.
var application_root = __dirname, 
express = require('express'), 
path = require('path'), 
mongoose = require('mongoose'), 
app = express();

// Configure server
app.configure(function() {
	//parses request body and populates request.body
	app.use(express.bodyParser());
	//checks request.body for HTTP method overrides
	app.use(express.methodOverride());
	//perform route lookup based on URL and HTTP method
	app.use(app.router);
	//Where to serve static content
	app.use(express.static(path.join(application_root, '../dist')));
	//Show all errors in development
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

//Connect to database
mongoose.connect('mongodb://localhost/learning-yeoman');

//Schemas
var Post = new mongoose.Schema({
	title : String,
	slug : String,
	body : String,
	image : String,
	published : Boolean,
	tags : Array,
	created : Date,
	modified : Date
});

//Models
var PostModel = mongoose.model('Post', Post);

//Routes
// Routes
app.get('/api', function(request, response) {
	response.send('API is running');
});

//Get a list 
app.get('/api/posts', function(request, response) {
	return PostModel.find(function(err, data) {
		if (!err) {
			return response.send(data);
		} else {
			return console.log(err);
		}
	});
});
//Insert a new
app.post('/api/posts', function(request, response) {
	var model = new PostModel({
		title : request.body.title,
		slug : request.body.slug,
		body : request.body.body,
		image : request.body.image,
		published : request.body.published,
		tags : request.body.tags,
		created : new Date(),
		modified : new Date()
	});
	model.save(function(err) {
		if (!err) {
			return console.log('Created');
		} else {
			return console.log(err);
		}
	});
	return response.send(model);
});

//Get a single by id
app.get('/api/posts/:id', function(request, response) {
	return PostModel.findById(request.params.id, function(err, model) {
		if (!err) {
			return response.send(model);
		} else {
			return console.log(err);
		}
	});
});

//Update 
app.put('/api/posts/:id', function(request, response) {
	console.log('Updating post ' + request.body.title);
	return PostModel.findById(request.params.id, function(err, model) {
		model.title = request.body.title;

		model.save(function(err) {
			if (!err) {
				console.log('model updated');
			} else {
				console.log(err);
			}
			return response.send(model);
		});
	});
});

//Delete 
app.delete ('/api/posts/:id',
function(request, response) {
	console.log('Deleting post with id: ' + request.params.id);
	return PostModel.findById(request.params.id, function(err, model) {
		return model.remove(function(err) {
			if (!err) {
				console.log('model removed');
				return response.send('');
			} else {
				console.log(err);
			}
		});
	});
});
//Start server
var port = 9191;
app.listen(port, function() {
	console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
