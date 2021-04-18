import React from 'react';
import { Actions } from 'react-native-router-flux';
import style, { COLOR } from '../Constants/styles';
import BaseHeader from './BaseHeader';
import PText from './PText';
import { ICON } from '../../asset/image/ImagePath';

class BaseHeaderApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickGoBack = this.onClickGoBack.bind(this);
  }
  onClickGoBack() {
    if (!this.props.disabled) {
      Actions.pop();
    }
  }

  render() {
    const { title, isClose, color, shadow, notifications } = this.props;
    if (isClose) {
      return (
        <BaseHeader
          noShadow={!shadow}
          leftIconType="Image"
          leftIcon={ICON.BACK_ICON}
          onLeftPress={this.onClickGoBack}
          leftIconStyle={[
            {
              tintColor: color || COLOR.appTextColor,
            },
            this.props.leftIconStyle,
          ]}
          children={
            <PText
              style={[
                style.textHeader,
                {
                  color: color || COLOR.appColor,
                  textAlign:
                    this.props.style && this.props.style.textAlign
                      ? this.props.style.textAlign
                      : 'center',
                },
              ]}
              numberOfLines={1}>
              {title}
            </PText>
          }
          rightIconType="Image"
          rightIcon={ICON.CLOSE_ICON}
          rightIconStyle={[
            {
              tintColor: color || COLOR.appTextColor,
            },
            this.props.rightIconStyle,
          ]}
          {...this.props}
        />
      );
    }
    return (
      <BaseHeader
        notifications={notifications}
        noShadow={!shadow}
        leftIconType="Image"
        leftIcon={ICON.BACK_ICON}
        leftIconStyle={[
          {
            tintColor: color || COLOR.appTextColor,
          },
          this.props.leftIconStyle,
        ]}
        onLeftPress={this.onClickGoBack}
        rightIconType="Image"
        rightIcon={this.props.hideNoti ? null : ICON.NOTIFICATION_ICON}
        rightIconStyle={[
          {
            tintColor: color || COLOR.appTextColor,
          },
          this.props.rightIconStyle,
        ]}
        rightIconType2="Image"
        rightIcon2={ICON.SETTING_ICON}
        rightIconStyle2={[
          {
            tintColor: color || COLOR.appTextColor,
          },
          this.props.rightIconStyle2,
        ]}
        {...this.props}
      />
    );
  }
}

export default BaseHeaderApp;
