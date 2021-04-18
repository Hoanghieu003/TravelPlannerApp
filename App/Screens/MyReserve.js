import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import getReserveListNew from '../../Common/gql/queries/getReserveListNew.gql';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import SpotCard from '../Components/SpotCard';
import { HEIGHT, HEIGHT_SCALE_RATIO, IS_IOS, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';
import RootStore from '../Stores/RootStore';

export default class MyReserve extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cancelModal: false,
      reserves: [],
      offset: 0,
      existOther: true,
      cityCode: 0,
      toReserve: !!this.props.toReserve,
    };

    this.search = this.search.bind(this);
    this.onRefreshRequest = this.onRefreshRequest.bind(this);
    this.onClickGoBack = this.onClickGoBack.bind(this);
    this.onClickSpot = this.onClickSpot.bind(this);
    this.statusSpot = this.statusSpot.bind(this);
    this.styleButtonSpot = this.styleButtonSpot.bind(this);
    this.styleButtonTextSpot = this.styleButtonTextSpot.bind(this);
  }

  async componentDidMount() {
    analytics().setCurrentScreen('My-reserve-tab-MyPage');
    await this.search();
  }

  onRestartReserve = async () => {
    this.setState({ reserves: [], offset: 0, existOther: true }, async () => {
      await this.search();
    });
  };

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.addListener('restartMyReserve', this.onRestartReserve);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('restartMyReserve', this.onRestartReserve);
  }

  async search() {
    if (!this.state.existOther) {
      return;
    }

    try {
      const variables = {
        order: 'created_at',
        isMine: true,
        offset: 10 * this.state.offset,
        limit: 10,
      };
      const result = await RootStore.client.query({
        query: getReserveListNew,
        variables,
      });

      const reserveList = result.data.getReserveListNew.reserves;
      let existOther = true;
      if (result.data.getReserveListNew.reserves.length < 10) {
        existOther = false;
      }

      reserveList.forEach((v) => {
        const products = JSON.parse(v.reserve_item ? v.reserve_item : '[]');
        if (products.length > 0) {
          const main = products[0].show_name ? products[0].show_name : products[0].name;
          let people = 0;
          products.forEach((v2) => {
            people += parseInt(v2.count);
          });

          if (v.spot && v.spot.images && v.spot.images.length > 0) {
            v.image = v.spot.images[0].url
              ? v.spot.images[0].url
              : v.spot.images[0].origin_path
              ? v.spot.images[0].origin_path
              : '';
          }

          const product = RootStore.i18n.t('my-reserve.product', {
            item: main,
            count: products.length - 1,
          });
          v.mainProduct = products.length > 1 ? product : main;
          const cityTag =
            v.spot &&
            v.spot.tags &&
            v.spot.tags.filter((v) => v && v.type && v.type === Const.TagType.City.code);

          v.city =
            cityTag && cityTag.length > 0 && cityTag[0].name
              ? cityTag[0].name
              : cityTag &&
                cityTag.length > 0 &&
                cityTag[0].translations &&
                cityTag[0].translations[0] &&
                cityTag[0].translations[0].name
              ? cityTag[0].translations[0].name
              : '';

          if (v.reserve_date) {
            const date = new Date(v.reserve_date);
            const timeSeoul = momentTZ.tz(date, 'Asia/Seoul');
            v.reserveDate = moment(timeSeoul).format('YYYY.MM.DD dd HH:mm');
          } else if (
            v.reserve_date &&
            v.spot.spot_reserve.is_require_date &&
            !v.spot.spot_reserve.is_require_time
          ) {
            const date = new Date(v.reserve_date);
            const timeSeoul = momentTZ.tz(date, 'Asia/Seoul');
            v.reserveDate = moment(timeSeoul).format('YYYY.MM.DD');
          } else {
            v.reserveDate = null;
          }
          v.totalPeople = RootStore.i18n.t('my-reserve.people-count', {
            count: people,
          });
        }
      });
      this.mergeArrays(reserveList);

      this.setState({ existOther, offset: this.state.offset + 1 });
    } catch (err) {}
  }

  mergeArrays = (...arrays) => {
    console.log('2512 merge array');
    let jointArray = this.state.reserves;

    arrays.forEach((array) => {
      jointArray = [...jointArray, ...array];
    });
    const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index);
    this.setState({ reserves: uniqueArray });
  };

  onRefreshRequest() {
    this.setState({ reserves: [], offset: 0, existOther: true }, () => {
      setTimeout(() => {
        this.search();
        this.refs.infiniteScroll._stopRefreshSpinner();
      }, 500);
    });
  }

  onClickReserveCard = (reserve, fromScreen = '') => {
    Actions.reserveComplete({
      reserve: { ...reserve, reserve_code: reserve.reserve_code },
      fromScreen,
    });
  };

  onClickGoBack() {
    if (this.state.toReserve) {
      Actions.replace('reserve');
    } else {
      Actions.replace('about');
    }
  }

  onClickCancelStatus() {
    this.setState({ cancelModal: !this.state.cancelModal });
  }

  onClickSpot = (item) => {
    Actions.spotDetail({ spotCode: item.code });
  };

  onClickButtonSpot = (item) => {
    if (item.used) {
      this.onClickReserveCard(item, 'used');
    } else {
      switch (item.status) {
        case Const.ReserveStatus.Confirm.code:
          this.onClickReserveCard(item, 'confirm');
          break;
        case Const.ReserveStatus.Complete.code:
          this.onClickReserveCard(item, 'complete');
          break;
        case Const.ReserveStatus.Cancel.code:
          this.onClickReserveCard(item, 'cancel');
          break;
        case Const.ReserveStatus.Payment.code:
          this.onClickReserveCard(item);
          break;
        case Const.ReserveStatus.Refund.code:
          this.onClickReserveCard(item);
          break;
        default:
          break;
      }
    }
  };
  statusSpot(item) {
    if (item.used) {
      return RootStore.i18n.t('reserve-detail.status.used');
    }
    switch (item.status) {
      case Const.ReserveStatus.Confirm.code:
        return RootStore.i18n.t('reserve-detail.status.confirm');
      case Const.ReserveStatus.Complete.code:
        return RootStore.i18n.t('reserve-detail.status.complete');

      case Const.ReserveStatus.Cancel.code:
        return RootStore.i18n.t('reserve-detail.status.cancel');

      case Const.ReserveStatus.Payment.code:
        return RootStore.i18n.t('reserve-detail.status.payment');

      case Const.ReserveStatus.Refund.code:
        return RootStore.i18n.t('reserve-detail.status.refund');

      default:
        break;
    }
  }
  styleButtonSpot(item) {
    if (item.used) {
      return [{ ...styles.button, borderColor: COLOR.PRIMARY, backgroundColor: '#ffffff90' }];
    } else {
      switch (item.status) {
        case Const.ReserveStatus.Confirm.code:
          return [{ ...styles.button, borderColor: 'white', backgroundColor: 'transparent' }];
        case Const.ReserveStatus.Complete.code:
          return [{ ...styles.button, borderColor: COLOR.PRIMARY, backgroundColor: '#ffffff90' }];
        case Const.ReserveStatus.Cancel.code:
          return [{ ...styles.button, borderColor: 'red', backgroundColor: '#ffffff90' }];
        case Const.ReserveStatus.Payment.code:
          return [{ ...styles.button, borderColor: 'white', backgroundColor: 'transparent' }];
        default:
          return [{ ...styles.button, borderColor: 'white', backgroundColor: 'transparent' }];
      }
    }
  }
  styleButtonTextSpot(item) {
    if (item.used) {
      return COLOR.PRIMARY;
    } else {
      switch (item.status) {
        case Const.ReserveStatus.Confirm.code:
          return 'white';
        case Const.ReserveStatus.Complete.code:
          return COLOR.PRIMARY;
        case Const.ReserveStatus.Cancel.code:
          return 'red';
        case Const.ReserveStatus.Payment.code:
          return 'white';
        default:
          return 'white';
      }
    }
  }
  styleButtonBackgroundSpot = (item) => {
    if (item.used) {
      return '#ffffff99';
    } else {
      switch (item.status) {
        // case Const.ReserveStatus.Confirm.code:
        //   return 'white';
        case Const.ReserveStatus.Complete.code:
          return 'transparent';
        case Const.ReserveStatus.Cancel.code:
          return '#ffffff99';
        // case Const.ReserveStatus.Payment.code:
        //   return 'white';
        default:
          return 'transparent';
      }
    }
  };

  onClickSpotCard = (self, code, city, region) => {
    if (code) {
      Actions.spotDetail({ spotCode: code, city: city, region: region });
    }
  };

  render() {
    if (!this.props.allowLoadData) {
      return this.renderIndicator();
    }
    return (
      <FlatList
        onEndReached={this.search}
        bounces={false}
        keyExtractor={(item, index) => `key ${index}`}
        showsVerticalScrollIndicator={false}
        data={this.state.reserves}
        numColumns={2}
        style={{ backgroundColor: 'white' }}
        columnWrapperStyle={{
          paddingBottom: IS_IOS ? 5 * WIDTH_SCALE_RATIO : WIDTH_SCALE_RATIO,
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
        contentContainerStyle={[
          {
            paddingTop: 24 * HEIGHT_SCALE_RATIO,
            backgroundColor: 'white',
            paddingBottom: 10 * HEIGHT_SCALE_RATIO,
            paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          },
        ]}
        renderItem={(e, i) => {
          const v = e.item;
          return (
            <View key={`card-${i}`} style={{ width: 165 * WIDTH_SCALE_RATIO }}>
              <SpotCard
                hideLike
                totalPayment={v.total_payment}
                spotData={v.spot}
                key={`spot-${i}`}
                click={this.onClickSpotCard}
                style={{
                  backgroundColor: this.styleButtonBackgroundSpot(v),
                }}
              />

              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  zIndex: 9999,
                  elevation: 999,
                  position: 'absolute',
                  alignSelf: 'center',
                  width: 165 * WIDTH_SCALE_RATIO,
                  height: 130 * HEIGHT_SCALE_RATIO,
                  alignItems: 'center',
                  paddingTop: (90 * HEIGHT_SCALE_RATIO) / 2 - 20 * HEIGHT_SCALE_RATIO,
                }}
                onPress={() => this.onClickButtonSpot(v)}>
                <View
                  style={[
                    this.styleButtonSpot(v),
                    {
                      borderTopWidth: 0,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderBottomWidth: 0,
                    },
                  ]}>
                  <Button
                    onPress={() => this.onClickButtonSpot(v)}
                    bordered
                    activeOpacity={0.9}
                    style={this.styleButtonSpot(v)}>
                    <PText
                      style={[
                        style.textButtonOutLine,
                        { color: this.styleButtonTextSpot(v), fontWeight: 'bold' },
                      ]}
                      numberOfLines={1}>
                      {this.statusSpot(v)}
                    </PText>
                  </Button>
                </View>
              </TouchableOpacity>

              {/* modal cancel alert in design's customer */}
              <Modal isVisible={this.state.cancelModal}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: WIDTH * 0.9,
                      borderRadius: 8,
                    }}>
                    <MyTouchableOpacity
                      onPress={() => {
                        console.log('click delete');
                      }}
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: COLOR.appBorderColor,
                        alignItems: 'center',
                        paddingVertical: 18,
                      }}>
                      <PText style={style.textTitle}>{RootStore.i18n.t('my-page.delete')}</PText>
                    </MyTouchableOpacity>

                    <MyTouchableOpacity
                      onPress={() => {
                        console.log('click Book Again');
                      }}
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: COLOR.appBorderColor,
                        alignItems: 'center',
                        paddingVertical: 18,
                      }}>
                      <PText style={style.textTitle}>
                        {RootStore.i18n.t('my-page.book-again')}
                      </PText>
                    </MyTouchableOpacity>

                    <MyTouchableOpacity
                      onPress={this.onClickCancelStatus}
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: COLOR.appBorderColor,
                        alignItems: 'center',
                        paddingVertical: 18,
                      }}>
                      <PText style={[style.textTitle, { color: COLOR.appColor }]}>
                        {RootStore.i18n.t('my-page.cancel')}
                      </PText>
                    </MyTouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          );
        }}
      />
    );
  }

  renderIndicator() {
    return (
      <View style={{ height: HEIGHT * 0.5, width: WIDTH }}>
        <ActivityIndicator size={'small'} />
      </View>
    );
  }
}

MyReserve.propTypes = {
  refresh: PropTypes.bool,
  toReserve: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    height: 40 * HEIGHT_SCALE_RATIO,
    borderRadius: (40 * WIDTH_SCALE_RATIO) / 4,
    borderTopWidth: 2.5 * WIDTH_SCALE_RATIO,
    borderLeftWidth: 2.5 * WIDTH_SCALE_RATIO,
    borderRightWidth: 2.5 * WIDTH_SCALE_RATIO,
    borderBottomWidth: 2.5 * WIDTH_SCALE_RATIO,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
