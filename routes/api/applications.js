
/**
 * applications Resource
 * @author Jonnie Spratley, AppMatrix
 * @created 10/23/12
 * 
 * Resource - This is the resource object that contains all of the REST api methods for a full CRUD on a mongo application document.
 * 
 * REST METHODS:
 * 
 * HTTP     METHOD          URL    
 * ======|==============|==============================================                         
 * GET      findAll         http://localhost:3000/applications 
 * GET      findById        http://localhost:3000/applications/:id 
 * POST     add             http://localhost:3000/applications 
 * PUT      update          http://localhost:3000/applications/:id 
 * DELETE   destroy         http://localhost:3000/applications/:id 
 * 
 * //Resource usage
 * var applications = require('./routes/applications');
 * app.get('/applications', applications.Resource.findAll);
 * app.post('/applications', applications.Resource.add);
 * app.put('/applications/:id', applications.Resource.update);
 * app.get('/applications/:id', applications.Resource.findById);
 * app.post('/applications/:id', applications.Resource.destroy);
 */
var Resource = {
host: 'localhost',
port: 27017,
    /**
     * I enable logging or not.
     */
    debug : true, 
    /**
     * I am the interal logger.
     */
    log : function(obj) {
        if(Resource.debug) {
            console.log(obj);
        }
    },
    /**
     * I am the name of the database.
     */
    databaseName : 'applications_db',
    /**
     * I am the name of this collection.
     */
    name : 'applications',
    /**
     * I am the example schema for this resources.
     */
    schema : [
        {
                        id : '', 
                        title : 'App Name', 
                        body : '', 
                        appid : 'com.domain.app', 
                        appleid : '', 
                        sku : '', 
                        url_icon : '', 
                        url_qrcode : '', 
                        url_appstore : '', 
                        url_androidmarket : '', 
                        url_wiki : '', 
                        url_github : '', 
                        created : '', 
                        modified : '', 
                        account_id : '', 
                        category_id : '', 
                        url_screen_1 : '', 
                        url_screen_2 : '', 
                        url_screen_3 : '', 
                        url_screen_4 : '', 
                        url_screen_5 : '', 
                        url_mindmap : '', 
                        type_id : '', 
                        version : '', 
                        source : '', 
                        rating : '1', 
                        updated : '1', 
                        category : 'Social', 
                        installs : '0', 
                        users : '', 
                        size : '0', 
                        price : 'Free', 
                        content_rating : 'Low', 
                        order : '0', 
                        smartapp_id : '', 
                        appcellerators_id : '', 
                        appcellerator_id : '', 
                        appcellerator_url : '', 
                        appcellerator_data : '', 
                        pem_path : '', 
                        live : '0', 
                        pem : '', 
                        pem_dev_name : '', 
                        pem_dev_path : '', 
                        pem_pro_name : '', 
                        pem_pro_path : '', 
                        aps_dev : '', 
                        aps_dev_command : '', 
                        aps_dev_key : '', 
                        aps_dev_key_name : '', 
                        aps_dev_key_path : '', 
                        aps_dev_cert : '', 
                        aps_dev_cert_name : '', 
                        aps_dev_cert_path : '', 
                        aps_dev_pem : '', 
                        aps_pro : '', 
                        aps_pro_command : '', 
                        aps_pro_key : '', 
                        aps_pro_key_name : '', 
                        aps_pro_key_path : '', 
                        aps_pro_cert : '', 
                        aps_pro_cert_name : '', 
                        aps_pro_cert_path : '', 
                        aps_pro_pem : '', 
                        provisioning_url : '', 
                        pem_passphrase : '', 
                        google_username : '', 
                        google_password : '', 
                        ipa_dev : '', 
                        ipa_pro : '', 
                        adk_dev : '', 
                        adk_pro : '', 
                        uuid : '', 
                        apikey : '', 
                        status : 'Running', 
                        icon_57 : '', 
                        icon_72 : '', 
                        icon_114 : '', 
                        icon_512 : '', 
                        icon_256 : '', 
                    }
    ],
    /**
     * I populate the document db with the schema.
     */
    populateDb : function() {
        db.collection(Resource.name, function(err, collection) {
            collection.insert(Resource.schema, {
                safe : true
            }, function(err, result) {
                Resource.log(result);
            });
        });
    },
    /**
     * I find all of the records
     * @param {Object} req
     * @param {Object} res
     */
    findAll : function(req, res) {
        db.collection(Resource.name, function(err, collection) {
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
        
        db.collection(Resource.name, function(err, collection) {
            collection.findOne({
                '_id' : new BSON.ObjectID(id)
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
         
        db.collection(Resource.name, function(err, collection) {
            collection.insert(data, {
                safe : true
            }, function(err, result) {
                if(err) {
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
        db.collection(Resource.name, function(err, collection) {
            collection.update({
                '_id' : new BSON.ObjectID(id)
            }, data, {
                safe : true
            }, function(err, result) {
                if(err) {
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
     */
    destroy : function(req, res) {
        var id = req.params.id;
        Resource.log(Resource.name + ':destroy -' + id);
        db.collection(Resource.name, function(err, collection) {
            collection.remove({
                '_id' : new BSON.ObjectID(id)
            }, {
                safe : true
            }, function(err, result) {
                if(err) {
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


var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {
    auto_reconnect : true
});


 
var server = new Server(Resource.host, Resource.port, {auto_reconnect : true,safe: false});
var db = new Db(Resource.databaseName, server);
/**
 * Open the database and check for collection, if none
 * then create it with the schema.
 */
db.open(function(err, db) {
    if(!err) {
        Resource.log('Connected to ' + Resource.databaseName);
        db.collection(Resource.name, {
            safe : true
        }, function(err, collection) {
            if(err) {
                Resource.log('The collection doesnt exist. creating it with sample data...');
                Resource.populateDb();
            }
        });
    }
});

//Export to public api
exports.Resource = Resource;
   
      
