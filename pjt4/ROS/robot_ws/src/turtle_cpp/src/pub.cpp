#include <chrono>
#include <functional>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

class Pub : public rclcpp::Node
{
  public:
        Pub() : Node("pub"), count(0)
        {
            auto qos_profile = rclcpp::QoS(rclcpp::KeepLast(10));
            publisher_ = this->create_publisher<std_msgs::msg::String>(
                "topic", qos_profile);
            timer = this->create_wall_timer(
                500ms, std::bind(&Pub::timer_callback, this));
        }
   private:
        void timer_callback()
        {
            auto msg = std_msgs::msg::String();
            msg.data = "Hello World: " + std::to_string(count++);
            RCLCPP_INFO(
                this->get_logger(),
                "Publishing: '%s'",
                msg.data.c_str());
            publisher_->publish(msg);
        }
        rclcpp::TimerBase::SharedPtr timer;
        rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
        size_t count;
};

int main(int argc, char * argv[])
{
    rclcpp::init(argc, argv);
    auto node = std::make_shared<Pub>();
    rclcpp::spin(node);
    rclcpp::shutdown();
    return 0;
}
