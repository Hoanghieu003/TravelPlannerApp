import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Spinner } from 'native-base';

import RootStore from '../Stores/RootStore';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class CustomSpinner extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (!RootStore.spinner) {
      return null;
    }

    const height = deviceHeight / 2 - 25;
    return (
      <View
        style={{
          width: deviceWidth,
          height: deviceHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}>
        <Spinner color="#00afa0" style={{ marginTop: height }} />
      </View>
    );
  }
}
