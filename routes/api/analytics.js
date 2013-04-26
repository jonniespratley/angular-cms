/**
 * analytics Resource
 * @author Jonnie Spratley, AppMatrix
 * @created 10/23/12
 *
 * Resource - This is the resource object that contains all of the REST api methods for a full CRUD on a mongo analytic document.
 *
 * REST METHODS:
 *
 * HTTP     METHOD          URL
 * ======|==============|==============================================
 * GET      findAll         http://localhost:3000/analytics
 * GET      findById        http://localhost:3000/analytics/:id
 * POST     add             http://localhost:3000/analytics
 * PUT      update          http://localhost:3000/analytics/:id
 * DELETE   destroy         http://localhost:3000/analytics/:id
 *
 * //Resource usage
 * var analytics = require('./routes/analytics');
 * app.get('/analytics', analytics.Resource.findAll);
 * app.post('/analytics', analytics.Resource.add);
 * app.put('/analytics/:id', analytics.Resource.update);
 * app.get('/analytics/:id', analytics.Resource.findById);
 * app.post('/analytics/:id', analytics.Resource.destroy);
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
	databaseName : 'myappmatrix',
	/**
	 * I am the name of this collection.
	 */
	name : 'analytics',
	/**
	 * I am the example schema for this resources.
	 */
	schema : {
		id : '',
		title : '',
		username : '',
		body : '',
		type : '',
		event_type : '',
		osver : '',
		device : '',
		version : '',
		deploytype : '',
		nettype : '',
		platform : '',
		memory : '',
		osarch : '',
		ipaddress : '',
		lat : '',
		lon : '',
		lng : '',
		uuid : '',
		geo : '',
		created : '',
		modified : '',
		timestamp : '',
		accuracy : '',
		application_id : '',
		account_id : '',
		category_id : '',
		altitude : '',
		heading : '',
		speed : '',
		appname : '',
		appurl : '',
		appdesc : '',
		appversion : '',
		appid : '',
		sessionid : '',
		macaddress : '',
		token : '',
		installid : '',
		countrycode : ''
	},
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
		Resource.log(Resource.name + ':update -' + id + ' - ' + JSON.stringify(data));
		db.collection(Resource.name, function(err, collection) {
			collection.update({
				'_id' : new BSON.ObjectID(id)
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
	},
	/**
	 * Get all platforms for app.
	 *
	 * @param $appid The id of the application.
	 */
	getPlatforms : function(appid) {

	},
	/**
	 * SELECT platform, version, count(version) AS platform_count FROM analytics WHERE appid = 'com.appmatrixinc.my' GROUP BY version
	 *
	 * @param $appid The id of the application.
	 */
	getPlatformVersion : function(appid) {

	},
	/**
	 * @TODO - SQL Querys to write
	 *
	 * Get all event types and count
	 SELECT appid, event_type, title, count(event_type) FROM analytics
	 WHERE appid = 'com.appmatrixinc.my'
	 GROUP BY event_type
	 *
	 * @param $appid The id of the application.
	 */

	getDeviceCount : function(appid) {

	},
	getDeviceEventsCount : function(appid, device) {

	},
	/**
	 * Get all device platforms.
	 * @param $appid The id of the application.
	 */
	getDevicePlatforms : function(appid, device) {

	},
	/**
	 * I get all of the types of events that are in the database for the appid.
	 *
	 * @param $appid The id of the application.
	 */
	getEventTypes : function(appid) {

	},
	getEventCount : function(appid) {

	},
	/**
	 * SELECT * FROM analytics WHERE appid = 'com.appmatrixinc.my'
	 AND event_type = 'nav'
	 AND title = 'tab.Coupons'
	 AND created LIKE '%2012-03-13%'
	 */
	getEventDetailsByDate : function(appid) {

	},
	/**
	 * Get all events by the event type.
	 *
	 * @param $appid - The id of the application
	 * @param $type - The type of analytic to get.
	 */
	getEventsByType : function(appid, type) {

	},
	/**
	 *  I get all of the days that this event happened and count how many times it happened on that day.
	 * For day details call the getEventDetailsByDate()
	 *
	 * 	SELECT *, count(created) FROM analytics WHERE appid = 'com.appmatrixinc.my'
	 AND event_type = 'nav'
	 AND title = 'tab.Coupons'
	 GROUP BY DATE(created)
	 */
	getEventsGroupedByDate : function(appid) {

	},
	getEvents : function(appid) {

	},
	getEventsByEventType : function(appid) {

	},
	getEventsByType : function(appid, type, deploy, start, end) {

	},
	/**
	 *
	 * Get all geo analytics for app.
	 * @param unknown_type $appid
	 * @param unknown_type $limit
	 */
	getGeoAnalytics : function(appid, type, deploy, start, end) {

	},
	/**
	 * Get all GeoFence events
	 *
	 * @param $appid - The id of the application
	 * @param $type - The type of analytic to get.
	 */
	getGeoFenceEvents : function(appid, type, deploy, start, end) {

	},
	/**
	 * SELECT title, count(title) FROM analytics  WHERE appid = 'com.appmatrixinc.my' AND title = 'open'
	 */
	getNewUsers : function(appid, deploy, start, end) {

	},
	/**
	 * Get Idle
	 * SELECT title, count(title) FROM analytics  WHERE appid = 'com.appmatrixinc.my' AND title = 'pause'
	 */
	getIdleUsers : function(appid, deploy, start, end) {

	},
	/**
	 * SELECT title, count(title) FROM analytics  WHERE appid = 'com.appmatrixinc.my' AND title = 'resume'
	 */
	getReturningUsers : function(appid, deploy, start, end) {

	},
	getSessions : function(appid, deploy, start, end) {

	},
	getSessionsUsers : function(appid, deploy, start, end) {

	},
	/**
	 * Get all recent analytics for app.
	 *
	 * @param $appid The id of the application.
	 */
	getRecent : function(appid, deploy, start, end) {

	},
	/**
	 * I get all of the devices and count
	 * @param $appid The id of the application.
	 */
	getPlatformsAndCount : function(appid, deploy, start, end) {

	}
};

var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {
	auto_reconnect : true
});

var server = new Server(Resource.host, Resource.port, {
	auto_reconnect : true,
	safe : false
});
var db = new Db(Resource.databaseName, server);
/**
 * Open the database and check for collection, if none
 * then create it with the schema.
 */
db.open(function(err, db) {
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

//Export to public api
exports.Resource = Resource;

