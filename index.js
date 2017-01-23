//express server
var express = require('express'), bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'))
//bluetooth
const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();
device
.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  if(name == "HC-05"){
    console.log('Found: ' + address + ' with name ' + name);
    device.findSerialPortChannel(address, function(channel){
      console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

      // make bluetooth connect to remote device
      bluetooth.connect(address, channel, function(err, connection){
        if(err) return console.error(err);
        connection.write(new Buffer('power', 'ascii'));
      });

    });
  }

}).inquire();

//port to listen on
app.listen(3000, function () {
  console.log('app listening on port 3000!')
})

app.use(bodyParser.json()); //parses request into json
//root html file
//app.route('/')
app.get('/',function (req, res){
    var options = {
      root: __dirname + '/public/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    }
    res.sendFile('index.html', options, function(err){
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
        console.log('Sent!');
      }
    });
  })
app.post('/index.html',function(req, res){
    if (req.body.status != null){
      //TODO - connect to bluetooth
    }
    else if(req.body.power != null){
      //TODO - turn on lights
    }
    else {
      //update led lights
    }

    console.log(req.body);
    res.send(req.body);
  });
