var passport = require('passport');

module.exports.GetProfile = 
	function (req , res , next){
    // views/GetHome.handlebars
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
};

module.exports.AndroidGetProfile = 
	function (req , res , next){
        res.json(req.user);  // get the user out of session and pass to template
};


module.exports.GetUnlinkLocal = 
    function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    }

module.exports.GetUnlinkFacebook = 
    function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    };