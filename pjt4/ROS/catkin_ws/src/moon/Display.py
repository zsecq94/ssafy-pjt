#!/usr/bin/env python3
import os, sys
import json
from time import sleep
from PyQt5 import QtCore, QtGui, QtWidgets
from Ui import Form1, Form2, Form3, Form4
from threading import Thread

#1024, 600
class MainApp(QtWidgets.QMainWindow):
    def __init__(self):
        super().__init__()
        self.showFullScreen()

        pal = QtGui.QPalette()
        pal.setColor(pal.ColorRole(12), QtCore.Qt.black)
        self.setAutoFillBackground(True)
        self.setPalette(pal)
        self.stacked_widget = QtWidgets.QStackedWidget(self)
        self.setCentralWidget(self.stacked_widget)
        self._state_ = 2

        # self.uis = [Form1(self), Form2(self), Form3(self), Form4(self), Form5(self), Form6(self), Form7(self)]
        self.uis = [Form1(self), Form2(self, self.pubStart), Form3(self), Form4(self, self.pubEnd)] # 기본, 보내기, 가는중, 받기

        for ui in self.uis:
            self.stacked_widget.addWidget(ui)

        # 화면 전환
        self.stacked_widget.setCurrentIndex(0)
        self._target_ = {
            "from" : "",
            "to" : "",
            "name" : "",
            "record" : "test.wav"
        }
    
    def subState(self):
        while 1:
            index = self.sub("DisplayToLine")
            index1 = self.sub("DisplayToServer")

            if index != -1:
                print(f"DisplayToLine {index}")
                self._state_ = index
                self.stacked_widget.setCurrentIndex(index)            
            if index1 != -1:
                print(f"DisplayToServer {index1}")
                self._target_ = json.loads(index1)

            if index == 3:
                os.system(f"aplay ./{self._target_['name']}.wav")

            sleep(1)

    def pub(self, to, msg):
        with open(f"{to}.txt", 'w') as file_data:
            file_data.write(msg)

    def sub(self, fro):
        cur_state = -1
        with open(f"{fro}.txt", 'r') as file_data:
            cur_state = file_data.read()
        return cur_state

    def pubStart(self):
        self.pub("DisplayToLine", "0")
    
    def pubEnd(self):
        self.pub("DisplayToLine", "1")
        os.system(f"aplay ./{self._target_['record']}")


if __name__ == '__main__':
    app = QtWidgets.QApplication(sys.argv)
    screen = app.desktop().screenGeometry()
    main_app = MainApp()
    subThread = Thread(target=main_app.subState)
    subThread.daemon = True
    subThread.start()
    main_app.show()
    sys.exit(app.exec_())
