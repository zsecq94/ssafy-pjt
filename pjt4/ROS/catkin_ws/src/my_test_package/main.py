#!/usr/bin/env python
import rospy
from std_msgs.msg import String
import json

pub_display = None
pub_drive = None
pub_server = None
state = -2
def DisplayCallback(data):

    state = int(data.data)
    pub_server.publish(str(state))
    
def ServerCallback(data):
    jsonData = json.loads(data.data)
    if len(jsonData) == 0 :
        if state == 0:
            pub_server.publish("0")
        
        rospy.loginfo("moon b s")
        return
    
    pub_drive.publish(data.data)
    rospy.loginfo("send to drive "+data.data)
	
def DriveCallback(data):
    jsonData = json.loads(data.data)
    if len(jsonData) == 0 :
        rospy.loginfo("moon b s")
        return
        
    state = int(jsonData[0])
    rospy.loginfo(jsonData[0])
    sendData = str(state)
    pub_server.publish(sendData)	
    pub_display.publish(sendData)

def main() :
    global pub_display,pub_server,pub_drive

    rospy.init_node('State',anonymous=True)

    pub_display = rospy.Publisher('StateToDisplay',String, queue_size = 10)

    pub_server = rospy.Publisher('StateToServer', String, queue_size = 10)

    pub_drive = rospy.Publisher('StateToDrive', String, queue_size = 10)

    rospy.Subscriber("DriveToState",String, DriveCallback)
    rospy.Subscriber("DisplayToState",String,DisplayCallback)
    rospy.Subscriber("ServerToState", String,ServerCallback)	
        	
    rospy.spin()
        


if __name__ == '__main__':
    try :
	main()
    except rospy.ROSInterruptException:
	pass

