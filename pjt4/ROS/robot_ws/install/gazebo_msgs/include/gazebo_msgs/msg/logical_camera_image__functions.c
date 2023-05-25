// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from gazebo_msgs:msg/LogicalCameraImage.idl
// generated code does not contain a copyright notice
#include "gazebo_msgs/msg/logical_camera_image__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>


// Include directives for member types
// Member `camera_pose`
// Member `model_pose`
#include "geometry_msgs/msg/pose__functions.h"
// Member `model_name`
#include "rosidl_generator_c/string_functions.h"

bool
gazebo_msgs__msg__LogicalCameraImage__init(gazebo_msgs__msg__LogicalCameraImage * msg)
{
  if (!msg) {
    return false;
  }
  // camera_pose
  if (!geometry_msgs__msg__Pose__init(&msg->camera_pose)) {
    gazebo_msgs__msg__LogicalCameraImage__fini(msg);
    return false;
  }
  // model_name
  if (!rosidl_generator_c__String__Sequence__init(&msg->model_name, 0)) {
    gazebo_msgs__msg__LogicalCameraImage__fini(msg);
    return false;
  }
  // model_pose
  if (!geometry_msgs__msg__Pose__Sequence__init(&msg->model_pose, 0)) {
    gazebo_msgs__msg__LogicalCameraImage__fini(msg);
    return false;
  }
  return true;
}

void
gazebo_msgs__msg__LogicalCameraImage__fini(gazebo_msgs__msg__LogicalCameraImage * msg)
{
  if (!msg) {
    return;
  }
  // camera_pose
  geometry_msgs__msg__Pose__fini(&msg->camera_pose);
  // model_name
  rosidl_generator_c__String__Sequence__fini(&msg->model_name);
  // model_pose
  geometry_msgs__msg__Pose__Sequence__fini(&msg->model_pose);
}

gazebo_msgs__msg__LogicalCameraImage *
gazebo_msgs__msg__LogicalCameraImage__create()
{
  gazebo_msgs__msg__LogicalCameraImage * msg = (gazebo_msgs__msg__LogicalCameraImage *)malloc(sizeof(gazebo_msgs__msg__LogicalCameraImage));
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(gazebo_msgs__msg__LogicalCameraImage));
  bool success = gazebo_msgs__msg__LogicalCameraImage__init(msg);
  if (!success) {
    free(msg);
    return NULL;
  }
  return msg;
}

void
gazebo_msgs__msg__LogicalCameraImage__destroy(gazebo_msgs__msg__LogicalCameraImage * msg)
{
  if (msg) {
    gazebo_msgs__msg__LogicalCameraImage__fini(msg);
  }
  free(msg);
}


bool
gazebo_msgs__msg__LogicalCameraImage__Sequence__init(gazebo_msgs__msg__LogicalCameraImage__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  gazebo_msgs__msg__LogicalCameraImage * data = NULL;
  if (size) {
    data = (gazebo_msgs__msg__LogicalCameraImage *)calloc(size, sizeof(gazebo_msgs__msg__LogicalCameraImage));
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = gazebo_msgs__msg__LogicalCameraImage__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        gazebo_msgs__msg__LogicalCameraImage__fini(&data[i - 1]);
      }
      free(data);
      return false;
    }
  }
  array->data = data;
  array->size = size;
  array->capacity = size;
  return true;
}

void
gazebo_msgs__msg__LogicalCameraImage__Sequence__fini(gazebo_msgs__msg__LogicalCameraImage__Sequence * array)
{
  if (!array) {
    return;
  }
  if (array->data) {
    // ensure that data and capacity values are consistent
    assert(array->capacity > 0);
    // finalize all array elements
    for (size_t i = 0; i < array->capacity; ++i) {
      gazebo_msgs__msg__LogicalCameraImage__fini(&array->data[i]);
    }
    free(array->data);
    array->data = NULL;
    array->size = 0;
    array->capacity = 0;
  } else {
    // ensure that data, size, and capacity values are consistent
    assert(0 == array->size);
    assert(0 == array->capacity);
  }
}

gazebo_msgs__msg__LogicalCameraImage__Sequence *
gazebo_msgs__msg__LogicalCameraImage__Sequence__create(size_t size)
{
  gazebo_msgs__msg__LogicalCameraImage__Sequence * array = (gazebo_msgs__msg__LogicalCameraImage__Sequence *)malloc(sizeof(gazebo_msgs__msg__LogicalCameraImage__Sequence));
  if (!array) {
    return NULL;
  }
  bool success = gazebo_msgs__msg__LogicalCameraImage__Sequence__init(array, size);
  if (!success) {
    free(array);
    return NULL;
  }
  return array;
}

void
gazebo_msgs__msg__LogicalCameraImage__Sequence__destroy(gazebo_msgs__msg__LogicalCameraImage__Sequence * array)
{
  if (array) {
    gazebo_msgs__msg__LogicalCameraImage__Sequence__fini(array);
  }
  free(array);
}
