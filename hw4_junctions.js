/*jshint esversion: 6 */


//Problem 1
//Variables declaration
let men = [];

men.push("Plato");
men.push("Aristotle");
men.push("Pythagoras");
men.push("Democritus");
men.push("Socrates");

//All men are mortal
let isMortal = function(name){
    //Argument string check
    if(typeof name === "string") {
        //Check if name is in men array
        if(men.indexOf(name)>=0) {
            //return true since name is man, and man is mortal
            return true;
        }
    } else {
        console.log('Input to isMortal function is not String. Please check your inputs');
    }
    return false;
};


//Test my function
console.log(isMortal("test")); //false
console.log(isMortal("Socrates")); //true
console.log(isMortal(5)); //false - Input to isMortal function is not String. Please check your inputs


//Problem 2
//Variables declaration
const vanilla = "vanilla";
const chocolate = "chocolate";

let cakeCheck = (availableCakes, isChocolate) => {
    debugger;
    //Ensure argument datatypes
    if(availableCakes instanceof Array && typeof isChocolate === "boolean") {
        //Arguments are valid
        if(isChocolate && availableCakes.indexOf(chocolate)>=0) {
            //isChocolate is true and possible cakes contains chocolate
            return chocolate;
        } else if(availableCakes.indexOf(vanilla)>=0) {
            //Vanilla is available, so we can return that
            return vanilla;
        } else if(availableCakes.length>0){
            //Vanilla is not available so return any available cake
            return availableCakes[0];
        } else {
            //No cake is available
            console.log('Cakes array is empty. Please check input');
            return null;
        }
        //isChocolate is false, so we return default flavor: vanilla
    } else {
        console.log('Input to cakeCheck is of incorrect datatype');
        return null;
    }
};

//Testing cakeCheck function
console.log(cakeCheck(['chocolate', 'vanilla'], true)); //chocolate
console.log(cakeCheck(['chocolate', 'vanilla'], false)); //vanilla
console.log(cakeCheck(['pista', 'vanilla'], false)); //vanilla
console.log(cakeCheck(['pista', 'mango'], true)); //pista
console.log(cakeCheck([], true)); //null - Cakes array is empty. Please check input
console.log(cakeCheck(true, true)); //nunll - Input to cakeCheck is of incorrect datatype