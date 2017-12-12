// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var credentials = require('../auth');

// JSON
// define the schema for our user model
var userSchema = mongoose.Schema({

    local                   : {
        name 			    : String,
        email               : {type: String, unique: true}, 
        password            : String,
        created_at		    : String,
        temp_password       : String,
        temp_password_time  : String
    },
    facebook                : {
        id                  : String,
        token               : String,
        email               : String,
        name                : String
    },


    twitter                 : {
        id                  : String,
        token               : String,
        displayName         : String,
        username            : String
    },
    google                  : {
        id                  : String,
        token               : String,
        email               : String,
        name                : String
    }

});

var dbUrl = 'mongodb://' + credentials.mongooseDB.host + ':27017/' + credentials.mongooseDB.database;
//mongoose.Promise = global.Promise;	// this is for removing warnings.
//var connection = mongoose.createConnection(dbUrl);
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
	useMongoClient: true,		// to satisfy the warning.
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
  });

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);