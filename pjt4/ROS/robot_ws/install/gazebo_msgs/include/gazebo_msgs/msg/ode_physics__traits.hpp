// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:msg/ODEPhysics.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__MSG__ODE_PHYSICS__TRAITS_HPP_
#define GAZEBO_MSGS__MSG__ODE_PHYSICS__TRAITS_HPP_

#include "gazebo_msgs/msg/ode_physics__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::msg::ODEPhysics>()
{
  return "gazebo_msgs::msg::ODEPhysics";
}

template<>
struct has_fixed_size<gazebo_msgs::msg::ODEPhysics>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<gazebo_msgs::msg::ODEPhysics>
  : std::integral_constant<bool, true> {};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__MSG__ODE_PHYSICS__TRAITS_HPP_
