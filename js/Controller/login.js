var passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/email.json');

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

module.exports.AndroidPostLogin = function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err){
            console.log("error with authenticate");
            return next(err);
        }
        if(!user){
            console.log("credention wrong");
            return res.status(400).json({message: req.flash('loginMessage') });
        }
        req.logIn(user, function(err) {
            if (err){
                console.log("error");
                return next(err);
            }
            if (!err){
                console.log("success login");
                console.log(req.headers);
                console.log(req.user);
                const token = jwt.sign(user.toObject(), config.secret, { expiresIn: 1440 });
                return res.json({message: user.local.email, token: token});
            }
        });
    })(req, res, next);
};

        /*
module.exports.AndroidPostLogin =
    passport.authenticate('local-login', {
        successRedirect : '/android/SuccessLogin', // redirect to the secure profile section
        failureRedirect : '/android/FailedLogin', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
    });
    */