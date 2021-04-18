import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { HEIGHT_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';
import PText from './PText';

export default class TabBarIcon extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={this.props.icon}
          resizeMode="contain"
          style={{
            width: this.props.size,
            height: this.props.size,
            marginTop: 10 * HEIGHT_SCALE_RATIO,
            tintColor: this.props.focused ? COLOR.GREY80 : '#00000020',
          }}
        />
        <PText
          style={[
            style.textCaption,
            {
              fontSize: style.textCaption.fontSize - 2,
              textAlign: 'center',
              color: this.props.focused ? COLOR.PRIMARY : COLOR.appTextPlaceholderColor,
            },
          ]}>
          {this.props.title}
        </PText>
      </View>
    );
  }
}

TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  focusImage: PropTypes.number,
  defaultImage: PropTypes.number,
  width: PropTypes.number,
  title: PropTypes.string,
};
