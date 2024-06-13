import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Colors} from '@cuemath/constants/colors';

const Pagination = (props: any) => {
  const {activeIndex} = props;
  return (
    <View style={styles.pagination}>
      {[0, 1, 2].map(num => {
        return (
          <View
            key={num}
            style={[
              styles.dot,
              activeIndex === num ? {backgroundColor: Colors.brandYellow} : {},
            ]}></View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white.primary,
  },
  pagination: {
    flexDirection: 'row',
    width: 50,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
  },
});
