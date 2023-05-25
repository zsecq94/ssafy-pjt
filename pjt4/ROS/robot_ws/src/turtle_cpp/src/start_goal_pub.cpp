#include "rclcpp/rclcpp.hpp"
#include "geometry_msgs/msg/pose_stamped.hpp"
#include "nav_msgs/msg/odometry.hpp"

class PosePublisher : public rclcpp::Node
{
public:
  PosePublisher()
  : Node("pose_publisher")
  {
    publisher_ = this->create_publisher<geometry_msgs::msg::PoseStamped>("move_base_simple/goal", 10);
    timer_ = this->create_wall_timer(std::chrono::seconds(1), std::bind(&PosePublisher::publishGoal, this));
    setPose();
  }

private:
  void setPose()
  {
    // Set the initial position and orientation
    initial_pose_.header.frame_id = "map";
    initial_pose_.header.stamp = now();
    initial_pose_.pose.position.x = 1.0;
    initial_pose_.pose.position.y = 1.0;
    initial_pose_.pose.position.z = 0.0;
    initial_pose_.pose.orientation.x = 0.0;
    initial_pose_.pose.orientation.y = 0.0;
    initial_pose_.pose.orientation.z = 0.0;
    initial_pose_.pose.orientation.w = 1.0;

    // Set the goal position and orientation
    goal_pose_.header.frame_id = "map";
    goal_pose_.header.stamp = now();
    goal_pose_.pose.position.x = 5.0;
    goal_pose_.pose.position.y = 5.0;
    goal_pose_.pose.position.z = 0.0;
    goal_pose_.pose.orientation.x = 0.0;
    goal_pose_.pose.orientation.y = 0.0;
    goal_pose_.pose.orientation.z = 0.0;
    goal_pose_.pose.orientation.w = 1.0;
  }

  void publishGoal()
  {
    publisher_->publish(goal_pose_);
    RCLCPP_INFO(this->get_logger(), "Goal published");
  }

  rclcpp::Publisher<geometry_msgs::msg::PoseStamped>::SharedPtr publisher_;
  rclcpp::TimerBase::SharedPtr timer_;
  geometry_msgs::msg::PoseStamped initial_pose_;
  geometry_msgs::msg::PoseStamped goal_pose_;
};

int main(int argc, char **argv)
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<PosePublisher>());
  rclcpp::shutdown();
  return 0;
}
