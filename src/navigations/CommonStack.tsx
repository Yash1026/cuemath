import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PathNames} from '@cuemath/constants/pathNames';
import WelcomeScreen from '@cuemath/modules/auth/screens/welcome';
import HomeScreen from '@cuemath/modules/home/screens/home';
import {setCurrentUser} from '@cuemath/redux/slices/authSlice';
import EncryptedStorage from 'react-native-encrypted-storage';

const Stack = createStackNavigator();

const CommonStack = () => {
  useEffect(() => {
    async function setUser() {
      const currentUser = await EncryptedStorage.getItem('currentUser');
      setCurrentUser(currentUser);
    }
    setUser();
  }, []);
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={PathNames.homeScreen}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default CommonStack;
