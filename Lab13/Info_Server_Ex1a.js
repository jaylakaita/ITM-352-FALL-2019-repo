var express = require('express');
var app = express();
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
   next();
    response.send(request.method + ' to path ' + request.path);
});
