import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './src/navigation/BottomNav';

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

export default App;
