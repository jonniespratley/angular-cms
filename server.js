/**
 * Server - This is the Node.js Server.
 * @object
 */

var fs = require('fs'),
  cmsRouter = require('./routes/cms-router.js'),
  path = require('path'),
  serveStatic = require('serve-static'),
  config = JSON.parse(fs.readFileSync('./config/config.json'));

//Test if services
if (process.env.VCAP_SERVICES) {
  var cloudServices = JSON.parse(process.env.VCAP_SERVICES);

  console.warn('cloud services', cloudServices);
  //var dbcreds = services['mongodb'][0].credentials;
}

var port = process.env.PORT || config.port;
var host = process.env.VCAP_APP_HOST || "127.0.0.1";
config.host = host;
config.port = port;

var express = require('express');
var app = express();
var router = new cmsRouter(config, app);
router.mount();

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: [
    'js',
    'png',
    'html', 'jpeg', 'jpg', 'gif',
    'css'
  ],
  index: true,
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res, path) {
    res.set('x-timestamp', Date.now());
  }
};
var staticDir = config.publicDir;

console.log('staticDir', staticDir);
app.use(express.static(staticDir, options));
app.use(express.static(path.resolve(__dirname, config.staticDir), options));
app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
  console.log('cms-server', req.method);
});

app.get('/', function(res, req, next) {
  var indexFile = config.publicDir + path.sep + 'index.html';
  console.warn('Loading index', indexFile);
  req.send(indexFile);
});

app.listen(port, function() {
  console.log('express server listening on port: ' + port);
});
