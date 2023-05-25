#!/usr/bin/env python
import rospy
from std_msgs.msg import String
import time

# Publisher
pub = None

def callback(data):
    # When a message is received on 'driver' topic, print it with 'wow' at the beginning
    message = "Socket Receive : %s"%data.data 
    rospy.loginfo("wow " + data.data)
    pub.publish(message)

def driver_module():
    global pub

    rospy.init_node('socket_module', anonymous=True)

    # Subscriber for 'driver' topic
    rospy.Subscriber('moon', String, callback)

    # Publisher for 'DriverToMain' topic
    pub = rospy.Publisher('MoonToMain', String, queue_size=10)

    rospy.spin()
    
if __name__ == '__main__':
    try:
        driver_module()
    except rospy.ROSInterruptException:
        pass

