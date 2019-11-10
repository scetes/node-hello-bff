var express = require("express"),
    path = require("path");

	app = express();



// Config

app.get('/api', function (req, res) {

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var ss = String(today.getSeconds()).padStart(2,'0');
var hms = String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');
var factr = 800000;

today = yyyy + '-' + mm + '-' + dd + '-' + hms;

factorialize(factr);

  res.send('Howdy.  I am v2.  Faster running factorial(' + factr + ') ' + today);
});


function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
    //console.log("iteration: " + i)
  }
  return num;
}

// Launch server

app.listen(8088);

console.log("node app listening");
