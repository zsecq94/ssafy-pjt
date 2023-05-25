// generated from rosidl_typesupport_introspection_c/resource/idl__type_support.c.em
// with input from gazebo_msgs:msg/LogicalCameraImage.idl
// generated code does not contain a copyright notice

#include <stddef.h>
#include "gazebo_msgs/msg/logical_camera_image__rosidl_typesupport_introspection_c.h"
#include "gazebo_msgs/msg/rosidl_typesupport_introspection_c__visibility_control.h"
#include "rosidl_typesupport_introspection_c/field_types.h"
#include "rosidl_typesupport_introspection_c/identifier.h"
#include "rosidl_typesupport_introspection_c/message_introspection.h"
#include "gazebo_msgs/msg/logical_camera_image__struct.h"


// Include directives for member types
// Member `camera_pose`
// Member `model_pose`
#include "geometry_msgs/msg/pose.h"
// Member `camera_pose`
// Member `model_pose`
#include "geometry_msgs/msg/pose__rosidl_typesupport_introspection_c.h"
// Member `model_name`
#include "rosidl_generator_c/string_functions.h"

#ifdef __cplusplus
extern "C"
{
#endif

size_t LogicalCameraImage__rosidl_typesupport_introspection_c__size_function__Pose__model_pose(
  const void * untyped_member)
{
  const geometry_msgs__msg__Pose__Sequence * member =
    (const geometry_msgs__msg__Pose__Sequence *)(untyped_member);
  return member->size;
}

const void * LogicalCameraImage__rosidl_typesupport_introspection_c__get_const_function__Pose__model_pose(
  const void * untyped_member, size_t index)
{
  const geometry_msgs__msg__Pose__Sequence * member =
    (const geometry_msgs__msg__Pose__Sequence *)(untyped_member);
  return &member->data[index];
}

void * LogicalCameraImage__rosidl_typesupport_introspection_c__get_function__Pose__model_pose(
  void * untyped_member, size_t index)
{
  geometry_msgs__msg__Pose__Sequence * member =
    (geometry_msgs__msg__Pose__Sequence *)(untyped_member);
  return &member->data[index];
}

bool LogicalCameraImage__rosidl_typesupport_introspection_c__resize_function__Pose__model_pose(
  void * untyped_member, size_t size)
{
  geometry_msgs__msg__Pose__Sequence * member =
    (geometry_msgs__msg__Pose__Sequence *)(untyped_member);
  geometry_msgs__msg__Pose__Sequence__fini(member);
  return geometry_msgs__msg__Pose__Sequence__init(member, size);
}

static rosidl_typesupport_introspection_c__MessageMember LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_member_array[3] = {
  {
    "camera_pose",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message (initialized later)
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs__msg__LogicalCameraImage, camera_pose),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "model_name",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_STRING,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    true,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs__msg__LogicalCameraImage, model_name),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "model_pose",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message (initialized later)
    true,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs__msg__LogicalCameraImage, model_pose),  // bytes offset in struct
    NULL,  // default value
    LogicalCameraImage__rosidl_typesupport_introspection_c__size_function__Pose__model_pose,  // size() function pointer
    LogicalCameraImage__rosidl_typesupport_introspection_c__get_const_function__Pose__model_pose,  // get_const(index) function pointer
    LogicalCameraImage__rosidl_typesupport_introspection_c__get_function__Pose__model_pose,  // get(index) function pointer
    LogicalCameraImage__rosidl_typesupport_introspection_c__resize_function__Pose__model_pose  // resize(index) function pointer
  }
};

static const rosidl_typesupport_introspection_c__MessageMembers LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_members = {
  "gazebo_msgs__msg",  // message namespace
  "LogicalCameraImage",  // message name
  3,  // number of fields
  sizeof(gazebo_msgs__msg__LogicalCameraImage),
  LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_member_array  // message members
};

// this is not const since it must be initialized on first access
// since C does not allow non-integral compile-time constants
static rosidl_message_type_support_t LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_type_support_handle = {
  0,
  &LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_members,
  get_message_typesupport_handle_function,
};

ROSIDL_TYPESUPPORT_INTROSPECTION_C_EXPORT_gazebo_msgs
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, gazebo_msgs, msg, LogicalCameraImage)() {
  LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_member_array[0].members_ =
    ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, geometry_msgs, msg, Pose)();
  LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_member_array[2].members_ =
    ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, geometry_msgs, msg, Pose)();
  if (!LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_type_support_handle.typesupport_identifier) {
    LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_type_support_handle.typesupport_identifier =
      rosidl_typesupport_introspection_c__identifier;
  }
  return &LogicalCameraImage__rosidl_typesupport_introspection_c__LogicalCameraImage_message_type_support_handle;
}
#ifdef __cplusplus
}
#endif
