var mongoose = require('mongoose');
var credentials = require("./credentials.js");

var dbUrl = 'mongodb://' + credentials.host + ':27017/' + credentials.database;
mongoose.Promise = global.Promise;	// this is for removing warnings.
var connection = mongoose.createConnection(dbUrl);

// get a schema format from the EmployeeDb.
var EmployeeDb = require('./EmployeeDb.js');
var EmployeeModel = EmployeeDb.getModel(connection);

connection.on("open", function(){
	
	// create and save document objects
	var employee;

	employee = new EmployeeModel({
            firstName: 'John',
            lastName: 'Smith',
	}); 
    employee.save();

    employee = new EmployeeModel({
            firstName: 'Jane',
            lastName: 'Smith',
	}); 
    employee.save();

    employee = new EmployeeModel({
            firstName: 'John',
            lastName: 'Doe',
	}); 
	employee.save(function(err) {
		connection.close();
		if (err) throw err;
		console.log("Success!");
	});
});