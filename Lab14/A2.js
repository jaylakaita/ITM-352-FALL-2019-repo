//processing a login
var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var qs = require('querystring');

app.use(myParser.urlencoded({ extended: true }));
var filename = 'user_data.json';

if(fs.existsSync(filename)) {
    stats = fs.statSync(filename);
    
    console.log(filename + ' has ' + stats.size + 'characters');
    
    data = fs.readFileSync(filename, 'utf-8') 
    users_reg_data = JSON.parse(data);
    console.log(users_reg_data);
} 
//if does not exist say it does not exist
else {
    console.log(filename + 'does not exist!')
}
var user_product_quantities = {};

app.get("/purchase", function (request, response) {
    //quantity data in QS
    user_product_quantities = request.query;
    //store in user product quantities
    //do the validation etc
    //if not valid, go back to products display
    //otherwise go to login
    response.redirect('login');
    //for this server the end of the path is login
    //does a get to login
});

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

/*app.get("/invoice", function (request, response) {
    
    response.send(JSON.stringify(users_product_quantities));
});*/

app.post("/login", function (request, response) {
    console.log(request.body);
    the_username = request.body.username;

    if(typeof users_reg_data[the_username] != 'undefined'){
    //checking to see if username exists
        if (users_reg_data[the_username].password == request.body.password){
        //make the QS of product quantities needed for invoice
        theQuantityQuerystring = qs.stringify(user_product_quantities);
        response.redirect('/invoice.html?' + theQuantityQuerystring);
        //go to invoice.html
    }else {
        response.redirect('/login');
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

app.use(express.static('./public'));
//order matters
app.listen(8080, () => console.log(`listening on port 8080`));
