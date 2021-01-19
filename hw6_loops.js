/*jshint esversion: 6 */

var isPrime = (num) => {
    //Function returns true if Prime
    for(let i=2; i<num; i++) {
        if(num%i==0) {
            return false;
        }
    }
    return true;
};

for(let i=1; i<=100; i++) {
    if(isPrime(i)) {
        console.log("prime");
    } else if(i%15==0) {
        console.log("FizzBuzz");
    } else if(i%5==0) {
        console.log("Buzz");
    } else if(i%3==0) {
        console.log("Fizz");
    } else {
        console.log(i);
    }
}