// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from gazebo_msgs:msg/LogicalCameraImage.idl
// generated code does not contain a copyright notice

#ifndef GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__FUNCTIONS_H_
#define GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__FUNCTIONS_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stdlib.h>

#include "rosidl_generator_c/visibility_control.h"
#include "gazebo_msgs/msg/rosidl_generator_c__visibility_control.h"

#include "gazebo_msgs/msg/logical_camera_image__struct.h"

/// Initialize msg/LogicalCameraImage message.
/**
 * If the init function is called twice for the same message without
 * calling fini inbetween previously allocated memory will be leaked.
 * \param[in,out] msg The previously allocated message pointer.
 * Fields without a default value will not be initialized by this function.
 * You might want to call memset(msg, 0, sizeof(
 * gazebo_msgs__msg__LogicalCameraImage
 * )) before or use
 * gazebo_msgs__msg__LogicalCameraImage__create()
 * to allocate and initialize the message.
 * \return true if initialization was successful, otherwise false
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
bool
gazebo_msgs__msg__LogicalCameraImage__init(gazebo_msgs__msg__LogicalCameraImage * msg);

/// Finalize msg/LogicalCameraImage message.
/**
 * \param[in,out] msg The allocated message pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
void
gazebo_msgs__msg__LogicalCameraImage__fini(gazebo_msgs__msg__LogicalCameraImage * msg);

/// Create msg/LogicalCameraImage message.
/**
 * It allocates the memory for the message, sets the memory to zero, and
 * calls
 * gazebo_msgs__msg__LogicalCameraImage__init().
 * \return The pointer to the initialized message if successful,
 * otherwise NULL
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
gazebo_msgs__msg__LogicalCameraImage *
gazebo_msgs__msg__LogicalCameraImage__create();

/// Destroy msg/LogicalCameraImage message.
/**
 * It calls
 * gazebo_msgs__msg__LogicalCameraImage__fini()
 * and frees the memory of the message.
 * \param[in,out] msg The allocated message pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
void
gazebo_msgs__msg__LogicalCameraImage__destroy(gazebo_msgs__msg__LogicalCameraImage * msg);


/// Initialize array of msg/LogicalCameraImage messages.
/**
 * It allocates the memory for the number of elements and calls
 * gazebo_msgs__msg__LogicalCameraImage__init()
 * for each element of the array.
 * \param[in,out] array The allocated array pointer.
 * \param[in] size The size / capacity of the array.
 * \return true if initialization was successful, otherwise false
 * If the array pointer is valid and the size is zero it is guaranteed
 # to return true.
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
bool
gazebo_msgs__msg__LogicalCameraImage__Sequence__init(gazebo_msgs__msg__LogicalCameraImage__Sequence * array, size_t size);

/// Finalize array of msg/LogicalCameraImage messages.
/**
 * It calls
 * gazebo_msgs__msg__LogicalCameraImage__fini()
 * for each element of the array and frees the memory for the number of
 * elements.
 * \param[in,out] array The initialized array pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
void
gazebo_msgs__msg__LogicalCameraImage__Sequence__fini(gazebo_msgs__msg__LogicalCameraImage__Sequence * array);

/// Create array of msg/LogicalCameraImage messages.
/**
 * It allocates the memory for the array and calls
 * gazebo_msgs__msg__LogicalCameraImage__Sequence__init().
 * \param[in] size The size / capacity of the array.
 * \return The pointer to the initialized array if successful, otherwise NULL
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
gazebo_msgs__msg__LogicalCameraImage__Sequence *
gazebo_msgs__msg__LogicalCameraImage__Sequence__create(size_t size);

/// Destroy array of msg/LogicalCameraImage messages.
/**
 * It calls
 * gazebo_msgs__msg__LogicalCameraImage__Sequence__fini()
 * on the array,
 * and frees the memory of the array.
 * \param[in,out] array The initialized array pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_gazebo_msgs
void
gazebo_msgs__msg__LogicalCameraImage__Sequence__destroy(gazebo_msgs__msg__LogicalCameraImage__Sequence * array);

#ifdef __cplusplus
}
#endif

#endif  // GAZEBO_MSGS__MSG__LOGICAL_CAMERA_IMAGE__FUNCTIONS_H_
