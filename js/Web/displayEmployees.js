var EmployeeDb = require('./dbConnection.js');
var EmployeeModel = EmployeeDb.getModel();

module.exports = 
	function displayEmployees(req , res , next){
    EmployeeModel.find({}, function(err , employees){
      if(err)
          console.log("Error : %s ",err);

      var results = employees.map(function (employee){
      	return {
            id: employee._id,     // this id is for each data number from data base.
          	firstName: employee.firstName,
	        lastName: employee.lastName,
      	}
      });
      res.render('displayEmployeesView',
      	{title:"List of Employees", data:results});
    });
};

