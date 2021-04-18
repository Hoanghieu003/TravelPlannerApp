import moment from 'moment';
import momentTZ from 'moment-timezone';
import { Button, Content } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Const from '../../Common/Const';
import refundReserve from '../../Common/gql/mutations/refundReserve.gql';
import updateReserve from '../../Common/gql/mutations/updateReserve.gql';
import getReserveFGKey from '../../Common/gql/queries/getReserveFGKey.gql';
import Util from '../../Common/Util';
import PText from '../Components/PText';
import RootStore from '../Stores/RootStore';
import { IMAGE } from '../../asset/image/ImagePath';
export default class ReserveDetail extends React.PureComponent {
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
    let timeSeoul = '';
    if (this.props.reserve.reserve_date) {
      date = new Date(this.props.reserve.reserve_date);
      timeSeoul = momentTZ.tz(date, 'Asia/Seoul');
    }

    this.state = {
      spotReserve: this.props.reserve.spot.spot_reserve,
      reserveCode: this.props.reserve.reserve_code,
      userName: this.props.reserve.name,
      userEmail: this.props.reserve.email,
      voucherCode: this.props.reserve.voucher_code,
      userRequest: this.props.reserve.user_request,
      reserveDate:
        this.props.reserve.spot.spot_reserve.is_require_date && timeSeoul !== ''
          ? moment(timeSeoul).format('YYYY.MM.DD')
          : '',
      reserveTime:
        this.props.reserve.spot.spot_reserve.is_require_time && timeSeoul !== ''
          ? moment(timeSeoul).format('HH:mm')
          : '',
      reserveItem,
      totalPrice,
      price,
      status: this.props.reserve.status,
      requirePayment:
        this.props.reserve.spot.spot_reserve.is_require_payment && !this.props.reserve.payment_id,

      birthday: this.props.reserve.birthday,
      telephone: this.props.reserve.telephone,
      delivery_address: this.props.reserve.delivery_address,
      nationality_name: this.props.reserve.nationality_name,
      hotel_name: this.props.reserve.hotel_name,
      flight_number: this.props.reserve.flight_number,
      gender: this.props.reserve.gender,
    };

    this.reqUpdateReserve = this.reqUpdateReserve.bind(this);
    this.reqRefundReserve = this.reqRefundReserve.bind(this);

    this.onClickGoBack = this.onClickGoBack.bind(this);

    this.renderStatusBox = this.renderStatusBox.bind(this);
  }

  onClickGoSpotDetail() {
    Actions.spotDetail({ spotCode: this.props.reserve.spot.code });
  }

  async onClickGoPayment() {
    Alert.alert(
      '',
      RootStore.i18n.t('reserve.need-payment'),
      [{ text: RootStore.i18n.t('global.close') }],
      { cancelable: true },
    );

    const result = await RootStore.client.query({
      query: getReserveFGKey,
      variables: {
        code: this.props.reserve.code,
        spotName: this.props.reserve.spot.translations[0].spot_name,
        platform: 'mobile-app',
      },
    });

    if (result.data.getReserveFGKey.result) {
      Actions.reservePayment({
        spotCode: this.props.reserve.spot.code,
        spotName: this.props.reserve.spot.translations[0].spot_name,
        reserve: result.data.getReserveFGKey.reserve,
        eximFgkey: result.data.getReserveFGKey.fgkey,
        endGoBack: true,
      });
    }
  }

  onClickCancelReserve() {
    if (this.state.status === Const.ReserveStatus.Cancel.code) {
      alertCustom('reserve-detail.already-cancel');
      return;
    }

    if (this.props.reserve.payment_id) {
      let percent = 100;
      if (this.props.reserve.spot.spot_reserve.refund_percents) {
        const percents = JSON.parse(this.props.reserve.spot.spot_reserve.refund_percents);
        console.log('Cuong ne:1009 ReserveDetail -> onClickCancelReserve -> percents', percents);
        const nowDate = moment().unix();
        const reserveDate = moment(this.props.reserve.reserve_date).unix();
        percents.sort((a, b) => b.date - a.date);
        percents.forEach((v) => {
          if (reserveDate - v.date * 86400 < nowDate) {
            percent = v.percent;
          }
        });
      }
      // phat hoàn tiền khi dang watting nè
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
      Actions.myReserve({ refresh: true });
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
      alertCustom('reserve-detail.cancel-complete');
      Actions.myReserve({ refresh: true });
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

  onClickGoBack() {
    Actions.pop();
  }

  render() {
    return (
      <View style={{ paddingBottom: Util.getIOSPadding('bottom'), flex: 1 }}>
        <View
          style={{
            backgroundColor: '#00afa0',
            minHeight: 105,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={IMAGE.WHITE_LOGO_IMAGE}
            style={{ marginTop: 2, marginRight: 8, width: 74, height: 24 }}
          />
          <PText style={styles.headerTitle}>
            {RootStore.i18n.t('reserve-detail.title', {
              name: this.props.reserve.spot.translations[0].spot_name,
            })}
          </PText>
          <TouchableOpacity
            style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={this.onClickGoBack}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
        </View>
        <Content style={styles.content}>
          <View style={{ marginBottom: 10 }}>{this.renderStatusBox()}</View>
          {this.renderOption('reserve-detail.code', this.state.reserveCode)}
          {this.renderOption('reserve-detail.reserve-email', this.state.userEmail)}
          {!!this.state.spotReserve.is_require_date &&
            this.renderOption('reserve-detail.reserve-date', this.state.reserveDate)}
          {!!this.state.spotReserve.is_require_time &&
            this.renderOption('reserve-detail.reserve-time', this.state.reserveTime)}
          {!!this.state.voucherCode &&
            this.renderOption('reserve-detail.reserve-voucher', this.state.voucherCode)}
          {!!this.state.userRequest &&
            this.renderOption('reserve-detail.reserve-request', this.state.userRequest)}
          {this.state.telephone &&
            this.state.telephone !== '' &&
            this.renderOption('reserve-detail.reserve-telephone', this.state.telephone)}
          {this.state.birthday &&
            this.state.birthday !== '' &&
            this.renderOption('reserve-detail.reserve-birthday', this.state.birthday)}
          {this.state.delivery_address &&
            this.state.delivery_address !== '' &&
            this.renderOption(
              'reserve-detail.reserve-delivery-address',
              this.state.delivery_address,
            )}
          {this.state.nationality_name &&
            this.state.nationality_name !== '' &&
            this.renderOption(
              'reserve-detail.reserve-nationality-name',
              this.state.nationality_name,
            )}
          {this.state.hotel_name &&
            this.state.hotel_name !== '' &&
            this.renderOption('reserve-detail.reserve-hotel-name', this.state.hotel_name)}

          {this.state.flight_number &&
            this.state.flight_number !== '' &&
            this.renderOption('reserve-detail.reserve-flight-number', this.state.flight_number)}

          {this.state.gender === Const.GenderType.male.code ||
            (this.state.gender === Const.GenderType.female.code && (
              <View style={{ marginBottom: 20 }}>
                <PText style={styles.columnTitle}>
                  {RootStore.i18n.t('reserve.reserve-gender')}
                </PText>
                {this.state.gender === Const.GenderType.male.code && (
                  <PText style={styles.columnText}>
                    {RootStore.i18n.t('reserve-detail.gender.male')}
                  </PText>
                )}
                {this.state.gender === Const.GenderType.female.code && (
                  <PText style={styles.columnText}>
                    {RootStore.i18n.t('reserve-detail.gender.female')}
                  </PText>
                )}
              </View>
            ))}
          <View style={{ marginBottom: 20 }}>
            <PText style={styles.columnTitle}>
              {RootStore.i18n.t('reserve-detail.reserve-service')}
            </PText>
            <FlatList
              keyExtractor={(item) => `${item.code}`}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              data={this.state.reserveItem}
              renderItem={this.renderReserveItem()}
            />
          </View>
          <View style={{ marginBottom: 40 }}>
            <PText style={styles.columnTitle}>
              {RootStore.i18n.t('reserve-detail.reserve-price')}
            </PText>
            <View
              style={{
                width: '100%',
                padding: 10,
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <PText
                style={{
                  fontSize: RootStore.fontSize(2.8),
                  fontWeight: '400',
                  color: '#767676',
                }}>
                KRW {Util.price_comma(this.state.price)}
              </PText>
              <PText
                style={{
                  marginLeft: 20,
                  marginTop: 6,
                  fontSize: RootStore.fontSize(2.2),
                  fontWeight: '400',
                  color: '#c3c3c3',
                  textDecorationLine: 'line-through',
                }}>
                KRW {Util.price_comma(this.state.totalPrice)}
              </PText>
            </View>
            {this.state.status !== Const.ReserveStatus.Cancel.code && (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <PText
                  style={{
                    color: '#767676',
                    fontWeight: '400',
                    fontSize: RootStore.fontSize(2.8),
                  }}>
                  {RootStore.i18n.t('reserve-detail.cancel-message')}
                </PText>
              </View>
            )}
          </View>
          <View style={{ height: 80 }} />
        </Content>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#ffffff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <Button
              light
              bordered
              style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}
              onPress={this.onClickCancelReserve.bind(this)}>
              <PText
                style={{
                  fontSize: RootStore.fontSize(2.8),
                  fontWeight: 'bold',
                  color: '#767676',
                }}>
                {RootStore.i18n.t('reserve-detail.reserve-cancel')}
              </PText>
            </Button>
            {!this.state.requirePayment && (
              <Button
                style={{
                  marginLeft: 20,
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                }}
                onPress={this.onClickGoSpotDetail.bind(this)}>
                <PText
                  style={{
                    fontSize: RootStore.fontSize(2.8),
                    fontWeight: '400',
                    color: '#fff',
                  }}>
                  {RootStore.i18n.t('reserve-detail.go-spot')}
                </PText>
              </Button>
            )}
            {!!this.state.requirePayment && (
              <Button
                style={{
                  marginLeft: 20,
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                }}
                onPress={this.onClickGoPayment.bind(this)}>
                <PText
                  style={{
                    fontSize: RootStore.fontSize(2.8),
                    fontWeight: '400',
                    color: '#fff',
                  }}>
                  {RootStore.i18n.t('payment.payment-fail-retry')}
                </PText>
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  }

  renderReserveItem() {
    return ({ item, index }) => {
      return (
        <View style={styles.itemBox} key={`item-${index}`}>
          <View style={{ flexDirection: 'row' }}>
            <PText
              style={{
                fontSize: RootStore.fontSize(2.8),
                fontWeight: '400',
                color: '#767676',
              }}>
              {item.show_name ? item.show_name : item.name}
            </PText>
            <PText
              style={{
                fontSize: RootStore.fontSize(2.8),
                position: 'absolute',
                right: 0,
                fontWeight: '400',
                color: '#767676',
              }}>
              {RootStore.i18n.t('reserve-detail.reserve-count', {
                count: item.count,
              })}
            </PText>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <PText
              style={{
                fontSize: RootStore.fontSize(2.8),
                fontWeight: '400',
                color: '#767676',
              }}>
              KRW {Util.price_comma(item.discount_price)}
            </PText>
            <PText
              style={{
                marginLeft: 20,
                marginTop: 6,
                fontSize: RootStore.fontSize(2.2),
                fontWeight: '400',
                color: '#c3c3c3',
                textDecorationLine: 'line-through',
              }}>
              KRW {Util.price_comma(item.price)}
            </PText>
          </View>
        </View>
      );
    };
  }

  renderOption(text: String, value) {
    return (
      <View style={{ marginBottom: 20 }}>
        <PText style={styles.columnTitle}>{RootStore.i18n.t(text)}</PText>
        <PText style={styles.columnText}>{value}</PText>
      </View>
    );
  }

  renderStatusBox() {
    switch (this.state.status) {
      case Const.ReserveStatus.Payment.code:
        return (
          <Button bordered danger style={{ alignItems: 'center', justifyContent: 'center' }} small>
            <PText style={{ fontSize: RootStore.fontSize(2.2), fontWeight: '400' }}>
              {RootStore.i18n.t('reserve-detail.detail-page-status.payment-waiting', {
                locale: 'ko',
              })}
              | {RootStore.i18n.t('reserve-detail.detail-page-status.payment-waiting')}
            </PText>
          </Button>
        );

      case Const.ReserveStatus.Confirm.code:
        if (this.props.reserve.spot.spot_reserve.is_require_payment) {
          return (
            <Button
              bordered
              primary
              style={{ alignItems: 'center', justifyContent: 'center' }}
              small>
              <PText style={{ fontSize: RootStore.fontSize(2.2), fontWeight: '400' }}>
                {RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete', {
                  locale: 'ko',
                })}
                | {RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete')}
              </PText>
            </Button>
          );
        }
        return (
          <Button bordered danger style={{ alignItems: 'center', justifyContent: 'center' }} small>
            <PText style={{ fontSize: RootStore.fontSize(2.2), fontWeight: '400' }}>
              {RootStore.i18n.t('reserve-detail.detail-page-status.locale-payment', {
                locale: 'ko',
              })}
              | {RootStore.i18n.t('reserve-detail.detail-page-status.locale-payment')}
            </PText>
          </Button>
        );

      case Const.ReserveStatus.Complete.code:
        if (this.props.reserve.spot.spot_reserve.is_require_payment) {
          return (
            <Button
              bordered
              primary
              style={{ alignItems: 'center', justifyContent: 'center' }}
              small>
              <PText style={{ fontSize: RootStore.fontSize(2.2), fontWeight: '400' }}>
                {RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete', {
                  locale: 'ko',
                })}
                | {RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete')}
              </PText>
            </Button>
          );
        }
        return (
          <Button bordered danger style={{ alignItems: 'center', justifyContent: 'center' }} small>
            <PText style={{ fontSize: RootStore.fontSize(2.2), fontWeight: '400' }}>
              {RootStore.i18n.t('reserve-detail.detail-page-status.locale-payment', {
                locale: 'ko',
              })}
              | {RootStore.i18n.t('reserve-detail.detail-page-status.locale-payment')}
            </PText>
          </Button>
        );
    }
  }
}

ReserveDetail.propTypes = {
  reserve: PropTypes.object,
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: RootStore.fontSize(3.8),
    fontWeight: '400',
    color: '#ffffff',
  },

  content: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  columnTitle: {
    marginBottom: 5,
    fontSize: RootStore.fontSize(2.8),
    fontWeight: '400',
    color: '#767676',
  },
  columnText: {
    fontSize: RootStore.fontSize(2.2),
    fontWeight: '400',
    color: '#767676',
  },
  itemBox: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#666666',
    marginBottom: 5,
  },
});
export function alertCustom(text: String) {
  Alert.alert('', RootStore.i18n.t(text), [{ text: RootStore.i18n.t('global.close') }], {
    cancelable: false,
  });
}
