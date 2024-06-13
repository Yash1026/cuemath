import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '@cuemath/constants/colors';

interface Props {
  title: string;
  onPress: () => void;
  textStyle: TextStyle;
  ctaStyle: ViewStyle;
  ctaWrapperStyle: ViewStyle;
  disabled: boolean;
}

const PrimaryButton = (props: any) => {
  const {
    title,
    onPress,
    textStyles,
    ctaStyle,
    ctaWrapperStyle,
    disabled = false,
  } = props;
  return (
    <View style={[styles.flexWrapper, ctaWrapperStyle]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.loginCta, ctaStyle]}>
        <Text style={[styles.ctaText, textStyles]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  loginCta: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.white.primary,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  ctaText: {
    textAlign: 'center',
  },
  flexWrapper: {flex: 1},
});
