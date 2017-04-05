var EmployeeDb = require('./dbConnection.js');
var EmployeeModel = EmployeeDb.getModel();


module.exports = 
  function saveCourse(req , res , next){
    var id = req.params.id;

    EmployeeModel.findById(id, function (err, employee){
      if(err)
        console.log("Error Selecting : %s ", err); 
      if (!employee)
        return res.render('404');
      
        employee.firstName = req.body.fname
        employee.lastName = req.body.lname;
        
        employee.save(function (err) {
          if (err)
            console.log("Error updating : %s ",err );
          res.redirect('/employees');
        });
    });
  };
