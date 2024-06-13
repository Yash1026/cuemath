import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@cuemath/redux/store';
import EncryptedStorage from 'react-native-encrypted-storage';
import PublicStack from './PublicStack';
import {StackNames} from '@cuemath/constants/pathNames';
import CommonStack from './CommonStack';
import {setCurrentUser} from '@cuemath/redux/slices/authSlice';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '@cuemath/constants/colors';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [loading, setLoading] = useState(true);
  const {currentUser} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   EncryptedStorage.clear();
  // }, []);

  const checkUserLoginStatus = async () => {
    let currentUser: any = await EncryptedStorage.getItem('currentUser');

    if (!!currentUser) {
      dispatch(setCurrentUser(JSON.parse(currentUser)));
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator color={Colors.brandYellow} size={'large'} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            !!currentUser ? StackNames.commonStack : StackNames.publicStack
          }>
          <Stack.Screen
            options={{headerShown: false}}
            name={StackNames.publicStack}
            component={PublicStack}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={StackNames.commonStack}
            component={CommonStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,

    backgroundColor: Colors.black.primary,
    justifyContent: 'center',
  },
});
