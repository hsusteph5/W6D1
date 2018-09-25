//without the rest operator (argument)
// function sum(){
//   let args = Array.prototype.slice.call(arguments);
//   let sum = 0;
//   args.forEach(arg => {
//     sum += arg;
//   });
//   return sum;
// }

//with the rest operator
// function sum(...args) {
//   let sum = 0;
//   args.forEach(arg => {
//     sum += arg;
//   });
//   return sum;
// }


const myBind = function(method, ctx, ...bindArgs){
  return function(...innerRest) {
    method.apply(ctx, bindArgs.concat(innerRest));
  };
};

Function.prototype.myBind = function(first, ...rest){
  const that = this; //this stores markov.says
  return function(...innerRest) {
    that.apply(first, rest.concat(innerRest));//[].concat(['meow', 'tree'])
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}


const markov = new Cat("Markov");
const breakfast = new Dog("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true
//
// function curriedSum(numArgs){
//   const numbers = [];
//   let sum = 0;
//
//   return function _curriedSum(arg1) {
//     numbers.push(arg1);
//     if(numbers.length === numArgs){
//       numbers.forEach( (num) => {
//         sum += num;
//       });
//       console.log(sum);
//       return sum;
//     } else {
//       return _curriedSum;
//     }
//   };
// }
//
// const sum = curriedSum(4);
// sum(5)(30)(20)(1);



function sumThree(num1, num2, num3) {
  console.log(num1 + num2 + num3);
  return num1 + num2 + num3;
}

Function.prototype.curry = function(numArgs) {
  let numbers = [];
  const that = this; // that = sumThree function
  return function _curry(arg1) {
    numbers.push(arg1);
    if(numbers.length === numArgs){ //[4, 20, 6]
      // return that(...numbers); //sumThree(4, 20, 6)
      let oldNumbers = numbers;
      numbers = [];
      return that.apply(null, oldNumbers); //function doesn't have this

    } else {
      return _curry;
    }
  };
};

sumThree.curry(3)(4)(20)(6);
