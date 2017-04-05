var EmployeeDb = require('./dbConnection.js');
var EmployeeModel = EmployeeDb.getModel();

module.exports = 
  function saveEmployee(req , res , next){

    var EmployeeSchema = new EmployeeModel({
      firstName:     req.body.fname,
      lastName:      req.body.lname,
    }); 
 
    EmployeeSchema.save(function (err){
      if(err)
        console.log("Error : %s ",err);
      res.redirect('/employees');
    });

  };
