// Copyright 2019 Open Source Robotics Foundation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#ifndef GAZEBO_ROS_DEPTH_CAMERA_HPP_
#define GAZEBO_ROS_DEPTH_CAMERA_HPP_

#include <gazebo/plugins/DepthCameraPlugin.hh>
#include <std_msgs/msg/empty.hpp>

#include <memory>
#include <string>

namespace gazebo_plugins
{
class GazeboRosDepthCameraPrivate;

/// A plugin that publishes raw images, depth images, point cloud
/// and camera info for depth camera sensors.
/**
  Example Usage:
  \code{.xml}
    <plugin name="plugin_name" filename="libgazebo_ros_depth_camera.so">
      <!-- Change namespace, camera name and topics so:
           * Raw Images are published to: /custom_ns/custom_camera/custom_raw_image
           * Depth Images are published to: /custom_ns/custom_camera/custom_depth_image
           * Point Clouds are published to: /custom_ns/custom_camera/custom_pcl
           * Raw Camera info is published to: /custom_ns/custom_camera/raw_custom_info
           * Depth Camera info is published to: /custom_ns/custom_camera/depth_custom_info
           * Trigger is received on: /custom_ns/custom_camera/custom_trigger
      -->
      <ros>
        <namespace>custom_ns</namespace>
        <argument>custom_camera/image_raw:=custom_camera/custom_raw_image</argument>
        <argument>custom_camera/depth/image_raw:=custom_camera/custom_depth_image</argument>
        <argument>custom_camera/camera_info:=custom_camera/raw_custom_info</argument>
        <argument>custom_camera/depth/camera_info:=custom_camera/depth_custom_info</argument>
        <argument>custom_camera/points:=custom_camera/custom_pcl</argument>
        <argument>custom_camera/image_trigger:=custom_camera/custom_trigger</argument>
      </ros>

      <!-- Set camera name. If empty, defaults to sensor name -->
      <camera_name>custom_camera</camera_name>

      <!-- Set TF frame name. If empty, defaults to link name -->
      <frame_name>custom_frame</frame_name>

      <!-- Set to true to turn on triggering -->
      <triggered>true</triggered>

      <hack_baseline>0.07</hack_baseline>
    </plugin>
  \endcode
*/
class GazeboRosDepthCamera : public gazebo::DepthCameraPlugin
{
public:
  /// Constructor
  GazeboRosDepthCamera();

  /// Destructor
  ~GazeboRosDepthCamera();

  // Documentation inherited
  void Load(gazebo::sensors::SensorPtr _sensor, sdf::ElementPtr _sdf) override;

protected:
  /// Callback when camera produces a new image.
  /*
   * \details This is called at the camera's update rate.
   * \details Not called when the camera isn't active. For a triggered camera, it will only be
   * called after triggered.
   * \param[in] _image Image
   * \param[in] _width Image width
   * \param[in] _height Image height
   * \param[in] _depth Image depth
   * \param[in] _format Image format
   */
  void OnNewImageFrame(
    const unsigned char * _image,
    unsigned int _width, unsigned int _height,
    unsigned int _depth, const std::string & _format) override;

  /// Callback when camera produces a new depth image.
  /*
   * \details This is called at the camera's update rate.
   * \details Not called when the camera isn't active. For a triggered camera, it will only be
   * called after triggered.
   * \param[in] _image Image
   * \param[in] _width Image width
   * \param[in] _height Image height
   * \param[in] _depth Image depth
   * \param[in] _format Image format
   */
  void OnNewDepthFrame(
    const float * _image,
    unsigned int _width, unsigned int _height,
    unsigned int _depth, const std::string & _format) override;

  /// Callback when camera is triggered.
  void OnTrigger(const std_msgs::msg::Empty::SharedPtr _dummy);

  /// Callback on pre-render event.
  void PreRender();

  /// Enables or disables the camera so it produces messages or not.
  /// param[in] _enabled True to enable.
  void SetCameraEnabled(const bool _enabled);

private:
  /// Private data pointer
  std::unique_ptr<GazeboRosDepthCameraPrivate> impl_;
};
}  // namespace gazebo_plugins

#endif  // GAZEBO_ROS_DEPTH_CAMERA_HPP_
