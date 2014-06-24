// This #include statement was automatically added by the Spark IDE.
#include "Adafruit_BMP085.h"

// This #include statement was automatically added by the Spark IDE.
#include "HttpClient.h"
#include "PubSubClient.h"

#define auth_token  "NDJkODA3MGEtOWU1ZS00YTczLThiNmEtZDk0Y2IwMWFmYWM2NDFjNmZjMjMtMmU3NS00ZDM3LWIwMWItMDFmZjJjM2Q4Y2My"
#define SO_ID "14031778325802935250e8de943b2aba131c26c30bcfa"

byte broker_ip[] = {  147, 83, 30, 150 };
long temp_time = 0;

// Air quality
int airQualRaw = 0;
int airQual = 0;

//Temperature, pressure, altitude
Adafruit_BMP085 bmp;
  
TCPClient tcpClient;

//Setup
void setup() {
    // Pin A6 is for air quality sensor and gives a reading from 0 to 4094 across 4 steps
    Spark.variable("airQualRaw", &airQualRaw, INT);
    Spark.variable("airQual", &airQual, INT);
    pinMode(A6, INPUT);
    
    //setup the barometer
    if (!bmp.begin()) {
		Serial.println("Could not find a valid BMP085 sensor, check wiring!");
		while (1) {}
	}
    
    Serial.begin(9600);
    delay(1000);
    Serial.println("Starting...");
    delay(1000);
    
    Serial.println(Time.now());
    delay(2000);

    temp_time = millis();    
}

void loop(){
  
  if(check_time(10000)) {
     Serial.println("Reading sensor data...");

     airQualRaw = analogRead(A6);
     airQual = airQualRaw / 1000; // Chose 4000 instead of 4094 to ensure int conversion succeeds for close values
     Serial.println(String(airQualRaw));     
     float temperature = bmp.readTemperature();
     float pressure = bmp.readPressure();
     float altitude = bmp.readAltitude();
     Serial.println(String(temperature));
     Serial.println(String(pressure));
     Serial.println(String(altitude));
    
     Serial.println(updateRoomValues(String(airQual),String(temperature),String(pressure),String(altitude)));
  }
}

bool check_time(long interval) {
    if((millis() - temp_time) > interval) {
        temp_time = millis();
        
        return true;
    }
    else {
        return false;
    }
}

String updateRoomValues(String airQualityValue,String temperature, String pressure, String altitude) {
    HttpClient http;
    String path;

    http_header_t headers[] = {
      { "Content-Type", "application/json" },
      { "Authorization" , auth_token},
      { NULL, NULL } // NOTE: Always terminate headers will NULL
    };

    http_request_t request;
    http_response_t response;
    
    request.hostname = "api.servioticy.com";
    request.port = 80;
    
    path = "/";
    path.concat(SO_ID);
    path.concat("/streams/");
    path.concat("room-condition");
    
    request.path = path;
    
    String json = "{\"channels\": {\"";
    json.concat("air-quality");
    json.concat("\": {\"current-value\": \"");
    json.concat(airQualityValue);
    json.concat("\"},");
    
    json.concat("\"temperature");
    json.concat("\": {\"current-value\": \"");
    json.concat(temperature);
    json.concat("\"},");
    
    json.concat("\"pressure");
    json.concat("\": {\"current-value\": \"");
    json.concat(pressure);
    json.concat("\"},");
    
    json.concat("\"altitude");
    json.concat("\": {\"current-value\": \"");
    json.concat(altitude);
    json.concat("\"}");
    
    
    json.concat("}, \"lastUpdate\": ");
    json.concat(Time.now());
    json.concat("}");
    
    request.body = json;

    Serial.println("Updating sensor data...");
    Serial.println(json);
     
    http.put(request, response, headers);
    
    return response.body;    
}