var LEDemitter = require('../SmartEventEmitter').LEDemitter;

LEDemitter.on('PiControl', function (args) {
    // trigger next step only if the PiControl args already handled.
    if (args.handled) {
          console.log('From User Server2:', args);
    }
});


module.exports = 
function SendMsgtoRaspberrypi(req , res , next){
    console.log('From User Server:');
    LEDemitter.LED();
    res.redirect('/home');
};





