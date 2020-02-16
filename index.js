var express = require("express"),
    path = require("path");


const request = require('request');
//var AWSXRay = require('aws-xray-sdk');

app = express();

//app.use(AWSXRay.express.openSegment('MyApp'));


function getFactorFromVirtualService(callback){
    request('http://vs-serviceB:8088/api/9', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.stringify(JSON.parse(body));          
            return callback(null, result);
        } else {            
            return callback(error, null);;
        }
    });
}

function getFactorFromLoadBalancer(callback){
    request('http://node-hello-alb-1752502560.us-east-1.elb.amazonaws.com:8088/api/9', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.stringify(JSON.parse(body));          
            return callback(null, result);
        } else {            
            return callback(error, null);;
        }
    });
}

function getFactorFromTaskDNS(callback){
    request('http://node-hello-fargate-appmesh-service.local:8088/api/9', function(error, response, body) {
//    request('http://vs-serviceB:8088/api/9', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.stringify(JSON.parse(body));          
            return callback(null, result);
        } else {            
            return callback(error, null);;
        }
    });
}


app.get('/', function(req, res) {


    console.log("app route / requested");

    res.json({"Health": "Good"});
});

app.get('/taskdns', function(req, res) {

    console.log("Application route /taskdns requested");

    getFactorFromTaskDNS(function(err, data){ 
        if(err) return res.send(err);       
        res.send('Response from Service Task DNS: ' + data);
    });

});

app.get('/lb', function(req, res) {

    console.log("app route /lb requested");

    getFactorFromLoadBalancer(function(err, data){ 
        if(err) return res.send(err);       
        res.send('Response from Service Load Balancer: ' + data);
    });

});

app.get('/vs', function(req, res) {

    console.log("app route /vs requested");

    getFactorFromVirtualService(function(err, data){ 
        if(err) return res.send(err);       
        res.send('Response from Virtual Service: ' + data);
    });

});


//app.use(AWSXRay.express.closeSegment());


// Launch server
var server = app.listen(8088);

server.on('connection', function(socket) {
  console.log("A new connection was made by a client.");
  socket.setTimeout(300 * 1000); 
  // 30 second timeout. Change this as you see fit.
});


console.log("Hello FE Application listening on 8088");
