const events = require('events'), util = require('util');

var cmsSockets = function (config, app) {
	events.EventEmitter.call(this);

	console.warn( 'cms-sockts' );

};

util.inherits(cmsSockets, events.EventEmitter);
module.exports = cmsSockets;
