var EmployeeDb = require('./dbConnection.js');
var EmployeeModel = EmployeeDb.getModel();

module.exports = 
	function deleteCourse(req , res , next){
    var id = req.params.id;
    
    EmployeeModel.findById(id, function (err, employee){
      if(err)
        console.log("Error Selecting : %s ", err); 
      if (!employee)
        return res.render('404');
      
      employee.remove(function (err) {
        if (err)
          console.log("Error deleting : %s ",err );
        res.redirect('/employees');
      });        
    });
  };

  