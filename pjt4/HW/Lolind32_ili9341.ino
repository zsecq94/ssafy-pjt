
#include <SPI.h>
#include <TFT_eSPI.h> // Hardware-specific library

TFT_eSPI tft = TFT_eSPI();       // Invoke custom library

bool SwitchOn = false;

// Button position and size
#define BUTTON_X (tft.width() / 2 - FRAME_W / 2)
#define BUTTON_Y (tft.height() / 2 - FRAME_H / 2)
#define FRAME_W 60
#define FRAME_H 50

// Red zone size
#define REDBUTTON_X BUTTON_X
#define REDBUTTON_Y BUTTON_Y
#define REDBUTTON_W (FRAME_W)
#define REDBUTTON_H FRAME_H

// Green zone size
#define GREENBUTTON_X (REDBUTTON_X + REDBUTTON_W)
#define GREENBUTTON_Y BUTTON_Y
#define GREENBUTTON_W (FRAME_W)
#define GREENBUTTON_H FRAME_H
#define TFT_TOUCH 27
void IRAM_ATTR touch_isr();

void setup(void)
{
  Serial.begin(115200);
  tft.init();
  tft.setRotation(1);

  // clear screen
  tft.fillScreen(TFT_BLUE);

  // Draw buttons
  redBtn();
  greenBtn();

  // Attach the touch interrupt
  attachInterrupt(digitalPinToInterrupt(T1), touch_isr, FALLING);
}

void loop()
{
  // The main loop is empty because the touch handling is done in the interrupt service routine
}

// Touch interrupt service routine
void IRAM_ATTR touch_isr()
{

  Serial.printf("y+: %i     ", analogRead(33));
// Check for touch data
  if (!SwitchOn) {
    greenBtn();
    tft.fillRect(REDBUTTON_X, REDBUTTON_Y, REDBUTTON_W, REDBUTTON_H, TFT_BLUE);
  }
  else{
    redBtn();
    tft.fillRect(GREENBUTTON_X, GREENBUTTON_Y, GREENBUTTON_W, GREENBUTTON_H, TFT_BLUE);
  }
  delay(500);
}

// Draw a red button
void redBtn()
{
  tft.fillRect(REDBUTTON_X, REDBUTTON_Y, REDBUTTON_W, REDBUTTON_H, TFT_RED);
  SwitchOn = true;
}

// Draw a green button
void greenBtn()
{
  tft.fillRect(GREENBUTTON_X, GREENBUTTON_Y, GREENBUTTON_W, GREENBUTTON_H, TFT_GREEN);
  SwitchOn = false;
}
