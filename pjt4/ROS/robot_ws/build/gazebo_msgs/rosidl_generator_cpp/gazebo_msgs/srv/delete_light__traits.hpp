// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:srv/DeleteLight.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__SRV__DELETE_LIGHT__TRAITS_HPP_
#define GAZEBO_MSGS__SRV__DELETE_LIGHT__TRAITS_HPP_

#include "gazebo_msgs/srv/delete_light__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::DeleteLight_Request>()
{
  return "gazebo_msgs::srv::DeleteLight_Request";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::DeleteLight_Request>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::DeleteLight_Request>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::DeleteLight_Response>()
{
  return "gazebo_msgs::srv::DeleteLight_Response";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::DeleteLight_Response>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::DeleteLight_Response>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::DeleteLight>()
{
  return "gazebo_msgs::srv::DeleteLight";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::DeleteLight>
  : std::integral_constant<
    bool,
    has_fixed_size<gazebo_msgs::srv::DeleteLight_Request>::value &&
    has_fixed_size<gazebo_msgs::srv::DeleteLight_Response>::value
  >
{
};

template<>
struct has_bounded_size<gazebo_msgs::srv::DeleteLight>
  : std::integral_constant<
    bool,
    has_bounded_size<gazebo_msgs::srv::DeleteLight_Request>::value &&
    has_bounded_size<gazebo_msgs::srv::DeleteLight_Response>::value
  >
{
};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__SRV__DELETE_LIGHT__TRAITS_HPP_
