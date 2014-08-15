# Module dependencies.
application_root = __dirname
express = require("express")
path = require("path")
mongoose = require("mongoose")
app = express()
# Add your coffee-script here
$rest =
    endpoint: "http://localhost:9191/api"
    create: (model, data) ->
        @_send 'POST', model, data
    read: (model) ->
        @_send 'GET', model
    update: (model, data) ->
        @_send 'PUT', model, data
    destroy: (model, data) ->
        @_send 'DELETE', model, data
    _send: (type, model, data) ->
      url = @endpoint + "/" + model
      url += '/' + data?.id if data?.id
        
      $.ajax
          url: url
          type: type
          dataType: "json"
          data: data
            

###     
$ ->
  
  $rest.read('posts').then((data)->
    console.log(data)  
  ).fail((error)->
    console.error error
  )
  
  $rest.create('posts', name: 'test').then((data)->
    console.log(data)  
  ).fail((error)->
    console.error error
  )
  
  $rest.update('posts', id: 1, name: 'updated').then((data)->
    console.log(data)  
  ).fail((error)->
    console.error error
  )
###

# Configure server
app.configure ->
	
	#parses request body and populates request.body
	app.use express.bodyParser()
	
	#checks request.body for HTTP method overrides
	app.use express.methodOverride()
	
	#perform route lookup based on URL and HTTP method
	app.use app.router
	
	#Where to serve static content
	app.use express.static(path.join(application_root, "../dist"))
	
	#Show all errors in development
	app.use express.errorHandler(
		dumpExceptions: true
		showStack: true
	)
	return


#Connect to database
mongoose.connect "mongodb://localhost/learning-yeoman"

#Schemas
Post = new mongoose.Schema(
	title: String
	slug: String
	body: String
	image: String
	published: Boolean
	tags: Array
	created: Date
	modified: Date
)

#Models
PostModel = mongoose.model("Post", Post)

#Routes
# Routes
app.get "/api", (request, response) ->
	response.send "API is running"
	return


#Get a list
app.get "/api/posts", (request, response) ->
	PostModel.find (err, data) ->
		unless err
			response.send data
		else
			console.log err



#Insert a new
app.post "/api/posts", (request, response) ->
	model = new PostModel(
		title: request.body.title
		slug: request.body.slug
		body: request.body.body
		image: request.body.image
		published: request.body.published
		tags: request.body.tags
		created: new Date()
		modified: new Date()
	)
	model.save (err) ->
		unless err
			console.log "Created"
		else
			console.log err

	response.send model


#Get a single by id
app.get "/api/posts/:id", (request, response) ->
	PostModel.findById request.params.id, (err, model) ->
		unless err
			response.send model
		else
			console.log err

#Update
app.put "/api/posts/:id", (request, response) ->
	console.log "Updating post " + request.body.title
	PostModel.findById request.params.id, (err, model) ->
		model.title = request.body.title
		model.save (err) ->
			unless err
				console.log "model updated"
			else
				console.log err
			response.send model

		return


#Delete
app.delete "/api/posts/:id", (request, response) ->
	console.log "Deleting post with id: " + request.params.id
	PostModel.findById request.params.id, (err, model) ->
		model.remove (err) ->
			unless err
				console.log "model removed"
				response.send ""
			else
				console.log err
			return


#Start server
port = 9191
app.listen port, ->
	console.log "Express server listening on port %d in %s mode", port, app.settings.env
	return
