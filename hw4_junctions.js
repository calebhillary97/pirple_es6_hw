/*jshint esversion: 6 */

(function(global){
    //Problem 1
    //Variables declaration
    let socrates = "socrates";
    let men = [];

    men.push("Plato");
    men.push("Aristotle");
    men.push("Pythagoras");
    men.push("Democritus");
    men.push(socrates);

    //All men are mortal
    let isMortal = function(name){
        //Argument string check
        if(typeof name === "string") {
            //Check if name is in men array
            if(men.indexOf(name.toLowerCase())>=0) {
                //return true since name is man, and man is mortal
                return true;
            }
        } else {
            console.log('Input to isMortal function is not String. Please check your inputs');
        }
        return false;
    };

    //Expose function
    global.isMortal = isMortal;
})(window);

(function(global){
    //Problem 2
    //Variables declaration
    const vanilla = "vanilla";
    const chocolate = "chocolate";

    let cakeCheck = (cakesArray, isChocolate) => {
        //Ensure argument datatypes
        if(cakesArray instanceof Array && typeof isChocolate === "boolean") {
            //Arguments are valid
            if(isChocolate && cakesArray.indexOf("chocolate")>=0) {
                //isChocolate is true and possible cakes contains chocolate
                return chocolate;
            }
            //isChocolate is false, so we return default flavor: vanilla
            return vanilla;
        } else {
            console.log('Input to cakeCheck is of incorrect datatype');
            return null;
        }
    };

    global.cakeCheck = cakeCheck;
})(window);
