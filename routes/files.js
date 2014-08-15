/**
 * @file files.js
 * @comment
 *
 * Basic rest file management
 */

/* ======================[ @TODO: Methods

 1. Read directory
 2. Write directory
 3. Read file
 4. Write file
 5. Delete file
 6

 ]====================== */

var http = require("http"), path = require("path"), fs = require("fs"), extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg"
};
if (extensions[ext]) {
    localPath += ( dir ? dir + "/" : "") + filename;
    path.exists(localPath, function(exists) {
        if (exists) {
            getFile(localPath, extensions[ext], res);
        } else {
            res.writeHead(404);
            res.end();
        }
    });
}

function getFile(localPath, mimeType, res) {
    fs.readFile(localPath, function(err, contents) {
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
}

function writeFile(localPath, contents) {

    // create a stream, and create the file if it doesn't exist
    stream = fs.createWriteStream(localPath);

    stream.on("open", function() {
        // write to and close the stream at the same time
        stream.end(contents, 'utf-8');

        res.end(html);
    });
}

    