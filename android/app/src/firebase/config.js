import firebase from '@react-native-firebase/app';
import {Platform} from 'react-native';
import {API_TOKEN_FBASE, APP_ID} from '@env';

const androidCredentials = {
  appId: APP_ID,
  apiKey: API_TOKEN_FBASE,
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
