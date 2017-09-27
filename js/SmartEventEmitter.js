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
SmartEmitter.prototype.LED = function (number) {
    //console.log(projectId);
    // Emit the Event
    this.emit('PiControl', 'LED');
};

// Sample member function that raises an event
SmartEmitter.prototype.TERMINATE = function (number) {
    //console.log(projectId);
    // Emit the Event
    this.emit('TERMINATE', 'TERMINATE');
};

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
