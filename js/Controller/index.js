
module.exports.GetIndex = 
	function (req , res , next){

    // views/GetHome.handlebars
    res.render('index',
      {title:"SmartHome Service"});
};

