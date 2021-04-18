import React from 'react';
import { View } from 'react-native';
import style from '../Constants/styles';

export default class HeightBottomBar extends React.PureComponent {
  render() {
    return <View style={{ height: style.paddingBottomTabbar.paddingBottom + 20 }} />;
  }
}
