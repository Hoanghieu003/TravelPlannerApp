import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import RootStore from '../Stores/RootStore';

@observer
class PText extends Component<TextProps> {
  render() {
    return (
      <Text
        {...this.props}
        style={StyleSheet.flatten([
          this.props.style,
          {
            fontFamily:
              RootStore.language === 'en' || RootStore.language === 'vi'
                ? 'Raleway-Regular'
                : 'Roboto',
          },
        ])}>
        {this.props.children}
      </Text>
    );
  }
}

export default PText;
