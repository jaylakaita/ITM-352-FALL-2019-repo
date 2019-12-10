app.use(cookieParser());
 
app.get('/set_cookie', function (request, response){
    response.cookie('myname', 'Jayla Kaita').send('cookie set')
});
 
app.get('/use_cookie', function (request, response){
    output = "No cookie with myname"
    if(typeof request.cookies.myname != 'undefined') {
    output = `Welcome to the Use Cookie page ${request.cookies.myname}`
    }
    response.send(output);
});
app.get('/set_cookie', function (request, response) { 
    response.cookie('myname', 'Jayla Kaita', {maxAge: 5*1000}).send('cookie set'); 
});
 
app.get('/use_session', function (request,response) {
    response.send(`Welcome, your session ID is ${request.session.id}`);
});
 
app.get('/set_cookie', function (request, response) { //we're using this to send a cookie with your name data when this route is called
    response.cookie('myname', 'Jayla Kaita', {maxAge: 5*1000}).send('cookie set'); //We're taking the response, then setting cookie identifier (myname) and giving it data (Joey Gomes). Then we will send a response back w/ message 'cookie sent'
                                            //Maxage set in miliseconds. 5*1000 means it will expire in 5 seconds.
});
 
app.get('/use_cookie', function (request, response) { //we're using this to test if the cookie above exists and respond with some info
    output = "No cookie with myname";
    if(typeof request.cookies.myname != 'undefined') { //Using an if statement, we can determine if we recieved a cookie it will overwrite our default output variable
        output = `Welcome to the Use Cookie page, ${request.cookies.myname}`; //Set variable output. If I have a cookie, this will grab a cookie from our request. Additional dot notation specifies cookie name (we're looking for myname cookie)
    }
    response.send(output);
    
});
 
app.post("/login", function (request, response) {
   
    //process login form POST and redirect to logged in page if ok, back to login page if not
    //if I have post, below will load
    console.log(request.body)
    the_username = request.body.username;
    if (typeof users_reg_data[the_username] != 'undefined') { //data we loaded in the file
        if (users_reg_data[the_username].password == request.body.password) {
            theQuantQuerystring = qs.stringify(user_product_quantities);
            //response.send(theusername + 'loggged in!');//
            //for Assignment 2, should send them to the invoice and make sure to keep the quantity data
            //add their username in the invoice so that they know they're logged in (for personalization)
            msg = "";
            if (typeof request.session.last_login != 'undefined') {
                var msg = `You last logged in on ${request.session.last_login}`;
                var now = new Date();
            } else {
                now = 'first login!'
            }
            request.session.last_login = now;
            response.cookie('username', the_username, {maxAge: 30*1000}); //session will last for 30 seconds
            response.send(msg + '<br>' + `${the_username} is logged in at $ {now}`);
        } else {
            response.redirect('/login'); //if doesn't exist then return to login page
            //for Assignment 2, make sure to add telling the user there's an error (i.e., username or password is wrong)
        }
    }
});

response.cookie('username', the_username, {maxAge: 30*1000}); //session will last for 30 seconds
app.get('/use_session', function (request,response) {
    response.send(`Welcome, your session ID is ${request.session.id}`);
    session.destroy();
});
