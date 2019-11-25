//server acts as a middle man
const querystring = require('querystring');

var express = require('express');
var myParser = require("body-parser");
var products = require("./public/product.js");

var app = express();
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

fs = require('fs');
var filename = 'user_data.json';


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
      for (i = 0; i < products.length; i++) {
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
         response.redirect("index.html?" + qstr);
      } else { // all good to go!
         response.redirect("login.html?" + qstr);
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

///////////////////////////////////////

app.use(myParser.urlencoded({ extended: true }));
fs = require('fs');
var filename = 'user_data.json';

if(fs.existsSync(filename)) {
    //im going to check if the file exists
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + 'characters');
    //stat size give info in the file
    data = fs.readFileSync(filename, 'utf-8') 

    users_reg_data = JSON.parse(data);
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
    } 

    //if does not exist say it does not exist
    else {
    console.log(filename + 'does not exist!')
    }

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


app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));