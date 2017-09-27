var Server = require('./Server4Pi');

function Room(name, id, owner) {  
  this.name = name;
  this.id = id;
  this.owner = owner;
  this.people = [];
  this.status = "available";
};

Room.prototype.addPi = function(PiId) {  
  if (this.status === "available") {
    this.people.push(PiId);
  }
};

module.exports = Room;  