#!/usr/bin/env python3
from requests import get  # to make GET request
from threading import Thread
from std_msgs.msg import String
import websocket
import rospy
import json

class Server(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.daemon = True
        self._flag_ = True
        self._state_ = -2
        self._target_ = {}
        self._ws_ = websocket.create_connection("wss://k8c208.p.ssafy.io:8080/")
        rospy.init_node("Server", anonymous=True)
        rospy.Subscriber("StateToServer", String, self.sub)
        rospy.spin()

    def __del__(self):
        self._flag_ = False

    def download(self, file_name):
        url = f"https://k8c208.p.ssafy.io:8080/audio/{file_name}.wav"
        with open(f"./{file_name}.wav", "wb") as file:   # open in binary mode
            response = get(url)               # get request
            file.write(response.content)      # write to file
   
    def send(self, msg):
        return self._ws_.send(f"TurtleBot1:{msg}")
    
    def pub(self, to, msg):
            pub = rospy.Publisher(to, String, queue_size=10)
            pub.publish(msg)

    def sub(self, data):
        cur_state = int(data.data)
        rospy.loginfo(rospy.get_caller_id() + " : " + str(cur_state))

        if cur_state == 0 and self._state_ != 0:
            self.send("Connection")
        elif cur_state == 6:
            self.send("Done")

        self._state_ = cur_state

    def check_state(self, order):
        print(order)
        rospy.loginfo(rospy.get_caller_id() + f"ordered : {order}")
        # busy
        if self._state_ == -2:
            self.send("Wait..")
            self.pub("ServerToState", json.dumps([]))
            # 0으로 바뀔때, 값 다시 줘야댐
        elif self._state_ == -1:
            self.send("Error..")
        elif self._state_ == 0:
            self.send("Ok")
            self.download(order["name"])
            self.pub("ServerToState", json.dumps([order["from"], order["to"]]))
            self.pub("ServerToDisplay", json.dumps([order["from"], order["to"], order["name"], order["record"]]))
        else:
            self.send("Running")
            

    def run(self):
        while self._flag_:
            try:
                if self._ws_.connected:
                    self.send("Connection")
                else:
                    self._ws_ = websocket.create_connection("wss://k8c208.p.ssafy.io:8080/")
            except:
                print("Connect Fail..")
                rospy.loginfo(rospy.get_caller_id() + "Connect Fail..")
                continue

            rospy.loginfo(rospy.get_caller_id() + "Connected!!")
            while self._ws_.connected:
                try:
                    result = self._ws_.recv()
                except:
                    rospy.loginfo(rospy.get_caller_id() + "Recv Fail..")
                    continue
                
                try:
                    result = eval(result)[0]
                except:
                    self.pub("StateToServer", json.dumps([]))
                    continue

                self.check_state(result)

            self._ws_.close()


if __name__ == '__main__':
    server = Server()
    server.start()
    #server.join()
