// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:msg/EntityState.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__MSG__ENTITY_STATE__TRAITS_HPP_
#define GAZEBO_MSGS__MSG__ENTITY_STATE__TRAITS_HPP_

#include "gazebo_msgs/msg/entity_state__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

// Include directives for member types
// Member 'pose'
#include "geometry_msgs/msg/pose__traits.hpp"
// Member 'twist'
#include "geometry_msgs/msg/twist__traits.hpp"

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::msg::EntityState>()
{
  return "gazebo_msgs::msg::EntityState";
}

template<>
struct has_fixed_size<gazebo_msgs::msg::EntityState>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::msg::EntityState>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__MSG__ENTITY_STATE__TRAITS_HPP_
