import firebase from '@react-native-firebase/app';
import {Platform} from 'react-native';

const androidCredentials = {
  appId: '',
  apiKey: '',
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
