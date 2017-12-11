var passport = require('passport');

module.exports.GetSignup = 
	function (req , res , next){
    // views/GetSignup.handlebars
        res.render('signup', {title:"Welcome to SmartHome Service", message: req.flash('signupMessage') }); 
  };

module.exports.PostSignup = 
    passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    });

module.exports.AndroidPostSignup = function(req, res, next) {
            passport.authenticate('local-signup', function(err, user, info) {
                if (err){
                    console.log("error with authenticate");
                    return next(err);
                }
                if(user){
                    console.log("credention wrong");
                    return res.status(400).json({message: req.flash('signupMessage') });
                }
                req.logIn(user, function(err) {
                    if (err){
                        console.log("error");
                        return next(err);
                    }
                    if (!err){
                        console.log("success login");
                        return res.json({message: "Logged in!" });
                    }
                });
            })(req, res, next);
    };


    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================
    // locally --------------------------------
module.exports.GetlocalLink = 
    function (req , res , next){
        res.render('connect-local', { message: req.flash('signupMessage') });
    };
module.exports.PostlocalLink = 
    passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    });