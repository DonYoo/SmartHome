var passport = require('passport');

module.exports.AuthFacebook = 
    passport.authenticate('facebook', { scope : 'email' });

module.exports.CallbackFacebook = 
    passport.authenticate('facebook', {
        successRedirect : '/home',
        failureRedirect : '/'
    });


    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================
    // send to facebook to do the authentication


module.exports.GetFacebookLink = 
    passport.authorize('facebook', { scope : 'email' });

module.exports.CallbackFacebookLink = 
    passport.authorize('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    });