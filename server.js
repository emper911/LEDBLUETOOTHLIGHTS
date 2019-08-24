//express server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
var SerialPort = require('serialport/lib');
var port = new SerialPort('/dev/cu.HC-05-DevB',{baudRate: 9600, autoOpen: false});


let state = {
    connect: "Not Connected",
    power: "OFF",
    default: "OFF",
    red: 0,
    green: 0,
    blue: 0,
}
// var pageStatus;


//port to listen on
app.listen(3000, function(){
  console.log('app listening on port 3000!');
});

app.use(bodyParser.json()); //parses request into json
//root html file
//app.route('/')


app.post('/initData', function(req, res){
    res.json(state);
});

app.post('/ConnectButton', function(req, res){
    if(!state.connect && (req.body.status == "Connected")){
        //connects to bluetooth if not connected
        port.open( function(err) {
            if (err) {
                return console.log("Error: ", err);
            }
            state.connect = "Connected";
            console.log("Port is open!");
            res.json({status : state.connect});
        });
    }
    //closes connection if front end says not connected
    else if(state.connect && req.body.status == "Not Connected"){
        port.close(function(err){
            if (err) {
                return console.log("Error: ", err);
            }
            console.log("Port is closed!");
            state.connect = "Not Connected";
            res.json({status : state.connect});
        });
    }
});

//TODO check logic
app.post('/PowerButton', function(req, res){
    if (req.body.power == "ON") {
        state.power = "ON";
    }
    else {
        state.power = "OFF";
    }
    port.write(new Buffer(state.power+"*"), function(err) {
        port.drain( function(err) {
            if (err) {
                return console.log("Error: ", err);
            }
        });
        if (err) {
            return console.log("Error: ", err);
        }

        console.log(req.body);
        console.log("Power: ", req.body.power);
        res.json({power: req.body.power});
    });
});

//TODO add more interesting logic
app.post('/DefaultLight', function(req, res){
    port.write(req.body.red+req.body.green+req.body.blue+"1*", function(err) {
        port.drain(function(err){
            if (err) {
                return console.log("Error: ", err);
            }
        });
        if (err) {
            return console.log("Error: ", err);
        }
        console.log(req.body.red+req.body.green+req.body.blue);
        res.json({default:"ON"})
    });
});
//TODO check color slider
app.post('/ColorSlider', function(req, res) {
    port.write(req.body.red+req.body.green+req.body.blue+"1*", function(err) {
        port.drain(function(err){
            if (err) {
                return console.log("Error: ", err);
            }
        });
        if (err) {
            return console.log("Error: ", err);
        }
        console.log(req.body.red+req.body.green+req.body.blue);
    });
});



// app.post('/index.html',function(req, res){
//     //if connection has been established
//   if(!connected && (req.body.status == "Connected")){
//     //connects to bluetooth if not connected
//     port.open(function(err){
//       if(err){
//         return console.log("Error: ", err);
//       }
//       state_control.connect = "Connected";
//       console.log("Port is open!");
//       res.json({"connect":"Connected"});
//     });
//   }
//   //closes connection if front end says not connected
//   else if(connected && req.body.status == "Not Connected"){

//     port.close(function(err){
//       if(err){
//         return console.log("Error: ", err);
//       }
//       console.log("Port is closed!");
//       connected = false;
//       res.json({"connect":"Not Connected"});
//     });
//   }
//   //if power in json is not null must be ON or OFF
//   else if(req.body.power != "null"){
//     if(req.body.power == "ON"){
//       power = "ON";
//     }
//     else{
//       power = "OFF";
//     }
//     port.write(new Buffer(power+"*"), function(err){
//       port.drain(function(err){
//         if(err){
//           return console.log("Error: ", err);
//         }
//       });
//       if(err){
//         return console.log("Error: ", err);
//       }
//       console.log(req.body);
//       console.log("Power: ", req.body.power);
//       res.json({power: req.body.power});
//     });
//   }
//   else{
//     //req.body.R+req.body.G+req.body.B

//     port.write(req.body.R+req.body.G+req.body.B+"1*", function(err){
//       port.drain(function(err){
//         if(err){
//           return console.log("Error: ", err);
//         }
//       });
//       if(err){
//         return console.log("Error: ", err);
//       }
//       console.log(req.body.R+req.body.G+req.body.B);
//     });
//   }
// });
