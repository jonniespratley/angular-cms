/**
 * RESTful resource for handling CRUD operations on v1 or v2 api.
 */
var RestResource = {
	useversion : 'v1',
	urls : {
		v1 : 'https://www.myappmatrix.com',
		v2 : '/api/v2/'
	},
	index : function (req, res, next) {
		res.json({
			message : 'AppMatrix REST API Server ' + RestResource.useversion
		});
	},
	v1index : function (req, res, next) {
		RestResource.useversion = 'v1';
		request(RestResource.urls[RestResource.useversion], function (error, response, body) {
			console.log(error, response, body);
			res.json(JSON.parse(body));
		});
	},
	//Handle sending requests to the www.myappmatrix.com/Api server
	v1get : function (req, res, next) {
		var url = RestResource.urls[RestResource.useversion] + '/Api/get/' + req.param('model');
		console.log('URL', url);
		var options = {
			url : url,
			headers : {
				Authorization : 'Basic: bXk6ZnJlZA=='
			}
		};
		
		options.qs = {}
		
		if (req.param('appid')) {
			options.qs['appid'] = String(req.param('appid'));
		}
		request(options, function (error, response, body) {
			if (!error) {
				try {
					res.json(JSON.parse(body).results);
				} catch(e) {
					console.log(e);
					res.json(Array({
						status : false,
						message : 'There was an error parsing the data.'
					}));
				}
			}
		});
	},
	//Handle sending requests to the www.myappmatrix.com/Api server
	v1method : function (req, res, next) {
		var url = RestResource.urls[RestResource.useversion] + '/' + req.param('method');
		
		var options = {
			url : url,
			method : 'GET',
			headers : {
				Authorization : 'Basic: bXk6ZnJlZA=='
			}
		};

		options.qs = {}
		
		if (req.param('appid')) {
			options.qs['appid'] = String(req.param('appid'));
		}
		request(options, function (error, response, body) {
			if (!error) {
				try {
					res.json(JSON.parse(body).results);
				} catch(e) {
					console.log(e);
					res.json(Array({
						status : false,
						message : 'There was an error parsing the data.'
					}));
				}
			}
		});
	},
	v1add : function (req, res, next) {
		RestResource.version = 'v1';

		var url = RestResource.urls[RestResource.useversion] + '/' + req.param('collection');
		var method = 'POST';
		if(req.param('id')){
			method = 'PUT';
			url += '/'+ req.param('id');
		}
		
		var options = {
			url : url,
			method : method,
			json: req.body,
			headers : {
				Authorization : 'Basic: bXk6ZnJlZA=='
			}
		};

		options.qs = {}
		
		if (req.param('appid')) {
			options.qs['appid'] = String(req.param('appid'));
		}
		
		
		
		console.log(url);
		
		
		
		request(options, function (error, response, body) {
			if (!error) {
				try {
					
					res.json(body);
			
					
				} catch(e) {
					console.log(e);
					res.json(Array({
						status : false,
						message : 'There was an error parsing the data.'
					}));
				}
			}
		});
		 
	},
	v2index : function (req, res, next) {
		RestResource.version = 'v2';
		res.json({
			message : 'AppMatrix REST API Server ' + RestResource.useversion
		});
	},
	login : function (req, res, next) {
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			'auto_reconnect' : true,
			'safe' : true
		}));
		db.open(function (err, db) {
			db.collection(req.params.collection, function (err, collection) {
				var query = {
					email : req.param('email'),
					password : hashPassword(req.param('password'))
				};
				var options = req.params.options || {};
				collection.findOne(query, options, function (err, cursor) {
					if (cursor != null) {
						res.header('Content-Type', 'application/json');
						res.jsonp(200, {
							status : true,
							results : {
								user : cursor
							}
						});
					} else {
						res.jsonp(404, {
							status : false,
							message : 'Invalid credentials, please try again.'
						});
					}
					db.close();
				});
			});
		});
	},
	upload : function (req, res, next) {
		var appid = null;
		
		
		if (req.param('appid')) {
			appid = String(req.param('appid'));
		}
		
		
		
		//Handle if dynamic filenames are enabled
		var tmp_filename = req.files.file.name;
		var filename = tmp_filename;
		var tmp_path = req.files.file.path;
		var target_dir =  config.uploadsDestDir + '/' + appid + '/';
		var target_path = config.uploadsDestDir + '/' + appid + '/' + filename;
		var thumb_dir = config.uploadsDestDir + '/' + appid + '/thumbs/';
		var thumb_path = config.uploadsDestDir + '/' + appid + '/thumbs/' + filename;
		
		
		//Get the params for cropping an image
		var x1 = req.body.x1,
			y1 = req.body.y1,
			x2 = req.body.x2,
			y2 = req.body.y2,
			height = req.body.height,
			width = req.body.width,
			filepath = target_path;
	
		//Dev logger
		console.log(x1, x2, y1, y2, height, width, thumb_path);
		console.log(String('Target Path: ' + target_path).warn);
		console.log(String('Target Dir: ' + target_dir).warn);
		console.log(String('Temp Path: ' + tmp_path).warn);
		

		//Create the directory and move the file to that directory
		fs.mkdir(target_dir, 0777, function (e) {
			
			
			//Rename the file
			fs.rename(tmp_path, target_path, function (err) {
				if (err) {
					console.error('File Rename Error:', err);
				};
				
				
				
					//Create the thumbnail from the default image
					var imgOptions = {
						src: target_path,
						dst: thumb_path,
						width: width,
						height: height,
						quality: 100,
						x: x1,
						y: y1
					};
					
					
					//Create the thumb directory and resize the image
					fs.mkdir(thumb_dir, 0777, function(e){
						//Resize the image
						easyimg.resize( imgOptions, function(e){
							console.log('easyimg', e);
						} );
						
						
					});
				
				
				
				
				
				//unlink the file
				fs.unlink(tmp_path, function () {
					if (err) {
						
						console.error('File Unlink Error: ', err);
						
					} else {
						
						//set the  new path on the file
						req.files.file.target_dir = target_dir;
						req.files.file.target_path = target_path;
						req.files.file.thumb_path = thumb_path;
						req.files.file.thumb_dir = thumb_dir;
						
						req.files.file.filename = filename;
						
						
						//build the response object
						var json = {
							status : true,
							filename : filename,
							msg : 'File Uploaded',
							results : req.files,
							appid : appid
						};
						res.json(json);
					}
				});
				
				
				
				
			});
		});
	},
	imageCrop: function(req, res, next) {
		
		var x1 = req.param('x1'),
			y1 = req.param('y1'),
			x2 = req.param('x2'),
			y2 = req.param('y2'),
			height = req.param('height'),
			width = req.param('width'),
			filepath = req.param('path');
		
		var result = { message: 'Image cropped' };
		
		//Resolve path, since we are in a directory we need to open the file
		var p = './' + path.normalize(filepath);
		
		
		console.log(x1, x2, y1, y2, filepath, p.info);
		
		
		var file = fs.open(filepath, 'r', function(err, fd){
			if(!err){
				console.log(fd);
			} else {
				console.log(String(err.message).error);
			}
		});
		
	 
		
		
	},

	get : function (req, res, next) {
		var query = req.query.query ? JSON.parse(req.query.query) : {};
		// Providing an id overwrites giving a query in the URL
		if (req.params.id) {
			query = {
				'_id' : new BSON.ObjectID (req.params.id)
			};
		}
		//Pass a appid param to get all records for that appid
		if (req.param('appid')) {
			query['appid'] = String(req.param('appid'));
		}
		var options = req.params.options || {};
		//Test array of legal query params
		var test = ['limit', 'sort', 'fields', 'skip', 'hint', 'explain', 'snapshot', 'timeout'];
		//loop and test
		for (o in req.query ) {
			if (test.indexOf(o) >= 0) {
				options[o] = req.query[o];
			}
		}
		//Log for interal usage
		console.log('query', query, 'options', options);
		//new database instance
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			auto_reconnect : true,
			safe : true
		}));
		//open database
		db.open(function (err, db) {
			if (err) {
				console.log(err);
			} else {
				//prep collection
				db.collection(req.params.collection, function (err, collection) {
					//query
					collection.find(query, options, function (err, cursor) {
						cursor.toArray(function (err, docs) {
							if (err) {
								console.log(err);
							} else {
								var result = [];
								if (req.params.id) {
									if (docs.length > 0) {
										result = Resource.flavorize(null, docs[0], "out");
										res.header('Content-Type', 'application/json');
										res.jsonp(200, result);
									} else {
										res.jsonp(404, 'Not found');
										//res.send(404);
									}
								} else {
									docs.forEach(function (doc) {
										result.push(doc);
									});
									res.header('Content-Type', 'application/json');
									res.jsonp(200, result);
								}
								db.close();
							}
						});
					});
				});
			}
		});
	},
	add : function (req, res, next) {
		var data = req.body;
		if (data) {
			var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
				auto_reconnect : true,
				safe : true
			}));
			db.open(function (err, db) {
				if (err) {
					console.log(err);
				} else {
					db.collection(req.params.collection, function (err, collection) {
						collection.count(function (err, count) {
							console.log("There are " + count + " records.");
						});
					});
					var results = [];
					db.collection(req.params.collection, function (err, collection) {
						//Check if the posted data is an array, if it is, then loop and insert each document
						if (data.length) {
							//insert all docs
							for (var i = 0; i < data.length; i++) {
								var obj = data[i];
								console.log(obj);
								collection.insert(obj, function (err, docs) {
									results.push(obj);
								});
							}
							db.close();
							//	res.header('Location', '/'+req.params.db+'/'+req.params.collection+'/'+docs[0]._id.toHexString());
							res.header('Content-Type', 'application/json');
							res.jsonp(200, {
								results : results
							});
						} else {
							collection.insert(req.body, function (err, docs) {
								res.header('Location', '/' + req.params.db + '/' + req.params.collection + '/' + docs[0]._id.toHexString());
								res.header('Content-Type', 'application/json');
								res.send('{"ok":1}', 201);
								db.close();
							});
						}
					});
				}
			});
		} else {
			res.header('Content-Type', 'application/json');
			res.send('{"ok":0}', 200);
		}
	},
	edit : function (req, res, next) {
		var spec = {
			'_id' : new BSON.ObjectID (req.params.id)
		};
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			'auto_reconnect' : true,
			'safe' : true
		}));
		db.open(function (err, db) {
			db.collection(req.params.collection, function (err, collection) {
				collection.update(spec, req.body, true, function (err, docs) {
					res.header('Location', '/' + req.params.db + '/' + req.params.collection + '/' + req.params.id);
					res.header('Content-Type', 'application/json');
					res.send('{"ok":1}');
					db.close();
					console.log('Location', '/' + req.params.db + '/' + req.params.collection + '/' + req.params.id);
				});
			});
		});
	},
	view : function (req, res, next) {
	},
	destroy : function (req, res, next) {
		var params = {
			_id : new BSON.ObjectID (req.params.id)
		};
		console.log('Delete by id ' + req.params.id);
		var db = new mongo.Db (req.params.db, new mongo.Server (config.db.host, config.db.port, {
			auto_reconnect : true,
			safe : true
		}));
		db.open(function (err, db) {
			db.collection(req.params.collection, function (err, collection) {
				console.log('found ', collection.collectionName, params);
				collection.remove(params, function (err, docs) {
					if (!err) {
						res.header('Content-Type', 'application/json');
						res.send('{"ok":1}');
						db.close();
					} else {
						console.log(err);
					}
				});
			});
		});
	}
};