// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:srv/SpawnEntity.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__SRV__SPAWN_ENTITY__TRAITS_HPP_
#define GAZEBO_MSGS__SRV__SPAWN_ENTITY__TRAITS_HPP_

#include "gazebo_msgs/srv/spawn_entity__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

// Include directives for member types
// Member 'initial_pose'
#include "geometry_msgs/msg/pose__traits.hpp"

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SpawnEntity_Request>()
{
  return "gazebo_msgs::srv::SpawnEntity_Request";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SpawnEntity_Request>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::SpawnEntity_Request>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SpawnEntity_Response>()
{
  return "gazebo_msgs::srv::SpawnEntity_Response";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SpawnEntity_Response>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::srv::SpawnEntity_Response>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::srv::SpawnEntity>()
{
  return "gazebo_msgs::srv::SpawnEntity";
}

template<>
struct has_fixed_size<gazebo_msgs::srv::SpawnEntity>
  : std::integral_constant<
    bool,
    has_fixed_size<gazebo_msgs::srv::SpawnEntity_Request>::value &&
    has_fixed_size<gazebo_msgs::srv::SpawnEntity_Response>::value
  >
{
};

template<>
struct has_bounded_size<gazebo_msgs::srv::SpawnEntity>
  : std::integral_constant<
    bool,
    has_bounded_size<gazebo_msgs::srv::SpawnEntity_Request>::value &&
    has_bounded_size<gazebo_msgs::srv::SpawnEntity_Response>::value
  >
{
};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__SRV__SPAWN_ENTITY__TRAITS_HPP_
