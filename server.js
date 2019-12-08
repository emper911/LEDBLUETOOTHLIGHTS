//express server
var express = require('express');
//Express application
var app = express();
app.use(express.static('public'));
//Parsing objects into json
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //parses request into json
//Routing to different endpoints
var router = express.Router();
app.use(router);
//Serial communication with hc 05 bluetooth module
var SerialPort = require('serialport/lib');
var port = new SerialPort('/dev/rfcomm0',{baudRate: 9600, autoOpen: false});

let state = {
    connect: "Not Connected",
    power: "OFF",
    default: "OFF",
    red: 0,
    green: 0,
    blue: 0,
}

// function sseDemo(req, res) {
//     let messageId = 0;

//     const intervalId = setInterval(() => {
//         res.write(`id: ${messageId}\n`);
//         res.write(`data: Test Message -- ${Date.now()}\n\n`);
//         messageId += 1;
//     }, 1000);

//     req.on('close', () => {
//         clearInterval(intervalId);
//     });
// }

// app.get('/event-stream', (req, res) => {
//     // SSE Setup
//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//     });
//     res.json(state);
    
//     sseDemo(req, res);
// });

// app.listen(3000);



//port to listen on
app.listen(3000, function(){
  console.log('app listening on port 3000!');
});

//root html file
app.route('/');

//loads current state of webserver and lights
app.post('/initData', function(req, res){
    res.json(state);
});


app.post('/ConnectButton', function(req, res){
    console.log(req.body);
    if(req.body.status == "Not Connected"){
        //connects to bluetooth if not connected
        // console.log(req)
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
    else if(req.body.status == "Connected"){
        //port closes if user wishes to disconnect
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


//
app.post('/PowerButton', function(req, res){
    console.log(req.body);
    if (req.body.power == "OFF") {
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
        res.json({power: state.power});
    });
});


//TODO add more interesting logic
app.post('/DefaultLight', function(req, res){
    console.log(req.body);
    if (state.default == "OFF") {
        port.write(formatRGBValue(req.body.red) + formatRGBValue(req.body.green) + formatRGBValue(req.body.blue) + "1*", function(err) {
        port.drain(function(err) {
            if (err) {
              return console.log("Error: ", err);
            }
        });
        if (err) {
            return console.log("Error: ", err);
        }
        console.log(formatRGBValue(req.body.red) + formatRGBValue(req.body.green) + formatRGBValue(req.body.blue));
        state.default = "ON";
        res.json({ default: state.default });
        }
      );
    } 
    else {
        port.write(formatRGBValue(req.body.red) + formatRGBValue(req.body.green) + formatRGBValue(req.body.blue) + "1*", function(err) {
          port.drain(function(err) {
            if (err) {
              return console.log("Error: ", err);
            }
          });
          if (err) {
            return console.log("Error: ", err);
          }

          console.log(req.body.red + req.body.green + req.body.blue);
          state.default = "OFF";
          state.red = req.body.red;
          state.green = req.body.green;
          state.blue = req.body.blue;
          res.json({ default: state.default });
        }
      );
    }
});


//TODO check color slider
app.post('/ColorSlider', function(req, res) {
    console.log(req.body);
    port.write(formatRGBValue(req.body.red) + formatRGBValue(req.body.green) + formatRGBValue(req.body.blue) + "1*", function(err) {
        port.drain(function(err) {
          if (err) {
            return console.log("Error: ", err);
          }
        });
        if (err) {
          return console.log("Error: ", err);
        }
            console.log(req.body.red + req.body.green + req.body.blue);
            state.red = req.body.red;
            state.green = req.body.green;
            state.blue = req.body.blue;
            res.json({red:state.red, green:state.green, blue:state.blue});
        }
    );
});


function formatRGBValue(num) {
  return ("00" + num).slice(-3);
}


//TURNS OFF LIGHTS AND DISCONNECTS FROM BLUETOOTH ON EXIT
process.on('SIGINT', function () {
    if (state.connect == 'Connected'){
        if (state.power == "ON"){
            
            port.write(new Buffer("OFF" + "*"), function (err) {
                port.drain(function (err) {
                    if (err) {
                        return console.log("Error: ", err);
                    }
                });
                if (err) {
                    return console.log("Error: ", err);
                }
            });

            //port closes on disconnect
            port.close(function (err) {
                if (err) {
                    return console.log("Error: ", err);
                }
                console.log("\nPort is closed!");
                state.connect = "Not Connected";
            });
        }

        else {
            //port closes on disconnect
            port.close(function (err) {
                if (err) {
                    return console.log("Error: ", err);
                }
                console.log("\nPort is closed!");
                state.connect = "Not Connected";
            });
        }
    }
    setInterval(() => {
        console.log('\nGoodbye!');
        return process.exit(0);
    }, 1000);
    
});

