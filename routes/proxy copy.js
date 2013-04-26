
var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy');

var welcome = [
  '#    # ##### ##### #####        #####  #####   ####  #    # #   #',
  '#    #   #     #   #    #       #    # #    # #    #  #  #   # # ',  
  '######   #     #   #    # ##### #    # #    # #    #   ##     #  ',   
  '#    #   #     #   #####        #####  #####  #    #   ##     #  ',   
  '#    #   #     #   #            #      #   #  #    #  #  #    #  ',   
  '#    #   #     #   #            #      #    #  ####  #    #   #  '
].join('\n');

util.puts(welcome.rainbow.bold);

//
// Basic Http Proxy Server
//
httpProxy.createServer(9000, 'localhost').listen(8000);

//
// Target Http Server
//http://198.101.255.239:3000
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(2000);

util.puts('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8000'.yellow);
util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '9000 '.yellow);