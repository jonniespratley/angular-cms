var express = require('express');    //Express Web Server
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

exports.Uploader = {
	options: null,
	init: function (app, options) {
		exports.Uploader.options = options
		app.use(busboy());

		return this;
	},
	upload: function (req, res, next) {
		console.log('got upload');
		var fstream, self = this;
		req.pipe(req.busboy);

		req.busboy.on('file', function (fieldname, file, filename) {
			console.log("Uploading: " + filename);

			//Path where image will be uploaded
			fstream = fs.createWriteStream(exports.Uploader.options.path, filename);
			file.pipe(fstream);

			fstream.on('close', function () {
				console.log("Upload Finished of " + filename);
				res.send('Done');
			});
		});
	}
};
