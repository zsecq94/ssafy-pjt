#!/usr/bin/env python
import rospy
from std_msgs.msg import StringArray
import time

# Publisher
pub = None

def callback(data):
    # When a message is received on 'driver' topic, print it with 'wow' at the beginning
    rospy.loginfo("wow " + data.data)

def driver_module():
    global pub

    rospy.init_node('driver_module', anonymous=True)

    # Subscriber for 'driver' topic
    rospy.Subscriber('driver', StringArray, callback)

    # Publisher for 'DriverToMain' topic
    pub = rospy.Publisher('DriverToState', StringArray, queue_size=10)

    rate = rospy.Rate(0.33) # It will publish every 3 seconds

    while not rospy.is_shutdown():
        current_time = "Current time %s" % rospy.get_time()
        rospy.loginfo(current_time)
        pub.publish(current_time)
        rate.sleep()

if __name__ == '__main__':
    try:
        driver_module()
    except rospy.ROSInterruptException:
        pass

