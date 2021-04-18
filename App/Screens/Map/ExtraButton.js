import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { Alert, Image, PermissionsAndroid, Platform, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import MyTouchableOpacity from '../../Components/MyTouchableOpacity';
import PText from '../../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../../Constant/constant';
import style, { COLOR, heightBottomBar } from '../../Constants/styles';
import RootStore from '../../Stores/RootStore';
import { ICON } from '../../../asset/image/ImagePath';

export default class ExtraButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingCurrentLocation: false,
      swipeablePanelActive: false,
      currentSelectedCategory: null,
      showButtons: true,
    };
  }

  onClickButtonGps = async () => {
    await this.onClickCurrentPosition();
  };
  requestLocationPermission = async (onGranted = () => {}, onFailed = () => {}) => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted) {
        onGranted();
        return;
      }
    }
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(value => {
        if (value === RESULTS.GRANTED) {
          onGranted();
        } else if (value === RESULTS.DENIED) {
          this.requestLocationPermission();
        } else {
          onFailed();
        }
      })
      .catch(() => {
        onFailed();
      });
  };

  getLocation = (enableHighAccuracy = true) => {
    this.setState({ isLoadingCurrentLocation: true });
    Geolocation.getCurrentPosition(
      pos => {
        this.setState({ isLoadingCurrentLocation: false });
        if (this.props.onGetLocationDone) {
          this.props.onGetLocationDone(pos);
        }
      },
      () => {
        if (enableHighAccuracy) {
          setTimeout(() => {
            this.getLocation(false);
          }, 200);
        } else {
          this.setState({ isLoadingCurrentLocation: false });
          setTimeout(() => {
            Alert.alert(
              '',
              RootStore.i18n.t('map.request_turn_on_location_permission_failed'),
              [{ text: RootStore.i18n.t('global.close') }],
              { cancelable: true },
            );
          }, 1500);
        }
      },
      // {
      //   enableHighAccuracy,
      //   timeout: 5000,
      // },
    );
  };

  onClickCurrentPosition = async (isAutoNavigate = false) => {
    this.requestLocationPermission(
      async () => {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (!granted) {
            return;
          }
        }
        this.getLocation(true);
      },
      () => {
        this.setState({ isLoadingCurrentLocation: false });
        Alert.alert(
          '',
          RootStore.i18n.t('map.request_turn_on_location_permission'),
          [{ text: RootStore.i18n.t('global.close') }],
          { cancelable: true },
        );
      },
    );
  };

  closePanel = () => {
    this.setState({ showButtons: true });
    this.props.self.surroundingButtonRef?.setState({ swipeablePanelActive: false });
  };

  openPanel = () => {
    this.setState({ showButtons: false });
    this.props.self.surroundingButtonRef?.setState({ swipeablePanelActive: true });
  };

  render() {
    const { moveUpper } = this.props;

    if (!this.state.showButtons) {
      return <View />;
    }

    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 99,
          bottom: moveUpper
            ? 50 * HEIGHT_SCALE_RATIO + heightBottomBar + 120 * HEIGHT_SCALE_RATIO
            : 24 * HEIGHT_SCALE_RATIO + heightBottomBar,

          right: 20 * WIDTH_SCALE_RATIO,
        }}>
        <MyTouchableOpacity
          style={{
            width: 48 * WIDTH_SCALE_RATIO,
            height: 48 * WIDTH_SCALE_RATIO,
            borderRadius: (48 * WIDTH_SCALE_RATIO) / 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
          onPress={() => {
            this.onClickButtonGps();
          }}>
          {this.state.isLoadingCurrentLocation ? (
            <View
              style={{
                backgroundColor: 'white',
                padding: 5,
                borderRadius: (48 * WIDTH_SCALE_RATIO) / 2,
                height: 48 * WIDTH_SCALE_RATIO,
                width: 48 * WIDTH_SCALE_RATIO,
              }}>
              <SkypeIndicator color={COLOR.appColor} size={30 * WIDTH_SCALE_RATIO} />
            </View>
          ) : (
            <Image
              resizeMode="contain"
              source={ICON.MAP_GPS_ICON}
              style={{
                height: 68 * WIDTH_SCALE_RATIO,
                width: 68 * WIDTH_SCALE_RATIO,
              }}
            />
          )}

          {/* {RootStore.i18n.t('map.current-location') !== ' ' ? (
            <PText
              style={[
                style.textCaption,
                {
                  color: COLOR.appColor,
                  fontSize: style.textCaption.fontSize - 3,
                },
              ]}>
              {RootStore.i18n.t('map.current-location')}
            </PText>
          ) : null} */}
        </MyTouchableOpacity>
      </View>
    );
  }
}
