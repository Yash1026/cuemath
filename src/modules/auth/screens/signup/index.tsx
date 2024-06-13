import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '@cuemath/constants/colors';
import {KeyboardTypeOptions} from 'react-native';
import AuthHeader from '@cuemath/components/authHeader';
import PrimaryButton from '@cuemath/components/primaryButton';
import {validateWithRegex} from '@cuemath/utils';
import {setUserLoggedIn} from '@cuemath/redux/slices/authSlice';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import {PathNames, StackNames} from '@cuemath/constants/pathNames';

interface InputField {
  placeHolderText: string;
  identifier: string;
  keyboardType?: KeyboardTypeOptions;
  type: string;
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
  {
    placeHolderText: 'Confirm Password',
    identifier: 'confirmPassword',
    type: 'text',
  },
  {
    placeHolderText: 'First Name',
    identifier: 'name',
    type: 'text',
  },
  {
    placeHolderText: 'Age',
    identifier: 'age',
    keyboardType: 'numeric',
    type: 'text',
  },
];

const SignupScreen = (props: any) => {
  const [detailsForm, setDetailsForm] = useState<{[key: string]: any}>({});
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();
  const handleChange = (value: string, identifier: string) => {
    setErrorMsg('');
    setDetailsForm((prev: any) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    const isValid = validateForm();

    if (isValid) {
      let userList = await EncryptedStorage.getItem('userList');
      console.log('userList from storage', userList);
      if (userList == undefined) {
        await EncryptedStorage.setItem(
          'userList',
          JSON.stringify([detailsForm]),
        );
      } else {
        let userListArr = JSON.parse(userList);
        userListArr.push(detailsForm);
        await EncryptedStorage.setItem('userList', JSON.stringify(userListArr));
      }
      navigation.navigate(PathNames.loginScreen);
    }
  }, [detailsForm]);

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
      case 'confirmPassword':
        let passwordMatches = value == detailsForm['password'];
        if (passwordMatches) {
          return {
            valid: validateWithRegex(/^.{8,}$/, value),
            errorMsg: 'Password length should be greater than 8',
          };
        } else {
          return {
            valid: false,
            errorMsg: 'Password doesn not match',
          };
        }

      case 'name':
      case 'age':
        return {
          valid: true,
          errorMsg: '',
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
    if (Object.keys(detailsForm).length < inputFields.length) {
      return false;
    }
    for (const field of Object.keys(detailsForm)) {
      const {valid, errorMsg} = validateField(field, detailsForm[field]);
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
              value={detailsForm[field.identifier]}
              placeholder={field.placeHolderText}
              placeholderTextColor={Colors.grey.primary}
              keyboardType={field.keyboardType || 'default'}
            />
          );
        })}
      </View>
      <View>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <PrimaryButton
          onPress={handleSubmit}
          disabled={false}
          title="Create Account"
          ctaStyle={styles.cta}
          ctaWrapperStyle={styles.ctaWrapperStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SignupScreen);
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
