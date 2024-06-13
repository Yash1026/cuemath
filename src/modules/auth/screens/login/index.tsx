import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '@cuemath/constants/colors';
import {KeyboardTypeOptions} from 'react-native';
import AuthHeader from '@cuemath/components/authHeader';
import PrimaryButton from '@cuemath/components/primaryButton';
import {validateWithRegex} from '@cuemath/utils';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import {PathNames, StackNames} from '@cuemath/constants/pathNames';
import {setCurrentUser} from '@cuemath/redux/slices/authSlice';
import {useDispatch} from 'react-redux';

interface InputField {
  placeHolderText: string;
  identifier: string;
  keyboardType?: KeyboardTypeOptions;
  type: string;
  validationRegex?: RegExp;
}

const inputFields: InputField[] = [
  {
    placeHolderText: 'Email ID',
    identifier: 'email',
    type: 'text',
  },
  {
    placeHolderText: 'Password',
    identifier: 'password',
    type: 'text',
  },
];

const LoginScreen = (props: any) => {
  const [loginForm, setLoginForm] = useState<{[key: string]: any}>({});
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();
  const disptach = useDispatch();
  const handleChange = (value: string, identifier: string) => {
    setLoginForm((prev: any) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    const isValid = validateForm();
    if (isValid) {
      let userList = await EncryptedStorage.getItem('userList');
      console.log(userList);
      if (userList == undefined) {
        setErrorMsg('User List not stored, Please Sign Up');
      } else {
        let userListArr = JSON.parse(userList);

        if (userListArr.some((user: any) => user.email == loginForm.email)) {
          let user = userListArr.find(
            (user: any) => user.email == loginForm.email,
          );
          if (user.password == loginForm.password) {
            await EncryptedStorage.setItem('currentUser', JSON.stringify(user));
            disptach(setCurrentUser(user));
            navigation.navigate(StackNames.commonStack);
          } else {
            setErrorMsg('Icorrect Password');
          }
        } else {
          setErrorMsg('User Not found, Please Sign Up');
        }
      }
    }
  }, [loginForm]);

  const validateField = (
    fieldIdentifier: string,
    value: string,
  ): {valid: boolean; errorMsg: string} => {
    switch (fieldIdentifier) {
      case 'email':
        return {
          valid: validateWithRegex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            value,
          ),
          errorMsg: 'Enter Valid Email Address',
        };
      case 'password':
        return {
          valid: validateWithRegex(/^.{8,}$/, value),
          errorMsg: 'Password length should be greater than 8',
        };

      default:
        return {
          valid: false,
          errorMsg: '',
        };
    }
  };

  const validateForm = () => {
    let isValid = true;
    for (const field of Object.keys(loginForm)) {
      const {valid, errorMsg} = validateField(field, loginForm[field]);
      if (!valid) {
        isValid = false;
        setErrorMsg(errorMsg);
        break;
      }
    }
    return isValid;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <AuthHeader size="SMALL" />
        {inputFields.map((field, index) => {
          return (
            <TextInput
              style={styles.input}
              onChangeText={value => handleChange(value, field.identifier)}
              value={loginForm[field.identifier]}
              placeholder={field.placeHolderText}
              placeholderTextColor={Colors.grey.primary}
            />
          );
        })}
      </View>
      <View>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <PrimaryButton
          onPress={handleSubmit}
          title="Login"
          ctaStyle={styles.cta}
          ctaWrapperStyle={styles.ctaWrapperStyle}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoginScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black.primary,
    justifyContent: 'space-between',
  },
  input: {
    height: 60,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: Colors.white.shade1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 20,
    color: Colors.white.primary,
  },
  cta: {
    backgroundColor: Colors.white.primary,
    marginHorizontal: 14,
  },
  ctaWrapperStyle: {
    flex: 0,
  },
  errorText: {color: 'red', marginVertical: 12, textAlign: 'center'},
});
