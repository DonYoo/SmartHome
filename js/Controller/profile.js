var passport = require('passport');
var user     = require('../config/models/user');

module.exports.GetProfile = 
	function (req , res , next){
    // views/GetHome.handlebars
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
};

module.exports.AndroidGetProfile = function (req , res){
    
    const email = req.params.email;
                        
    new Promise((resolve,reject) => {
                user.findOne({ 'local.email': email }) //, { name: 1, email: 1, created_at: 1, _id: 0 })
        
                .then(users => {
                    let user = users.local;
                    user = user.toObject();
                    delete user.password;   //delete password, unnecessary
                    resolve(user)
                })
                .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))
            })
    .then(result => res.json(result))
    .catch(err => res.status(err.status).json({ message: err.message }));
}


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