module.exports = 
	function addEmployee(req , res , next){
		// views/addEmployeeView.handlebars
  	res.render('addEmployeeView', 
  		{title:"Add a Employee"});
};
