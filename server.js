var server = require('express');
var app = server();
var moment = require('moment');
var fs = require('fs');
//var path = require('path');

var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log("Listening on port: " + port);
});

// we can eliminate this line by using the oath module and asingning the directory in the routes 
app.use(server.static(__dirname+'/src'));

app.get('/', function(req, res) {
  
  res.sendFile('index.html',function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      res.sendFile('index.html');
    }
  });
});

app.get('/:datestring', function(req,res) {
  var myDate;
  if(/^\d/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X");
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY");
  }
  
  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } 
  else {
    res.json({
      unix: null,
      natural: null
    });
  }
});