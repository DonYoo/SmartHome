var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

/* Path
Add new course from main screen.

Webapplication.js -> index.js -> displayCourses.js - > displayCoursesView.handlebars
-> javascripts(clickActions.js) -> addCourse.js ->
addCourseView.handlbars -> (post /courses/add )saveCourse 
-> index.js

*/
var app = express();

// setup handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./Web/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});



var net = require('net');
// Keep track of client connections
var clients = [];

var server = net.createServer(
    function(socket){
		console.log("Client connection...");
		clients.push(socket);

		socket.on('end', function(){
			console.log("Client disconnected...");
			// remove socket from list of clients
			var index = clients.indexOf(socket);
			if (index != -1) {
				clients.splice(index, 1);
			}
		});

		socket.on('data', function(data){
			console.log(" Received: ", data.toString());
			// Broadcast to other clients
			for (var i = 0; i < clients.length; i++) {
				if (clients[i] != socket) {
					clients[i].write(data);
				}
			}
		});
        socket.write("Hello from server");
});

server.listen({host:'localhost', port:2000}, function() {
	console.log("Listening for connections");
});
