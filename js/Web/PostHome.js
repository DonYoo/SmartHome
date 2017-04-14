var ToRaspberrypi = require('../Server4Pi');

ToRaspberrypi.on('PiControl', function (args) {
    console.log('From User Server:', args);

    // trigger next step only if the PiControl args already handled.
    if (args.handled) {
          console.log('From User Server:', args);
    }
});


module.exports = 
function SendMsgtoRaspberrypi(req , res , next){
    // Emit the Event
    ToRaspberrypi.emit('PiControl', "LED");
    res.redirect('/home');
};





