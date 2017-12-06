var express = require('express');
var router = express.Router();

/* Path
Add new course from main screen.

Webapplication.js -> index.js -> displayCourses.js - > displayCoursesView.handlebars
-> javascripts(clickActions.js) -> addCourse.js ->
addCourseView.handlbars -> (post /courses/add )saveCourse 
-> index.js
*/

// link variable to file.
var GetIndex                = require("./index").GetIndex;

var GetSignup               = require("./signup").GetSignup;
var PostSignup              = require("./signup").PostSignup;
var GetlocalLink            = require("./signup").GetlocalLink;
var PostlocalLink           = require("./signup").PostlocalLink;

var GetLogin                = require("./login").GetLogin;
var PostLogin               = require("./login").PostLogin;

var AuthFacebook            = require("./facebook").AuthFacebook;
var CallbackFacebook        = require("./facebook").CallbackFacebook;
var GetFacebookLink         = require("./facebook").GetFacebookLink;
var CallbackFacebookLink    = require("./facebook").CallbackFacebookLink;

var GetHome 	            = require("./home").GetHome;
var PostHome 	            = require("./home").PostHome;

var GetProfile              = require("./profile").GetProfile;
var GetUnlinkLocal          = require("./profile").GetUnlinkLocal;
var GetUnlinkFacebook       = require("./profile").GetUnlinkFacebook;


/*
GET  - Requests data from a specified resource
POST - Submits data to be processed to a specified resource
*/

    // router specs
router.get('/', function(req, res, next) {
    res.redirect('/index');
});
router.get('/index',                    GetIndex);

router.get('/signup',                   GetSignup);
router.post('/signup',                  PostSignup);
    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================
    // locally --------------------------------
router.get('/connect/local',            GetlocalLink);
router.post('/connect/local',           PostlocalLink);

    // show the login form
router.get('/login',                    GetLogin);           
router.post('/login',                   PostLogin);

    // route for facebook authentication and login
router.get('/auth/facebook',            AuthFacebook);
router.get('/auth/facebook/callback',   CallbackFacebook); // handle the callback after facebook has authenticated the user
    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================
    // send to facebook to do the authentication
router.get('/connect/facebook',         GetFacebookLink);
router.get('/connect/facebook/callback',CallbackFacebookLink); // handle the callback after facebook has authorized the user

    // =====================================
    // Home Page After Log =================
    // =====================================
router.get('/home', isLoggedIn,         GetHome);
router.post('/home',                    PostHome);

    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn,      GetProfile);

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future
    
    // local -----------------------------------
router.get('/unlink/local',             GetUnlinkLocal);
    // facebook -------------------------------
router.get('/unlink/facebook',          GetUnlinkFacebook);


    // =====================================
    // LOGOUT ==============================
    // =====================================
router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    
    // =====================================
    // Android =============================
    // =====================================

    
// Android route
var AnroidResetPassword     = require("./resetPassword").PostResetPassword;
var AndroidPostSignup       = require("./signup").AndroidPostSignup;
var AndroidPostLogin        = require("./login").AndroidPostLogin;
var AndroidGetProfile       = require("./profile").AndroidGetProfile;

    // Android password reset. email the password and get a token.
router.post('/android/:email/password',	AnroidResetPassword);

// Android Signup function
router.post('/android/signup',          AndroidPostSignup);
router.get('/android/signup', function(req , res , next) {
    // still broken. but i don't undestand how to get the req.flash into here from android.
    //console.log(req.badRequestMessage);
    res.status(400).json({message: 'That email is already taken.' });
});

// Android Login function
router.post('/android/login',           AndroidPostLogin);
router.get('/android/SuccessLogin',     function(req , res , next) {
    res.status(200).json({message: 'holymoly' });   // get the user out of session and pass to template
});

router.get('/android/FailedLogin', function(req , res , next) {
    // still broken. but i don't undestand how to get the req.flash into here from android.
    //console.log(req.flash('loginMessage'));
    res.status(400).json({message: 'No user found or Wrong password..' });
});

// Android profile home
router.get('/android/profile/',         AndroidGetProfile);

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}