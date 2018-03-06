//express server
var express = require('express'), bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
var connected = false;
var SerialPort = require('serialport'); //serial port library
var port = new SerialPort('/dev/cu.HC-05-DevB',{baudRate: 9600, autoOpen: false});
var power;
//port to listen on
app.listen(3000, function(){
  console.log('app listening on port 3000!');
});

app.use(bodyParser.json()); //parses request into json
//root html file
//app.route('/')
//req = requested data from Ajax in a JSON file, res = Responding data in a JSON file sent back to Ajax
app.post('/index.html',function(req, res){
    //if connection has been established
  if(!connected && (req.body.status == "Connected")){
    //connects to bluetooth if not connected
    port.open(function(err){
      if(err){
        return console.log("Error: ", err);
      }
      connected = true;
      console.log("Port is open!");
      res.json({status:"Connected"});
    });
  }
  //closes connection if webpage says not connected
  else if(connected && req.body.status == "Not Connected"){

    port.close(function(err){
      if(err){
        return console.log("Error: ", err);
      }
      console.log("Port is closed!");
      connected = false;
      res.json({status:"Not Connected"});
    });
  }
  //if power in json is not null must be ON or OFF
  else if(req.body.power != "null"){
    if(req.body.power == "ON"){
      power = "ON";
    }
    else{
      power = "OFF";
    }
    port.write(new Buffer(power+"*"), function(err){
      port.drain(function(err){
        if(err){
          return console.log("Error: ", err);
        }
      });
      if(err){
        return console.log("Error: ", err);
      }
      console.log(req.body);
      console.log("Power: ", req.body.power);
      res.json({power: req.body.power});
    });
  }
  else{
    //req.body.R+req.body.G+req.body.B

    port.write(req.body.R+req.body.G+req.body.B+"1*", function(err){
      port.drain(function(err){
        if(err){
          return console.log("Error: ", err);
        }
      });
      if(err){
        return console.log("Error: ", err);
      }
      console.log(req.body.R+req.body.G+req.body.B);
    });
  }
});
