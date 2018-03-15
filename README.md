# LEDBLUETOOTHLIGHTS
This project contains code used to make a webpage interact with LED light strips connected to an Arduino, communicating with a webserver over a bluetooth connection. 
Webpage is dynamic on multiple platforms using bootstrap library for styling. 
JQuery library used in combination with AJAX to make webpage interactive as well as be able to send JSON data back to a node.js server.
Node.js server uses express library to serve webpages and a serial communication library to communicate with the arduino.

Second half of this project required building a curcuit to control bluetooth lighting using the pwm pins on the arduino to control RGB LEDs, and used a relay to turn on/off main power supply running at 12v DC supplying the LEDS. 


