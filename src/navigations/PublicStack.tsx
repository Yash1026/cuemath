import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PathNames} from '@cuemath/constants/pathNames';
import WelcomeScreen from '@cuemath/modules/auth/screens/welcome';
import LoginScreen from '@cuemath/modules/auth/screens/login';
import SignupScreen from '@cuemath/modules/auth/screens/signup';
import {SafeAreaView} from 'react-native';

const Stack = createStackNavigator();

const PublicStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={PathNames.welcomeScreen}
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={PathNames.loginScreen}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={PathNames.signupScreen}
          component={SignupScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default PublicStack;
