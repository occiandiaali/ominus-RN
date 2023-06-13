import firebase from '@react-native-firebase/app';
import {Platform} from 'react-native';

const androidCredentials = {
  appId: '1:861101010218:android:687a2449041bc48eee0253',
  apiKey: 'AIzaSyB2eHksQmCxepo3WbwlPdFds0_EAre1yok',
  storageBucket: 'ominus-rn-project.appspot.com',
  messagingSenderId: '',
  projectId: 'ominus-rn-project',
};

const iosCredentials = {
  clientId: '',
  appId: '',
  apiKey: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
  projectId: '',
};

const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});

const config = {
  name: 'SECONDARY_APP',
};

await firebase.initializeApp(credentials, config);
