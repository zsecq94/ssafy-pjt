#!/usr/bin/env python
import rospy
from std_msgs.msg import String

pub_display = None
pub_driver = None
pub_moon = None

def displayCallback(data):

	rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
	message = "Received display message %s" % data.data
	pub_driver.publish(message)
	pub_moon.publish(message)

def moonCallback(data):
	rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
	message = "Received socket message %s" % data.data
	pub_display.publish(message)
	pub_driver.publish(message)
	
def driverCallback(data):
	rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
	message = "Received driver message %s" % data.data
	pub_driver.publish(message)	
	pub_display.publish(message)
	pub_moon.publish(message)

def main() :
	global pub_display,pub_moon,pub_driver

	rospy.init_node('main',anonymous=True)

	pub_display = rospy.Publisher('display',String, queue_size = 10)

	pub_moon = rospy.Publisher('moon', String, queue_size = 10)

	pub_driver = rospy.Publisher('driver', String, queue_size = 10)

	rospy.Subscriber("DriverToMain",String, driverCallback)
	rospy.Subscriber("DisplayToMain",String,displayCallback)
	rospy.Subscriber("MoonToMain", String,moonCallback)	
	rospy.spin()


if __name__ == '__main__':

	try :
		main()
	except rospy.ROSInterruptException:
		pass
