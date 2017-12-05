const password = require('../Function/password');

module.exports.PostResetPassword = 
    function (req , res){
       
        const email = req.params.email;
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