import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './src/navigation/BottomNav';
//import { AuthProvider } from './src/contexts/auth';
//import { AuthNav } from './src/navigation/AuthNav';
// import {Provider} from 'react-redux';
// import {ApiProvider} from '@reduxjs/toolkit/dist/query/react';
// import {productsApi} from './src/redux/slices/apiSlice';
// import store from './src/redux/store';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <ApiProvider api={productsApi}>
//         <NavigationContainer>
//           <SafeAreaProvider>
//             <BottomNav />
//             <StatusBar hidden={true} />
//           </SafeAreaProvider>
//         </NavigationContainer>
//       </ApiProvider>
//     </Provider>
//   );
// };

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
