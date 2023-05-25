#include <ros/ros.h>
#include <sensor_msgs/LaserScan.h>
#include <geometry_msgs/Twist.h>
#include <tf2/LinearMath/Quaternion.h>
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>
#include <sensor_msgs/Imu.h>

ros::Publisher cmd_vel_pub;
ros::Subscriber laser_sub;
ros::Subscriber imu_sub;
geometry_msgs::Twist twist;
bool rotate_finished = true;
float min_range = std::numeric_limits<float>::infinity();
float goal_angle = 0.0;
float check_goal = false;
void laserCallback(const sensor_msgs::LaserScan::ConstPtr& msg)
{
    min_range = std::numeric_limits<float>::infinity();

    // 라이다 데이터 수신 콜백 함수
    int temp[3] = {150 , 180 , 210};
    // // 라이다 데이터에서 최소 거리 찾기
    for(int i = 0; i < 3; i++){
        // std::cout << temp[i] << " : " << msg->ranges[temp[i]] << std::endl;
        if (msg->ranges[temp[i]] >= 0.1 && msg->ranges[temp[i]] < min_range) {
            min_range = msg->ranges[temp[i]];
        }
    }
    // std::cout << min_range <<std::endl;

    // // 최소 거리가 임계값보다 작으면 회전 동작 수행

    if (min_range < 0.5 && check_goal) {
        twist.linear.x = 0.0;       // 정지
        twist.angular.z = 0.5;      // 회전
        cmd_vel_pub.publish(twist);
        std::cout << "rotation" << std::endl;
    } else if (min_range > 0.5) {
        rotate_finished = false;
        twist.linear.x = 0.05;      // 일반 주행 속도
        twist.angular.z = 0.0;      // 회전 없음
        cmd_vel_pub.publish(twist);
        std::cout << "GO" << std::endl;
    }
}

void imuCallback(const sensor_msgs::Imu::ConstPtr& msg)
{
    tf2::Quaternion quat;
    tf2::convert(msg->orientation, quat);

    double roll, pitch, yaw;
    tf2::Matrix3x3(quat).getRPY(roll, pitch, yaw);
    if (!check_goal) {
    check_goal = true;
    goal_angle = (static_cast<int>((yaw + 1.57)*57.3-180)%360)/57.3;
}
    std::cout << "check_goal" << check_goal << std::endl;
    std::cout << "goal_angle" << goal_angle << std::endl;
    std::cout << "yaw" << yaw << std::endl;

    // if (!rotate_finished && min_range>0.5) {
    //     twist.angular.z = 0.0;
    //     cmd_vel_pub.publish(twist);
    //     rotate_finished = true;
    //     std::cout << "rotation finished" << std::endl;
    //     check_goal = false;
    // }

    // 90도 회전 각도 (1.57 라디안)에 도달했을 때 회전을 정지
    if (!rotate_finished && goal_angle<yaw+0.05 && goal_angle > yaw-0.05) {
        twist.angular.z = 0.0;
        twist.linear.x = 0.0;
        cmd_vel_pub.publish(twist);
        rotate_finished = true;
        std::cout << "rotation finished" << std::endl;
        check_goal = false;
    }
}

int main(int argc, char** argv)
{
    ros::init(argc, argv, "drive");
    ros::NodeHandle nh;

    laser_sub = nh.subscribe<sensor_msgs::LaserScan>("/scan", 10, laserCallback);
    imu_sub = nh.subscribe<sensor_msgs::Imu>("/imu", 10, imuCallback);
    cmd_vel_pub = nh.advertise<geometry_msgs::Twist>("/cmd_vel", 10);
    ros::Rate loop_rate(10);  // 루프 주기 설정 (10Hz)
    while (ros::ok()) {
        ros::spinOnce();  // ROS 메시지 처리
        loop_rate.sleep();  // 루프 주기 동안 대기
    }
    return 0;
}
