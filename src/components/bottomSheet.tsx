import React, {forwardRef, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Colors} from '@cuemath/constants/colors';

const FSBottomSheet = forwardRef((props: any, ref: any) => {
  return (
    <BottomSheet
      snapPoints={[Dimensions.get('window').height]}
      ref={ref}
      enablePanDownToClose
      index={-1}
      backgroundStyle={{
        backgroundColor: Colors.black.primary,
      }}
      //   onChange={handleSheetChanges}
    >
      <BottomSheetView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.text}>
          This is a <Text style={styles.bold}>bottom sheet</Text>, launched by
          tapping the lottie or swiping up
        </Text>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default FSBottomSheet;

const styles = StyleSheet.create({
  webViewContainer: {
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  webView: {
    flex: 1,
  },
  bold: {
    fontWeight: '900',
  },
  text: {
    color: Colors.white.primary,
    textAlign: 'center',
    paddingHorizontal: 25,
  },
});
