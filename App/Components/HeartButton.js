import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, DeviceEventEmitter, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ICON } from '../../asset/image/ImagePath';
import { WIDTH_SCALE_RATIO } from '../Constant/constant';
import { COLOR } from '../Constants/styles';
import LikeStore from '../Stores/LikeStore';
import RootStore from '../Stores/RootStore';
import MyTouchableOpacity from './MyTouchableOpacity';

@observer
class HeartButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickHeart = this.onClickHeart.bind(this);

    this.size = this.props.size ? this.props.size : 20 * WIDTH_SCALE_RATIO;
  }

  onClickHeart() {
    if (RootStore.auth.token === null || RootStore.auth.token === '') {
      Alert.alert(
        '',
        RootStore.i18n.t('global.require-login'),
        [
          {
            text: RootStore.i18n.t('global.close'),
          },
          {
            text: RootStore.i18n.t('global.login'),
            onPress: () => {
              Actions.jump('aboutStack');
            },
          },
        ],
        { cancelable: true },
      );
      return;
    }
    if (this.props.data) {
      if (this.onExecuteLikeUpdate) {
        clearTimeout(this.onExecuteLikeUpdate);
      }
      this.onExecuteLikeUpdate = setTimeout(() => {
        DeviceEventEmitter.emit('refreshMyPage', {});
        DeviceEventEmitter.emit('restartLikeInMap', {});
      }, 2000);

      if (this.props.isSpot) {
        LikeStore.onChangeLikeSpot(this.props.data);
      } else {
        LikeStore.onChangeLikeBlog(this.props.data);
      }
    }
    this.props.click(!this.props.isLike);
  }

  render() {
    let isLike = this.props.isLike;
    //* note: this here check for correctData
    // if (this.props.isSpot) {
    //   //version 4
    //   isLike =
    //     this.props.data &&
    //     LikeStore.getLikeSpotLists &&
    //     LikeStore.getLikeSpotLists[this.props.data.code];
    // } else {
    //   isLike =
    //     this.props.data &&
    //     LikeStore.getLikeBlogLists &&
    //     LikeStore.getLikeBlogLists[this.props.data.code];
    // }

    const styleArray = [{ backgroundColor: 'transparent' }];

    if (this.props.style) {
      styleArray.push(this.props.style);
    }

    styleArray.push({
      // elevation: 99999,
      borderWidth: 0,
      width: this.size + 4 * WIDTH_SCALE_RATIO,
      height: this.size + 4 * WIDTH_SCALE_RATIO,
      alignItems: 'center',
      justifyContent: 'center',
    });

    return (
      <MyTouchableOpacity onPress={this.onClickHeart} style={styleArray}>
        <Image
          source={isLike ? ICON.HEART_ICON : ICON.OUTLINE_HEART_ICON}
          style={{
            tintColor: !isLike ? COLOR.GREY20 : COLOR.PRIMARY,
            width: this.size,
            height: this.size,
          }}
          resizeMode="contain"
        />
      </MyTouchableOpacity>
    );
  }
}

HeartButton.propTypes = {
  isLike: PropTypes.bool,
  grey: PropTypes.bool,
  click: PropTypes.func,
  size: PropTypes.number,
};

export default HeartButton;
