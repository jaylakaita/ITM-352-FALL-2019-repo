fs = require('fs');

var filename = 'user_data.json';

data = fs.readFileSync(filename, 'utf-8') 
//it is the path and options, returns a change and buffer
//buffer is a string you can change
//when you call it, it will return with the contents of the file
//read the file sychronously then wait until the file comes back

//console.log(data);
//this should bring back a string if it was able to read it
users_reg_data = JSON.parse(data);
//console.log(users_reg_data);
//log converts it into json string and outputs it
//putting typeof makes it an object
console.log(users_reg_data.itm352.password);
//this allows you to get the specific object, in this case its user itm352 password
