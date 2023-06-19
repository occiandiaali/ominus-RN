import {ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = ({size, colour}) => {
  return <ActivityIndicator size={size} color={colour} />;
};

export default Loading;
