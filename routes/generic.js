/**
 * accounts Resource
 * @author Jonnie Spratley, 
 * @created 10/23/12
 *
 */



var mongo = require('mongodb');
var mongoose = require('mongoose');
var Server = mongo.Server;
var Db = mongo.Db;

//Connect to the database
mongoose.connect('mongodb://localhost:27017/my');

/* ======================[ @TODO: Modal Schema ]====================== */


var Post = mongoose.model('post', new mongoose.Schema({
    text : String,
    done : Boolean,
    order : Number
}));


/**
 * Resource - This is the resource object that contains all of the REST api methods for a full CRUD on a mongo account document.
 *
 * REST METHODS:
 *
 * HTTP     METHOD          URL
 * ======|==============|==============================================
 * GET      findAll         http://localhost:3000/accounts
 * GET      findById        http://localhost:3000/accounts/:id
 * POST     add             http://localhost:3000/accounts
 * PUT      update          http://localhost:3000/accounts/:id
 * DELETE   destroy         http://localhost:3000/accounts/:id
 */
var Resource = {
    host : 'localhost',
    port : 27017,
    /**
     * I enable logging or not.
     */
    debug : true,
    /**
     * I am the interal logger.
     */
    log : function(obj) {
        if (Resource.debug) {
            console.log(obj);
        }
    },
    /**
     * I am the name of the database.
     */
    databaseName : 'accounts_db',
    /**
     * I am the name of this collection.
     */
    name : 'accounts',
    mongo : mongo,
    server : null,
    db : null,
    mongoServer : mongo.Server,
    mongoDb : mongo.Db,
    bson : mongo.BSONPure,
    /**
     * I am the example schema for this resources.
     */
    schema : {
        id : '',
        ns : 'com.domain.app',
        title : '',
        body : '',
        address1 : '',
        address2 : '',
        city : '',
        state : '',
        zip : '',
        type : '',
        active : '0',
        created : '',
        modified : '',
        website : '',
        apple_url : '',
        android_url : '',
        user_id : '',
        application_id : '',
        appcellerator_url : '',
        settings : '',
        plan : '',
        exp_date : '',
        upfront_cost : '',
        monthly_cost : '',
        service_term : '12',
        service_value : '',
        total_value : '',
        sla_number : '',
        contract_in : '',
        app_submitted : ''
    },
    routes : {
        'status' : 'dbStatus'
    },
    /**
     * I create a new instance of the database.
     */
    initDb : function() {

        Resource.server = new Server(Resource.host, Resource.port, {
            auto_reconnect : true,
            safe : false
        });
        Resource.db = new Db(Resource.databaseName, Resource.server);

        /**
         * Open the database and check for collection, if none
         * then create it with the schema.
         */
        Resource.db.open(function(err, db) {
            if (!err) {
                Resource.log('Connected to ' + Resource.databaseName);
                db.collection(Resource.name, {
                    safe : true
                }, function(err, collection) {
                    if (err) {
                        Resource.log('The collection doesnt exist. creating it with sample data...');
                        Resource.populateDb();
                    }
                });
            }
        });

    },
    
    /**
     * I populate the document db with the schema.
     */
    populateDb : function() {
        Resource.db.collection(Resource.name, function(err, collection) {
            collection.insert(Resource.schema, {
                safe : true
            }, function(err, result) {
                Resource.log(result);
            });
        });
    },
    
    dbStatus: function(){
        console.log('get db status');
    },

    /**
     * I find all of the records
     * @param {Object} req
     * @param {Object} res
     */
    findAll : function(req, res) {
        Resource.db.collection(Resource.name, function(err, collection) {
            collection.find().toArray(function(err, items) {
                Resource.log(Resource.name + ':findAll - ' + JSON.stringify(items));
                res.send(items);
            });
        });
    },
    /**
     * I find one of the records by id.
     * @param {Object} req
     * @param {Object} res
     */
    findById : function(req, res) {

        var id = req.params.id;

        Resource.log(Resource.name + ':findById - ' + id);

        Resource.db.collection(Resource.name, function(err, collection) {
            collection.findOne({
                '_id' : new Resource.BSON.ObjectID(id)
            }, function(err, item) {
                res.send(item);
            });
        });


    },
    /**
     * I add a record to the collection
     * @param {Object} req
     * @param {Object} res
     */
    add : function(req, res) {
        var data = req.body;

        Resource.log(Resource.name + ':add - ' + JSON.stringify(data));
        Resource.db.collection(Resource.name, function(err, collection) {
            collection.insert(data, {
                safe : true
            }, function(err, result) {
                if (err) {
                    res.send({
                        'error' : 'An error has occurred'
                    });
                } else {
                    Resource.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        });
    },
    /**
     * I update a record in the collection
     * @param {Object} req
     * @param {Object} res
     */
    update : function(req, res) {
        var id = req.params.id;
        var data = req.body;
        Resource.log(Resource.name + ':destroy -' + id + ' - ' + JSON.stringify(data));
        Resource.db.collection(Resource.name, function(err, collection) {
            collection.update({
                '_id' : new Resource.BSON.ObjectID(id)
            }, data, {
                safe : true
            }, function(err, result) {
                if (err) {
                    res.send({
                        'error' : 'An error has occurred'
                    });
                    console.log('Error updating ' + Resource.name + ': ' + err);
                } else {
                    console.log('' + result + 'document(s) updated');

                    res.send(data);
                }
            });
        });
    },
    /**
     * I delete a record in the collection.
     * @param {Object} req
     * @param {Object} res

		return Todo.findById(req.params.id, function(err, todo) {
	        return todo.remove(function(err) {
	            if (!err) {
	                console.log("removed");
	                return res.send('')
	            }
	        });
	    });
     */
    destroy : function(req, res) {
        var id = req.params.id;
        Resource.log(Resource.name + ':destroy -' + id);
        Resource.db.collection(Resource.name, function(err, collection) {
            collection.remove({
                '_id' : new Resource.BSON.ObjectID(id)
            }, {
                safe : true
            }, function(err, result) {
                if (err) {
                    res.send({
                        'error' : 'An error has occurred'
                    });
                    Resource.log('Error updating ' + Resource.name + ': ' + err);
                } else {
                    res.send(req.body);
                }
            });
        });
    }
};

//Export to public api
exports.Resource = Resource;






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



/* @TODO: Base Route */
app.get('/', function(req, res) {	
    res.send('Generic Mongo REST Server');
});




 
/* @TODO: Insert */
app.post('/:db/:collection', function(req, res) {
  if(req.body) {
    var db = new mongo.Db(req.params.db, new mongo.Server(Resource.host, Resource.port, {'auto_reconnect':true, 'safe' : true}));
    db.open(function(err, db) { 
		//set the collection
        db.collection(req.params.collection, function(err, collection) {
          // We only support inserting one document at a time
          collection.insert(Array.isArray(req.body) ? req.body[0] : req.body, function(err, docs) {
           // res.header('Location', '/'+req.params.db+'/'+req.params.collection+'/'+docs[0]._id.toHexString());
            res.header('Content-Type', 'application/json');''
            res.send('{"ok":1}', 201);
            db.close();
          });
        });
    
    });
	//else return false
  } else {
    res.header('Content-Type', 'application/json');
    res.send('{"ok":0}',200);
  }
});






