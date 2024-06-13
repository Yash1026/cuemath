import AuthHeader from '@cuemath/components/authHeader';
import PrimaryButton from '@cuemath/components/primaryButton';
import {Colors} from '@cuemath/constants/colors';
import {PathNames} from '@cuemath/constants/pathNames';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WelcomeScreen = (props: any) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <AuthHeader size={'LARGE'} />
        <View style={styles.ctaContainer}>
          <PrimaryButton
            onPress={() => {
              navigation.navigate(PathNames.signupScreen);
            }}
            textStyles={styles.black}
            ctaStyle={styles.signupCta}
            title={'Signup'}
          />

          <PrimaryButton
            onPress={() => {
              navigation.navigate(PathNames.loginScreen);
            }}
            textStyles={styles.white}
            title={'Login'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black.primary,
    flex: 1,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    marginTop: '40%',
  },
  ctaContainer: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 20,
    justifyContent: 'space-between',
  },
  signupCta: {
    backgroundColor: Colors.white.primary,
  },
  white: {
    color: Colors.white.primary,
  },
  black: {
    color: Colors.black.primary,
  },
});
