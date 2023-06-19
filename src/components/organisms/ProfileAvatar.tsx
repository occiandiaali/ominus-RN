import {Image, View} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';

const ProfileAvatarComponent = ({
  userImage,
  userImageStyle,
  isImageSet,
  avatarContainerStyle,
}) => {
  return (
    <View style={avatarContainerStyle}>
      {isImageSet ? (
        <Image source={userImage} style={userImageStyle} />
      ) : (
        <AntIcon name="adduser" size={80} />
      )}
    </View>
  );
};

export default ProfileAvatarComponent;
