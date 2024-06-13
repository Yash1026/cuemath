import React, {useCallback, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '@cuemath/components/header';
import {Colors} from '@cuemath/constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '@cuemath/redux/store';
import Carousel from 'react-native-reanimated-carousel';
import {getDeviceWidth} from '@cuemath/utils';
import {LottieData} from '@cuemath/utils/helperData';
import CarouselItem from '@cuemath/components/carouselItem';
import Pagination from '@cuemath/components/pagination';
import FSBottomSheet from '@cuemath/components/bottomSheet';
import BottomSheet, {
  BottomSheetView,
  useBottomSheet,
} from '@gorhom/bottom-sheet';

const HomeScreen = (props: any) => {
  const {currentUser} = useSelector((state: RootState) => state.auth);
  const [activeItem, setActiveItem] = useState({
    data: LottieData[0],
    index: 0,
  });
  const lottieReffs = [React.createRef(), React.createRef(), React.createRef()];

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleLottieClick = useCallback(
    (clickCount: number) => {
      switch (activeItem.index) {
        case 0:
          bottomSheetRef.current?.expand();
          break;
        case 1:
          break;
        case 2:
          //Can navigate to WEbView from here
          console.log('2 clicked');
          break;
      }
    },
    [activeItem],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={currentUser.email}
        ctaText={'Logout'}
        ctaTextStyle={styles.ctaText}
        onCTAClick={() => {}}
      />
      <View style={{height: 400}}>
        <Carousel
          loop={false}
          scrollAnimationDuration={500}
          width={getDeviceWidth()}
          data={LottieData}
          renderItem={({item, index}) => {
            return (
              <CarouselItem
                data={item}
                handleClick={handleLottieClick}
                ref={lottieReffs[index]}
                activeIndex={activeItem.index}
              />
            );
          }}
          onSnapToItem={index =>
            setActiveItem({data: LottieData[index], index: index})
          }
        />
      </View>
      <Pagination activeIndex={activeItem.index} />
      <Text style={styles.carouselText}>{activeItem.data.text}</Text>

      <TouchableOpacity
        style={styles.bottomSheetHandler}
        onPress={() => {
          bottomSheetRef.current?.expand();
        }}>
        <Text style={styles.bottonSheetHandlerText}>Bottom Sheet</Text>
      </TouchableOpacity>

      <FSBottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black.primary,
    flex: 1,
  },
  ctaText: {color: Colors.grey.primary},
  bottomSheetHandler: {
    backgroundColor: Colors.black.shade1,
    paddingTop: 20,
    height: 600,
    width: getDeviceWidth() + 250,
    borderRadius: 280,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -520,
    borderWidth: 1,
    borderColor: Colors.white.primary,
  },
  bottonSheetHandlerText: {color: '#fff', fontSize: 18},
  carouselText: {
    color: Colors.white.primary,
    textAlign: 'center',
    paddingHorizontal: '10%',
    marginTop: 20,
    fontSize: 16,
  },
});
