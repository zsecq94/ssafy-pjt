// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from gazebo_msgs:msg/LogicalCameraImage.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__STRUCT_HPP_
#define GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__STRUCT_HPP_

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
// Member 'camera_pose'
// Member 'model_pose'
#include "geometry_msgs/msg/pose__struct.hpp"

#ifndef _WIN32
# define DEPRECATED__gazebo_msgs__msg__LogicalCameraImage __attribute__((deprecated))
#else
# define DEPRECATED__gazebo_msgs__msg__LogicalCameraImage __declspec(deprecated)
#endif

namespace gazebo_msgs
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct LogicalCameraImage_
{
  using Type = LogicalCameraImage_<ContainerAllocator>;

  explicit LogicalCameraImage_(rosidl_generator_cpp::MessageInitialization _init = rosidl_generator_cpp::MessageInitialization::ALL)
  : camera_pose(_init)
  {
    (void)_init;
  }

  explicit LogicalCameraImage_(const ContainerAllocator & _alloc, rosidl_generator_cpp::MessageInitialization _init = rosidl_generator_cpp::MessageInitialization::ALL)
  : camera_pose(_alloc, _init)
  {
    (void)_init;
  }

  // field types and members
  using _camera_pose_type =
    geometry_msgs::msg::Pose_<ContainerAllocator>;
  _camera_pose_type camera_pose;
  using _model_name_type =
    std::vector<std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other>, typename ContainerAllocator::template rebind<std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other>>::other>;
  _model_name_type model_name;
  using _model_pose_type =
    std::vector<geometry_msgs::msg::Pose_<ContainerAllocator>, typename ContainerAllocator::template rebind<geometry_msgs::msg::Pose_<ContainerAllocator>>::other>;
  _model_pose_type model_pose;

  // setters for named parameter idiom
  Type & set__camera_pose(
    const geometry_msgs::msg::Pose_<ContainerAllocator> & _arg)
  {
    this->camera_pose = _arg;
    return *this;
  }
  Type & set__model_name(
    const std::vector<std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other>, typename ContainerAllocator::template rebind<std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other>>::other> & _arg)
  {
    this->model_name = _arg;
    return *this;
  }
  Type & set__model_pose(
    const std::vector<geometry_msgs::msg::Pose_<ContainerAllocator>, typename ContainerAllocator::template rebind<geometry_msgs::msg::Pose_<ContainerAllocator>>::other> & _arg)
  {
    this->model_pose = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator> *;
  using ConstRawPtr =
    const gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__gazebo_msgs__msg__LogicalCameraImage
    std::shared_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__gazebo_msgs__msg__LogicalCameraImage
    std::shared_ptr<gazebo_msgs::msg::LogicalCameraImage_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const LogicalCameraImage_ & other) const
  {
    if (this->camera_pose != other.camera_pose) {
      return false;
    }
    if (this->model_name != other.model_name) {
      return false;
    }
    if (this->model_pose != other.model_pose) {
      return false;
    }
    return true;
  }
  bool operator!=(const LogicalCameraImage_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct LogicalCameraImage_

// alias to use template instance with default allocator
using LogicalCameraImage =
  gazebo_msgs::msg::LogicalCameraImage_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace gazebo_msgs

#endif  // GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__STRUCT_HPP_
