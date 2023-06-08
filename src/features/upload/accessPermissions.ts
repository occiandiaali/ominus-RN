import {PermissionsAndroid, Platform} from 'react-native';

const reqCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.Camera,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
          buttonPositive: 'Positive',
        },
      );
      return granted === PermissionsAndroid.RESULTS.granted;
    } catch (error) {
      console.log('Android permission err ', error);
      return false;
    }
  } else {
    return true;
  }
};

const reqExtWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs write permission',
          buttonPositive: 'Positive',
        },
      );
      return granted === PermissionsAndroid.RESULTS.granted;
    } catch (error) {
      console.log('Android permission err ', error);
      return false;
    }
  } else {
    return true;
  }
};

export {reqCameraPermission, reqExtWritePermission};
