# LEDBLUETOOTHLIGHTS
This project contains code used to make a webapp interact with LED light strips connected to an Arduino, communicating with a raspberry pi node.js webserver over a bluetooth connection. 

The webserver uses express js to provide a REST API for responding to user actions and providing feedback.
Node.js server uses a serial communication library to communicate with the arduino.

Second half of this project required building a curcuit to control lighting using the pwm pins on the arduino to control RGB LEDs, connecting arduino with HC-05 bluetooth module and used a relay to turn on/off main power supply running at 12v DC supplying the LEDS. 


