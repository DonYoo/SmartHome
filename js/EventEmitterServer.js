var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('event1', function (args) {
    console.log('First subscriber:', args);
    args.handled = true;
});


// Emit
//setInterval(function() {
//    emitter.emit('event1', {a: 'foo', b: 'bar'});
//}, 10 * 1000);

module.exports = emitter;
