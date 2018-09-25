// function Surrogate(){}
// Surrogate.prototype = SuperClass.prototype;
// Subclass.prototype = newSurrogate();
// Subclass.prototype.constructor = Subclass;

// Function.prototype.inherits = function(superClass){ //superClass is movingObject
//   function Surrogate(){}
//   Surrogate.prototype = superClass.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
// };

function MovingObject () {}
// function Ship () {}
// Ship.inherits(MovingObject);


//Object create
class Ship extends MovingObject {
  constructor() {
    super();
  }
}
