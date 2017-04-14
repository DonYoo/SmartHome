var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var _ = require('underscore');

// Custom class 
function ProjectEmitter() {
	EventEmitter.call(this);
}
inherits(ProjectEmitter, EventEmitter);


// Sample member function that raises an event
ProjectEmitter.prototype.lookupByProjectId = function (projectId) {

	this.emit('lookupByProjectId', projectId);
	// rest of code
    console.log(projectId);
};

ProjectEmitter.prototype.lookupByEmployeeId = function (inputId) {
	this.emit('lookupByEmployeeId', inputId);

    var compareId = parseInt(inputId);
    var projectList = new Array();
    var compareEmployee;
    for(var i = 0; i<this.data.length; i++) {
        var project = this.data[i];
        compareEmployee = project.employees;
        var employeeName = _.findWhere(compareEmployee, {employeeId: compareId});
        (employeeName == null) ? undefined : projectList.push(JSON.stringify(project));
    }
    console.log(projectList);
    //return projectList;
};



ProjectEmitter.prototype.addEmployeeToProject = function (projectId, employeeId, fullName)  {
	this.emit('addEmployeeToProject', projectId, employeeId, fullName);

	var compareId = parseInt(projectId);
        var project = _.findWhere(this.data, {projectId: compareId});
        var newData = { fullName: fullName, employeeId: employeeId };
        var ListEmployee = project.employees;
        var employee = _.findWhere(ListEmployee, {fullName: fullName});
        if(employee == null){
             ListEmployee.push(newData);
             return true;
        }
        return false;
}

module.exports.ProjectEmitter = ProjectEmitter;



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
