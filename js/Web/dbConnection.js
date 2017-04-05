var mongoose = require('mongoose');
var credentials = require("../credentials.js");

var dbUrl = 'mongodb://' + credentials.host + ':27017/' + credentials.database;
var connection = null;
var model = null;

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var EmployeeSchema = new Schema({
	firstName: String,
	lastName: String,
});

module.exports = {	
	getModel: function getModel() {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl);
			model = connection.model("EmployeeModel", 
			EmployeeSchema);
		};
		return model;
	}
};
























