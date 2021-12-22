
// Refactor the following function into a one-liner:
// const printName = (name) => {
//                      return “Hi” + name;
//            }

const printName = (name) => "Hi "+name;
console.log(printName("Martin"));


// ---------------------------------------------------------------------------------------------

// Rewrite the following code using template literals
// const printBill = (name, bill) => {
//                      return “Hi “ + name + “, please pay: “ + bill;
//            }

const printBill = (name,bill)=>{
    return `Hi ${name}, please pay: ${bill}`;
}
console.log(printBill("john","450"));




// -----------------------------------------------------------------------------------------------

// Modify the following code such that the object properties are destructured and logged.
// const person = {
//                       name: “Noam Chomsky”,
//                       age: 92
//             }

const person = {
    name : 'Noam Chomsky',
    age : 92
}   
const {name,age} = person;
console.log(name, age)