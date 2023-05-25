// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:srv/ApplyJointEffort.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__SRV__APPLY_JOINT_EFFORT__TRAITS_HPP_
#define GAZEBO_MSGS__SRV__APPLY_JOINT_EFFORT__TRAITS_HPP_

#include "gazebo_msgs/srv/apply_joint_effort__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

// Include directives for member types
// Member 'start_time'
#include "builtin_interfaces/msg/time__traits.hpp"
// Member 'duration'
#include "builtin_interfaces/msg/duration__traits.hpp"

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::ApplyJointEffort_Request>()
{
  return "gazebo_msgs::srv::ApplyJointEffort_Request";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::ApplyJointEffort_Request>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::ApplyJointEffort_Request>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::ApplyJointEffort_Response>()
{
  return "gazebo_msgs::srv::ApplyJointEffort_Response";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::ApplyJointEffort_Response>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::ApplyJointEffort_Response>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::ApplyJointEffort>()
{
  return "gazebo_msgs::srv::ApplyJointEffort";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::ApplyJointEffort>
  : std::integral_constant<
    bool,
    has_fixed_size<gazebo_msgs::srv::ApplyJointEffort_Request>::value &&
    has_fixed_size<gazebo_msgs::srv::ApplyJointEffort_Response>::value
  >
{
};

template<>
struct has_bounded_size<gazebo_msgs::srv::ApplyJointEffort>
  : std::integral_constant<
    bool,
    has_bounded_size<gazebo_msgs::srv::ApplyJointEffort_Request>::value &&
    has_bounded_size<gazebo_msgs::srv::ApplyJointEffort_Response>::value
  >
{
};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__SRV__APPLY_JOINT_EFFORT__TRAITS_HPP_
