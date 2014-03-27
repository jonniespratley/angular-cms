###

REST
 This is the resource object that contains all of the REST api methods for a full CRUD on a mongo account document.
TODO Clean up this file

@author Jonnie Spratley,
@created 10/23/12
REST METHODS:

HTTP     METHOD          URL
======|==============|==============================================
GET      findAll         http://localhost:3000/api/v2/database/table
GET      findById        http://localhost:3000/api/v2/database/table/:id
POST     add             http://localhost:3000/api/v2/database/table
PUT      update          http://localhost:3000/api/v2/database/table/:id
DELETE   destroy         http://localhost:3000/api/v2/database/table/:id
###


delay = (ms, value) ->
  deferred = new Deferred()
  setTimeout (->
    deferred.resolve value
    return
  ), ms

log = () ->
	console.log(arguments)

  # Module dependencies.
application_root = __dirname
express = require("express")
path = require("path")
mongoose = require("mongoose")
app = express()

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


#Get a list of all posts
app.get "/api/posts", (request, response) ->
  PostModel.find (err, data) ->
    unless err
    	log('Found ', data)
      response.send data
    else
      console.log err


#Insert a new post
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


#Get a single post by id
app.get "/api/posts/:id", (request, response) ->
  PostModel.findById request.params.id, (err, model) ->
    unless err
      response.send model
    else
      console.log err



#Update a post
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



#Delete a post
app.destroy "/api/posts/:id", (request, response) ->
  PostModel.findById request.params.id, (err, model) ->
    model.remove (err) ->
      unless err
        response.send ""
      else
        console.log err
      return




#Start server
port = 9191
app.listen port, ->
  console.log "Express server listening on port %d in %s mode", port, app.settings.env
  return
