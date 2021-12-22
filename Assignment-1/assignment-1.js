
// Q1. Write a program to demonstrate how a function can be passed as a parameter to another function.
function sayHowAreYou(){
    return "how you doing ?";
}

function greetByName(name,fun){
    return "Hi "+name+", "+fun();
}

console.log(greetByName("krishna",sayHowAreYou));






//Q2. An arrow function takes two arguments firstName and lastName and returns a 2 letter string


var result = (firstName,lastName) => firstName[0]+lastName[0];

console.log(result("Alison","Parker"));


