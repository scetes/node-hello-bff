var express = require("express"),
    path = require("path");


const request = require('request');


app = express();

function getRoutes(callback){
    request('http://127.0.0.1:8088/api/9', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.stringify(JSON.parse(body));          
            return callback(null, result);
        } else {            
            return callback(error, null);;
        }
    });
}

app.get('/factor9', function(req, res) {

    getRoutes(function(err, data){ 
        if(err) return res.send(err);       
        res.send('Response from Factor function: ' + data);
    });

});




// Launch server

app.listen(8080);

console.log("node BFF app listening");
