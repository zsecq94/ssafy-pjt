#!/usr/bin/env python3
from PyQt5 import QtCore, QtGui, QtWidgets

#1024, 600
class Form1(QtWidgets.QWidget):
    def __init__(self, me):
        super().__init__(me)

        movie = QtGui.QMovie("views/defaultState.gif")
        self.label = QtWidgets.QLabel(self)
        self.label.move(0, 0)
        movie.setScaledSize(me.sizeHint().scaled(1024, 400, QtCore.Qt.AspectRatioMode(1)))
        self.label.setMovie(movie)

        movie2 = QtGui.QMovie("views/waiting.gif")
        self.label_2 = QtWidgets.QLabel(self)
        self.label_2.move(0, 400)
        movie2.setScaledSize(me.sizeHint().scaled(1024, 200, QtCore.Qt.AspectRatioMode(1)))
        self.label_2.setMovie(movie2)

        movie.start()
        movie2.start()


class Form2(QtWidgets.QWidget):
    def __init__(self, me, callback):
        super().__init__(me)
        self.pushButton = QtWidgets.QPushButton(self)
        self.pushButton.setGeometry(QtCore.QRect(24 , 24, 976, 556))
        self.pushButton.clicked.connect(callback)
        self.pushButton.setStyleSheet("background-image : url(views/btnSend.png);\
                                       background-repeat : no-repeat;")


class Form3(QtWidgets.QWidget):
    def __init__(self, me):
        super().__init__(me)

        movie = QtGui.QMovie("views/running2.gif")
        self.label = QtWidgets.QLabel(self)
        self.label.move(0, 0)
        movie.setScaledSize(me.sizeHint().scaled(1024, 400, QtCore.Qt.AspectRatioMode(1)))
        self.label.setMovie(movie)
        movie.start()

        movie2 = QtGui.QMovie("views/running.gif")
        self.label_2 = QtWidgets.QLabel(self)
        self.label_2.move(0, 400)
        movie2.setScaledSize(me.sizeHint().scaled(1024, 200, QtCore.Qt.AspectRatioMode(1)))
        self.label_2.setMovie(movie2)
        movie2.start()

        
class Form4(QtWidgets.QWidget):
    def __init__(self, me, callback):
        super().__init__(me)
        self.pushButton = QtWidgets.QPushButton(self)
        self.pushButton.setGeometry(QtCore.QRect(24 , 24, 976, 556))
        self.pushButton.clicked.connect(callback)
        self.pushButton.setStyleSheet("background-image : url(views/btnSend.png);\
                                       background-repeat : no-repeat;")
        
        self.pushButton2 = QtWidgets.QPushButton(self)
        self.pushButton2.setGeometry(QtCore.QRect(24 , 24, 976, 556))
        self.pushButton2.clicked.connect(callback)
        self.pushButton2.setStyleSheet("background-image : url(views/btnSend.png);\
                                       background-repeat : no-repeat;")

