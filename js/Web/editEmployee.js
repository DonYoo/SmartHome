var EmployeeDb = require('./dbConnection.js');
var EmployeeModel = EmployeeDb.getModel();

module.exports = 
	function editEmployee(req , res , next){
    var id = req.params.id;

    EmployeeModel.findById(id, function (err, employee){
      if(err)
        console.log("Error Selecting : %s ", err); 
      if (!employee)
        return res.render('404');
        // views/editEmployeeView.handlebars
      res.render('editEmployeeView',
          {title:"Edit Employee", 
           data: {id: employee._id,
                  firstName: employee.firstName,
                  lastName: employee.lastName}
          });                
    });
};

