
#include <ArduinoBLE.h>
#include <Arduino_HTS221.h>

BLEService envService("181A");  // 환경 서비스 UUID
BLEFloatCharacteristic tempChar("2A6E", BLERead | BLENotify); // 온도 특성 UUID
BLEFloatCharacteristic humiChar("2A6F", BLERead | BLENotify); // 습도 특성 UUID

void setup() {
    Serial.begin(9600);
    while (!Serial);

    if (!HTS.begin()) {
        Serial.println("Failed to initialize environment sensor!");
        while (1);
    }

    // BLE 초기화
    if (!BLE.begin()) {
        Serial.println("Failed to initialize BLE!");
        while (1);
    }

    // 환경 서비스 등록
    BLE.addService(envService);
    // 온도, 습도 특성 등록
    envService.addCharacteristic(tempChar);
    envService.addCharacteristic(humiChar);
    // BLE 서비스 시작
    BLE.advertise();
}

void loop() {
    float temp = HTS.readTemperature();
    float humi = HTS.readHumidity();

    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.print(" °C, Humidity: ");
    Serial.print(humi);
    Serial.println(" %");

    // BLE로 데이터 전송
    tempChar.writeValue(temp);
    humiChar.writeValue(humi);

    delay(2000);
}
