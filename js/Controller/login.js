var passport = require('passport');

module.exports.GetLogin = 
	function (req , res , next){
    // views/GetHome.handlebars
    res.render('login',
      {title:"SmartHome Service", message: req.flash('loginMessage') }); 
    };

module.exports.PostLogin = 
    passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    });

/**
 * TO-DO
 * this is where i was working on.
 */

module.exports.AndroidPostLogin = 
    passport.authenticate('local-login'),
    function(req, res){
        console.log(req.user);
        res.json(req.user);
    }

        /*
module.exports.AndroidPostLogin =
    passport.authenticate('local-login', {
        successRedirect : '/android/SuccessLogin', // redirect to the secure profile section
        failureRedirect : '/android/FailedLogin', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages

    });
    */