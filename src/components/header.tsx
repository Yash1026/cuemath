import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '@cuemath/constants/colors';

interface Props {
  title: string;
  ctaText: string;
  onCTAClick: () => void;
  titleStyle: TextStyle;
  ctaTextStyle: TextStyle;
}

const AuthHeader = (props: any) => {
  const {title, ctaText, onCTAClick, ctaTextStyle} = props;

  return (
    <View style={[styles.container]}>
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity onPress={onCTAClick}>
        <Text style={[styles.ctaText, ctaTextStyle]}>{ctaText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(AuthHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  titleText: {color: Colors.white.primary},
  ctaText: {color: Colors.white.primary},
});
