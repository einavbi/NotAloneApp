import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator, AuthNavigator } from './Navigator';
import StartupScreen from '../screens/StartupScreen';
const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
     
        {isAuth && <Navigator />}
        {!isAuth && didTryAutoLogin && <AuthNavigator />}
        {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
