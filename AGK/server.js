
//server acts as a middle man
const querystring = require('querystring');

var express = require('express');
var myParser = require("body-parser");
var events = require("./public/events_pts.js");

var filename = 'user_data.json' //Defines the user_data.json array as an object

var app = express();


fs = require('fs'); //Use the file system module 
app.use(myParser.urlencoded({ extended: true }));
//returns a boolean (true or false) (Opens file only if it exists)
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets the stats of your file


    data = fs.readFileSync(filename, 'utf-8'); //Reads the file and returns back with data and then continues with code as requested.
   
    users_reg_data = JSON.parse(data); //Parses data in order to turn string into an object
}



//************************************************ GEN LOGIN PG ****************************** 

// Process login form POST and redirect to Total Points Page. If incorrect login info is inputted, show error
app.post("/gen_login.html", function (request, response) {
    the_username = request.body.username; //makes username 
    //Validate login data
    if (typeof users_reg_data[the_username] != 'undefined') {   //To check if the username exists in the json data
        if (users_reg_data[the_username].password == request.body.password) {

            response.redirect('/gen_ptpg.html?' + `&username=${the_username}`); //Adds username to Total Points Page
        }

        else {
            response.send('Invalid Login: Please hit the back button and try again'); //if password isn't equal to password existing in jsonn data, show error message

        }
     

    }

});


//************************************************  EB LOGIN PG ****************************** 

app.post("/eb_login.html", function (request, response) {
    the_username = request.body.username; //makes username 
    
    console.log("Username=" + the_username);
    //Validate login data
    if (typeof users_reg_data[the_username] != 'undefined') {   //To check if the username exists in the json data
        the_usertype = users_reg_data[the_username].usertype;
        if (the_usertype == 'Webmaster') {   //To check if the username exists in the json data 
       
        response.redirect('/eb_mainpg.html?' + `&username=${the_username}`); 
        }
    }
});


//************************************************ ADD PT TO MEMBER PG ***************************
app.post("/eb_ptlog.html", function (request, response) {
    the_username = request.body.username; //makes username 
    errors= {};
    
    //Validate login data
    if (Object.keys(errors).length == 0){
users_reg_data[the_username].username = request.body.username
console.log("1");
users_reg_data[the_username].points = request.body.points
response.send(users_reg_data[the_username].points);
  
fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Writes registration info into the userdata json file
console.log("3");
   response.redirect("/eb_gklist.html?" ); //If all good, send to the invoice page with username/quantity info
        }
    }
);


//*************************** GEN MEMBER PG TO CALCULATE POINTS ****************************************
app.use(myParser.urlencoded({ extended: true }));
//intercept purchase submission form, if good give an invoice, otherwise send back to order page
app.get("/process_page", function (request, response) {
   //check if quantity data is valid
   //look up request.query
   params = request.query;
   console.log(params);
   if (typeof params['purchase_submit'] != 'undefined') {
      has_errors = false; // assume quantities are valid from the start
      total_qty = 0; // need to check if something was selected so we will look if the total > 0
      for (i = 0; i < events.length; i++) {
         if (typeof params[`quantity${i}`] != 'undefined') {
            a_qty = params[`quantity${i}`];
            total_qty += a_qty;
            if (!isNonNegInt(a_qty)) {
               has_errors = true; // oops, invalid quantity
            }
         }
      }
      qstr = querystring.stringify(request.query);
      // Now respond to errors or redirect to invoice if all is ok
      if (has_errors || total_qty == 0) {
         //if quantity data is not valid, send them back to product display
         qstr = querystring.stringify(request.query);
         response.redirect("gen_ptpg.html?" + qstr);
      } else { // all good to go!
         response.redirect("gen_pttotal.html?" + qstr);
      }
   }
});
//if quantity data valid, send them to the invoice


function isNonNegInt(q, returnErrors = false) {
   errors = []; // assume no errors at first
   if (q == "") { q = 0; }
   if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
   if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
   if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
   return returnErrors ? errors : (errors.length == 0);
}

//************************************************ REGISTER NEW USER *********************************************
app.post("/eb_regpg.html", function (request, response) {
  // process a simple register form
  username = request.body.username;//retrieves the username data
  errors = {};//Checks to see if username already exists

  //Username Validation
if (typeof users_reg_data[username] != 'undefined'){
errors.username_error="Username is Already in Use"; //if username is in json file, say username is already in use
}
if ((/[a-z0-9]+/).test(request.body.username) ==false){ //only allows numbers and letters for the username
  errors.username_error="Only numbers/letters";
}
if ((username.length > 10) ==true){
  errors.username_error = "Please make your username shorter"; //if length is more than 10, show error to make the username shorter
}
if ((username.length < 4) ==true){
  errors.username_error = "Please make your username longer"; //if length is less than 4, show error to make the username longer
}




//Fullname Validation // got help for the first fullname validation from Mr. Port
fullname = request.body.fullname;//retrieves the fullname data
if ((/[a-zA-Z]+[ ]+[a-zA-Z]+/).test(request.body.fullname) == false){
errors.fullname_error="Only use letters and a space";
}

if ((fullname.length > 30) ==true){
  errors.fullname_error = "Please make your full name shorter. 30 characters max"; //if length is greater than 30, send error that 30 characters are max
}


//Email Validation//
if ((/[a-z0-9._]+@[a-z0-9]+\.[a-z]+/).test(request.body.email) == false) {
errors.email_error="Please enter proper email";
}




console.log(errors, users_reg_data);
//If there are 0 errors, request all registration info
if (Object.keys(errors).length == 0){
  users_reg_data[username] = {};
  users_reg_data[username].username = request.body.username
  users_reg_data[username].password = request.body.password;
  users_reg_data[username].email = request.body.email;
  users_reg_data[username].fullname = request.body.fullname;
  users_reg_data[username].points = request.body.points;

fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Writes registration info into the userdata json file

  response.redirect("/Total_ptpg.html?" + `&username=${username}`); //If all good, send to the total point page with username/quantity info
} else { 
  qstring= qs.stringify(request.body)+"&"+qs.stringify(errors); 
  response.redirect('/registration.html?' + qstring ); //if there are errors, send back to registration page to retype
}
  
});


app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path); //respond to HTTP request by sending type of request and the path of request
  next(); //calls the middleware function
});
app.use(express.static('./public')); //sets up a request to respond to GET and looks for the file from public (sets up static web server)
app.listen(8080, () => console.log(`listening on port 8080`)); //listens on Port 8080
