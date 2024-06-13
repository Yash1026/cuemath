import {Dimensions} from 'react-native';

export const validateWithRegex = (regex: RegExp, string: string) => {
  return regex.test(string);
};
export const getDeviceWidth = () => {
  return Dimensions.get('window').width;
};
