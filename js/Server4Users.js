
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 80;
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var handlebars   = require('express3-handlebars');



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


// setup handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');


// required for passport
require('./config/passport')(passport); // pass passport for configuration

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'ilovescotchscotchyscotchscotch'
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// static resources
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing ======================================================================
var routes = require('./Controller/routes');// load our routes and pass in our app and fully configured passport
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
// creating server and listening at the same time with express.
app.listen(port, function(){
  console.log('http://localhost:80');
});
