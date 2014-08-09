/**
 * This is the javascript version of the CodeGen controller that is written  in php.
 * 
 * CodeGen Package
The CodeGen Packager creates files for generating, compiling, running, testing, packaging, deploying and downloading the application.

The following shell files are created in this order:

1. generate.sh - This file generate the project files based on the config.json file and converts the project into a Titanium Mobile + Alloy application.
2. compile.sh - This file compiles the newly generated project files into a ios/android application.
3. run.sh - This file runs the newly compiled code in the os simulator.
4. test.sh - This file uploads the compiled code to Testflight.com for distribution to test devices.
5. package.sh - This file packages the app into a .ipa, .achive and a .apk for distribution.
6. deploy.sh - This file then deploys the application to the various app marketplaces.
7. project.zip - This is a archive file of your compiled application and all project files, .ipa, .apk, etc.


The packager assumes the following paths are set as well:

Titanium SDK: 
/Users/jonniespratley/Library/Application Support/Titanium/


Android SDK: 
/WWW/SDKs/android-sdk-macosx



iOS SDK:
/Applications/Xcode.app/Contents/Developer






Tools for generating pems, passbooks, etc.






 */


//Get file contents from a file
function getFile (localPath, mimeType, res) {
	fs.readFile(localPath, function (err, contents) {
		if (!err) {
			res.writeHead(200, {
				"Content-Type" : mimeType,
				"Content-Length" : contents.length
			});
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
};


//Write contents to a file
function writeFile (localPath, contents) {
	// create a stream, and create the file if it doesn't exist
	stream = fs.createWriteStream(localPath);
	console.log('writeFile', localPath);
	stream.on("open", function () {
		// write to and close the stream at the same time
		stream.end(contents, 'utf-8');
		res.end(html);
	});
};




/**
 * Command Server for executing build commands from the Web app.
 */
var sys = require('sys')
var exec = require('child_process').exec;
var child;

rest.app.get('/pwd', function(req, res) {
    var results = {};

    child = exec("pwd", function(error, stdout, stderr) {

        results.stdout = stdout;    


        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(results), 200);
        sys.print('stdout: ' + stdout);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});
