import {PermissionsAndroid, Platform} from 'react-native';

async function requestCameraUsePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (
      granted['android.permission.CAMERA'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera use has been permitted..');
    } else {
      console.log('Camera use denied');
    }
  } catch (error) {
    console.log('Req cam use perm err: ', error);
  }
}

async function requestGalleryAccessPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Permitted to access gallery..');
    } else {
      console.log('Gallery access denied');
    }
  } catch (error) {
    console.log('Req gallery access perm err: ', error);
  }
}

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

export {
  reqCameraPermission,
  reqExtWritePermission,
  requestCameraUsePermission,
  requestGalleryAccessPermission,
};
