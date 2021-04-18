import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR } from '../Constants/styles';

const Divider = ({ style, ...rest }) => (
  <View style={StyleSheet.flatten([styles, style])} {...rest} />
);

const styles = {
  height: StyleSheet.hairlineWidth + 1,
  backgroundColor: COLOR.appBorderColor,
};

export default Divider;
