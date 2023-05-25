// generated from rosidl_typesupport_introspection_cpp/resource/idl__type_support.cpp.em
// with input from gazebo_msgs:msg/ContactsState.idl
// generated code does not contain a copyright notice

#include "array"
#include "cstddef"
#include "string"
#include "vector"
#include "rosidl_generator_c/message_type_support_struct.h"
#include "rosidl_typesupport_cpp/message_type_support.hpp"
#include "rosidl_typesupport_interface/macros.h"
#include "gazebo_msgs/msg/contacts_state__struct.hpp"
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

size_t size_function__ContactsState__states(const void * untyped_member)
{
  const auto * member = reinterpret_cast<const std::vector<gazebo_msgs::msg::ContactState> *>(untyped_member);
  return member->size();
}

const void * get_const_function__ContactsState__states(const void * untyped_member, size_t index)
{
  const auto & member =
    *reinterpret_cast<const std::vector<gazebo_msgs::msg::ContactState> *>(untyped_member);
  return &member[index];
}

void * get_function__ContactsState__states(void * untyped_member, size_t index)
{
  auto & member =
    *reinterpret_cast<std::vector<gazebo_msgs::msg::ContactState> *>(untyped_member);
  return &member[index];
}

void resize_function__ContactsState__states(void * untyped_member, size_t size)
{
  auto * member =
    reinterpret_cast<std::vector<gazebo_msgs::msg::ContactState> *>(untyped_member);
  member->resize(size);
}

static const ::rosidl_typesupport_introspection_cpp::MessageMember ContactsState_message_member_array[2] = {
  {
    "header",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<std_msgs::msg::Header>(),  // members of sub message
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs::msg::ContactsState, header),  // bytes offset in struct
    nullptr,  // default value
    nullptr,  // size() function pointer
    nullptr,  // get_const(index) function pointer
    nullptr,  // get(index) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "states",  // name
    ::rosidl_typesupport_introspection_cpp::ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    ::rosidl_typesupport_introspection_cpp::get_message_type_support_handle<gazebo_msgs::msg::ContactState>(),  // members of sub message
    true,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(gazebo_msgs::msg::ContactsState, states),  // bytes offset in struct
    nullptr,  // default value
    size_function__ContactsState__states,  // size() function pointer
    get_const_function__ContactsState__states,  // get_const(index) function pointer
    get_function__ContactsState__states,  // get(index) function pointer
    resize_function__ContactsState__states  // resize(index) function pointer
  }
};

static const ::rosidl_typesupport_introspection_cpp::MessageMembers ContactsState_message_members = {
  "gazebo_msgs::msg",  // message namespace
  "ContactsState",  // message name
  2,  // number of fields
  sizeof(gazebo_msgs::msg::ContactsState),
  ContactsState_message_member_array  // message members
};

static const rosidl_message_type_support_t ContactsState_message_type_support_handle = {
  ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  &ContactsState_message_members,
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
get_message_type_support_handle<gazebo_msgs::msg::ContactsState>()
{
  return &::gazebo_msgs::msg::rosidl_typesupport_introspection_cpp::ContactsState_message_type_support_handle;
}

}  // namespace rosidl_typesupport_introspection_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_INTROSPECTION_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, gazebo_msgs, msg, ContactsState)() {
  return &::gazebo_msgs::msg::rosidl_typesupport_introspection_cpp::ContactsState_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif
