#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"

#define BME_SCK 13
#define BME_MISO 12
#define BME_MOSI 11
#define BME_CS 10

#define SEALEVELPRESSURE_HPA (1013.25)

#define FIREBASE_HOST "ddu2-luftsensor-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "t2TYK8zLhafajd3OkFjAftf3m5EFV9X0vpDtjkGC"
#define WIFI_SSID "suddenlink.net-E690"
#define WIFI_PASSWORD "251165071927"

Adafruit_BME680 bme;

void setup() {
  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  while (!Serial);
  Serial.println(F("BME680 test"));

  if (!bme.begin()) {
    Serial.println("Could not find a valid BME680 sensor");
    while (1);
  }

  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setPressureOversampling(BME680_OS_4X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme.setGasHeater(320, 150);
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

int n = 0;

void loop() {
    if (! bme.performReading()) {
    Serial.println("Failed to perform reading :(");
    return;
  }

  double temperature = bme.temperature;
  double pressure = bme.pressure / 100.0;
  double humidity = bme.humidity;
  double gasResistance = bme.gas_resistance / 1000.0;
  double altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);

 Firebase.setFloat("temperature",  temperature); 
 Firebase.setFloat("pressure",  pressure); 
 Firebase.setFloat("humidity",  humidity); 
 Firebase.setFloat("gasResistance",  gasResistance); 
 Firebase.setFloat("altitude",  altitude); 
 
 if (Firebase.failed()) { 
     Serial.print("setting /message failed:"); 
     Serial.println(Firebase.error());   
     return; 
 } 
  delay(1000);
 }
