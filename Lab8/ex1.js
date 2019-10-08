var age = 20;
var number = 0;
while(number < age){
    console.log(`are you ${number} years old?`);
    if(number > Math.sqrt(age)) {
        console.log("I'm old!");
        break;
    }
    number++;
}
console.log(`you must be ${number} years old!`);
