var express = require('express');
var router = express.Router();

/* Path
Add new course from main screen.

Webapplication.js -> index.js -> displayCourses.js - > displayCoursesView.handlebars
-> javascripts(clickActions.js) -> addCourse.js ->
addCourseView.handlbars -> (post /courses/add )saveCourse 
-> index.js

*/

// other modules
var displayHome 	= require("./displayHome");
var displayEmployees 	= require("./displayEmployees");
var addEmployee 			= require("./addEmployee");
var saveEmployee 			= require("./saveEmployee");
var editEmployee 			= require("./editEmployee");
var saveAfterEdit 	= require("./saveAfterEdit");
var deleteEmployee 		= require("./deleteEmployee");

// router specs
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

/*
GET  - Requests data from a specified resource
POST - Submits data to be processed to a specified resource
*/
router.get('/home',               displayHome);

router.get('/employees', 					displayEmployees);

router.get('/employees/add', 			addEmployee);
router.post('/employees/add', 		saveEmployee);

router.get('/employees/edit/:id', 	editEmployee);
router.post('/employees/edit/:id', 	saveAfterEdit);

router.get('/employees/delete/:id', deleteEmployee);

module.exports = router;
