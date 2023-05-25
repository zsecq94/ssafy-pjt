#!/usr/bin/env python3
import rospy
from std_msgs.msg import StringArray

pub_display = None
pub_driver = None
pub_server = None

# from, to
# ["C201", "C101"]
# []
def displayCallback(data):
	message = data.data[0]
	pub_driver.publish(message)
	pub_server.publish(message)

def serverCallback(data):
	message = data.data[0]
	pub_display.publish(message)
	pub_driver.publish(message)
	
def driverCallback(data):
	message = data.data[0]
	pub_driver.publish(message)	
	pub_display.publish(message)
	pub_server.publish(message)

def main() :
	global pub_display, pub_server, pub_driver

	rospy.init_node('State', anonymous=True)

	pub_display = rospy.Publisher('StateToDisplay',StringArray, queue_size = 10)
	pub_server = rospy.Publisher('StateToServer', StringArray, queue_size = 10)
	pub_driver = rospy.Publisher('StateToDrive', StringArray, queue_size = 10)

	rospy.Subscriber("DriveToState", StringArray, driverCallback)
	rospy.Subscriber("DisplayToState", StringArray, displayCallback)
	rospy.Subscriber("ServerToState", StringArray, serverCallback)	
	rospy.spin()


if __name__ == '__main__':
	try :
		main()
	except rospy.ROSInterruptException:
		pass
