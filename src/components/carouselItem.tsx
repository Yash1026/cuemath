import React, {forwardRef, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {getDeviceWidth} from '@cuemath/utils';
import {Colors} from '@cuemath/constants/colors';
import Pagination from './pagination';

const CarouselItem = forwardRef((props: any, ref: any) => {
  const {data, activeIndex, handleClick} = props;
  const [clickCount, setClickCount] = useState(0);
  const totalFrames = data.lottieFile.op;

  const getFrameFromPercentage = (percentage: number) => {
    return Math.round((percentage / 100) * totalFrames);
  };
  const updateClickCount = () => {
    if (activeIndex == 1) {
      console.log(33 * clickCount, 33 * (clickCount + 1), 'frames');
      ref.current.play(
        getFrameFromPercentage(33 * clickCount),
        getFrameFromPercentage(33 * (clickCount + 1)),
      );
      setClickCount(clickCount == 3 ? 0 : clickCount + 1);
    }
    handleClick();
  };
  return (
    <TouchableWithoutFeedback onPress={updateClickCount}>
      <LottieView
        ref={ref}
        source={data.lottieFile}
        autoPlay={data.autoPlay}
        loop={data.loop}
        style={{width: getDeviceWidth(), height: 380}}
      />
    </TouchableWithoutFeedback>
  );
});

export default CarouselItem;

const styles = StyleSheet.create({});
