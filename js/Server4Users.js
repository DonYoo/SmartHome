var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////    Server for User that use Web application     //////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


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
// creating server and listening at the same time with express.
app.listen(80, function(){
  console.log('http://localhost:80');
});
