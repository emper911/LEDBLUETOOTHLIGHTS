#define REDPIN 5
#define GREENPIN 6
#define BLUEPIN 3
#define POWERPIN 7
#define FADESPEED 5
int r = 000;
int g = 000;
int b = 000;
String message; //string that stores the incoming message
char partyMode = 'r';
boolean passed = false, power = true, partying = false;
void setup()
{
  Serial.begin(9600); //set baud rate
  pinMode(REDPIN, OUTPUT);//default rgb value when starting
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
  pinMode(POWERPIN, OUTPUT);
  digitalWrite(POWERPIN, HIGH);
  analogWrite(REDPIN, r);
  analogWrite(GREENPIN, g);
  analogWrite(BLUEPIN, b);
}

void loop(){
  while(Serial.available()){//while there is data available on the serial monitor
    if(Serial.read() == "\n"){
      break;
    }
    message+=char(Serial.read());//store string from serial command
    passed = false;
  }
  if((!passed)){//will not enter condition if already entered and no new serial.
    if(message!=""){//if data is available
      if(message.equals("ON")){//string sent from bluetooth == power
        digitalWrite(POWERPIN, LOW);
        Serial.println("ON");
      }
      else if(message.equals("OFF")){
        digitalWrite(POWERPIN, HIGH);
        Serial.println("OFF");
      }
      else{
        r = message.substring(0,3).toInt();//reads individual rgb values from 0-255
        g = message.substring(3,6).toInt();
        b = message.substring(6,9).toInt();
        Serial.println(r);//prints each value of rgb
        Serial.println(g);
        Serial.println(b);
        analogWrite(REDPIN, r);//writes data to change colors 
        analogWrite(GREENPIN, g);
        analogWrite(BLUEPIN, b);
      }
      Serial.println(message);
      message=""; //clear the data
      passed = true;//signifies having entered the condition.
    }
  }
  delay(5);
}
