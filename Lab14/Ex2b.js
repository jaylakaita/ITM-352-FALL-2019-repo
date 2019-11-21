fs = require('fs');

var filename = 'user_data.json';

if(fs.existsSync(filename)) {
    //im going to check if the file exists
        stats = fs.statSync(filename);
    
        console.log(filename + ' has ' + stats.size + 'characters');
        //stat size give info in the file
        data = fs.readFileSync(filename, 'utf-8') 
    
        users_reg_data = JSON.parse(data);
    
        console.log(users_reg_data.itm352.password);
    } 
    //if does not exist say it does not exist
    else {
        console.log(filename + 'does not exist!')
    }
