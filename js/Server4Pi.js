var net = require('net');
var LEDemitter = require('./SmartEventEmitter').LEDemitter;
const uuidV4 = require('uuid/v4');

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////    Server for Raspberrypi with TCP communication     ////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


// Keep track of Raspberrypi connections

var clients = [];
var roomID = null;

var Raspberrypi = [];
var PiInfo = {};

var server = net.createServer(
    function(socket){
		// connect
		var uniqueId = uuidV4();
		PiInfo[uniqueId] = {"name" : uniqueId, "room": roomID};

		console.log("Raspberrypi connected..."+ uniqueId);		
		socket.write("Hello from server\n"+	// \n for flush
		"Your id is" + uniqueId + "\n");	// \n for flush
		Raspberrypi.push(socket);
		
	
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
			console.log("Raspberrypi disconnected..." + uniqueId);
			// remove socket from list of Raspberrypi
			var index = Raspberrypi.indexOf(socket);
			if (index != -1) {
				Raspberrypi.splice(index, 1);
			}
			LEDemitter.removeListener('PiControl', sendOnOff);
		});

		socket.on('error', function(err){
			console.log(err);
			// if pi disconnected in 
			if(err.message.localeCompare("read ECONNRESET") == 0){
				var index = Raspberrypi.indexOf(socket);
				if (index != -1) {
					Raspberrypi.splice(index, 1);
				}
				LEDemitter.removeListener('PiControl', sendOnOff);
			}
		});

		function sendOnOff(args){
			console.log("Number of Pi : " + Raspberrypi.length);
			console.log('From Pi Server:', args);
			socket.write(args.toString() + '\n');		//flush with next line
			args.handled = true;
		}
		// Add Subscriber ( get the emit from the Server4Users/PostHome.js )
		LEDemitter.on('PiControl', sendOnOff);
});


module.exports = Raspberrypi;

server.listen(2000, function() {
	console.log('http://localhost:2000');
});