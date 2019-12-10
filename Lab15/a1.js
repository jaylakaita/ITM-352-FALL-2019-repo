//processing a login
var express = require('express');
var app = express();
var myParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session')

app.use(myParser.urlencoded({ extended: true }));
//middleware
//when request is made and has cookie with request middle ware takes cookie and turns it into a request
//like body-parser turning into object to be used

fs = require('fs');

var filename = 'user_data.json';

if(fs.existsSync(filename)) {
//im going to check if the file exists
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + 'characters');
    //stat size give info in the file
    data = fs.readFileSync(filename, 'utf-8') 

    users_reg_data = JSON.parse(data);
    //converts string into object
/*
    username = 'newuser';
    users_reg_data[username] = {};
    users_reg_data[username].password = 'newpass';
    users_reg_data[username].email = 'newuser@user.com';
    //successfully adds another user to user_reg_data
    fs.writeFileSync(filename, JSON.stringify(users_reg_data));
    //take user reg data and convert to string and srite into file
    //convert to json
   */ 
    console.log(users_reg_data);
    //console.log(users_reg_data.["itm352"]);
    //return's that object(users)info
    //console.log(users_reg_data.["itm352"]["password"]);
    //find the password of itm352
    //console.log(users_reg_data.["itm352"]= {});

} 
//if does not exist say it does not exist
else {
    console.log(filename + 'does not exist!')
}

app.use(cookieParser());


app.get('/use_session', function (request, response){
    response.send(`welcome, your session ID is ${request.session.id}`);
});


app.get('/set_cookie', function(request, response){
    response.cookie('myname', 'JaylaKai', {maxAge: 360000}).send('cookie set'); //Sets name = express
});
//This cookie also expires after 360000 ms from the time it is set.

app.get('/use_cookie', function(request, response){
  output = "No cookie with myname";
    if(typeof request.cookies.myname != 'undefined'){
    output = `Welcome to the Use Cookie page ${request.cookies.myname}`
    }
    response.send(output);
});
//when the server is killed the data would usually be gone
//cookies save data on the browser - browser user is in control of cookies
//
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
        <body>
            <form action="" method="POST">
                <input type="text" name="username" size="40" placeholder="enter username" ><br />
                <input type="password" name="password" size="40" placeholder="enter password"><br />
                <input type="submit" value="Submit" id="submit">
            </form>
        </body>
    `;
    //takes html and barfs it back
    response.send(str);
 });

app.post("/login", function (request, response) {

console.log(request.body);

the_username = request.body.username;

if(typeof users_reg_data[the_username] != 'undefined'){
    //checking to see if username exists
    if (users_reg_data[the_username].password == request.body.password){
        //if it does exists, get the password
        //send them to invoice
        response.send(the_username + 'logged in');
    }   //login
        //response when the user is logged in to greet them 
        //personalization
    else {response.redirect('/login');
        //redirects the user to the login page
}
    

}
});
app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
    <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
        <input type="email" name="email" size="40" placeholder="enter email"><br />
        <input type="submit" value="Submit" id="submit">
    </form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form

    //validate registration data()

    //all good save the new user 
    username = request.body.username;
    users_reg_data[username] = {};
    users_reg_data[username].password = request.body.password;
    users_reg_data[username].email = request.body.email;
    
    fs.writeFileSync(filename, JSON.stringify(users_reg_data));

    response.send(`${username} registered!`)
 });

app.listen(8080, () => console.log(`listening on port 8080`));

//put into if statement
// if console.log(typeof users_reg_data['xxx']); /= undefined
//console.log(typeof users_reg_data['xxx']); 
//check to see if it exists 'undefined' if exists 'object'

//login and register are forms
//querystring what you see at end of url after ?
//server getting data in a query string

//login give QS to registration, then reg keeps it 
//always add QS to every server request you make

//3 lines of code??
//
