var express = require("express"),
    path = require("path");


const request = require('request');
//var AWSXRay = require('aws-xray-sdk');

app = express();

//app.use(AWSXRay.express.openSegment('MyApp'));

function getHealth(callback){
    request('http://node-hello-alb-1752502560.us-east-1.elb.amazonaws.com:8088/api/9', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = '{"Greeting", "Hello"}';          
            return callback(null, result);
        } else {            
            return callback(error, null);;
        }
    });
}


function getRoutes(callback){
    request('http://node-hello-alb-1752502560.us-east-1.elb.amazonaws.com:8088/api/9', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.stringify(JSON.parse(body));          
            return callback(null, result);
        } else {            
            return callback(error, null);;
        }
    });
}

function getRoutesMesh(callback){
    request('http://:8088/api/9', function(error, response, body) {
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

app.get('/', function(req, res) {
    
    console.log("app route / requested");

    res.json({"Health": "Good"});
});


app.get('/mesh', function(req, res) {

    getRoutes(function(err, data){ 
        if(err) return res.send(err);       
        res.send('Response from Factor function: ' + data);
    });

});

//app.use(AWSXRay.express.closeSegment());


// Launch server

app.listen(8088);

console.log("node BFF app listening");
