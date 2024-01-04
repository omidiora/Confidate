import React, {Component} from 'react';
import {
  Dimensions,
  Platform,
  PixelRatio,
  KeyboardAvoidingView,
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
import Toast from 'react-native-toast-message';
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
const heightScale = SCREEN_HEIGHT / 568;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function normalizeHeight(size) {
  const newSize = size * heightScale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function getStatusBarStyle() {
  if (Platform.OS === 'android') {
    return 'dark-content';
  }
  return 'dark-content';
}

export function getStatusBarStyleOnLogin() {
  if (Platform.OS === 'android') {
    return 'light-content';
  }
  return 'dark-content';
}

export const distance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function isValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function Message(type, message) {
  console.log(',,', type, message);
  Toast.show({
    type: type == null ? 'success' : type,
    position: 'top',
    text2: message,
    text2Style: {color: '#000', fontSize: 14},
    // autoHide: false,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
  });
}
export function MessageAction(type, message, suceess) {
  console.log(',,123', type, message, suceess);
  Toast.show({
    type: type == null ? 'success' : type,
    position: 'top',
    text2: message,
    text2Style: {color: '#000', fontSize: 14},
    // autoHide: false,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {
      suceess();
      Toast.hide();
    },
  });
}

export const KeyboardAvoidingViewIos = ({children}) => {
  return Platform.OS == 'ios' ? (
    <KeyboardAvoidingView behavior={'padding'}>{children}</KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};
