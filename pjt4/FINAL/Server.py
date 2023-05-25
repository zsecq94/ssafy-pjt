from requests import get  # to make GET request
from threading import Thread
from time import sleep
import websocket
import json

class Server(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.daemon = True
        self._flag_ = True
        self._state_ = 0
        self._target_ = {}

    def __del__(self):
        self._flag_ = False

    def download(self, file_name):
        if file_name == "":
            return
        url = f"https://k8c208.p.ssafy.io:8080/audio/{file_name}.wav"
        with open(f"./audio/{file_name}.wav", "wb") as file:   # open in binary mode
            response = get(url)               # get request
            file.write(response.content)      # write to file

    def send(self, msg):
        return self._ws_.send(f"TurtleBot1:{msg}")

    def pub(self, to, msg):
        with open(f"{to}.txt", 'w') as file_data:
            file_data.write(msg)

    def sub(self, fro):
        while 1:
            cur_state = -1
            with open(f"{fro}.txt", 'r') as file_data:
                cur_state = file_data.read()
            if cur_state == -1:
                sleep(1)
                continue
            if cur_state == 0 and self._state_ != 0:
                self.send("Connection")
            elif cur_state == 6:
                self.send("Done")

            self._state_ = cur_state

    def check_state(self, order):
        print(f"current state : {self._state_}, order list : {order}")
        # busy
        if self._state_ == -2:
            self.send("Wait..")
            self.pub("ServerToLine", "")
            # 0으로 바뀔때, 값 다시 줘야댐
        elif self._state_ == -1:
            self.send("Error..")
        elif self._state_ == 0:
            self.send("Ok")
            self.download(order["name"])
            self.pub("ServerToLine", "13")
            print(json.dumps([order["from"], order["to"], order["name"], order["record"]]))
            self.pub("ServerToDisplay", json.dumps([order["from"], order["to"], order["name"], order["record"]]))
        else:
            self.send("Running")
            

    def run(self):
        while self._flag_:
            try:
                self._ws_ = websocket.create_connection("wss://k8c208.p.ssafy.io:8080/")
                self.send("Connection")
            except:
                print("Connect Fail..")
                continue
            print("Connected!!!")
            while self._ws_.connected:
                try:
                    result = self._ws_.recv()
                except:
                    continue
                
                try:
                    result = eval(result)[0]
                except:
                    self.pub("ServerToLine", "")
                    continue
                self.check_state(result)

            self._ws_.close()


if __name__ == '__main__':
    server = Server()
    server.start()
    subThread = Thread(target=server.sub, args="LineToServer")
    subThread.daemon = True
    subThread.start()
    server.join()
