// generated from rosidl_typesupport_introspection_cpp/resource/idl__type_support.cpp.em
// with input from gazebo_msgs:msg/LogicalCameraImage.idl
// generated code does not contain a copyright notice

#include "array"
#include "cstddef"
#include "string"
#include "vector"
#include "rosidl_generator_c/message_type_support_struct.h"
#include "rosidl_typesupport_cpp/message_type_support.hpp"
#include "rosidl_typesupport_interface/macros.h"
#include "gazebo_msgs/msg/logical_camera_image__struct.hpp"
#include "rosidl_typesupport_introspection_cpp/field_types.hpp"
#include "rosidl_typesupport_introspection_cpp/identifier.hpp"
#include "rosidl_typesupport_introspection_cpp/message_introspection.hpp"
#include "rosidl_typesupport_introspection_cpp/message_type_support_decl.hpp"
#include "rosidl_typesupport_introspection_cpp/visibility_control.h"

namespace gazebo_msgs
{

namespace msg
{

namespace rosidl_typesupport_introspection_cpp
{

size_t size_function__LogicalCameraImage__model_name(const void * untyped_member)
{
  const auto * member = reinterpret_cast<const std::vector<std::string> *>(untyped_member);
  return member->size();
}

const void * get_const_function__LogicalCameraImage__model_name(const void * untyped_member, size_t index)
{
  const auto & member =
    *reinterpret_cast<const std::vector<std::string> *>(untyped_member);
  return &member[index];
}

void * get_function__LogicalCameraImage__model_name(void * untyped_member, size_t index)
{
  auto & member =
    *reinterpret_cast<std::vector<std::string> *>(untyped_member);
  return &member[index];
}

void resize_function__LogicalCameraImage__model_name(void * untyped_member, size_t size)
{
  auto * member =
    reinterpret_cast<std::vector<std::string> *>(untyped_member);
  member->resize(size);
}

size_t size_function__LogicalCameraImage__model_pose(const void * untyped_member)
{
  const auto * member = reinterpret_cast<const std::vector<geometry_msgs::msg::Pose> *>(untyped_member);
  return member->size();
}

const void * get_const_function__LogicalCameraImage__model_pose(const void * untyped_member, size_t index)
{
  const auto & member =
    *reinterpret_cast<const std::vector<geometry_msgs::msg::Pose> *>(untyped_member);
  return &member[index];
}

void * get_function__LogicalCameraImage__model_pose(void * untyped_member, size_t index)
{
  auto & member =
    *reinterpret_cast<std::vector<geometry_msgs::msg::Pose> *>(untyped_member);
  return &member[index];
}

void resize_function__LogicalCameraImage__model_pose(void * untyped_member, size_t size)
{
  auto * member =
    reinterpret_cast<std::vector<geometry_msgs::msg::Pose> *>(untyped_member);
  member->resize(size);
}

static const ::rosidl_typesupport_introspection_cpp::MessageMember LogicalCameraImage_message_member_array[3] = {
  {
    "camera_pose",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<geometry_msgs::msg::Pose>(),  // members of sub message
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs::msg::LogicalCameraImage, camera_pose),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "model_name",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_STRING,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    true,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs::msg::LogicalCameraImage, model_name),  // bytes offset in struct
    nullptr,  // default value
    size_function__LogicalCameraImage__model_name,  // size() function pointer
    get_const_function__LogicalCameraImage__model_name,  // get_const(index) function pointer
    get_function__LogicalCameraImage__model_name,  // get(index) function pointer
    resize_function__LogicalCameraImage__model_name  // resize(index) function pointer
  },
  {
    "model_pose",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<geometry_msgs::msg::Pose>(),  // members of sub message
    true,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs::msg::LogicalCameraImage, model_pose),  // bytes offset in struct
    nullptr,  // default value
    size_function__LogicalCameraImage__model_pose,  // size() function pointer
    get_const_function__LogicalCameraImage__model_pose,  // get_const(index) function pointer
    get_function__LogicalCameraImage__model_pose,  // get(index) function pointer
    resize_function__LogicalCameraImage__model_pose  // resize(index) function pointer
  }
};

static const ::rosidl_typesupport_introspection_cpp::MessageMembers LogicalCameraImage_message_members = {
  "gazebo_msgs::msg",  // message namespace
  "LogicalCameraImage",  // message name
  3,  // number of fields
  sizeof(gazebo_msgs::msg::LogicalCameraImage),
  LogicalCameraImage_message_member_array  // message members
};

static const rosidl_message_type_support_t LogicalCameraImage_message_type_support_handle = {
  ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  &LogicalCameraImage_message_members,
  get_message_typesupport_handle_function,
};

}  // namespace rosidl_typesupport_introspection_cpp

}  // namespace msg

}  // namespace gazebo_msgs


namespace rosidl_typesupport_introspection_cpp
{

template<>
ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<gazebo_msgs::msg::LogicalCameraImage>()
{
  return &::gazebo_msgs::msg::rosidl_typesupport_introspection_cpp::LogicalCameraImage_message_type_support_handle;
}

}  // namespace rosidl_typesupport_introspection_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, gazebo_msgs, msg, LogicalCameraImage)() {
  return &::gazebo_msgs::msg::rosidl_typesupport_introspection_cpp::LogicalCameraImage_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif
