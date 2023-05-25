#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"
using std::placeholders::_1;

class Sub : public rclcpp::Node
{
    public:
      Sub() : Node("sub")
      {
        auto qos_profile = rclcpp::QoS(rclcpp::KeepLast(10));
        subscriber_ = this->create_subscription<std_msgs::msg::String>(
          "/topic",
          qos_profile,
          std::bind(&Sub::listener_callback,this,_1));
      }

    private:
      void listener_callback(const std_msgs::msg::String::SharedPtr msg) const
      {
        RCLCPP_INFO(this->get_logger(),"'I heard: '%s'",msg->data.c_str());
      }
      rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscriber_;
};

int main(int argc,char * argv[]){
  rclcpp::init(argc,argv);
  auto node = std::make_shared<Sub>();
  rclcpp::spin(node);
  rclcpp::shutdown();
  return 0;
}
