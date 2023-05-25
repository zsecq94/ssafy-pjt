#!/usr/bin/env python
import rospy
from std_msgs.msg import String
import json

pub_display = None
pub_drive = None
pub_server = None

def displayCallback(data):

	data = json.loads(data)
	rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
	message = "Received display message %s" % data.data
	pub_drive.publish(message)
	pub_server.publish(message)

def serverCallback(data):
	rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
	message = "Received socket message %s" % data.data
	pub_display.publish(message)
	pub_drive.publish(message)
	
def driveCallback(data):
	jsonData = json.loads(data.data)
	rospy.loginfo(jsonData["0"])
	message = "Received drive message %s" % data.data
	pub_drive.publish(message)	
	pub_display.publish(message)
	pub_server.publish(jsonData)

def main() :
	global pub_display,pub_server,pub_drive

	rospy.init_node('main',anonymous=True)

	pub_display = rospy.Publisher('StateToDisplay',String, queue_size = 10)

	pub_server = rospy.Publisher('StateToServer', String, queue_size = 10)

	pub_drive = rospy.Publisher('StateToDrive', String, queue_size = 10)

	rospy.Subscriber("DriveToState",String, driveCallback)
	rospy.Subscriber("DisplayToState",String,displayCallback)
	rospy.Subscriber("ServerToState", String,serverCallback)	
	rospy.spin()


if __name__ == '__main__':

	try :
		main()
	except rospy.ROSInterruptException:
		pass

