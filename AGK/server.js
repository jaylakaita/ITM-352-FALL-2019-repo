
//server acts as a middle man
var express = require('express'); //initializes express to set up web server
var myParser = require("body-parser"); //initializes body-parser to set up web server
var filename = 'user_data.json' //Defines the user_data.json array as an object
var app = express(); //Executes Express


fs = require('fs'); //Use the file system module 
app.use(myParser.urlencoded({ extended: true }));
//returns a boolean (true or false) (Opens file only if it exists)
if (fs.existsSync(filename)) {
  stats = fs.statSync(filename) //gets the stats of your file


  data = fs.readFileSync(filename, 'utf-8'); //Reads the file and returns back with data and then continues with code as requested.
  users_reg_data = JSON.parse(data); //Parses data in order to turn string into an object
}





//GETS TO POINTS PAGE


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



app.post("/eb_login.html", function (request, response) {
  the_username = request.body.username; //makes username 
  //Validate login data
  if (typeof users_reg_data[the_username] != 'undefined') {   //To check if the username exists in the json data
    if (users_reg_data[the_username].password == request.body.password) {

      response.redirect('/eb_mainpg.html?' + `&username=${the_username}`); //Adds username to Total Points Page
    }

    else {
      response.send('Invalid Login: Please hit the back button and try again'); //if password isn't equal to password existing in jsonn data, show error message

    }


  }

});

// *********************** DID NOT WORK (GK MEMBER LIST)*******************************

/*app.post("/eb_gklist.html", function (request, response) {
  the_username = request.body.username;
  document.write(`
        <tr>
        <td> ${users_reg_data[the_username].fullname}</td>
        <td> ${users_reg_data[the_username].totalpts}</td>
        </tr>
  `);
});*/

// ********************* TRIED SOMETHING ELSE DID NOT WORK ****************************
/*app.get("/process_page", function (request, response) {
   
});*/


//add points to a current member
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



app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path); //respond to HTTP request by sending type of request and the path of request
  next(); //calls the middleware function
});
app.use(express.static('./public')); //sets up a request to respond to GET and looks for the file from public (sets up static web server)
app.listen(8080, () => console.log(`listening on port 8080`)); //listens on Port 8080