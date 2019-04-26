//Notes made while following this tutorial: https://www.youtube.com/watch?v=PFmuCDHHpwk

/*
Part 1: Overview

-4 Pillars of OOP
1. encapsulation: grouping methods/functions and properties/variables.
2. abstraction: showing only the essential methods and properties.
3. inheritance
4. polymorphism 

*/

/* 
Part 2: Objects

If an object has one or more methods, it has "behaviour". And if an object has behaviour, object literal syntax is not the best way to create the object.

*/

//Object Literals syntax:
const circle = {
  radius: 1,
  location: {
    x: 1,
    y: 1
  },
  draw: function() {
    console.log("draw");
  }
};

//Factory Functions
function createCircle(radius) {
  return {
    radius: radius, //OR just "radius,"
    draw: function() {
      console.log("draw");
    }
  };
}
const circle = createCircle(1);
circle.draw();

//Constructor Functions (Most similar to Java/C#)
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log("draw");
  };
}
const another = new Circle(1);
another.draw();

/*
By default, "this" references the window object.
By using the "new" keyword, we make "this" reference the new object.
New does 3 things:
1. New creates an empty object.
2. Points "this" to that object.
3. Return that object from the function. So you don't need to state "return this;"
*/

/*
Part 3: Properties 

Every property has a constructor function.
Like Number();
*/
new Number(); //vs just using the number
new Boolean(); //vs declaring true or false
new String(); //vs '', "", ``

/* 
In JavaScript, functions are objects
*/

/* 
Part 4: Value vs. Reference Types
Value types/Primitives
Number, string, boolean, symbol, undefined and null

Reference types/Objects
Objects, Functions and Arrays
*/

//Primitives
let x = 10;
let y = x;

let x = 20;
console.log(y); //outputs 10

//Reference types
let x = { value: 10 };
let y = x;

x.value = 20;
console.log(y); //outputs { value: 20 }

/*
The object is not stored in the variable, it's stored somewhere else in memory, and that address is copied into the variable. So the variables are just references. Changes are immediately visible.
So y references a place, not a value.
**Primitives are copied by their value. Objects are copied by their reference.
*/

let number = 10;

function increase(number) {
  number++;
}

increase(number);
console.log(number); //outputs 10 because the number inside the function is only scoped to the function
//So the number is increased within the function. If the console.log happened within the function, the output would be 11
let obj = { value: 10 };

function increase(obj) {
  obj.value++;
}
increase(obj);
console.log(obj); //Outputs value: 11 because the object is passed by reference, not by value
//two variables pointing to the same object

/* 
Part 5: adding/removing values

Can always add classes/properties to an object later
*/
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log("draw");
  };
}
const another = new Circle(1);
another.draw();

another.location = { x: 1 }; //adds location property and value to the another object
another["location"] = { x: 1 }; //does the same as above
/* The above is called 'bracket notation' and is useful when the property you are trying to reference includes spaces or special characters that would otherwise break your code
 */

/* 
Part 6: Enumerating Properties

Iterating
*/
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log("draw");
  };
}
const circle = new Circle(1);

for (let key in circle) {
  console.log(key); //outputs 'radius' and 'draw'
  console.log(key, circle[key]); //outputs property names and values - including methods
  if (typeof circle[key] !== "function") console.log(key, circle[key]); //only outputs properties, excludes methods
}
const keys = Object.keys(circle);
console.log(keys); //outputs an array ["radius", "draw"]

if ("radius" in circle)
  //check to see if object has a specific property
  console.log("Circle has a radius");

/* 
Part 7: Abstraction
Hide the details/things you don't want users to see/mess with, show only the essentials
DVD Player analogy - DVD players are complicated on the inside, but the user only gets a limited range of buttons/a disc drive/etc. to interact with. Aim to do this with your code.
*/
function Circle(radius) {
  this.radius = radius;
  this.defaultLocation = { x: 0, y: 0 };
  this.computeOptimumLocation = function() {};
  this.draw = function() {
    this.computeOptimumLocation();
    console.log("draw");
  };
}
const circle = new Circle(1);

/* 
Part 8: Private Properties and Methods
(sort of a continuation from previous part)

Closure vs scope
Scope is temporary, closure is not. Stays in memory
*/
function Circle(radius) {
  this.radius = radius;
  //By changing defaultLocation to a variable, you limit the scope to this object, making it inaccessible to users.
  //These variables stay in memory (closure)
  let defaultLocation = { x: 0, y: 0 };

  let computeOptimumLocation = function(factor) {};
  this.draw = function() {
    //This variable will cease to exist after the function is run (scope)
    let x = 20;
    //
    computeOptimumLocation(0.1);
    console.log("draw");
  };
}
const circle = new Circle(1);

/* 
Part 9: Getters and Setters

If you want to display a private variable, you can use a method

**A getter is a function that is used to read a property
*/
function Circle(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 };
  //defaultLocation can't be manipulated by users, but can be displayed using this method
  //closure of this function includes all the variables defined in the parent function
  this.getDefaultLocation = function() {
    return defaultLocation;
  };
  this.draw = function() {
    console.log("draw");
  };
  //Use Object.defineProperty to define getters and setters
  Object.defineProperty(this, "defaultLocation", {
    get: function() {
      return defaultLocation;
    },
    set: function(value) {
      defaultLocation = value;
      if (!value.x || !value.y) {
        throw new Error("Invalid Location.");
      }
      defaultLocation = value;
    }
  });
}
const circle = new Circle(1);
circle.getDefaultLocation();
circle.defaultLocation;
circle.draw();

/* 
Part 10: Exercise

*/
/* 
Part 11: Solution

*/
