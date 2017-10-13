// expose our config directly to our application using module.exports

module.exports = {
    'mongooseDB' : {
        host:     '127.0.0.1',//'128.197.103.47',//'127.0.0.1',//
        username: 'DonYoo',
        password: 'DonYoo',
        database: 'SmartHome'
    },

	 'facebookAuth' : {
        'clientID'      : '1272934696144364', // your App ID
        'clientSecret'  : '3193955da8459ccb8917e2e82a806f72', // your App Secret
        'callbackURL'   : 'http://52.40.177.51:80/auth/facebook/callback'
    },

/*
    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },
	*/
}