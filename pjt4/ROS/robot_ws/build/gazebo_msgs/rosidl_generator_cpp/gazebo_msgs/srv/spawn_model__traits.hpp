// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:srv/SpawnModel.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__SRV__SPAWN_MODEL__TRAITS_HPP_
#define GAZEBO_MSGS__SRV__SPAWN_MODEL__TRAITS_HPP_

#include "gazebo_msgs/srv/spawn_model__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

// Include directives for member types
// Member 'initial_pose'
#include "geometry_msgs/msg/pose__traits.hpp"

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SpawnModel_Request>()
{
  return "gazebo_msgs::srv::SpawnModel_Request";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SpawnModel_Request>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::SpawnModel_Request>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SpawnModel_Response>()
{
  return "gazebo_msgs::srv::SpawnModel_Response";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SpawnModel_Response>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::SpawnModel_Response>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SpawnModel>()
{
  return "gazebo_msgs::srv::SpawnModel";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SpawnModel>
  : std::integral_constant<
    bool,
    has_fixed_size<gazebo_msgs::srv::SpawnModel_Request>::value &&
    has_fixed_size<gazebo_msgs::srv::SpawnModel_Response>::value
  >
{
};

template<>
struct has_bounded_size<gazebo_msgs::srv::SpawnModel>
  : std::integral_constant<
    bool,
    has_bounded_size<gazebo_msgs::srv::SpawnModel_Request>::value &&
    has_bounded_size<gazebo_msgs::srv::SpawnModel_Response>::value
  >
{
};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__SRV__SPAWN_MODEL__TRAITS_HPP_
