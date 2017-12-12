var Raspberrypi = require('../Server4Pi');
var LEDemitter = require('../SmartEventEmitter').LEDemitter;

module.exports.GetHome = 
	function (req , res , next){

    var results = Raspberrypi;

    // views/GetHome.handlebars
    res.render('home',
      {title:"Welcome to SmartHome Service", data:results});
};


LEDemitter.on('LED', function (args) {
    // trigger next step only if the PiControl args already handled.
    if(args!=undefined){
        if (args.handled) {
          console.log('From User Server2:', args);
        }
    }
});

module.exports.PostHome = 
function SendMsgtoRaspberrypi(req , res , next){
    //req.body.name
    console.log('From User Server:' + req);

    LEDemitter.LED();
    //res.redirect('android/home/:email');
    res.redirect('/home');
};


// android
module.exports.AndroidPostHome = 
function SendMsgtoRaspberrypi(req , res , next){
    //req.body.name
    console.log('From User Server:' + req);

    LEDemitter.LED();

    var status = 'On';

    status = 'Off'

    res.json({message: status});
};



