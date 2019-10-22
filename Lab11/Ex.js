attributes  =  "<jayla>;<20>;<20.5>;<-19.05> " 
theSeparator = ';';
//parts = attributes.slipt(theSeparator)

parts = ['jayla',20,20.5,-19.05];

for(i=0; i < parts.length; i++) {
    console.log(typeof parts[i]);    
}

console.log(parts.join(theSeparator));

function isNonNegInt(q){
    console.log('hey')
}
isNonNegInt();