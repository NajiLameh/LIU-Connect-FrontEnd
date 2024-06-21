import { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './src/util/AuthContext';
import './src/assets/icons/FontAwesomIcons/FontAwesomeIcons';

import LoginNavigationFlow from './src/navigation/LoginNavigationFlow';
import MainScreensNavigationFlow from './src/navigation/MainScreensNavigationFlow';

import Onboarding from './src/screens/onboarding/Onboarding';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const endFirstLaunch = () => {
    setFirstLaunch(false);
  };
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const AppFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('firstLaunch');
      if (value === null) {
        AsyncStorage.setItem('firstLaunch', 'false');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    } catch (error) {
      console.error('Onboarding AsyncStorage error:', error);
    }
  };
  const UserLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      if (value === null) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Login AsyncStorage error:', error);
    }
  };
  useEffect(() => {
    AppFirstLaunch();
    UserLoggedIn();
  }, []);

  const userID = async () => {
    return await AsyncStorage.getItem('userID');
  };

  if (firstLaunch === null || isLoggedIn === null) {
    return;
  } else if (firstLaunch) {
    return <Onboarding endFirstLaunch={endFirstLaunch} />;
  } else {
    if (isLoggedIn) {
      return (
        <>
          <StatusBar backgroundColor="white" />
          <AuthContext.Provider value={{ logoutHandler, userID }}>
            <NavigationContainer theme={MyTheme}>
              <MainScreensNavigationFlow />
            </NavigationContainer>
          </AuthContext.Provider>
        </>
      );
    } else {
      return (
        <AuthContext.Provider value={{ loginHandler, setFirstLaunch }}>
          <NavigationContainer theme={MyTheme}>
            <LoginNavigationFlow />
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
  }
}
