import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './src/navigation/BottomNav';
//import { AuthProvider } from './src/contexts/auth';
//import { AuthNav } from './src/navigation/AuthNav';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <BottomNav />
        <StatusBar hidden={true} />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

// const App = () => {
//   return (
//     <AuthProvider>
//       <SafeAreaProvider>
//       <AuthNav />
//       <StatusBar hidden={true} />
//       </SafeAreaProvider>
//     </AuthProvider>
//   )
// }

export default App;
