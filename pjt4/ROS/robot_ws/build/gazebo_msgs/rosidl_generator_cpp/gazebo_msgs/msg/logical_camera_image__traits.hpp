// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from gazebo_msgs:msg/LogicalCameraImage.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__TRAITS_HPP_
#define GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__TRAITS_HPP_

#include "gazebo_msgs/msg/logical_camera_image__struct.hpp"
#include <rosidl_generator_cpp/traits.hpp>
#include <stdint.h>
#include <type_traits>

// Include directives for member types
// Member 'camera_pose'
#include "geometry_msgs/msg/pose__traits.hpp"

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<gazebo_msgs::msg::LogicalCameraImage>()
{
  return "gazebo_msgs::msg::LogicalCameraImage";
}

template<>
struct has_fixed_size<gazebo_msgs::msg::LogicalCameraImage>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<gazebo_msgs::msg::LogicalCameraImage>
  : std::integral_constant<bool, false> {};

}  // namespace rosidl_generator_traits

#endif  // GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__TRAITS_HPP_
