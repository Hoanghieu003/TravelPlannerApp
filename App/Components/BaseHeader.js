import React, { Fragment } from 'react';
import { Image, View } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, iconSize } from '../Constants/styles';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';

class BaseHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderIcon = this.renderIcon.bind(this);
    this.onRightPress = this.onRightPress;
  }

  componentWillUnmount() {
    clearTimeout(this.onLeftPressTimeout);
    clearTimeout(this.onRightPressTimeout);
  }

  renderIcon(type, icon, styles) {
    if (type === 'Ionicons') {
      return (
        <Ionicons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={[style.icon, styles]}
          color={COLOR.appColor}
        />
      );
    }
    if (type === 'MaterialIcons') {
      return (
        <MaterialIcons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={[style.icon, styles]}
          color={COLOR.appColor}
        />
      );
    }
    if (type === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={[style.icon, styles]}
          color={COLOR.appColor}
        />
      );
    }
    if (type === 'Feather') {
      return (
        <Feather
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={[style.icon, styles]}
          color={COLOR.appColor}
        />
      );
    }
    if (type === 'Entypo') {
      return (
        <Entypo
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={[style.icon, styles]}
          color={COLOR.appColor}
        />
      );
    }
    if (type === 'SimpleLineIcons') {
      return (
        <SimpleLineIcons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={[style.icon, styles]}
          color={COLOR.appColor}
        />
      );
    }
    if (type === 'Image') {
      return (
        <Image
          source={icon}
          style={[
            {
              width: iconSize,
              height: iconSize,
            },
            styles,
          ]}
          resizeMode="contain"
        />
      );
    }
    return <View style={{ width: iconSize, height: iconSize }} />;
  }

  render() {
    const {
      hideBackButton,
      children,
      leftIcon,
      leftIconType,
      onLeftPress,

      rightIcon,
      rightIconType,
      onRightPress,
      leftIconStyle,
      rightIconStyle,
      btnRightDisabled,
      btnRightStyle,
      btnLeftStyle,

      rightIcon2,
      rightIconType2,
      onRightPress2,
      btnRightDisabled2,
      rightIconStyle2,
      btnRightStyle2,

      rightIcon3,
      rightIconType3,
      onRightPress3,
      btnRightDisabled3,
      rightIconStyle3,
      btnRightStyle3,
      rightIconMenu,

      styleContent,
      noShadow,
      notifications,
    } = this.props;
    if (this.props.isSearch) {
      return (
        <View
          style={[
            style.header,
            styleContent,
            noShadow ? { shadowOpacity: 0, shadowRadius: 0 } : {},
            {
              backgroundColor: 'transparent',
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              paddingTop: 6 * HEIGHT_SCALE_RATIO,
            }}>
            {children}
          </View>
        </View>
      );
    }
    return (
      <View
        style={[style.header, styleContent, noShadow ? { shadowOpacity: 0, shadowRadius: 0 } : {}]}>
        {leftIcon ? (
          <MyTouchableOpacity
            onPress={onLeftPress}
            style={[
              btnLeftStyle,
              {
                paddingHorizontal: 13 * WIDTH_SCALE_RATIO,
                paddingLeft: 16 * WIDTH_SCALE_RATIO,
              },
            ]}>
            {this.renderIcon(leftIconType, leftIcon, leftIconStyle)}
          </MyTouchableOpacity>
        ) : hideBackButton ? (
          <Fragment />
        ) : (
          <View
            style={{
              paddingHorizontal: 13 * WIDTH_SCALE_RATIO,
              paddingLeft: 16 * WIDTH_SCALE_RATIO,
            }}>
            <Feather name="chevron-left" size={iconSize} color="transparent" />
          </View>
        )}

        <View style={{ flex: 1 }}>{children}</View>

        {rightIcon || rightIcon || rightIcon2 || rightIcon3 || rightIconMenu ? null : (
          <View style={{ paddingHorizontal: 13 * WIDTH_SCALE_RATIO }}>
            <Feather name="arrow-right" size={iconSize} color="transparent" />
          </View>
        )}

        {rightIcon ? (
          <View>
            <MyTouchableOpacity
              disabled={btnRightDisabled}
              onPress={onRightPress}
              style={[btnRightStyle, { paddingHorizontal: 13 * WIDTH_SCALE_RATIO }]}>
              {this.renderIcon(rightIconType, rightIcon, rightIconStyle)}
              {notifications > 0 ? (
                <View
                  style={{
                    left: 38,
                    bottom: 17,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: COLOR.appColor,
                  }}>
                  <PText style={{ color: 'white' }}>{notifications}</PText>
                </View>
              ) : null}
            </MyTouchableOpacity>
          </View>
        ) : null}

        {rightIcon2 ? (
          <MyTouchableOpacity
            disabled={btnRightDisabled2}
            onPress={onRightPress2}
            style={btnRightStyle2 || { paddingRight: iconSize }}>
            {this.renderIcon(rightIconType2, rightIcon2, rightIconStyle2)}
          </MyTouchableOpacity>
        ) : null}

        {rightIcon3 ? (
          <MyTouchableOpacity
            disabled={btnRightDisabled3}
            onPress={onRightPress3}
            style={btnRightStyle3 || { paddingRight: iconSize }}>
            {this.renderIcon(rightIconType3, rightIcon3, rightIconStyle3)}
          </MyTouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export default BaseHeader;
