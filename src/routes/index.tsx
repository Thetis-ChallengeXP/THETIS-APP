import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import SplashScreen from '../screens/Splash/Splash';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import PasswordReset from '../screens/Auth/PasswordReset';
import Screens from '../screens/index';
import StockDetail from '../components/StockDetail/StockDetail';
import { AuthProvider } from '../contexts/AuthContextStorage';
import ChatBot from '../screens/ChatBot/ChatBot';
import Bookmark from '../screens/Bookmark/Bookmark';

import InvestorProfileController from '../screens/Auth/InvestorProfile/Steps/InvestorProfileController';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  InvestorProfile: {
    userToken: string;
    userData?: any;
  };
  PasswordReset: undefined;
  ChatBot: undefined;
  Home: undefined;
  BookMark: undefined;
  StockDetail: {
    stock: {
      id: string;
      symbol: string;
      name: string;
      price: string;
      change?: string;
      status?: string;
      trend: 'up' | 'down' | 'neutral';
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen
            name="InvestorProfile"
            component={InvestorProfileController}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordReset"
            component={PasswordReset}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={Screens} options={{ headerShown: false }} />
          <Stack.Screen
            name="StockDetail"
            component={StockDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
          <Stack.Screen name="BookMark" component={Bookmark} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default Routes;
