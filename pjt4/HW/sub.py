import rospy
from std_msgs.msg import String


def callback(data) :
	rospy.loginfo("I received a /turtle1/cmd_Vel message!")
	rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)


def listener() :
	rospy.init_node('listener2', anonymous=True)
	
	rospy.Subscriber("hello_world", String, callback)

	rospy.spin()

if __name__ == '__main__' :
	listener()
