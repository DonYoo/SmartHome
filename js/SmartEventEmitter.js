var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var _ = require('underscore');

// Custom class 
function SmartEmitter(args) {
    this.data = args;
	EventEmitter.call(this);
}
inherits(SmartEmitter, EventEmitter);


// Sample member function that raises an event
SmartEmitter.prototype.LED = function (projectId) {
    //console.log(projectId);
    // Emit the Event
    this.emit('PiControl', "LED");
};
module.exports.SmartEmitter = SmartEmitter;


var LEDemitter = new SmartEmitter();
module.exports.LEDemitter = LEDemitter;


/*

sample output

var colors = require('colors');

//var ProjectEmitter = require('./SmartEventEmitter').ProjectEmitter;

var project = new ProjectEmitter();


//add
project.on('lookupByProjectId', function (args, result) {
    console.log('Event lookupByProjectId raised!'.blue, args, '\n');
});


// emit
console.log("\nLookup by ProjectId (2)".red);
project.lookupByProjectId(2)

*/
