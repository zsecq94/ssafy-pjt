// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from gazebo_msgs:msg/LogicalCameraImage.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__STRUCT_H_
#define GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>


// Constants defined in the message

// Include directives for member types
// Member 'camera_pose'
// Member 'model_pose'
#include "geometry_msgs/msg/pose__struct.h"
// Member 'model_name'
#include "rosidl_generator_c/string.h"

// Struct defined in msg/LogicalCameraImage in the package gazebo_msgs.
typedef struct gazebo_msgs__msg__LogicalCameraImage
{
  geometry_msgs__msg__Pose camera_pose;
  rosidl_generator_c__String__Sequence model_name;
  geometry_msgs__msg__Pose__Sequence model_pose;
} gazebo_msgs__msg__LogicalCameraImage;

// Struct for a sequence of gazebo_msgs__msg__LogicalCameraImage.
typedef struct gazebo_msgs__msg__LogicalCameraImage__Sequence
{
  gazebo_msgs__msg__LogicalCameraImage * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} gazebo_msgs__msg__LogicalCameraImage__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__STRUCT_H_
