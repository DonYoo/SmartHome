var net = require('net');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////    Server for Raspberrypi with TCP communication     ////////////////////
////////////////////////////////////////////////////////////////////////////////////////////



// Keep track of Raspberrypi connections
var Raspberrypi = [];
var server = net.createServer(
    function(socket){
		console.log("Raspberrypi connected...");		
		Raspberrypi.push(socket);
		socket.write("Hello from server\n");	// \n for flush 

		// wait little bit for pi to connect and open the input stream.
		//console.log(socket.address());

		// this is when it gets the regular data from clients.
		socket.on('data', function(data){
			console.log(" Received: ", data.toString());
			// Broadcast to other Raspberrypi
			/*
			for (var i = 0; i < Raspberrypi.length; i++) {
				if (Raspberrypi[i] != socket) {
					Raspberrypi[i].write(data + '\n');		//flush with next line
				}
			}
			*/
		});

		// if raspberrypi disconnected.in
		socket.on('end', function(){
			console.log("Raspberrypi disconnected...");
			// remove socket from list of Raspberrypi
			var index = Raspberrypi.indexOf(socket);
			if (index != -1) {
				Raspberrypi.splice(index, 1);
			}
		});

		// Add Subscriber ( get the emit from the Server4Users/PostHome.js )
		emitter.on('PiControl', function (args) {
		console.log('From Pi Server:', args);
		// if LED on/off successfully return args.handled = true;
		socket.write(args.toString() + '\n');		//flush with next line
		args.handled = true;
	});


});

	module.exports = emitter;

server.listen(2000, function() {
	console.log('http://localhost:2000');
});