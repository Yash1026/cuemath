import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '@cuemath/constants/colors';

const AuthHeader = (props: any) => {
  const {size} = props;

  const getFontSize = () => {
    switch (size) {
      case 'SMALL':
        return 35;
      case 'MEDIUM':
        return 40;
      case 'LARGE':
        return 50;
      default:
        return 35;
    }
  };
  return (
    <Text style={[styles.companyName, {fontSize: getFontSize()}]}>
      CUEMATH <Text style={{color: Colors.brandYellow}}>Go!</Text>
    </Text>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  companyName: {color: '#fff', textAlign: 'center'},
});
