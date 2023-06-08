import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '../components/atoms/Loading';
import {useAuth} from '../contexts/auth';
import SignIn from '../features/auth/Signin';
import BottomNav from './BottomNav';

export const AuthNav = () => {
  const {authData, loading} = useAuth();
  if (loading) {
    return <Loading size={'large'} colour="#999999" />;
  }
  return (
    <NavigationContainer>
      {authData ? <SignIn /> : <BottomNav />}
    </NavigationContainer>
  );
};
