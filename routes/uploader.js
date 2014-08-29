var express = require('express');    //Express Web Server
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fsExtra = require('fs-extra');       //File System - for file manipulation
var fs = require('fs');

/**
 * I am the Uploader module
 * @type {{options: null, init: init, createDirectory: createDirectory, upload: upload}}
 */
var Uploader = {
	options: null,
	/**
	 * I handle initializing the Express app with proper settings to handle uploading.
	 * @param app
	 * @param options
	 * @returns {Uploader}
	 */
	init: function (app, options) {
		Uploader.options = options
		app.use(busboy());

		return this;
	},
	/**
	 * I handle creating a directory if it does not exist.
	 * @param name
	 */
	createDirectory: function (name) {
		try {
			fs.mkdir(name, 0777, function () {
				console.log('Directory created at ', name);
				return name;
			});
		} catch (err) {
			console.log(err);
		}
	},
	/**
	 * I handle uploading a file to a directory specified on the options.
	 * @param req
	 * @param res
	 * @param next
	 */
	upload: function (req, res, next) {
		var fstream, self = this;
		console.log('got upload');

		Uploader.createDirectory(Uploader.options.path);
		req.pipe(req.busboy);

		req.busboy.on('file', function (fieldname, file, filename) {
			var filePath = Uploader.options.path + '/' + filename;
			console.log("Uploading: " + fieldname + ' = ' + filePath);

			fstream = fsExtra.createWriteStream(filePath);
			file.pipe(fstream);

			fstream.on('close', function () {
				console.log("Upload Finished of " + filePath);

				res.send({success: true, results: {
					name: filename,
					path: filePath
				}});
				next();
			});
		});
	},
	getUploads: function(req, res, next){
		console.log(req.query);
		var path = ( req.query.path ? req.query.path : Uploader.options.path );
		var result = fs.readdir(path, function (err, files) {
			
			res.send({
				success: true,
				path: path,
				results: files
			});
		});
	}
};
exports.Uploader = Uploader;
