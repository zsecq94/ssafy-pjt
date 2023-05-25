# generated from rosidl_generator_py/resource/_idl.py.em
# with input from gazebo_msgs:msg/LogicalCameraImage.idl
# generated code does not contain a copyright notice


# Import statements for member types

import rosidl_parser.definition  # noqa: E402, I100


class Metaclass_LogicalCameraImage(type):
    """Metaclass of message 'LogicalCameraImage'."""

    _CREATE_ROS_MESSAGE = None
    _CONVERT_FROM_PY = None
    _CONVERT_TO_PY = None
    _DESTROY_ROS_MESSAGE = None
    _TYPE_SUPPORT = None

    __constants = {
    }

    @classmethod
    def __import_type_support__(cls):
        try:
            from rosidl_generator_py import import_type_support
            module = import_type_support('gazebo_msgs')
        except ImportError:
            import logging
            import traceback
            logger = logging.getLogger(
                'gazebo_msgs.msg.LogicalCameraImage')
            logger.debug(
                'Failed to import needed modules for type support:\n' +
                traceback.format_exc())
        else:
            cls._CREATE_ROS_MESSAGE = module.create_ros_message_msg__msg__logical_camera_image
            cls._CONVERT_FROM_PY = module.convert_from_py_msg__msg__logical_camera_image
            cls._CONVERT_TO_PY = module.convert_to_py_msg__msg__logical_camera_image
            cls._TYPE_SUPPORT = module.type_support_msg__msg__logical_camera_image
            cls._DESTROY_ROS_MESSAGE = module.destroy_ros_message_msg__msg__logical_camera_image

            from geometry_msgs.msg import Pose
            if Pose.__class__._TYPE_SUPPORT is None:
                Pose.__class__.__import_type_support__()

    @classmethod
    def __prepare__(cls, name, bases, **kwargs):
        # list constant names here so that they appear in the help text of
        # the message class under "Data and other attributes defined here:"
        # as well as populate each message instance
        return {
        }


class LogicalCameraImage(metaclass=Metaclass_LogicalCameraImage):
    """Message class 'LogicalCameraImage'."""

    __slots__ = [
        '_camera_pose',
        '_model_name',
        '_model_pose',
    ]

    _fields_and_field_types = {
        'camera_pose': 'geometry_msgs/Pose',
        'model_name': 'sequence<string>',
        'model_pose': 'sequence<geometry_msgs/Pose>',
    }

    SLOT_TYPES = (
        rosidl_parser.definition.NamespacedType(['geometry_msgs', 'msg'], 'Pose'),  # noqa: E501
        rosidl_parser.definition.UnboundedSequence(rosidl_parser.definition.UnboundedString()),  # noqa: E501
        rosidl_parser.definition.UnboundedSequence(rosidl_parser.definition.NamespacedType(['geometry_msgs', 'msg'], 'Pose')),  # noqa: E501
    )

    def __init__(self, **kwargs):
        assert all('_' + key in self.__slots__ for key in kwargs.keys()), \
            'Invalid arguments passed to constructor: %s' % \
            ', '.join(sorted(k for k in kwargs.keys() if '_' + k not in self.__slots__))
        from geometry_msgs.msg import Pose
        self.camera_pose = kwargs.get('camera_pose', Pose())
        self.model_name = kwargs.get('model_name', [])
        self.model_pose = kwargs.get('model_pose', [])

    def __repr__(self):
        typename = self.__class__.__module__.split('.')
        typename.pop()
        typename.append(self.__class__.__name__)
        args = []
        for s, t in zip(self.__slots__, self.SLOT_TYPES):
            field = getattr(self, s)
            fieldstr = repr(field)
            # We use Python array type for fields that can be directly stored
            # in them, and "normal" sequences for everything else.  If it is
            # a type that we store in an array, strip off the 'array' portion.
            if (
                isinstance(t, rosidl_parser.definition.AbstractSequence) and
                isinstance(t.value_type, rosidl_parser.definition.BasicType) and
                t.value_type.typename in ['float', 'double', 'int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64']
            ):
                if len(field) == 0:
                    fieldstr = '[]'
                else:
                    assert fieldstr.startswith('array(')
                    prefix = "array('X', "
                    suffix = ')'
                    fieldstr = fieldstr[len(prefix):-len(suffix)]
            args.append(s[1:] + '=' + fieldstr)
        return '%s(%s)' % ('.'.join(typename), ', '.join(args))

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        if self.camera_pose != other.camera_pose:
            return False
        if self.model_name != other.model_name:
            return False
        if self.model_pose != other.model_pose:
            return False
        return True

    @classmethod
    def get_fields_and_field_types(cls):
        from copy import copy
        return copy(cls._fields_and_field_types)

    @property
    def camera_pose(self):
        """Message field 'camera_pose'."""
        return self._camera_pose

    @camera_pose.setter
    def camera_pose(self, value):
        if __debug__:
            from geometry_msgs.msg import Pose
            assert \
                isinstance(value, Pose), \
                "The 'camera_pose' field must be a sub message of type 'Pose'"
        self._camera_pose = value

    @property
    def model_name(self):
        """Message field 'model_name'."""
        return self._model_name

    @model_name.setter
    def model_name(self, value):
        if __debug__:
            from collections.abc import Sequence
            from collections.abc import Set
            from collections import UserList
            from collections import UserString
            assert \
                ((isinstance(value, Sequence) or
                  isinstance(value, Set) or
                  isinstance(value, UserList)) and
                 not isinstance(value, str) and
                 not isinstance(value, UserString) and
                 all(isinstance(v, str) for v in value) and
                 True), \
                "The 'model_name' field must be a set or sequence and each value of type 'str'"
        self._model_name = value

    @property
    def model_pose(self):
        """Message field 'model_pose'."""
        return self._model_pose

    @model_pose.setter
    def model_pose(self, value):
        if __debug__:
            from geometry_msgs.msg import Pose
            from collections.abc import Sequence
            from collections.abc import Set
            from collections import UserList
            from collections import UserString
            assert \
                ((isinstance(value, Sequence) or
                  isinstance(value, Set) or
                  isinstance(value, UserList)) and
                 not isinstance(value, str) and
                 not isinstance(value, UserString) and
                 all(isinstance(v, Pose) for v in value) and
                 True), \
                "The 'model_pose' field must be a set or sequence and each value of type 'Pose'"
        self._model_pose = value
