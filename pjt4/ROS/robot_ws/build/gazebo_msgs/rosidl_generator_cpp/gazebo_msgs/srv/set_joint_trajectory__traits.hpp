// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:srv/SetJointTrajectory.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__SRV__SET_JOINT_TRAJECTORY__TRAITS_HPP_
#define GAZEBO_MSGS__SRV__SET_JOINT_TRAJECTORY__TRAITS_HPP_

#include "gazebo_msgs/srv/set_joint_trajectory__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

// Include directives for member types
// Member 'joint_trajectory'
#include "trajectory_msgs/msg/joint_trajectory__traits.hpp"
// Member 'model_pose'
#include "geometry_msgs/msg/pose__traits.hpp"

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SetJointTrajectory_Request>()
{
  return "gazebo_msgs::srv::SetJointTrajectory_Request";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SetJointTrajectory_Request>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::SetJointTrajectory_Request>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SetJointTrajectory_Response>()
{
  return "gazebo_msgs::srv::SetJointTrajectory_Response";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SetJointTrajectory_Response>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::SetJointTrajectory_Response>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SetJointTrajectory>()
{
  return "gazebo_msgs::srv::SetJointTrajectory";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SetJointTrajectory>
  : std::integral_constant<
    bool,
    has_fixed_size<gazebo_msgs::srv::SetJointTrajectory_Request>::value &&
    has_fixed_size<gazebo_msgs::srv::SetJointTrajectory_Response>::value
  >
{
};

template<>
struct has_bounded_size<gazebo_msgs::srv::SetJointTrajectory>
  : std::integral_constant<
    bool,
    has_bounded_size<gazebo_msgs::srv::SetJointTrajectory_Request>::value &&
    has_bounded_size<gazebo_msgs::srv::SetJointTrajectory_Response>::value
  >
{
};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__SRV__SET_JOINT_TRAJECTORY__TRAITS_HPP_
