var server = require('./EventEmitterServer');

server.on('event2', function (args) {
	if (args.handled) {
    console.log('Second subscriber:', args);
	}
});


server.emit('event2', {a: 'foo', b: 'bar'});