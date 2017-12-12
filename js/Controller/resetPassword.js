const password = require('../Function/password');

module.exports.PostResetPassword = 
    function (req , res){
       
        const email = req.params.email;
        // need to clean up token. i don't think i need it since i use passport.
        const token = req.body.token;
        const newPassword = req.body.password;
    
        // this bring you to screen that type email address for token
        if (!token || !newPassword || !token.trim() || !newPassword.trim()) {
            
            password.resetPasswordInit(email)
            .then(result => res.status(result.status).json({ message: result.message }))
            .catch(err => res.status(err.status).json({ message: err.message }));
        } 
        // this bring you to screen that type token from email and new password.
        else {
            
            password.resetPasswordFinish(email, token, newPassword)
    
            .then(result => res.status(result.status).json({ message: result.message }))
    
            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    };


    module.exports.AnroidChangePassword = 
    function (req , res){
        const email = req.params.email;

        const oldPassword = req.body.password;
        const newPassword = req.body.newPassword;

        if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {
            res.status(400).json({ message: 'Invalid Request !' });

        } else {
            password.changePassword(email, oldPassword, newPassword)
            .then(result => res.status(result.status).json({ message: result.message }))
            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    };