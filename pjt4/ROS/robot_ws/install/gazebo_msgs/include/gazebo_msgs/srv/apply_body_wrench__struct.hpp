// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from gazebo_msgs:srv/ApplyBodyWrench.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__SRV__APPLY_BODY_WRENCH__STRUCT_HPP_
#define GAZEBO_MSGS__SRV__APPLY_BODY_WRENCH__STRUCT_HPP_

#include <rosidl_generator_cpp/bounded_vector.hpp>
#include <rosidl_generator_cpp/message_initialization.hpp>
#include <algorithm>
#include <array>
#include <memory>
#include <string>
#include <vector>

// Protect against ERROR being predefined on Windows, in case somebody defines a
// constant by that name.
#if defined(_WIN32)
  #if defined(ERROR)
    #undef ERROR
  #endif
  #if defined(NO_ERROR)
    #undef NO_ERROR
  #endif
#endif

// Include directives for member types
// Member 'reference_point'
#include "geometry_msgs/msg/point__struct.hpp"
// Member 'wrench'
#include "geometry_msgs/msg/wrench__struct.hpp"
// Member 'start_time'
#include "builtin_interfaces/msg/time__struct.hpp"
// Member 'duration'
#include "builtin_interfaces/msg/duration__struct.hpp"

#ifndef _WIN32
# define DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Request __attribute__((deprecated))
#else
# define DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Request __declspec(deprecated)
#endif

namespace gazebo_msgs
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct ApplyBodyWrench_Request_
{
  using Type = ApplyBodyWrench_Request_<ContainerAllocator>;

  explicit ApplyBodyWrench_Request_(rosidl_generator_cpp::MessageInitialization _init = rosidl_generator_cpp::MessageInitialization::ALL)
  : reference_point(_init),
    wrench(_init),
    start_time(_init),
    duration(_init)
  {
    if (rosidl_generator_cpp::MessageInitialization::ALL == _init ||
      rosidl_generator_cpp::MessageInitialization::ZERO == _init)
    {
      this->body_name = "";
      this->reference_frame = "";
    }
  }

  explicit ApplyBodyWrench_Request_(const ContainerAllocator & _alloc, rosidl_generator_cpp::MessageInitialization _init = rosidl_generator_cpp::MessageInitialization::ALL)
  : body_name(_alloc),
    reference_frame(_alloc),
    reference_point(_alloc, _init),
    wrench(_alloc, _init),
    start_time(_alloc, _init),
    duration(_alloc, _init)
  {
    if (rosidl_generator_cpp::MessageInitialization::ALL == _init ||
      rosidl_generator_cpp::MessageInitialization::ZERO == _init)
    {
      this->body_name = "";
      this->reference_frame = "";
    }
  }

  // field types and members
  using _body_name_type =
    std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other>;
  _body_name_type body_name;
  using _reference_frame_type =
    std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other>;
  _reference_frame_type reference_frame;
  using _reference_point_type =
    geometry_msgs::msg::Point_<ContainerAllocator>;
  _reference_point_type reference_point;
  using _wrench_type =
    geometry_msgs::msg::Wrench_<ContainerAllocator>;
  _wrench_type wrench;
  using _start_time_type =
    builtin_interfaces::msg::Time_<ContainerAllocator>;
  _start_time_type start_time;
  using _duration_type =
    builtin_interfaces::msg::Duration_<ContainerAllocator>;
  _duration_type duration;

  // setters for named parameter idiom
  Type & set__body_name(
    const std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other> & _arg)
  {
    this->body_name = _arg;
    return *this;
  }
  Type & set__reference_frame(
    const std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other> & _arg)
  {
    this->reference_frame = _arg;
    return *this;
  }
  Type & set__reference_point(
    const geometry_msgs::msg::Point_<ContainerAllocator> & _arg)
  {
    this->reference_point = _arg;
    return *this;
  }
  Type & set__wrench(
    const geometry_msgs::msg::Wrench_<ContainerAllocator> & _arg)
  {
    this->wrench = _arg;
    return *this;
  }
  Type & set__start_time(
    const builtin_interfaces::msg::Time_<ContainerAllocator> & _arg)
  {
    this->start_time = _arg;
    return *this;
  }
  Type & set__duration(
    const builtin_interfaces::msg::Duration_<ContainerAllocator> & _arg)
  {
    this->duration = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator> *;
  using ConstRawPtr =
    const gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Request
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Request
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Request_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const ApplyBodyWrench_Request_ & other) const
  {
    if (this->body_name != other.body_name) {
      return false;
    }
    if (this->reference_frame != other.reference_frame) {
      return false;
    }
    if (this->reference_point != other.reference_point) {
      return false;
    }
    if (this->wrench != other.wrench) {
      return false;
    }
    if (this->start_time != other.start_time) {
      return false;
    }
    if (this->duration != other.duration) {
      return false;
    }
    return true;
  }
  bool operator!=(const ApplyBodyWrench_Request_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct ApplyBodyWrench_Request_

// alias to use template instance with default allocator
using ApplyBodyWrench_Request =
  gazebo_msgs::srv::ApplyBodyWrench_Request_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace gazebo_msgs

// Protect against ERROR being predefined on Windows, in case somebody defines a
// constant by that name.
#if defined(_WIN32)
  #if defined(ERROR)
    #undef ERROR
  #endif
  #if defined(NO_ERROR)
    #undef NO_ERROR
  #endif
#endif

#ifndef _WIN32
# define DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Response __attribute__((deprecated))
#else
# define DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Response __declspec(deprecated)
#endif

namespace gazebo_msgs
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct ApplyBodyWrench_Response_
{
  using Type = ApplyBodyWrench_Response_<ContainerAllocator>;

  explicit ApplyBodyWrench_Response_(rosidl_generator_cpp::MessageInitialization _init = rosidl_generator_cpp::MessageInitialization::ALL)
  {
    if (rosidl_generator_cpp::MessageInitialization::ALL == _init ||
      rosidl_generator_cpp::MessageInitialization::ZERO == _init)
    {
      this->success = false;
      this->status_message = "";
    }
  }

  explicit ApplyBodyWrench_Response_(const ContainerAllocator & _alloc, rosidl_generator_cpp::MessageInitialization _init = rosidl_generator_cpp::MessageInitialization::ALL)
  : status_message(_alloc)
  {
    if (rosidl_generator_cpp::MessageInitialization::ALL == _init ||
      rosidl_generator_cpp::MessageInitialization::ZERO == _init)
    {
      this->success = false;
      this->status_message = "";
    }
  }

  // field types and members
  using _success_type =
    bool;
  _success_type success;
  using _status_message_type =
    std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other>;
  _status_message_type status_message;

  // setters for named parameter idiom
  Type & set__success(
    const bool & _arg)
  {
    this->success = _arg;
    return *this;
  }
  Type & set__status_message(
    const std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other> & _arg)
  {
    this->status_message = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator> *;
  using ConstRawPtr =
    const gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Response
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__gazebo_msgs__srv__ApplyBodyWrench_Response
    std::shared_ptr<gazebo_msgs::srv::ApplyBodyWrench_Response_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const ApplyBodyWrench_Response_ & other) const
  {
    if (this->success != other.success) {
      return false;
    }
    if (this->status_message != other.status_message) {
      return false;
    }
    return true;
  }
  bool operator!=(const ApplyBodyWrench_Response_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct ApplyBodyWrench_Response_

// alias to use template instance with default allocator
using ApplyBodyWrench_Response =
  gazebo_msgs::srv::ApplyBodyWrench_Response_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace gazebo_msgs

namespace gazebo_msgs
{

namespace srv
{

struct ApplyBodyWrench
{
  using Request = gazebo_msgs::srv::ApplyBodyWrench_Request;
  using Response = gazebo_msgs::srv::ApplyBodyWrench_Response;
};

}  // namespace srv

}  // namespace gazebo_msgs

#endif  // GAZEBO_MSGS__SRV__APPLY_BODY_WRENCH__STRUCT_HPP_