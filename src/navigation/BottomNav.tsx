import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AntIcon from 'react-native-vector-icons/AntDesign';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../features/home';
import Upload from '../features/upload';
import Profile from '../features/profile';
import SignIn from '../features/auth/Signin';
import SignUp from '../features/auth/Signup';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="home-pg">
      <Stack.Screen
        name="home-pg"
        options={{headerShown: false}}
        component={Home}
      />
    </Stack.Navigator>
  );
}

function UploadStack() {
  return (
    <Stack.Navigator initialRouteName="upload-pg">
      <Stack.Screen
        name="upload-pg"
        options={{headerShown: false}}
        component={Upload}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="profile-pg">
      <Stack.Screen
        name="profile-pg"
        options={{headerShown: false}}
        component={Profile}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="signin-screen"
        options={{headerShown: false}}
        component={SignIn}
      />
      <Stack.Screen
        name="signup-screen"
        options={{headerShown: false}}
        component={SignUp}
      />
    </Stack.Navigator>
  );
}

const renderIcon = (iconName, size, color) => (
  <AntIcon name={iconName} size={size} color={color} />
);

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        headerBackgroundContainerStyle: {
          backgroundColor: 'red',
        },
        tabBarStyle: {
          height: 64,
          paddingTop: 8,
          paddingBottom: 6,
          margin: 18,
          elevation: 2,
          position: 'absolute',
          borderRadius: 38,
        },
        tabBarLabelStyle: {fontSize: 12},
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name === 'upload') {
            iconName = 'upload';
          } else if (route.name === 'profile') {
            iconName = 'profile';
          }
          return renderIcon(iconName, size, color);
        },
        tabBarActiveTintColor: '#351c75',
        tabBarInactiveTintColor: '#dbd6d6',
      })}>
      <Tab.Screen
        name="home"
        options={{headerShown: false}}
        component={HomeStack}
      />
      <Tab.Screen
        name="upload"
        options={{headerShown: false}}
        component={UploadStack}
      />
      <Tab.Screen
        name="profile"
        options={{headerShown: false}}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

const BottomNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppTabs"
        options={{headerShown: false}}
        component={AppTabs}
      />
      {/* <Stack.Screen
        name="livestream"
        options={{
          headerTransparent: true,
          headerTintColor: '#fff',
        }}
        component={LiveStream}
      /> */}
    </Stack.Navigator>
  );
};

export default BottomNav;
