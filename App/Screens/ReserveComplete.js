import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Image, ScrollView, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import refundReserve from '../../Common/gql/mutations/refundReserve.gql';
import updateReserve from '../../Common/gql/mutations/updateReserve.gql';
import getReserveFGKey from '../../Common/gql/queries/getReserveFGKey.gql';
import Util from '../../Common/Util';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, heightBottomBar, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { alertCustom } from './ReserveDetail';
import { ICON } from '../../asset/image/ImagePath';

export default class ReserveComplete extends React.PureComponent {
  constructor(props) {
    super(props);

    let totalPrice = 0;
    let price = 0;
    const reserveItem = this.props.reserve.reserve_items;

    reserveItem.forEach((v) => {
      totalPrice += v.count * v.price;
      price += v.count * v.discount_price;
    });
    let date = '';
    let dateSeoul = '';
    let timeSeoul = '';
    if (this.props.reserve.reserve_date && this.props.reserve.spot.reserve_info.is_require_date) {
      date = new Date(this.props.reserve.reserve_date);
      dateSeoul = momentTZ.tz(date, 'Asia/Seoul');
    }
    if (this.props.reserve.reserve_date && this.props.reserve.spot.reserve_info.is_require_time) {
      date = new Date(this.props.reserve.reserve_date);
      timeSeoul = momentTZ.tz(date, 'Asia/Seoul');
    }
    let title = '';
    let titleKorea = '';
    for (var i = 0; i < this.props.reserve.spot.translations.length; i++) {
      if (this.props.reserve.spot.translations[i].language === RootStore.language) {
        title = this.props.reserve.spot.translations[i].spot_name;
      }
      if (this.props.reserve.spot.translations[i].language === 'ko') {
        titleKorea = this.props.reserve.spot.translations[i].spot_name;
      }
    }
    const totalPayment = this.props.reserve?.total_payment;
    const itemBought =
      this.props.reserve && this.props.reserve.reserve_items
        ? typeof this.props.reserve.reserve_items === 'string'
          ? JSON.parse(this.props.reserve.reserve_items)
          : this.props.reserve.reserve_items
        : '';
    const condition =
      this.props.reserve && this.props.reserve.spot && this.props.reserve.spot.reserve_info
        ? this.props.reserve.spot.reserve_info
        : this.props.reserve.spot.spot_reserve;

    this.state = {
      totalPayment,
      title: title,
      titleKorea: this.props.reserve.spot.spot_name_ko,
      fromWaiting: this.props.fromScreen,
      spotReserve: condition,
      reserveCode: this.props.reserve.reserve_code,
      userName: this.props.reserve.name,
      additionalInfo: this.props.reserve.hasInfos,
      userEmail: this.props.reserve.email,
      voucherCode: this.props.reserve.voucher_code,
      userRequest: this.props.reserve.user_request,
      itemBought,

      reserveDate: dateSeoul !== '' ? dateSeoul.format('YYYY - MM - DD') : '',
      reserveTime: timeSeoul !== '' ? timeSeoul.format('HH:mm') : '',
      reserveItem,
      totalPrice,
      price,
      status: this.props.reserve.status,
      requirePayment: condition.is_require_payment && !this.props.reserve.payment_id,

      birthday: this.props.reserve.birthday,
      telephone: this.props.reserve.telephone,
      delivery_address: this.props.reserve.delivery_address,
      nationality_name: this.props.reserve.nationality_name,
      hotel_name: this.props.reserve.hotel_name,
      flight_number: this.props.reserve.flight_number,
      gender: this.props.reserve.gender,
      social: this.props.reserve.social,
    };
    this.reqUpdateReserve = this.reqUpdateReserve.bind(this);
    this.reqRefundReserve = this.reqRefundReserve.bind(this);
    this.onClickCancelReserve = this.onClickCancelReserve.bind(this);
    this.onClickDeleteReserve = this.onClickDeleteReserve.bind(this);
  }

  onClickGoSpotDetail() {
    Actions.spotDetail({ spotCode: this.props.reserve.spot.code });
  }

  convertSpotName = (spotName) => {
    if (Util.encodeURI(spotName).length > 255) {
      return spotName.subString(0, 29);
    }
    return spotName;
  };

  onClickGoBack() {
    Actions.replace('mainStack');
    Actions.jump('aboutStack');
    Actions.reset('myPage');
  }
  async onClickGoPayment() {
    Alert.alert(
      '',
      RootStore.i18n.t('reserve.need-payment'),
      [{ text: RootStore.i18n.t('global.close') }],
      { cancelable: true },
    );
    const result = await await RootStore.client.query({
      query: getReserveFGKey,
      variables: {
        code: this.props.reserve.code,
        spotName: this.convertSpotName(this.props.reserve.spot.translations[0].spot_name),
        platform: 'mobile-app',
      },
    });
    // this.props.reserve

    if (result.data.getReserveFGKey.result) {
      Actions.reservePayment({
        spotCode: this.props.reserve.spot.code,
        spotName: this.props.reserve.spot.translations[0].spot_name,
        spot_name_ko: this.props.reserve.reserve_items[0].ko_name || '',
        reserve: result.data.getReserveFGKey.reserve,
        eximFgkey: result.data.getReserveFGKey.fgkey,
        endGoBack: true,
      });
    }
  }

  async onClickDeleteReserve() {
    Alert.alert('Notice', 'Wating for api...', [{ text: RootStore.i18n.t('global.close') }], {
      cancelable: false,
    });
  }

  onClickCancelReserve() {
    if (this.state.status === Const.ReserveStatus.Cancel.code) {
      Alert.alert(
        '',
        RootStore.i18n.t('reserve-detail.already-cancel'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: false },
      );
      return;
    }
    if (this.props.reserve.payment_id) {
      let percent = 100;
      if (
        this.props.reserve &&
        this.props.reserve.spot &&
        this.props.reserve.spot.spot_reserve &&
        this.props.reserve.spot.spot_reserve.refund_percents
      ) {
        const percents = JSON.parse(this.props.reserve.spot.spot_reserve.refund_percents);
        const nowDate = moment().unix();
        const reserveDate = moment(this.props.reserve.reserve_date).unix();
        percents.sort((a, b) => b.date - a.date);
        percents.forEach((v) => {
          if (reserveDate - v.date * 86400 < nowDate) {
            percent = v.percent;
          }
        });
      } else if (
        this.props.reserve &&
        this.props.reserve.spot &&
        this.props.reserve.spot.reserve_info &&
        this.props.reserve.spot.reserve_info.refund_percents
      ) {
        const percents = JSON.parse(this.props.reserve.spot.reserve_info.refund_percents);
        const nowDate = moment().unix();
        const reserveDate = moment(this.props.reserve.reserve_date).unix();

        percents.sort((a, b) => b.date - a.date);
        percents.forEach((v) => {
          if (reserveDate - v.date * 86400 < nowDate) {
            percent = v.percent;
          } else {
            percent = v.percent;
          }
        });
      }
      console.log('Cuong ne1009 haha: onClickCancelReserve -> percent', percent);

      Alert.alert(
        '',
        RootStore.i18n.t('reserve-detail.cancel-fail.refund', { percent }),
        [
          { text: RootStore.i18n.t('global.no'), style: 'cancel' },
          {
            text: RootStore.i18n.t('global.yes'),
            onPress: () => {
              this.reqRefundReserve();
            },
          },
        ],
        { cancelable: true },
      );
    } else {
      Alert.alert(
        '',
        RootStore.i18n.t('reserve-detail.alert-cancel'),
        [
          { text: RootStore.i18n.t('global.no'), style: 'cancel' },
          {
            text: RootStore.i18n.t('global.yes'),
            onPress: () => {
              this.reqUpdateReserve();
            },
          },
        ],
        { cancelable: true },
      );
    }
  }

  async reqUpdateReserve() {
    const result = await RootStore.client.mutate({
      mutation: updateReserve,
      variables: {
        code: this.props.reserve.code,
        status: Const.ReserveStatus.Cancel.code,
      },
    });

    if (result.data.updateReserve.result) {
      alertCustom('reserve-detail.cancel-complete');
      Actions.reset('myPage');
    } else if (result.data.updateReserve.result === false && result.data.updateReserve.error) {
      switch (result.data.updateReserve.error) {
        case Const.ReserveCancelFailType.Voucher.code:
          alertCustom('reserve-detail.cancel-fail.voucher');
          break;
        case Const.ReserveCancelFailType.Today.code:
          alertCustom('reserve-detail.cancel-fail.today');
          break;
        case Const.ReserveCancelFailType.Late.code:
          alertCustom('reserve-detail.cancel-fail.late');
          break;
        case Const.ReserveCancelFailType.Already.code:
          alertCustom('reserve-detail.cancel-fail.already');
          break;
        default:
          alertCustom('reserve-detail.cancel-fail.fail');
          break;
      }
    }
  }

  async reqRefundReserve() {
    const result = await RootStore.client.mutate({
      mutation: refundReserve,
      variables: { reserveCode: this.props.reserve.code },
    });

    if (result.data.refundReserve.result) {
      Alert.alert(
        '',
        RootStore.i18n.t('reserve-detail.cancel-complete'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: true },
      );
      Actions.reset('myPage');
    } else if (result.data.refundReserve.result === false && result.data.refundReserve.error) {
      switch (result.data.refundReserve.error) {
        case Const.ReserveCancelFailType.Voucher.code:
          alertCustom('reserve-detail.cancel-fail.voucher');
          break;
        case Const.ReserveCancelFailType.Today.code:
          alertCustom('reserve-detail.cancel-fail.today');
          break;
        case Const.ReserveCancelFailType.Late.code:
          alertCustom('reserve-detail.cancel-fail.late');
          break;
        case Const.ReserveCancelFailType.Already.code:
          alertCustom('reserve-detail.cancel-fail.already');
          break;
        default:
          alertCustom('reserve-detail.cancel-fail.fail');
          break;
      }
    }
  }
  renderInfo = (hardTitle, hardSubtitle, inforTitle, inforSubtitle) => (
    <View
      key={`infomation-${inforTitle}`}
      style={{
        marginBottom: 6 * WIDTH_SCALE_RATIO,
        borderBottomColor: COLOR.GREY20,
        borderBottomWidth: 0.5,
        paddingBottom: 6 * HEIGHT_SCALE_RATIO,
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <PText style={[style.text, { marginHorizontal: 8 * WIDTH_SCALE_RATIO }]}>{hardTitle}</PText>
        <PText style={[style.textSubTitle, { marginHorizontal: 8 * WIDTH_SCALE_RATIO }]}>
          {hardSubtitle}
        </PText>
      </View>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <PText style={[style.text, { marginHorizontal: 8 * WIDTH_SCALE_RATIO }]}>
          {inforTitle}
        </PText>
        {inforSubtitle ? (
          <PText style={[style.textSubTitle, { marginHorizontal: 8 * WIDTH_SCALE_RATIO }]}>
            {inforSubtitle}
          </PText>
        ) : null}
      </View>
    </View>
  );
  renderGreenLetter() {
    switch (this.props.fromScreen ? this.props.fromScreen : this.props.reserve.status) {
      case 'complete':
      case 3:
        return (
          RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete') +
          ' ' +
          RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete', {
            locale: 'ko',
          })
        );
      case 'cancel':
      case 4:
        return '';

      case 'confirm':
      case 2:
        return '';

      default:
        return RootStore.i18n.t('reserve-detail.status.payment') + ' 결제대기중';
    }
  }
  componentDidMount() {
    analytics().setCurrentScreen('Check-Information');
  }

  render() {
    return (
      <View style={style.container}>
        <BaseHeaderWithSearch
          showBack
          onLeftPress={() => this.onClickGoBack()}
          backgroundColorWhite
          leftIconStyle={{ tintColor: COLOR.appColor }}
          rightIconType={null}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 16 * WIDTH_SCALE_RATIO, paddingTop: 14 }}>
          <View>
            {/* Title */}
            <View
              style={{
                marginHorizontal: 8 * WIDTH_SCALE_RATIO,
              }}>
              <View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <PText style={[style.text, { fontSize: style.text.fontSize * 1.3 }]}>
                    {RootStore.i18n.t('reserve-detail.title', {
                      name: this.state.title,
                    })}
                  </PText>
                </View>
                {this.state.titleKorea ? (
                  <PText
                    style={[style.textSubTitle, { fontSize: style.textSubTitle.fontSize + 0.1 }]}>
                    {this.state.titleKorea}
                  </PText>
                ) : null}
              </View>
            </View>
            {/*phat nếu cancell hay confirm thì opacity: 0.1 */}
            <View
              style={
                this.props.fromScreen === 'cancel' || this.props.fromScreen === 'used'
                  ? { opacity: 0.2 }
                  : { opacity: 1 }
              }>
              <View
                style={[
                  style.line,
                  {
                    marginTop: 9,
                    paddingBottom: 4,
                    paddingTop: 3,
                    borderColor: COLOR.appBorderColor2,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  },
                ]}>
                <PText
                  style={[
                    style.text,
                    {
                      marginHorizontal: 8 * WIDTH_SCALE_RATIO,
                      color: COLOR.appColor,
                      fontSize: style.text.fontSize * 0.9,
                    },
                  ]}>
                  {this.renderGreenLetter()}
                </PText>
              </View>
              <View style={{ height: 16 * HEIGHT_SCALE_RATIO }} />
              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.reserve-title'),
                RootStore.i18n.t('reserve-detail.reserve-title', { locale: 'ko' }),
                this.state.itemBought.map((item, index) => {
                  if (this.state.itemBought.length > 1) {
                    if (index !== this.state.itemBought.length - 1) {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.show_name} ${item.count}\n`,
                      });
                    } else {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.show_name} ${item.count}`,
                      });
                    }
                  } else {
                    return RootStore.i18n.t('reserve-detail.title', {
                      name: `${item.show_name} ${item.count}`,
                    });
                  }
                }),
                this.state.itemBought.map((item, index) => {
                  if (this.state.itemBought.length > 1) {
                    if (index !== this.state.itemBought.length - 1) {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.ko_name} ${item.count}\n`,
                      });
                    } else {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.ko_name} ${item.count}`,
                      });
                    }
                  } else {
                    return RootStore.i18n.t('reserve-detail.title', {
                      name: `${item.ko_name} ${item.count}`,
                    });
                  }
                }),
              )}
              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.reserve-name'),
                RootStore.i18n.t('reserve-detail.reserve-name', { locale: 'ko' }),
                this.state.userName,
                this.state.nationality_name,
              )}
              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.code'),
                RootStore.i18n.t('reserve-detail.code', { locale: 'ko' }),
                this.state.reserveCode,
              )}
              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.reserve-email'),
                RootStore.i18n.t('reserve-detail.reserve-email', { locale: 'ko' }),
                this.state.userEmail,
              )}
              {this.state.telephone
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.reserve-telephone'),
                    RootStore.i18n.t('reserve.reserve-telephone', { locale: 'ko' }),
                    this.state.telephone,
                  )
                : null}
              {this.state.social
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.social-id'),
                    RootStore.i18n.t('reserve.social-id', { locale: 'ko' }),
                    this.state.social,
                  )
                : null}
              {this.state.reserveDate
                ? this.renderInfo(
                    RootStore.i18n.t('reserve-detail.reserve-date'),
                    RootStore.i18n.t('reserve-detail.reserve-date', { locale: 'ko' }),
                    this.state.reserveDate,
                  )
                : null}
              {this.state.delivery_address
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.reserve-delivery-address'),
                    RootStore.i18n.t('reserve.reserve-delivery-address', { locale: 'ko' }),
                    this.state.delivery_address,
                  )
                : null}
              {this.state.nationality_name
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.reserve-nationality-name'),
                    RootStore.i18n.t('reserve.reserve-nationality-name', { locale: 'ko' }),
                    this.state.nationality_name,
                  )
                : null}
              {this.state.hotel_name
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.reserve-hotel-name'),
                    RootStore.i18n.t('reserve.reserve-hotel-name', { locale: 'ko' }),
                    this.state.hotel_name,
                  )
                : null}
              {this.state.flight_number
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.reserve-flight-number'),
                    RootStore.i18n.t('reserve.reserve-flight-number', { locale: 'ko' }),
                    this.state.flight_number,
                  )
                : null}
              {this.state.gender
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.reserve-gender'),
                    RootStore.i18n.t('reserve.reserve-gender', { locale: 'ko' }),
                    this.state.gender === 1
                      ? RootStore.i18n.t('reserve-detail.gender.male')
                      : RootStore.i18n.t('reserve-detail.gender.female'),
                  )
                : null}
              {this.state.reserveTime
                ? this.renderInfo(
                    RootStore.i18n.t('reserve-detail.reserve-time'),
                    RootStore.i18n.t('reserve-detail.reserve-time', { locale: 'ko' }),
                    this.state.reserveTime,
                  )
                : null}

              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.reserve-price'),
                RootStore.i18n.t('reserve-detail.reserve-price', { locale: 'ko' }),
                `￦ ${Util.price_comma(this.state.totalPayment)}  `,
              )}
              {this.state.voucherCode
                ? this.renderInfo(
                    RootStore.i18n.t('reserve-detail.reserve-voucher'),
                    RootStore.i18n.t('reserve-detail.reserve-voucher', { locale: 'ko' }),
                    this.state.voucherCode,
                  )
                : null}
              {this.state.additionalInfo.map((v) => {
                return this.renderInfo(v.name, v.koName, v.value);
              })}
            </View>
            <View style={{ height: (heightBottomBar + 103) * HEIGHT_SCALE_RATIO }} />
          </View>
        </ScrollView>
        <Modal
          backdropOpacity={0.3}
          animationIn="fadeInDown"
          isVisible={this.state.alertLockShow}
          onRequestClose={() => {
            this.setState({ alertLockShow: false });
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 30,
              justifyContent: 'center',
            }}>
            <PText
              style={[
                style.textTitle,
                {
                  fontWeight: '600',
                  textAlign: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                },
              ]}>
              Please enter booking password
            </PText>
            <PText style={[style.text, { textAlign: 'center', marginBottom: 33 }]}>
              Once the password is entered, the voucher is regarded as expired and will not be valid
              again.{' '}
            </PText>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Image
                style={{ width: 40, height: 40, marginBottom: 10 }}
                resizeMode="contain"
                source={ICON.LOCK_ICON2}
              />
              <TextInput
                placeholder="PASSWORD"
                secureTextEntry
                style={[
                  style.input,
                  {
                    marginLeft: 5,
                    paddingBottom: 10,
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: COLOR.appBorderColor,
                  },
                ]}
                clearButtonMode="while-editing"
                placeholderTextColor={COLOR.appTextPlaceholderColor}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyTouchableOpacity
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 30,
                  paddingVertical: 8,
                  borderWidth: 1.5,
                  borderColor: COLOR.appColor,
                  borderRadius: 30,
                }}
                onPress={() => this.setState({ alertLockShow: false })}>
                <PText
                  style={[style.textButton, { textTransform: 'uppercase', color: COLOR.appColor }]}>
                  CANCEL
                </PText>
              </MyTouchableOpacity>
              <View style={{ width: 20 }} />
              <MyTouchableOpacity
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 30,
                  paddingVertical: 8,
                  borderWidth: 1.5,
                  backgroundColor: COLOR.appColor,
                  borderColor: COLOR.appColor,
                  borderRadius: 30,
                }}
                onPress={() => this.setState({ alertLockShow: false })}>
                <PText style={[style.textButton, { textTransform: 'uppercase', color: 'white' }]}>
                  confirm
                </PText>
              </MyTouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: WIDTH,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            paddingHorizontal: 16 * WIDTH_SCALE_RATIO,

            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: COLOR.appBorderColor,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
              alignItems: 'center',
            }}>
            {/* {this.props.fromScreen === 'complete' || this.props.fromScreen === 'cancel' ? (
              <MyTouchableOpacity
                style={{ flex: 2 }}
                onPress={() => {
                  this.setState({ alertLockShow: true });
                }}>
                <Image
                  style={{
                    width: 24 * WIDTH_SCALE_RATIO,
                    height: 24 * WIDTH_SCALE_RATIO,
                  }}
                  source={ICON.LOCK_ICON2}
                />
              </MyTouchableOpacity>
            ) : (
              <View />
            )} */}

            <View
              style={{
                flex: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingVertical: 16 * HEIGHT_SCALE_RATIO,
              }}>
              {this.props.fromScreen === 'cancel' || this.props.fromScreen === 'used' ? null : (
                <MyTouchableOpacity
                  style={[
                    style.buttonOutline,
                    {
                      marginRight: 12 * WIDTH_SCALE_RATIO,
                    },
                  ]}
                  rounded
                  bordered
                  onPress={() => {
                    if (this.props.fromScreen === 'cancel' || this.props.fromScreen === 'used') {
                      this.onClickDeleteReserve();
                    } else {
                      if (this.props.fromScreen === 'complete') {
                        this.onClickCancelReserve();
                      } else {
                        this.onClickCancelReserve();
                      }
                    }
                  }}>
                  <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.PRIMARY }]}>
                    {this.props.fromScreen === 'cancel' || this.props.fromScreen === 'used'
                      ? RootStore.i18n.t('my-page.delete')
                      : RootStore.i18n.t('my-page.cancel')}
                  </PText>
                </MyTouchableOpacity>
              )}

              <MyTouchableOpacity
                style={[style.button, {}]}
                rounded
                onPress={() => {
                  if (this.props.fromScreen === 'cancel' || this.props.fromScreen === 'used') {
                    Actions.reserveSpot({
                      spotCode: this.props.reserve.spot.code,
                      reserveCode: this.state.reserveCode,
                      isMyPage: true,
                    });
                  } else {
                    if (this.props.fromScreen === '') {
                      this.onClickGoPayment();
                    } else {
                      Actions.spotDetail({ spotCode: this.props.reserve.spot.code });
                    }
                  }
                }}>
                <PText
                  uppercase={false}
                  style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                  {this.props.fromScreen === 'cancel'
                    ? RootStore.i18n.t('my-page.book-again')
                    : this.props.fromScreen === ''
                    ? RootStore.i18n.t('review.button-pay')
                    : RootStore.i18n.t('my-page.info')}
                </PText>
              </MyTouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

ReserveComplete.propTypes = {
  RootStore: PropTypes.object,
};
