module.exports = 
	function GetHome(req , res , next){
        // views/GetHome.handlebars
      res.render('GetHome',
      	{title:"Welcome to SmartHome Service"});
};

