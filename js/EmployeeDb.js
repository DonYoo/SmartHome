var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// JSON
var EmployeeSchema = new Schema({
	firstName: String,
	lastName: String,
});

module.exports = {
	getModel: function getModel(connection) {
		return connection.model("EmployeeModel", 
							EmployeeSchema);
	}
}
