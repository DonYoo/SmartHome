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

                var returnMessage = req.flash('signupMessage').toString();
                console.log('signup test:' + returnMessage);

                if (err){
                    console.log("error with authenticate");
                    return next(err);
                }
                console.log(returnMessage);
                return res.status(200).json({message: returnMessage });
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