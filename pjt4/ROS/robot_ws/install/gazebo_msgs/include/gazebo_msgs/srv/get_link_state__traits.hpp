// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:srv/GetLinkState.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__SRV__GET_LINK_STATE__TRAITS_HPP_
#define GAZEBO_MSGS__SRV__GET_LINK_STATE__TRAITS_HPP_

#include "gazebo_msgs/srv/get_link_state__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::GetLinkState_Request>()
{
  return "gazebo_msgs::srv::GetLinkState_Request";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::GetLinkState_Request>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::GetLinkState_Request>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'link_state'
#include "gazebo_msgs/msg/link_state__traits.hpp"

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::GetLinkState_Response>()
{
  return "gazebo_msgs::srv::GetLinkState_Response";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::GetLinkState_Response>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::GetLinkState_Response>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::GetLinkState>()
{
  return "gazebo_msgs::srv::GetLinkState";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::GetLinkState>
  : std::integral_constant<
    bool,
    has_fixed_size<gazebo_msgs::srv::GetLinkState_Request>::value &&
    has_fixed_size<gazebo_msgs::srv::GetLinkState_Response>::value
  >
{
};

template<>
struct has_bounded_size<gazebo_msgs::srv::GetLinkState>
  : std::integral_constant<
    bool,
    has_bounded_size<gazebo_msgs::srv::GetLinkState_Request>::value &&
    has_bounded_size<gazebo_msgs::srv::GetLinkState_Response>::value
  >
{
};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__SRV__GET_LINK_STATE__TRAITS_HPP_
