var easyimage = require( 'easyimage' );
var upload = require( 'jquery-file-upload-middleware' );
var fs = require( 'fs-extra' );
var path = require('path');
var busboy = require( 'connect-busboy' ); //middleware for form/file upload

module.exports = function (config, app) {

	console.log('cms-upload intialized');



	//### upload
	//I handled processing a uploaded file on the v2 server.
	var upload = function (req, res, next) {
		var appid = 'public';

		if (req.param( 'appid' )) {
			appid = String( req.param( 'appid' ) );
		}

		console.log( 'upload', util.inspect( req, {colors: true} ) );

		//Handle if dynamic filenames are enabled
		var tmp_filename = req.files.file.name || 'tmp_name';
		var filename = tmp_filename;
		var tmp_path = req.files.file.path;
		var target_dir = config.uploadsDestDir + '/' + appid + '/';
		var target_path = config.uploadsDestDir + '/' + appid + '/' + filename;
		var thumb_dir = config.uploadsDestDir + '/' + appid + '/thumbnail/';
		var thumb_path = config.uploadsDestDir + '/' + appid + '/thumbnail/' + filename;

		//Get the params for cropping an image
		var x1 = req.body.x1, y1 = req.body.y1, x2 = req.body.x2, y2 = req.body.y2, height = req.body.height, width = req.body.width, filepath = target_path;

		if (!width) {
			width = 150;
		}

		//Log the vars
		console.log( x1, x2, y1, y2, height, width, thumb_path );

		//Orignal image
		console.log( String( 'Temp Path: ' + tmp_path ).warn );
		console.log( String( 'Target Dir: ' + target_dir ).warn );
		console.log( String( 'Target Path: ' + target_path ).warn );

		//Thumbnail image
		console.log( String( 'Original File: ' + filename ).debug );
		console.log( String( 'Original File Path: ' + target_path ).debug );
		console.log( String( 'Thumb Dir: ' + thumb_dir ).debug );
		console.log( String( 'Thumb Path: ' + thumb_path ).debug );

		//Create the directory and move the file to that directory
		fs.mkdir( target_dir, 0777, function (e) {

			//Rename the file
			fs.rename( tmp_path, target_path, function (err) {
				if (err) {
					console.error( 'File Rename Error:', err );
				}

				//Create the thumb directory
				fs.mkdir( thumb_dir, 0777, function (e) {

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

					//Resize the image
					easyimg.resize( imgOptions, function (e) {
						console.log( 'easyimg', imgOptions, e );
						req.files.file.target_dir = target_dir;
						req.files.file.target_path = target_path;
						req.files.file.thumb_path = thumb_path;
						req.files.file.thumb_dir = thumb_dir;
						req.files.file.filename = filename;

						//build the response object
						var json = {
							status: true,
							filename: filename,
							targetDir: target_dir,
							targetPath: target_path,
							thumbDir: thumb_dir,
							thumbPath: thumb_path,
							msg: 'File Uploaded',
							results: req.files,
							appid: appid
						};

						//Output the results
						res.json( json );
					} );
				} );
			} );
		} );

		next();

	};
	app.use( busboy( {immediate: true} ) );
	app.use( function (req, res) {



		if (req.busboy) {
			req.busboy.on( 'file', function (fieldname, file, filename, encoding, mimetype) {
				var filePath = path.normalize(config.uploadsDestDir + path.sep + filename);
				var fstream = fs.createWriteStream(filePath);
				file.pipe(fstream);
				fstream.on('close', function() {
					fs.readFile(filePath, function (err, data) {
						if(err){
							throw err;
							res.status(400 ).send(err);
						}

						res.status(200).json({
							filename: filename,
							path: filePath
						});
					});
				});
				console.warn('busboy', fieldname, file, filename );
			} );
			req.busboy.on( 'field', function (key, value, keyTruncated, valueTruncated) {
				// ...
				console.log( 'busboy', key, value );
			} );
			// etc ...
		}
	} );
	app.post( config.apiBase + '/upload', busboy, upload );
	app.get( config.apiBase + '/upload', function (req, res, next) {
		res.json( {message: 'Upload a file with a POST.'} );
		next();
	} );

};
