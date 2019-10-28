attributes  =  "<jayla>;<20>;<20.5>;<-19.05>";
theSeparator = ';';
parts = attributes.slipt(theSeparator);

//parts = ['jayla',20,20.5,-19.05];

//for(i=0; i < parts.length; i++) {
    parts.forEach(function (item, index));
    console.log((typeof item == 'string' && item.length > 0)?true:false )    
//}
parts.forEach(printIt);
function printIt(item, index) {
console.log(`$parts[i] isNonNegInt ${isNonNegInt(parts[i], true)}`);
}

//function isNonNegInt(q){
//    console.log('hey')
//}
for(i=0; i < parts.length; i++){
    console.log(`$parts[i] isNonInt $(isNonNegInt(parts[i])}`);
}

console.log(parts.join(theSeparator));

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

//console.log(IsNonNegInt(3));
