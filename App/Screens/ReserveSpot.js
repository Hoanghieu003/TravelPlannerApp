/* eslint-disable no-useless-escape */
import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import { Accordion, Content, Icon, Picker } from 'native-base';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  Alert,
  FlatList,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import VersionCheck from 'react-native-version-check';
import Const from '../../Common/Const';
import createReserve from '../../Common/gql/mutations/createReserve.gql';
import updateReserve from '../../Common/gql/mutations/updateReserve.gql';
import getPossibleDates from '../../Common/gql/queries/getPossibleDates.gql';
import getPossibleTimes from '../../Common/gql/queries/getPossibleTimes.gql';
import getReserveFGKey from '../../Common/gql/queries/getReserveFGKey.gql';
import getReserve from '../../Common/gql/queries/getReserve.gql';
import getSpotOptionList from '../../Common/gql/queries/getSpotOptionList.gql';
import getSpotReserve from '../../Common/gql/queries/getSpotReserve.gql';
import Util from '../../Common/Util';
import BaseHeader from '../Components/BaseHeader';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import Divider from '../Components/Divider';
import { myAlert } from '../Components/MyAlert';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import {
  HEIGHT,
  HEIGHT_SCALE_RATIO,
  IS_IOS,
  WIDTH,
  WIDTH_SCALE_RATIO,
  IS_ANDROID,
} from '../Constant/constant';
import style, {
  COLOR,
  heightBottomBar,
  ptColor,
  ptShadow,
  ptText,
  headerHeight,
} from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { ICON, IMAGE } from '../../asset/image/ImagePath';
import AnimationDropdownComponent from '../Components/reserve/AnimationDropdownComponent';

const ReserveStep = {
  Select_DateTime: 0,
  Select_Product: 1,
  Input_Infomation: 2,
  Check_Reserve: 3,
};
export const numberOfLineNameProduct = 3;
export const numberOfLineNameItem = 2;

const selected_date_style = {
  base: {
    fontFamily:
      RootStore.language === 'en' || RootStore.language === 'vi' ? 'Raleway-Regular' : 'Roboto',
    paddingTop: 1 * WIDTH_SCALE_RATIO,
    width: 32 * WIDTH_SCALE_RATIO,
    height: 32 * WIDTH_SCALE_RATIO,
    alignSelf: 'center',
    alignItems: 'center',
  },
};

export default class ReserveSpot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.viewHeight = 0;
    this.getSpotInfo = this.getSpotInfo.bind(this);
    this._renderContent = this._renderContent.bind(this);

    this.checkRequire = this.checkRequire.bind(this);
    this.checkReserveTime = this.checkReserveTime.bind(this);
    this.createBlockDate = this.createBlockDate.bind(this);
    this.checkDisableDate = this.checkDisableDate.bind(this);
    this.onSelectDate = this.onSelectDate.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.initProductCount = this.initProductCount.bind(this);

    this.totalProductCount = this.totalProductCount.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSocial = this.onChangeSocial.bind(this);
    this.onChangeRequest = this.onChangeRequest.bind(this);

    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeDeliveryAddress = this.onChangeDeliveryAddress.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeNationalityName = this.onChangeNationalityName.bind(this);
    this.onChangeHotelName = this.onChangeHotelName.bind(this);
    this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeSNSInformation = this.onChangeSNSInformation.bind(this);

    this.reqSendReserveData = this.reqSendReserveData.bind(this);
    this.mergeDateTime = this.mergeDateTime.bind(this);

    this.renderSelectDateTime = this.renderSelectDateTime.bind(this); //* step1 - select date, time
    this.renderSelectProduct = this.renderSelectProduct.bind(this); //* step2 - select product
    this.renderInputBookerInfo = this.renderInputBookerInfo.bind(this); //* step3 - input user data
    this.renderFinalCheck = this.renderFinalCheck.bind(this); //* step4 - check your order
    this.renderSelectedDate = this.renderSelectedDate.bind(this);

    this.renderFirstItemList = this.renderFirstItemList.bind(this);
    this.renderSecondItemList = this.renderSecondItemList.bind(this);
    this.renderThirdItemList = this.renderThirdItemList.bind(this);

    this.onClickGoBack = this.onClickGoBack.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.haveStep3 = false;
    this.version = 'not-loaded';
    this.alreadyProduct = [];

    this.state = {
      activeMoreInfoSlide: 0,
      SNSInformation: 'LINE',
      confirmInfomation: null,
      deliverFee: null,
      minAmount: null,
      possibleDates: [],
      cartProducts: [], //* this arr contain product bought
      reserveCode: this.props.reserveCode,
      chosenProductLevel1: '', //* chose for show up in bottom lv1
      chosenProductLevel3: '', //* chose for show up in bottom lv2
      chosenProductLevel2: '', //* chose for show up in bottom lv3
      checkItemFirstSelectProduct: null,
      isModalVisible: false,
      selectDate: '',
      blockDate: {}, //* 요일용
      markDate: {},
      selectTime: '',
      today: moment().format('YYYY-MM-DD'),

      title: '',
      titleKorea: '',
      spot: null,
      voucherCode: '',

      price: [],
      products: [],
      arrayOfDisabledDays: [],
      isPossibleTime: [],
      totalPrice: 0,
      totalDiscountPrice: 0,
      timeRank: 0,
      timeUnit: 60,

      name: '',
      country: 'none',
      countryList: Const.Country,
      email: '',
      social: '',
      request: '',

      birthday: '',
      deliveryAddress: '',
      telephone: '',
      nationalityName: '',
      hotelName: '',
      flightNumber: '',
      gender: null,

      requireDate: false,
      requireTime: false,
      requiredInfo: {
        birthday: false,
        delivery_address: false,
        nationality_name: false,
        hotel_name: false,
        flight_number: false,
      },
      newRequireInfo:
        this.props.requireInfo && this.props.requireInfo.additional_reservation_infos
          ? this.props.requireInfo.additional_reservation_infos.map(v => ({
              ...v,
              content: '',
            }))
          : [],
      restrictDate: {},

      minDate: moment().format('YYYY-MM-DD'),
      limitDate: moment().format('YYYY-MM-DD'),
      step: ReserveStep.Select_DateTime,

      selectProductFirst: null,
      selectProductSecond: null,
      selectProductThird: null,
      showPriceBox: false,
      titleAlert: '',
      alertShow: false,
      alertLockShow: false,
      isHide: false,
    };
    this.scaleYValue = new Animated.Value(1);
  }

  _toggleSubview = (hide = false) => {
    var toValue = new Animated.Value(1);
    if (hide) {
      toValue = new Animated.Value(0);
    }

    Animated.timing(this.scaleYValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    this.setState({
      isHide: hide,
    });
  };

  async componentDidMount() {
    analytics().setCurrentScreen('Booking-Reserve-Spot');

    this.version = await VersionCheck.getCurrentVersion();
    await this.getSpotInfo();
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  async onChangeMonth(monthYear) {
    const getDates = await RootStore.client.query({
      query: getPossibleDates,
      variables: { spotCode: this.props.spotCode, requestDate: monthYear },
    });
    const possibleDates = getDates.data.getPossibleDates.dates;
    this.setState({ possibleDates }, () => {
      this.createBlockDate();
    });
  }
  createBlockDate() {
    const blockDate = {};
    const startTime = moment(moment().format('YYYY-MM-DD')).unix();
    const endTime = moment(this.state.limitDate).unix();
    let repeat = 0;

    while (startTime + repeat * 86400 < endTime) {
      repeat += 1;
      const date = moment.unix(startTime + repeat * 86400).format('YYYY-MM-DD');
      const found = this.state.possibleDates.find(v => v === date);
      if (!found) {
        blockDate[date] = { disabled: true, disableTouchEvent: true };
      }
    }
    this.setState({ blockDate });
  }

  checkDisableDate(day) {
    //* 기간별 예약 가능일
    const arrayOfDisabledDays = this.state.possibleDates;
    for (let i = 0; i < arrayOfDisabledDays.length; i++) {
      //* 예약 불가능 요일
      if (day === arrayOfDisabledDays[i]) {
        return false;
      } else {
        return true;
      }
    }
  }

  onSelectDate(day, localDay = null) {
    const limit = moment(day.dateString).unix();
    let now = moment(moment().format('YYYY-MM-DD')).unix();
    if (this.state.selectDate === (day && day.dateString)) {
      this.setState({ selectDate: '', markDate: {} });
    } else {
      if (this.state.spot.spot_reserve.is_require_day) {
        now += 86400;
      }

      if (now > limit) {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.check-date'),
        });
        return;
      }

      if (limit >= moment(this.state.limitDate).unix()) {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.check-date'),
        });

        return;
      }

      const markDate = {};
      markDate[day.dateString] = {
        selected: true,
        selectedColor: COLOR.PRIMARY,
        customStyles: {
          container: [
            ptShadow.BLUR10,
            {
              backgroundColor: COLOR.PRIMARY,
            },
          ],
        },
      };

      this.setState({ selectDate: day.dateString, isModalVisible: false, markDate }, () => {
        this.checkReserveTime();
      });
    }
  }

  onSelectTime(index, rank) {
    const times = this.state.isPossibleTime.map((v, i) => {
      if (i === index) {
        v.select = rank;
      } else if (v.select === rank) {
        v.select = 0;
      }

      return v;
    });

    this.setState({ isPossibleTime: times });
  }

  async getSpotInfo() {
    if (!this.props.spotCode) {
      return;
    }

    const result = await RootStore.client.query({
      query: getSpotReserve,
      variables: { code: this.props.spotCode, is_reserve: true },
    });
    const spot = result.data.getSpotReserve.spot;
    const result2 = await RootStore.client.query({
      query: getSpotOptionList,
      variables: { spot_code: this.props.spotCode },
    });
    const moreInformationSpot = result2.data.getSpotOptionList.options;
    spot.options.forEach(e => {
      let temp = moreInformationSpot.find(a => e.code === a.code);
      if (!e.images && e.p_code === 0 && temp) {
        e.images = temp.images;
      }
    });
    let userTrans = spot.translations.filter(v => v.language === RootStore.language);
    if (userTrans.length === 0) {
      userTrans = spot.translations.filter(v => v.language === 'ko');
    }
    const deliverFee = this.props.requireInfo?.delivery_fee;
    const minAmount = this.props.requireInfo?.min_order_amount;
    const title = userTrans.length > 0 ? userTrans[0].spot_name : '';
    const titleKorea = spot.translations.filter(v => v.language === 'ko')[0].spot_name;

    let requireDate = false;
    if (this.props.requireInfo.is_require_date) {
      requireDate = true;
    }

    let requireTime = false;
    if (this.props.requireInfo.is_require_time) {
      requireTime = true;
    }
    const timeUnit = this.props.requireInfo.time_unit;
    const limit = this.props.requireInfo.reserve_limit_date
      ? this.props.requireInfo.reserve_limit_date
      : 30;
    const limitDate = moment()
      .add(limit, 'days')
      .format('YYYY-MM-DD');
    const min = this.props.requireInfo.is_require_day ? this.props.requireInfo.is_require_day : 0;
    const minDate = moment()
      .add(min, 'days')
      .format('YYYY-MM-DD');

    const products = [];
    let showPriceBox = false;
    spot.options.map(v => {
      const information = JSON.parse(v.information);
      const images = v.images || '';
      const nameObj = JSON.parse(v.name);
      if (nameObj[RootStore.language] === '') return;

      if (v.p_code === 0) {
        const priceObj = {
          code: v.code,
          information: information && information[RootStore.language],
          images: images,
          name: nameObj[RootStore.language],
          ko_name: nameObj.ko,
          price: String(v.price),
          discount_price: String(v.discount_price),
          fees: v.fees,
          settlement_price: v.settlement_price,
          is_dropdown: v.is_dropdown === '1',
          count: 0,
          options: [],
        };
        const lv2 = spot.options.filter(f => v.code === f.p_code);
        lv2.map((v2, idx) => {
          const nameObj2 = JSON.parse(v2.name);
          if (nameObj2[RootStore.language] === '') return;
          priceObj.options.push({
            code: v2.code,
            name: nameObj2[RootStore.language],
            ko_name: nameObj2.ko,
            price: String(v2.price),
            discount_price: String(v2.discount_price),
            fees: v2.fees,
            settlement_price: v2.settlement_price,
            is_dropdown: v2.is_dropdown === '1',
            count: 0,

            options: [],
          });
          const lv3 = spot.options.filter(f => v2.code === f.p_code);
          lv3.map(v3 => {
            const nameObj3 = JSON.parse(v3.name);
            if (nameObj3[RootStore.language] === '') return;
            priceObj.options[idx].options.push({
              code: v3.code,
              name: nameObj3[RootStore.language],
              ko_name: nameObj3.ko,
              price: String(v3.price),
              discount_price: String(v3.discount_price),
              fees: v3.fees,
              settlement_price: v3.settlement_price,
              is_dropdown: v3.is_dropdown === '1',
              count: 0,

              options: [],
            });
          });
        });
        products.push(priceObj);
      }
    });

    const reserve_hours = JSON.parse(spot.spot_reserve.reserve_hours);
    const arrayOfDisabledDays = [];
    if (!reserve_hours.sunday.is_able) {
      arrayOfDisabledDays.push(0);
    }
    if (!reserve_hours.monday.is_able) {
      arrayOfDisabledDays.push(1);
    }
    if (!reserve_hours.tuesday.is_able) {
      arrayOfDisabledDays.push(2);
    }
    if (!reserve_hours.wednesday.is_able) {
      arrayOfDisabledDays.push(3);
    }
    if (!reserve_hours.thursday.is_able) {
      arrayOfDisabledDays.push(4);
    }
    if (!reserve_hours.friday.is_able) {
      arrayOfDisabledDays.push(5);
    }
    if (!reserve_hours.saturday.is_able) {
      arrayOfDisabledDays.push(6);
    }

    let step = ReserveStep.Select_DateTime;
    if (!requireDate) {
      step = ReserveStep.Select_Product;
    }
    const requiredInfo = JSON.parse(spot.spot_reserve.required_info);
    const restrictDate = {
      unable_days: spot.spot_reserve.unable_days,
      is_require_period: spot.spot_reserve.is_require_period,
      reserve_period_hours: spot.spot_reserve.reserve_period_hours,
      is_possible_period: spot.spot_reserve.is_possible_period,
      is_impossible_period: spot.spot_reserve.is_impossible_period,
    };
    const getMonthYear = moment().format('YYYY-MM');
    const getDates = await RootStore.client.query({
      query: getPossibleDates,
      variables: { spotCode: this.props.spotCode, requestDate: getMonthYear },
    });
    const possibleDates = getDates.data.getPossibleDates.dates;
    const totalDiscountPrice = !deliverFee ? 0 : deliverFee;
    this.setState(
      {
        title,
        titleKorea,
        spot,
        minAmount,
        deliverFee,
        possibleDates,
        totalDiscountPrice,
        products,
        step,
        requireDate,
        requireTime,
        timeUnit,
        limitDate,
        minDate,
        showPriceBox,
        arrayOfDisabledDays,
        requiredInfo,
        restrictDate,
        selectProductFirst: null,
        selectProductSecond: null,
      },
      () => {
        this.createBlockDate();
      },
    );
  }

  checkRequire() {
    let result = { result: true, message: '' };
    const totalCount = this.totalProductCount();

    if (totalCount < this.state.spot.spot_reserve.min_order_count) {
      result.result = false;
      result.message = RootStore.i18n.t('reserve.need-more-product');
    }

    if (totalCount > this.state.spot.spot_reserve.max_order_count) {
      result.result = false;
      result.message = RootStore.i18n.t('reserve.so-much-product');
    }

    if (totalCount < 1) {
      result.result = false;
      result.message = RootStore.i18n.t('reserve.need-product');
    }
    if (this.state.totalDiscountPrice - this.state.deliverFee < this.state.minAmount) {
      result.result = false;
      result.message = RootStore.i18n.t('reserve.need-more-amount', {
        totalPrice: this.state.minAmount,
      });
    }
    return result;
  }

  async checkReserveTime() {
    //* 예약 가능 시간 받아옴.
    //* 1. 선택한 날짜의 요일
    //* const day = moment(this.state.selectDate, 'YYYY-MM-DD').day();
    //* 0 일요일

    //* 시간 초기화
    const variables = {
      spotCode: this.props.spotCode,
      requestDate: this.state.selectDate,
    };
    const result = await RootStore.client.query({
      query: getPossibleTimes,
      variables,
    });
    let isPossibleTime = result.data.getPossibleTimes.times.map(v => {
      return {
        time: v,
        select: 0,
      };
    });

    this.setState({
      isPossibleTime,
    });
  }

  onClickDeleteParentProduct(product, index) {
    let temp = this.state.cartProducts;
    if (product.parent.code === temp[index].parent.code) {
      temp = this.state.cartProducts.filter(item => item.parent.code !== product.parent.code);
    }
    this.setState({ cartProducts: temp }, () => {
      this.totalProductCount();
    });
  }

  onClickDeleteItem(item) {
    let temp = this.state.cartProducts;
    temp = this.state.cartProducts.filter(v => v.code !== item.code);
    this.setState({ cartProducts: temp }, () => {
      this.totalProductCount();
    });
  }

  onClickDecreaseCount(product) {
    let temp = this.state.cartProducts;
    if (product.count === 1) {
      //* remove product
      temp = this.state.cartProducts.filter(item => item.code !== product.code);
    } else {
      product.count = product.count - 1;
      temp = this.state.cartProducts.map(item => {
        if (item.code === product.code) {
          return product;
        }
        return item;
      });
    }
    this.setState({ cartProducts: temp }, () => {
      this.totalProductCount();
    });
  }

  onClickIncreaseCount(product) {
    let temp = this.state.cartProducts;

    product.count = product.count + 1;
    temp = this.state.cartProducts.map(item => {
      if (item.code === product.code) {
        return product;
      }
      return item;
    });

    this.setState({ cartProducts: temp }, () => {
      this.totalProductCount();
    });
  }

  totalProductCount() {
    let totalCount = 0;
    let totalPrice = !this.state.deliverFee ? 0 : this.state.deliverFee;
    let totalDiscountPrice = !this.state.deliverFee ? 0 : this.state.deliverFee;
    const reserveItemList = [];
    this.state.cartProducts.forEach(v => {
      totalCount += v.count;
      v.price === 'null' ? (v.price = 0) : (totalPrice += v.count * v.price);
      v.discount_price === 'null'
        ? (v.discount_price = 0)
        : (totalDiscountPrice += v.count * parseInt(v.discount_price, 10));
      let tempShowName = '';
      let tempKoName = '';
      if (v.name) {
        tempShowName = v.name;
      }
      if (v.parent && v.parent.name) {
        tempShowName = v.parent.name + '|' + tempShowName;
      }
      if (v.parent && v.parent.parent && v.parent.parent.name) {
        tempShowName = v.parent.parent.name + '|' + tempShowName;
      }
      if (v.ko_name) {
        tempKoName = v.ko_name;
      }
      if (v.parent && v.parent.ko_name) {
        tempKoName = v.parent.ko_name + '|' + tempKoName;
      }
      if (v.parent && v.parent.parent && v.parent.parent.ko_name) {
        tempKoName = v.parent.parent.ko_name + '|' + tempKoName;
      }
      if (v.count > 0 && !v.parent.name && !v.parent.parent) {
        reserveItemList.push({
          ...v,
          count: v.count,
          show_name: tempShowName,
          ko_name: tempKoName,
          language: RootStore.language,
        });
      }
      if (v.parent && v.parent.name && !v.parent.parent) {
        v.parent.price === 'null'
          ? (v.parent.price = 0)
          : (totalPrice += v.parent.count * v.parent.price);
        v.parent.discount_price === 'null'
          ? (v.parent.discount_price = 0)
          : (totalDiscountPrice += v.parent.count * parseInt(v.parent.discount_price, 10));

        reserveItemList.push({
          ...v,
          count: v.count,
          show_name: tempShowName,
          ko_name: tempKoName,
          language: RootStore.language,
        });
      }

      if (v.parent.parent && v.count > 0) {
        v.parent.parent.price === 'null'
          ? (v.parent.parent.price = 0)
          : (totalPrice += v.parent.parent.count * v.parent.parent.price);
        v.parent.parent.discount_price === 'null'
          ? (v.parent.parent.discount_price = 0)
          : (totalDiscountPrice +=
              v.parent.parent.count * parseInt(v.parent.parent.discount_price, 10));

        reserveItemList.push({
          ...v,
          count: v.count,
          show_name: tempShowName,
          ko_name: tempKoName,
          language: RootStore.language,
        });
      }
    });

    this.setState({
      price: reserveItemList,
      totalCount,
      totalPrice,
      totalDiscountPrice,
    });
    return totalCount;
  }

  async onClickCompleteSelect() {
    let step = ReserveStep.Select_DateTime;
    if (!(this.state.requireDate && this.state.requireTime)) {
      step = ReserveStep.Select_Product;
    }

    if (this.state.step === ReserveStep.Select_DateTime) {
      if (this.state.selectDate === '') {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.need-date'),
        });
        return;
      }

      if (this.state.requireTime) {
        let selectTime = '';
        this.state.isPossibleTime.forEach((v, i) => {
          if (v.select !== 0) {
            selectTime = v.time;
          }
        });

        if (selectTime === '') {
          this.setState({
            alertShow: true,
            titleAlert: RootStore.i18n.t('reserve.reserve-time'),
          });
          return;
        }

        this.setState({ selectTime });
      }
      step = ReserveStep.Select_Product;
    } else if (this.state.step === ReserveStep.Select_Product) {
      await this.onCloseAnimationDropdown();

      if (this.state.requireDate && !this.state.requireTime) {
        if (this.state.selectDate === '') {
          this.setState({
            alertShow: true,
            titleAlert: RootStore.i18n.t('reserve.need-date'),
          });
          return;
        }
      }

      const requireItem = this.checkRequire();
      if (!requireItem.result) {
        this.setState({
          alertShow: true,
          titleAlert: requireItem.message,
        });

        return;
      }

      step = ReserveStep.Input_Infomation;
    } else if (this.state.step === ReserveStep.Input_Infomation) {
      let haveWrongType = false;
      this.state.newRequireInfo.forEach(v => {
        if (!v.content) {
          this.setState({
            alertShow: true,
            titleAlert: `Please enter ${v.header} `,
          });
          haveWrongType = true;
        }
      });
      if (haveWrongType) {
        return;
      }
      if (this.state.name === '') {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.please-input-name'),
        });
        haveWrongType = true;

        return;
      } else if (this.state.country === 'none') {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.please-select-country'),
        });
        haveWrongType = true;

        return;
      } else if (this.state.email === '') {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.please-input-email'),
        });
        haveWrongType = true;

        return;
      } else if (!this.validateEmail(this.state.email)) {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.invalid-email'),
        });
        haveWrongType = true;

        return;
      } else if (this.state.telephone === '') {
        haveWrongType = true;
        this.setState({
          alertShow: true,
          titleAlert: `You must be provite mobile phone number`,
        });
        return;
      } else if (this.state.social === '') {
        this.setState({
          alertShow: true,
          titleAlert: RootStore.i18n.t('reserve.please-input-social'),
        });
        haveWrongType = true;
        return;
      }

      if (this.state.requiredInfo.birthday && this.state.birthday === '') {
      }
      if (this.state.requiredInfo.delivery_address && this.state.deliveryAddress === '') {
      }
      if (this.state.requiredInfo.nationality_name && this.state.nationalityName === '') {
      }
      if (this.state.requiredInfo.hotel_name && this.state.hotelName === '') {
      }
      if (this.state.requiredInfo.flight_number && this.state.flightNumber === '') {
      }
      if (this.state.requiredInfo.gender && this.state.gender === null) {
      }
      if (!haveWrongType) {
        const result = await this.reqSendReserveData();
        if (result.result) {
          if (this.state.spot.spot_reserve.is_require_payment) {
            const result2 = await RootStore.client.query({
              query: getReserve,
              variables: {
                code: result.reserve.code,
                language: 'en',
              },
            });
            Alert.alert(
              '',
              RootStore.i18n.t('reserve.need-payment'),
              [{ text: RootStore.i18n.t('global.close') }],
              { cancelable: true },
            );
            Actions.reservePayment({
              spotCode: `${this.state.spot.code}`,
              spotName: this.state.title,
              spot_name_ko: this.state.titleKorea,
              reserve: result2.data.getReserveDetail.reserve,
              // eximFgkey: result2.data.getReserveFGKey.fgkey,
            });
          } else if (this.state.spot.spot_reserve.is_require_confirm) {
            Alert.alert(
              '',
              RootStore.i18n.t('reserve.need-confirm'),
              [{ text: RootStore.i18n.t('global.close') }],
              { cancelable: true },
            );
            this.setState({
              reserveCode: result.reserve.reserve_code,
            });
            step = ReserveStep.Check_Reserve;
          } else {
            Alert.alert(
              '',
              RootStore.i18n.t('reserve.complete-reserve'),
              [{ text: RootStore.i18n.t('global.close') }],
              { cancelable: true },
            );
            this.setState({
              reserveCode: result.reserve.reserve_code,
            });
            step = ReserveStep.Check_Reserve;
          }
        } else {
          this.setState({
            alertShow: true,
            titleAlert: RootStore.i18n.t('reserve.check-reserve'),
          });
        }
      }
    } else if (this.state.step === ReserveStep.Check_Reserve) {
      Actions.reset('myPage');
      return;
    }

    this.setState({ step });
  }

  async reqSendReserveData() {
    const selectTime = this.state.isPossibleTime.find(v => v.select === 1);
    const dataInfos =
      this.state.newRequireInfo && this.state.newRequireInfo
        ? this.state.newRequireInfo.map(v => ({
            code: v.code,
            value: v.content,
            name:
              v &&
              v.translations &&
              v.translations.find(e => {
                return e.language === RootStore.language;
              })
                ? v.translations.find(e => {
                    return e.language === RootStore.language;
                  }).header
                : v.translations[0].header,
            koName:
              v &&
              v.translations &&
              v.translations.find(e => {
                return e.language === 'ko';
              })
                ? v.translations.find(e => {
                    return e.language === 'ko';
                  }).header
                : v.translations[0].header,
          }))
        : [];
    this.state.newRequireInfo.map(v => {
      if (v.content === '') {
        return { result: false };
      }
    });
    if (this.state.price.length === 0) {
      return { result: false };
    }

    const tranlationOfSpot =
      this.state.spot.translations && this.state.spot.translations.find(e => e.language === 'ko')
        ? this.state.spot.translations.find(e => e.language === 'ko')
        : this.state.spot.translations[0];
    const variables = {
      // spotName: Util.encodeURI(this.state.title),
      spotCode: this.props.spotCode,
      name: this.state.name,
      country: this.state.countryList[this.state.country],
      email: this.state.email,
      social: this.state.SNSInformation + ' - ' + this.state.social,
      reserveItem: JSON.stringify(this.state.price),
      // reserveItem: `[{"code":18929,"p_code":0,"name":"Honey Original","price":0,"information":"{}","is_reserve":true,"discount_price":15000,"images":[{"url":"https://api.creatrip.com/image/item/18929/t0iavvgqeqcwvfziztfyfm964k2elixi.png","__typename":"spotOptionImageType"}],"__typename":"spotOptionType","count":1,"show_name":"Honey Original","ko_name":"허니오리지날","language":"en"}]`,
      infos: dataInfos,
      reserveDate: this.mergeDateTime(selectTime),
      telephone: this.state.telephone,
      // platform: 'pc-web',
      platform: 'mobile-app',
      version: this.version,
      spotName: {
        is_publish: tranlationOfSpot.is_publish,
        language: tranlationOfSpot.language,
        more_infomation: tranlationOfSpot.more_infomation,
        precautions: tranlationOfSpot.precautions,
        spot_name: tranlationOfSpot.spot_name,
        spot_search_title: tranlationOfSpot.spot_search_title,
        title_price: tranlationOfSpot.title_price,
      },
    };
    // const variables = {
    //   country: 'Korea, Republic of',
    //   email: 'trangthuanbinh3696@gmail.com',
    //   infos: [
    //     {
    //       code: 7,
    //       koName: '배달주소',
    //       name: 'Delivery Address (in English)',
    //       value: 'pham the hien',
    //     },
    //     {
    //       code: 30,
    //       koName: '수령인 이름',
    //       name: "Recipient's name",
    //       value: 'aabbccdd',
    //     },
    //     {
    //       code: 31,
    //       koName: '수령인 연락처',
    //       name: "Recipient's phone number",
    //       value: '0783611897',
    //     },
    //   ],
    //   name: 'thuan binh',
    //   platform: 'pc-web',
    //   reserveDate: this.mergeDateTime(selectTime),
    //   reserveItem:
    //     '[{"code":18930,"p_code":0,"name":"Kyochon Original","price":0,"information":"{}","is_reserve":true,"discount_price":15000,"images":[{"url":"https://api.creatrip.com/image/item/18930/u6v4iwd2u1hd83vy4frz0ohxc3wlmadd.png","__typename":"spotOptionImageType"}],"__typename":"spotOptionType","count":1,"show_name":"Kyochon Original","ko_name":"교촌오리지날","language":"en"}]',
    //   social: 'LINE - 123123123',
    //   spotCode: 11251,
    //   spotName: {
    //     is_publish: true,
    //     language: 'ko',
    //     more_infomation:
    //       '주문할 때 배달 목적지의 정확한 영어 또는 한국어 주소를 기입해 주세요.  숙소인 경우 호텔 이름을 주소와 함께 기입해 주시면 정확한 배달에 도움이 됩니다. ↵만약 일반 건물이나 오피스텔, 원룸에 거주하는 경우 층 및 호수 까지 기재해 주세요. (예: 2층 201호) 보다 정확한 배달을 할 수 있습니다. ↵호텔에서 주문하는 경우 주문 한 후 30~1시간 내 로비에서 기다려야 합니다. 배달원은 호텔 방 안으로 들어갈 수 없습니다.↵보통 40-60 분 정도 걸려서 요리되고 배달됩니다. 명동 지역에서 주문하는 고객은 최대 90분이 소요될 수 있으며, 주말에 다른 지역 배달도 조금 늦어질 수 있습니다. ↵배달을 예약할 수 있습니다. (배달받을 날짜와 시간을 선택해주세요.)↵주문은 14:00부터 22:00까지이며, 마지막 주문 시간은 22:00입니다. 영업시간 이외 들어온 주문은 모두 100% 취소 및 환불 됩니다.↵배달은 시 지역만 가능합니다. 군은 배달이 안됩니다. *예) 서울시 O / 장성군 X ↵주문 후에 모든 고객은 반드시 LINE ID "@creatrip" 또는 Whatsapp +821022802116 으로 주문을 완료하였음을 이야기해 주세요. 이는 만약 배달원을 만나지 못하는 등의 경우를 방지하고 돌발상황에 유연하게 대처하기 위해서 입니다. 만약 먼저 연락하지 않을 경우 주문이 원활하게 진행되지 않을 수 있으며, 이 경우 환불이 불가능합니다.↵만약 배달원이 도착했으나 작성한 LINE 또는 Whatsapp 아이디로 연락이 닿지 않는 경우, 배달원이 바로 떠날 수 있습니다. 이 경우 환불은 불가능합니다. 항상 핸드폰을 확인해 주세요. ↵지역에 따라 간혹 배달량이 폭증하거나 거리가 상대적으로 멀어 상황에 따라 배달이 불가능한 경우가 있을 수 있습니다. 이 경우, 주문이 진행되기 전에 100% 환불 되므로 걱정하지 않으셔도 됩니다. ',
    //     precautions:
    //       '이제 크리에이트립에서는 한국에서 가장 유명한 치킨 브랜드, 교촌에서 외국인도 치킨을 주문할 수 있습니다. ↵교촌치킨은 한국에서 치킨으로 가장 유명한 지역인 대구에서 시작해 전국적으로 성장한 한국의 대표적인 프랜차이즈입니다.↵한국사람이 교촌치킨에서 가장 좋아하는 것은 바로 <허니 오리지날>! 달콤 짭쪼름한 소스와 함께 튀겨진 치킨의 맛이 일품입니다. ↵두 번째로 인기가 많은 메뉴는 <레드 오리지날> 입니다. 한국사람들이 매콤한 음식을 좋아해서에요. 많이 맵지는 않지만 매운맛이 익숙하지 않다면 <허니 오리지날>이나 <교촌 오리지날>을 먹는걸 추천해요. ↵<교촌 오리지날>은 기본적인 간장 소스와 튀긴 치킨입니다. 교촌 오리지날도 정말 맛있어요 ~',
    //     spot_name: '교촌치킨 배달',
    //     spot_search_title: '',
    //     title_price: '{"normal":"￦16,000","cancel":""}',
    //   },
    //   telephone: '0783611897',
    // };

    if (this.state.birthday !== '') {
      variables.birthday = moment(this.state.birthday).format('YYYY-MM-DD HH:mm:ss');
    }

    if (this.state.deliveryAddress !== '') {
      variables.deliveryAddress = this.state.deliveryAddress;
    }

    if (this.state.telephone !== '') {
      variables.telephone = this.state.telephone;
    }

    if (this.state.nationalityName !== '') {
      variables.nationalityName = this.state.nationalityName;
    }

    if (this.state.hotelName !== '') {
      variables.hotelName = this.state.hotelName;
    }

    if (this.state.flightNumber !== '') {
      variables.flightNumber = this.state.flightNumber;
    }

    if (
      this.state.gender === Const.GenderType.male.code ||
      this.state.gender === Const.GenderType.female.code
    ) {
      variables.gender = this.state.gender;
    }

    if (this.props.reserveCode) {
      variables.code = this.props.spotCode;
      variables.isUserPage = 1;

      const result = await RootStore.client.mutate({
        mutation: updateReserve,
        variables,
      });
      if (result.data.updateReserve.result) {
        return result.data.updateReserve;
      }
    } else {
      const result = await RootStore.client.mutate({
        mutation: createReserve,
        variables,
      });
      if (result.data.createReserve.result) {
        this.setState({ confirmInfomation: result.data.createReserve.reserve });

        return result.data.createReserve;
      }
    }

    return { result: false };
  }

  mergeDateTime(_time) {
    if (_time !== undefined) {
      return `${this.state.selectDate} ${_time.time}`;
    }
    return `${this.state.selectDate}`;
  }

  initProductCount() {
    const products = this.state.products;
    products.forEach(p => {
      p.count = 0;

      p.options.forEach(p2 => {
        p2.count = 0;

        p2.options.forEach(p3 => {
          p3.count = 0;
        });
      });
    });

    this.setState({ products }, () => {
      this.totalProductCount();
    });
  }

  addFirstParentToCart(product, parent) {
    let temp = { ...product, parent };
    let tempSort = this.state.cartProducts;
    const isExistedItem = this.state.cartProducts.findIndex(e => e.code === temp.code) >= 0;
    if (isExistedItem) {
      return this.state.cartProducts.filter(e => e.code === temp.code);
    }
    const isExistedParent =
      this.state.cartProducts.findIndex(e => e.parent.code === temp.parent.code) >= 0;
    if (isExistedParent) {
      tempSort = this.state.cartProducts.splice(
        this.state.cartProducts.findIndex(e => e.parent.code === temp.parent.code),
        0,
        temp,
      );
    }
    this.setState(
      {
        cartProducts: this.state.cartProducts.find(
          item => item && product && item.code === product.code,
        )
          ? this.state.cartProducts
          : isExistedParent
          ? [tempSort]
          : [temp, ...this.state.cartProducts],
      },
      () => {
        if (temp.count !== 1) {
          this.onClickIncreaseCount(temp);
        }
      },
    );
  }
  selectProduct(_index) {
    //* 상품이 선택될 때, 하위 옵션이 없는게 있으면 가격상자 보여준다.
    let showPriceBox = false;
    let selectProductFirst = null;

    if (this.state.selectProductFirst === null) {
      selectProductFirst = this.state.products[_index];
      //*look see have step3?
      if (selectProductFirst.options[0].options.length > 0) {
        this.haveStep3 = true;
      }
      selectProductFirst.options.forEach(v => {
        if (v.options.length === 0) {
          showPriceBox = true;
        }
      });
    }
    this.setState({
      showPriceBox,
      selectProductFirst,
    });
  }

  selectProduct2(_index, parent) {
    // *상품이 선택될 때, 하위 옵션이 없는게 있으면 가격상자 보여준다.
    let showPriceBox = false;
    let selectProductFirst = null;
    let selectProductSecond = null;
    if (this.state.selectProductFirst !== null) {
      selectProductFirst = this.state.selectProductFirst;
      selectProductSecond = selectProductFirst.options[_index];
      selectProductSecond.options.forEach(v => {
        if (v.options.length === 0) {
          showPriceBox = true;
        }
      });
    }

    this.setState({
      showPriceBox,
      selectProductSecond: { ...selectProductSecond, parent },
    });
  }
  selectProduct3(_index) {
    //* 상품이 선택될 때, 하위 옵션이 없는게 있으면 가격상자 보여준다.
    let showPriceBox = false;
    let selectProductThird = null;
    let selectProductSecond = null;
    if (this.state.selectProductSecond !== null) {
      selectProductSecond = this.state.selectProductSecond;
      selectProductThird = selectProductSecond.options[_index];
      selectProductThird.options.forEach(v => {
        if (v.options.length === 0) {
          showPriceBox = true;
        }
      });
    }
    this.setState({
      showPriceBox,
      selectProductThird,
    });
  }

  onChangeName(param) {
    this.setState({ name: param });
  }

  onChangeCountry(param) {
    this.setState({ country: param });
  }

  onChangeEmail(param) {
    this.setState({ email: param });
  }

  onChangeSocial(param) {
    this.setState({ social: param });
  }

  onChangeRequest(param) {
    this.setState({ request: param });
  }

  onChangeBirthday(param) {
    this.setState({ birthday: param });
  }

  onChangeDeliveryAddress(param) {
    this.setState({ deliveryAddress: param });
  }

  onChangeTelephone(param) {
    this.setState({ telephone: param });
  }

  onChangeNationalityName(param) {
    this.setState({ nationalityName: param });
  }

  onChangeHotelName(param) {
    this.setState({ hotelName: param });
  }

  onChangeFlightNumber(param) {
    this.setState({ flightNumber: param });
  }

  onChangeGender(param) {
    this.setState({ gender: param });
  }
  onChangeSNSInformation(param) {
    this.setState({ SNSInformation: param });
  }

  onClickGoBack() {
    if (this.state.step === ReserveStep.Select_DateTime) {
      Actions.pop();
    } else if (this.state.step === ReserveStep.Select_Product) {
      //* 2단계가 선택되어있으면

      if (this.state.selectProductSecond) {
        let showPriceBox = false;

        this.state?.selectProductSecond?.options?.forEach(v => {
          if (v.options.length === 0) {
            showPriceBox = false;
          }
        });

        this.setState({
          chosenProductLevel2: '',
          chosenProductLevel3: '',
          showPriceBox,
          selectProductSecond: null,
          selectProductStep2: null,
        });
      }
      // *2단계는 안했고 1단계가 선택되어있으면
      else if (this.state.selectProductFirst) {
        this.state?.selectProductFirst?.options.map(v => {
          if (v.count > 0) {
            this.alreadyProduct.push({ ...v, parent: this.state.selectProductFirst });
          }
        });
        this.haveStep3 = false;
        this.setState({
          chosenProductLevel2: '',
          chosenProductLevel1: '',
          selected: '',
          selectProductFirst: null,
          checkItemFirstSelectProduct: null,
          selectProduct: '',
        });
      } else {
        let step = ReserveStep.Select_DateTime;
        if (!this.state.requireDate) {
          step = ReserveStep.Select_Product;
        }

        if (!(this.state.requireDate && this.state.requireTime)) {
          Actions.pop();
        }

        this.setState({ step });
      }
    } else if (this.state.step === ReserveStep.Input_Infomation) {
      this.setState({ step: ReserveStep.Select_Product });
    } else if (this.state.step === ReserveStep.Check_Reserve) {
      this.setState({ step: ReserveStep.Input_Infomation });
    }
  }

  onClickReset() {
    this.setState({ step: ReserveStep.Select_DateTime });
  }

  renderNext = position => (
    <MyTouchableOpacity
      style={
        position
          ? [
              ptShadow.BLUR0,
              {
                backgroundColor: COLOR.appColor,
                position: 'absolute',
                alignSelf: 'flex-end',
                width: 50 * WIDTH_SCALE_RATIO,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50 * WIDTH_SCALE_RATIO,
                borderRadius: 25 * WIDTH_SCALE_RATIO,
                bottom: 20,
                right: 20 * WIDTH_SCALE_RATIO,
                zIndex: 999999,
              },
            ]
          : [
              ptShadow.BLUR0,
              {
                backgroundColor: COLOR.appColor,
                alignSelf: 'flex-end',
                width: 50 * WIDTH_SCALE_RATIO,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50 * WIDTH_SCALE_RATIO,
                borderRadius: 25 * WIDTH_SCALE_RATIO,
                zIndex: 999999,
              },
            ]
      }
      onPress={this.onClickCompleteSelect.bind(this)}>
      <Image
        source={ICON.NEXT_ICON}
        resizeMode="contain"
        style={{
          width: '100%',
          height: 18 * WIDTH_SCALE_RATIO,
          tintColor: 'white',
        }}
      />
    </MyTouchableOpacity>
  );

  renderHeader() {
    switch (this.state.step) {
      case ReserveStep.Select_DateTime:
        return (
          <BaseHeaderWithSearch
            noShadow
            backgroundColorWhite
            showBack
            leftIconStyle={{ tintColor: COLOR.appColor }}
            onLeftPress={this.onClickGoBack}
          />
        );
      case ReserveStep.Select_Product:
        return (
          <BaseHeader
            noShadow
            // leftIconStyle={{ tintColor: COLOR.appColor }}
            // leftIcon={ICON.BACK_ICON}
            // onLeftPress={this.onClickGoBack}
            // leftIconType="Image"
            hideBackButton
            children={
              this.state.requireTime ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* <MyTouchableOpacity onPress={this.onClickGoBack}>
                    <Image
                      source={ICON.BACK_ICON}
                      resizeMode="contain"
                      style={{
                        width: 16 * WIDTH_SCALE_RATIO,
                        height: 16 * WIDTH_SCALE_RATIO,
                        marginRight: 10 * WIDTH_SCALE_RATIO,
                        tintColor: COLOR.PRIMARY,
                      }}
                    />
                  </MyTouchableOpacity> */}
                  {this.renderSelectedDate()}
                  {this.renderSelectedTime()}
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  {/* <MyTouchableOpacity onPress={this.onClickGoBack}>
                    <Image
                      source={ICON.BACK_ICON}
                      resizeMode="contain"
                      style={{
                        width: 16 * WIDTH_SCALE_RATIO,
                        height: 16 * WIDTH_SCALE_RATIO,
                        marginRight: 10 * WIDTH_SCALE_RATIO,
                        tintColor: COLOR.PRIMARY,
                      }}
                    />
                  </MyTouchableOpacity> */}
                  {this.renderSelectedDate()}
                </View>
              )
            }
          />
        );

      default:
        break;
    }
  }

  render() {
    if (this.state.spot === null) {
      return <View style={{ flex: 1 }} />;
    }

    return (
      <View style={{ flex: 1 }}>
        {this.state.step === ReserveStep.Check_Reserve && (
          <BaseHeaderWithSearch
            backgroundColorWhite
            showBack
            leftIconStyle={{ tintColor: COLOR.appColor }}
            rightIconType={null}
          />
        )}

        <View style={{ flex: 1 }}>
          {this.state.step === ReserveStep.Select_DateTime && this.renderSelectDateTime()}
          {this.state.step === ReserveStep.Select_Product && this.renderSelectProduct()}
          {this.state.step === ReserveStep.Input_Infomation && this.renderInputBookerInfo()}
          {this.state.step === ReserveStep.Check_Reserve && this.renderFinalCheck()}
        </View>
        {/* render step booking reservation */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flex: 1,
            width: '100%',
            // backgroundColor: '#fff',
            // backgroundColor: 'red',
          }}>
          {this.state.step === ReserveStep.Select_Product && (
            <Animated.View
              onLayout={event => {
                if (
                  event.nativeEvent &&
                  event.nativeEvent.layout &&
                  event.nativeEvent.layout.height
                ) {
                  this.viewHeight = event.nativeEvent.layout.height;
                }
              }}
              style={[
                ptShadow.BLUR20,
                {
                  borderTopWidth: 2 * HEIGHT_SCALE_RATIO,
                  borderColor: COLOR.appBorderColor,
                  borderTopRightRadius: 30 * WIDTH_SCALE_RATIO,
                  borderTopLeftRadius: 30 * WIDTH_SCALE_RATIO,
                  minHeight: 36 * HEIGHT_SCALE_RATIO,
                  transform: [
                    {
                      translateY: this.scaleYValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [this.viewHeight - 32 * HEIGHT_SCALE_RATIO, 0],
                      }),
                    },
                  ],
                },

                // { transform: [{ translateY: this.state.scrollY }] },
              ]}>
              <View style={{ flex: 1, alignItems: 'center', marginTop: 5 * HEIGHT_SCALE_RATIO }}>
                <MyTouchableOpacity
                  style={{
                    paddingHorizontal: 12 * HEIGHT_SCALE_RATIO,
                  }}
                  onPress={() => this._toggleSubview(!this.state.isHide)}>
                  <Animated.Image
                    source={ICON.DROPDOWN_ICON}
                    style={{
                      marginLeft: 8 * WIDTH_SCALE_RATIO,
                      width: 14 * WIDTH_SCALE_RATIO,
                      height: 14 * WIDTH_SCALE_RATIO,
                      tintColor: COLOR.appTextSubColor,
                      transform: [
                        {
                          rotate: this.scaleYValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['180deg', '0deg'],
                          }),
                        },
                      ],
                    }}
                    resizeMode="contain"
                  />
                </MyTouchableOpacity>
              </View>
              <View>
                {this.renderProductValue()}
                {true ? (
                  <View
                    style={{
                      // borderTopWidth: 1,
                      // borderColor: COLOR.appBorderColor,
                      width: WIDTH,
                      position: 'absolute',
                      height: 80 * HEIGHT_SCALE_RATIO,
                      paddingTop: 0 * HEIGHT_SCALE_RATIO,
                      paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                      bottom: 0,
                      zIndex: 999,
                      backgroundColor: COLOR.WHITE,
                      justifyContent: 'center',
                    }}>
                    <PText style={[style.textSubTitle, { color: COLOR.GREY80 }]}>TOTAL</PText>
                    <PText style={[ptText.H1, ptColor.PRIMARY, { maxWidth: WIDTH * 0.7 }]}>
                      ￦{Util.price_comma(this.state.totalDiscountPrice)}
                    </PText>
                    {this.renderNext(true)}
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </Animated.View>
          )}
        </View>
        {this.state.step === ReserveStep.Check_Reserve ||
        this.state.step === ReserveStep.Select_Product
          ? null
          : this.renderNext(true)}
        <Modal
          backdropOpacity={0.3}
          animationIn="fadeInDown"
          isVisible={this.state.alertShow}
          onRequestClose={() => {
            this.setState({ alertShow: false });
          }}>
          <View
            style={{
              margin: 16 * WIDTH_SCALE_RATIO,
              backgroundColor: 'white',
              borderRadius: 8 * WIDTH_SCALE_RATIO,
              padding: 24 * WIDTH_SCALE_RATIO,
              justifyContent: 'center',
            }}>
            <Image
              source={ICON.ATTENTION_ICON}
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                width: 24 * WIDTH_SCALE_RATIO,
                height: 24 * WIDTH_SCALE_RATIO,
                tintColor: COLOR.GREY60,
              }}
            />
            <PText
              style={[
                style.textModal,
                {
                  marginTop: 8 * HEIGHT_SCALE_RATIO,
                  marginBottom: 32 * HEIGHT_SCALE_RATIO,
                },
              ]}>
              {this.state.titleAlert}
            </PText>
            <MyTouchableOpacity
              style={[style.buttonOutline, { alignSelf: 'center' }]}
              onPress={() => this.setState({ alertShow: false })}>
              <PText style={style.textButtonOutLine}>{RootStore.i18n.t('global.close')}</PText>
            </MyTouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  //* step1 - select date, time
  renderSelectDateTime() {
    analytics().setCurrentScreen('Select-DateTime');
    return (
      <Content style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <BaseHeaderWithSearch
          noShadow
          backgroundColorWhite
          showBack
          leftIconStyle={{ tintColor: COLOR.appColor }}
          onLeftPress={this.onClickGoBack}
        />
        <View
          style={{
            padding: 16 * WIDTH_SCALE_RATIO,
            borderColor: '#f5f5f5',
            backgroundColor: '#fff',
            width: '100%',
          }}>
          <Calendar
            headerStyle={{
              fontFamily:
                RootStore.language === 'en' || RootStore.language === 'vi'
                  ? 'Raleway-Regular'
                  : 'Roboto',
            }}
            onMonthChange={month => {
              this.setState({ selectDate: '' });
              this.onChangeMonth(moment(month.dateString).format('YYYY-MM'));
            }}
            markingType="custom"
            current={this.state.selectDate}
            minDate={this.state.minDate}
            maxDate={this.state.limitDate}
            markedDates={{
              ...this.state.blockDate,
              ...this.state.markDate,
            }}
            onDayPress={(day, localDay) => {
              this.onSelectDate(day, localDay);
            }}
            onDayLongPress={day => {
              this.onSelectDate(day);
            }}
            monthFormat="MMMM"
            renderArrow={direction => (
              <Image
                source={direction === 'left' ? ICON.BACK_ICON : ICON.NEXT_ICON}
                resizeMode="contain"
                style={{
                  width: 24 * WIDTH_SCALE_RATIO,
                  height: 24 * WIDTH_SCALE_RATIO,
                  tintColor: COLOR.GREY20,
                }}
              />
            )}
            theme={{
              todayTextColor: COLOR.PRIMARY,
              textDisabledColor: COLOR.GREY20,
              selectedDayTextColor: 'white',
              dayTextColor: COLOR.GREY80,
              textDayFontFamily:
                RootStore.language === 'en' || RootStore.language === 'vi'
                  ? 'Raleway-Regular'
                  : 'Roboto',
              textDayFontSize: ptText.BODY2.fontSize,
              'stylesheet.calendar.header': {
                dayHeader: {
                  fontFamily:
                    RootStore.language === 'en' || RootStore.language === 'vi'
                      ? 'Raleway-Regular'
                      : 'Roboto',
                  textTransform: 'uppercase',
                  color: COLOR.GREY40,
                },
                monthText: {
                  fontFamily:
                    RootStore.language === 'en' || RootStore.language === 'vi'
                      ? 'Raleway-Regular'
                      : 'Roboto',
                  fontSize: ptText.H1.fontSize,
                  color: COLOR.GREY80,
                  textTransform: 'uppercase',
                },
              },
              'stylesheet.day.single': IS_IOS ? selected_date_style : null,
            }}
          />
        </View>
        {this.state.requireTime && this.state.selectDate !== '' && (
          <View
            style={{
              justifyContent: 'center',
            }}>
            <PText
              style={[
                style.textHeader,
                {
                  fontSize: ptText.H1.fontSize,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                },
              ]}>
              TIME
            </PText>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 0 * HEIGHT_SCALE_RATIO,
                paddingTop: 15 * HEIGHT_SCALE_RATIO,
                paddingBottom: 15 * HEIGHT_SCALE_RATIO,
              }}>
              {this.state.selectDate !== '' && (
                <FlatList
                  bounces={false}
                  keyExtractor={(item, index) => `key ${index}`}
                  showsVerticalScrollIndicator={false}
                  data={this.state.isPossibleTime}
                  numColumns={4}
                  renderItem={v => (
                    <View
                      key={`time-Rank-${v.index}`}
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '25%',
                      }}>
                      {v.item.select === this.state.timeRank + 1 && (
                        <MyTouchableOpacity
                          style={{ paddingVertical: 10 * HEIGHT_SCALE_RATIO }}
                          onPress={this.onSelectTime.bind(this, v.index, 0)}>
                          <PText
                            style={[style.text, { color: COLOR.PRIMARY, textAlign: 'center' }]}>
                            {v.item.time}
                          </PText>
                        </MyTouchableOpacity>
                      )}
                      {v.item.select !== this.state.timeRank + 1 && v.item.select === 0 && (
                        <MyTouchableOpacity
                          style={{
                            paddingVertical: 10 * HEIGHT_SCALE_RATIO,
                          }}
                          onPress={this.onSelectTime.bind(this, v.index, this.state.timeRank + 1)}>
                          <PText style={[style.text, { color: COLOR.GREY80, textAlign: 'center' }]}>
                            {v.item.time}
                          </PText>
                        </MyTouchableOpacity>
                      )}
                    </View>
                  )}
                />
              )}
              {this.state.selectDate === '' && (
                <PText
                  style={{
                    fontSize: RootStore.fontSize(2.4),
                    fontWeight: '400',
                    color: '#767676',
                  }}>
                  {RootStore.i18n.t('reserve.need-date')}
                </PText>
              )}
            </View>
          </View>
        )}
        <View style={{ height: 70 * HEIGHT_SCALE_RATIO }} />
      </Content>
    );
  }
  //* step2 - select product
  renderSelectProduct() {
    analytics().setCurrentScreen('Select-Product');

    return (
      <Content contentContainerStyle={{ paddingBottom: HEIGHT / 1.5 }}>
        {this.state.requireDate && (
          <View
            style={{
              borderColor: '#f5f5f5',
              backgroundColor: '#fff',
              width: '100%',
            }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} />
          </View>
        )}
        {this.renderFirstItemList()}

        {/* {this.state.selectProductFirst === null &&
          this.haveStep3 === false &&
          this.renderFirstItemList()} */}

        {/* {this.state.selectProductFirst !== null &&
          this.state.checkItemFirstSelectProduct !== 1 &&
          this.state.selectProductSecond === null && (
            <View
              style={{
                width: WIDTH,
              }}>
              {this.renderSecondItemList()}
            </View>
          )} */}
        {/* error may be here */}
        {/* {this.state.selectProductSecond !== null && <View>{this.renderThirdItemList()}</View>} */}
      </Content>
    );
  }

  validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  //* step3 - input user data
  renderInputBookerInfo() {
    analytics().setCurrentScreen('Fill-booker-information');

    const marginTop = 20 * HEIGHT_SCALE_RATIO;
    const styleLabel = [ptText.SMALL1, ptColor.GREY40, { textTransform: 'uppercase' }];

    return (
      <View style={{ flex: 1 }}>
        <BaseHeader
          noShadow
          leftIconStyle={{
            tintColor: COLOR.appColor,
          }}
          leftIcon={ICON.BACK_ICON}
          onLeftPress={this.onClickGoBack}
          leftIconType="Image"
          children={
            <PText style={{ color: COLOR.PRIMARY, textTransform: 'uppercase' }}>
              Fill information
            </PText>
          }
        />
        <Content showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 24 * WIDTH_SCALE_RATIO }}>
            <View style={{ marginTop: marginTop }}>
              <PText
                style={[
                  ptText.SMALL1,
                  ptColor.GREY40,
                  {
                    textTransform: 'uppercase',
                    color: this.state.name === '' ? 'red' : COLOR.GREY40,
                  },
                ]}>
                {RootStore.i18n.t('reserve.name')}
              </PText>
              <TextInput
                ref={input => (this.onChangeName = input)}
                onSubmitEditing={() => {
                  this.onChangeEmail.focus();
                }}
                onChangeText={text => {
                  this.setState({ name: text });
                }}
                placeholderTextColor={COLOR.appTextPlaceholderColor}
                style={[
                  styles.inputDataForm,
                  style.textInput,
                  ptColor.GREY80,
                  { borderBottomColor: this.state.name === '' ? 'red' : COLOR.appBorderColor },
                ]}
                returnKeyType="next"
                autoCapitalize="none"
              />
              {this.state.name === '' && (
                <PText style={[{ color: 'red' }, ptText.SMALL1]}>
                  {RootStore.i18n.t('reserve.empty-error')}
                </PText>
              )}
            </View>
            <View style={{ marginTop: marginTop }}>
              <PText
                style={[
                  ptText.SMALL1,
                  ptColor.GREY40,
                  {
                    textTransform: 'uppercase',
                    color: this.state.country === 'none' ? 'red' : COLOR.GREY40,
                  },
                ]}>
                {RootStore.i18n.t('reserve.country')}
              </PText>

              <Menu
                rendererProps={{
                  preferredPlacement: 'bottom',
                  placement: 'bottom',
                }}
                style={[
                  styles.inputDataForm,
                  style.textInput,
                  ptColor.GREY80,
                  {
                    borderBottomColor: this.state.country === 'none' ? 'red' : COLOR.appBorderColor,
                  },
                ]}>
                <MenuTrigger
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    paddingVertical: 15 * HEIGHT_SCALE_RATIO,
                  }}>
                  <PText
                    style={[
                      styles.inputDataForm,
                      style.textInput,
                      {
                        borderBottomWidth: 0,
                        width: WIDTH - 40,
                        color: this.state.country === 'none' ? COLOR.GREY20 : COLOR.GREY80,
                      },
                    ]}>
                    {this.state.countryList.map((item, index) =>
                      this.state.country === index ? item : '',
                    )}
                  </PText>
                  <Icon
                    type="Entypo"
                    name="chevron-thin-down"
                    color={COLOR.GREY80}
                    style={[style.textButton, { marginTop: style.textButton.fontSize / 10 }]}
                  />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={{
                    padding: 10 * WIDTH_SCALE_RATIO,
                    width: WIDTH - 50 * WIDTH_SCALE_RATIO,
                  }}>
                  <View>
                    {this.state.countryList.map((item, index) => (
                      <MenuOption value={index} key={index} onSelect={this.onChangeCountry}>
                        <PText style={[style.textInput, ptColor.GREY80]}>{item}</PText>
                      </MenuOption>
                    ))}
                  </View>
                </MenuOptions>
              </Menu>
              {this.state.country === 'none' && (
                <PText style={[{ color: 'red' }, ptText.SMALL1]}>
                  {RootStore.i18n.t('global.ask-country')}
                </PText>
              )}
            </View>
            <View style={{ marginTop: marginTop }}>
              <PText
                style={[
                  ptText.SMALL1,
                  ptColor.GREY40,
                  {
                    textTransform: 'uppercase',
                    color:
                      this.state.email === '' || !this.validateEmail(this.state.email)
                        ? 'red'
                        : COLOR.GREY40,
                  },
                ]}>
                {RootStore.i18n.t('reserve.email')}
              </PText>
              <TextInput
                ref={input => (this.onChangeEmail = input)}
                onSubmitEditing={() => {
                  if (this.validateEmail(this.state.email)) {
                    this.onChangeTelephone.focus();
                  } else {
                    myAlert('', RootStore.i18n.t('reserve.invalid-email'), () => {
                      this.onChangeEmail.focus();
                    });
                  }
                }}
                onChangeText={text => {
                  this.setState({ email: text });
                }}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLOR.appTextPlaceholderColor}
                style={[
                  styles.inputDataForm,
                  style.textInput,
                  ptColor.GREY80,
                  { borderBottomColor: this.state.email === '' ? 'red' : COLOR.appBorderColor },
                ]}
              />
              {this.state.email === '' ? (
                <PText style={[{ color: 'red' }, ptText.SMALL1]}>
                  {RootStore.i18n.t('reserve.empty-error')}
                </PText>
              ) : (
                !this.validateEmail(this.state.email) && (
                  <PText style={[{ color: 'red' }, ptText.SMALL1]}>
                    {RootStore.i18n.t('reserve.invalid-email')}
                  </PText>
                )
              )}
            </View>
            <View style={{ marginTop: marginTop }}>
              <PText
                style={[
                  ptText.SMALL1,
                  ptColor.GREY40,
                  {
                    textTransform: 'uppercase',
                    color: this.state.telephone === '' ? 'red' : COLOR.GREY40,
                  },
                ]}>
                {RootStore.i18n.t('reserve.reserve-telephone')}
              </PText>
              <TextInput
                ref={input => (this.onChangeTelephone = input)}
                onSubmitEditing={() => {
                  if (this.state.telephone) {
                    this.onChangeSocial.focus();
                  } else {
                    myAlert('', 'You must be provite mobile phone number', () => {
                      this.onChangeEmail.focus();
                    });
                  }
                }}
                onChangeText={text => {
                  this.setState({ telephone: text });
                }}
                returnKeyType="next"
                autoCapitalize="none"
                keyboardType="phone-pad"
                placeholderTextColor={COLOR.appTextPlaceholderColor}
                style={[
                  styles.inputDataForm,
                  style.textInput,
                  ptColor.GREY80,
                  { borderBottomColor: this.state.telephone === '' ? 'red' : COLOR.appBorderColor },
                ]}
              />
              {this.state.telephone === '' && (
                <PText style={[{ color: 'red' }, ptText.SMALL1]}>
                  {RootStore.i18n.t('reserve.empty-error')}
                </PText>
              )}
            </View>
            <View style={{ marginTop: marginTop }}>
              <PText style={styleLabel}>{RootStore.i18n.t('reserve.social-id')}</PText>
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" style={{ color: COLOR.GREY40, fontSize: 25 }} />}
                  iosHeader="Select SNS"
                  selectedValue={this.state.SNSInformation}
                  onValueChange={this.onChangeSNSInformation}
                  textStyle={style.textInput}
                  headerStyle={{ color: COLOR.PRIMARY }}
                  headerBackButtonTextStyle={{ color: COLOR.PRIMARY }}
                  itemTextStyle={{ color: COLOR.GREY80 }}
                  style={{ flex: 1 }}>
                  <Picker.Item label={'LINE'} value={'LINE'} />
                  <Picker.Item label={'Whatsapp'} value={'Whatsapp'} />
                  <Picker.Item label={'Kakaotalk'} value={'Kakaotalk'} />
                  <Picker.Item label={'Wechat'} value={'Wechat'} />
                  <Picker.Item label={'Instagram DM'} value={'Instagram DM'} />
                </Picker>

                <TextInput
                  ref={input => (this.onChangeSocial = input)}
                  onSubmitEditing={() => {}}
                  onChangeText={text => {
                    this.setState({ social: text });
                  }}
                  returnKeyType="next"
                  autoCapitalize="none"
                  placeholderTextColor={COLOR.appTextPlaceholderColor}
                  style={[
                    styles.inputDataForm,
                    style.textInput,
                    ptColor.GREY80,
                    {
                      borderBottomColor: this.state.email === '' ? 'red' : COLOR.appBorderColor,
                      flex: 1,
                    },
                  ]}
                />
              </View>
              {this.state.social === '' && (
                <PText style={[{ color: 'red' }, ptText.SMALL1]}>
                  {RootStore.i18n.t('reserve.empty-error')}
                </PText>
              )}
            </View>

            {this.state.newRequireInfo
              ? this.state.newRequireInfo.map((v, i) => {
                  const findLanguage =
                    v &&
                    v.translations &&
                    v.translations.find(v1 => v1.language === RootStore.language)
                      ? v.translations.find(v2 => v2.language === RootStore.language)
                      : v.translations[0];
                  const header = findLanguage && findLanguage.header ? findLanguage.header : '';
                  const description =
                    findLanguage && findLanguage.description ? findLanguage.description : '';
                  return (
                    <View style={{ marginTop: marginTop }} key={header}>
                      <PText
                        style={[
                          ptText.SMALL1,
                          ptColor.GREY40,
                          {
                            textTransform: 'uppercase',
                            color: v.content === '' ? 'red' : COLOR.GREY40,
                          },
                        ]}>
                        {header}
                      </PText>
                      <TextInput
                        placeholder={description}
                        onChangeText={text => {
                          const temp = this.state.newRequireInfo.map(e => {
                            if (e.code === v.code) {
                              return {
                                ...e,
                                content: text,
                              };
                            }
                            return e;
                          });
                          this.setState({ newRequireInfo: temp });
                        }}
                        returnKeyType="next"
                        autoCapitalize="none"
                        style={[
                          styles.inputDataForm,
                          style.textInput,
                          ptColor.GREY80,
                          {
                            borderBottomColor: v.content === '' ? 'red' : COLOR.appBorderColor,
                          },
                        ]}
                      />
                      {v.content === '' && (
                        <PText style={[{ color: 'red' }, ptText.SMALL1]}>
                          {RootStore.i18n.t('reserve.empty-error')}
                        </PText>
                      )}
                    </View>
                  );
                })
              : null}
            <View
              style={{
                marginTop: marginTop,
                marginBottom: 120 * HEIGHT_SCALE_RATIO,
              }}
            />
          </View>
        </Content>
      </View>
    );
  }

  renderInfo = (hardTitle, hardSubtitle, inforTitle, inforSubtitle) => (
    <View
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
  renderGreenLetter(status) {
    switch (status) {
      case Const.ReserveStatus.Complete.code:
        if (this.state.spot.spot_reserve.is_require_payment) {
          return (
            RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete') +
            ' ' +
            RootStore.i18n.t('reserve-detail.detail-page-status.payment-complete', {
              locale: 'ko',
            })
          );
        } else {
          return (
            RootStore.i18n.t('reserve-detail.spot-remarks.free-reserve') +
            ' ' +
            RootStore.i18n.t('reserve-detail.spot-remarks.free-reserve', {
              locale: 'ko',
            })
          );
        }

      case Const.ReserveStatus.Cancel.code:
        return (
          RootStore.i18n.t('reserve-detail.spot-remarks.free-reserve') +
          ' ' +
          RootStore.i18n.t('reserve-detail.spot-remarks.free-reserve', {
            locale: 'ko',
          })
        );

      case Const.ReserveStatus.Confirm.code:
        return (
          RootStore.i18n.t('reserve-detail.spot-remarks.free-reserve') +
          ' ' +
          RootStore.i18n.t('reserve-detail.spot-remarks.free-reserve', {
            locale: 'ko',
          })
        );

      default:
        return RootStore.i18n.t('reserve-detail.status.payment') + ' 결제대기중';
    }
  }
  // * step4 - check your order
  renderFinalCheck() {
    analytics().setCurrentScreen('Final-check-after-booking');
    let detailProductBought = [];
    this.state.confirmInfomation.reserve_items.map((item, index) => {
      detailProductBought.push(item);
    });
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 16 * WIDTH_SCALE_RATIO, paddingTop: 14 * HEIGHT_SCALE_RATIO }}>
          <View>
            {/* Title */}
            <View style={{ marginHorizontal: 8 * WIDTH_SCALE_RATIO }}>
              <PText style={[style.text, { fontSize: style.text.fontSize * 1.3 }]}>
                {RootStore.i18n.t('reserve-detail.title', {
                  name: this.state.title,
                })}
              </PText>
              {this.state.titleKorea ? (
                <PText
                  style={[style.textSubTitle, { fontSize: style.textSubTitle.fontSize + 0.1 }]}>
                  {this.state.titleKorea}
                </PText>
              ) : null}
            </View>
            {/*phat nếu cancell hay confirm thì opacity: 0.1 */}

            <View
              style={
                this.props.fromScreen === 'cancel' || this.props.fromScreen === 'complete'
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
                  {this.renderGreenLetter(this.state.confirmInfomation.status)}
                </PText>
              </View>
              <View style={{ height: 16 * HEIGHT_SCALE_RATIO }} />
              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.reserve-title'),
                RootStore.i18n.t('reserve-detail.reserve-title', { locale: 'ko' }),
                detailProductBought.map((item, index) => {
                  if (detailProductBought.length > 1) {
                    if (index !== detailProductBought.length - 1) {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.show_name} ${item.count}  \n`,
                      });
                    } else {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.show_name} ${item.count} `,
                      });
                    }
                  } else {
                    return RootStore.i18n.t('reserve-detail.title', {
                      name: `${item.show_name} ${item.count} `,
                    });
                  }
                }),
                detailProductBought.map((item, index) => {
                  if (detailProductBought.length > 1) {
                    if (index !== detailProductBought.length - 1) {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.ko_name} ${item.count}  \n`,
                      });
                    } else {
                      return RootStore.i18n.t('reserve-detail.title', {
                        name: `${item.ko_name} ${item.count} `,
                      });
                    }
                  } else {
                    return RootStore.i18n.t('reserve-detail.title', {
                      name: `${item.ko_name} ${item.count} `,
                    });
                  }
                }),
              )}
              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.reserve-name'),
                RootStore.i18n.t('reserve-detail.reserve-name', { locale: 'ko' }),
                this.state.name,
                this.state.nationality_name,
              )}
              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.code'),
                RootStore.i18n.t('reserve-detail.code', { locale: 'ko' }),
                this.state.reserveCode,
              )}
              {this.state.email
                ? this.renderInfo(
                    RootStore.i18n.t('reserve-detail.reserve-email'),
                    RootStore.i18n.t('reserve-detail.reserve-email', { locale: 'ko' }),
                    this.state.email,
                  )
                : null}
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
                    `${this.state.SNSInformation}: ${this.state.social}`,
                  )
                : null}
              {this.state.selectDate
                ? this.renderInfo(
                    RootStore.i18n.t('reserve-detail.reserve-date'),
                    RootStore.i18n.t('reserve-detail.reserve-date', { locale: 'ko' }),
                    this.state.selectDate,
                  )
                : null}
              {this.state.delivery_address
                ? this.renderInfo(
                    RootStore.i18n.t('reserve.reserve-delivery-address'),
                    RootStore.i18n.t('reserve.reserve-delivery-address', { locale: 'ko' }),
                    this.state.delivery_address,
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
              {this.state.selectTime
                ? this.renderInfo(
                    RootStore.i18n.t('reserve-detail.reserve-time'),
                    RootStore.i18n.t('reserve-detail.reserve-time', { locale: 'ko' }),
                    this.state.selectTime,
                  )
                : null}

              {this.renderInfo(
                RootStore.i18n.t('reserve-detail.reserve-price'),
                RootStore.i18n.t('reserve-detail.reserve-price', { locale: 'ko' }),
                `￦ ${Util.price_comma(this.state.totalDiscountPrice)}  `,
              )}
              {this.state.voucherCode ? (
                <View>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'column',
                      height: HEIGHT * 0.06,
                    }}>
                    <PText
                      style={[
                        style.text,
                        {
                          marginHorizontal: 8 * WIDTH_SCALE_RATIO,
                        },
                      ]}>
                      {RootStore.i18n.t('reserve-detail.reserve-voucher')}
                    </PText>
                    <PText
                      style={[
                        style.textSubTitle,
                        {
                          marginHorizontal: 8 * WIDTH_SCALE_RATIO,
                        },
                      ]}>
                      {RootStore.i18n.t('reserve-detail.reserve-voucher', { locale: 'ko' })}
                    </PText>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}>
                    <PText
                      style={[
                        style.text,
                        {
                          marginTop: 7,
                        },
                      ]}>
                      {this.state.voucherCode}
                    </PText>
                  </View>
                </View>
              ) : null}
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
              margin: 16 * WIDTH_SCALE_RATIO,
              backgroundColor: 'white',
              borderRadius: 8 * WIDTH_SCALE_RATIO,
              padding: 24 * WIDTH_SCALE_RATIO,
              justifyContent: 'center',
            }}>
            <PText
              style={[
                style.textTitle,
                {
                  textAlign: 'center',
                  marginTop: 32 * WIDTH_SCALE_RATIO,
                  marginBottom: 8 * HEIGHT_SCALE_RATIO,
                },
              ]}>
              {RootStore.i18n.t('my-page.enter-booking-password')}
            </PText>
            <PText
              style={[style.text, { textAlign: 'center', marginBottom: 16 * HEIGHT_SCALE_RATIO }]}>
              {RootStore.i18n.t('my-page.voucher-regraded')}{' '}
            </PText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  width: 24 * WIDTH_SCALE_RATIO,
                  height: 24 * WIDTH_SCALE_RATIO,
                  marginBottom: 4.5 * HEIGHT_SCALE_RATIO,
                }}
                resizeMode="contain"
                source={ICON.LOCK_ICON2}
              />
              <TextInput
                placeholder="PASSWORD"
                secureTextEntry
                style={[
                  style.input,
                  {
                    paddingLeft: 16 * WIDTH_SCALE_RATIO,
                    marginLeft: 5 * WIDTH_SCALE_RATIO,
                    paddingBottom: 10 * HEIGHT_SCALE_RATIO,
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
                paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
                marginTop: 24 * WIDTH_SCALE_RATIO,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyTouchableOpacity
                style={style.buttonOutline}
                onPress={() => this.setState({ alertLockShow: false })}>
                <PText
                  style={[style.textButton, { textTransform: 'uppercase', color: COLOR.appColor }]}>
                  CANCEL
                </PText>
              </MyTouchableOpacity>
              <View style={{ width: 16 * WIDTH_SCALE_RATIO }} />
              <MyTouchableOpacity
                style={style.button}
                onPress={() => this.setState({ alertLockShow: false })}>
                <PText style={[style.textButton, { textTransform: 'uppercase', color: 'white' }]}>
                  confirm
                </PText>
              </MyTouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={[
            style.shadow,
            {
              width: WIDTH,
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 0,
              height: heightBottomBar,
              paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: COLOR.appBorderColor,
            }}
          />

          <View
            style={{
              paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
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

            <View
              style={{
                flex: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingVertical: 16 * HEIGHT_SCALE_RATIO,
              }}>
              <MyTouchableOpacity
                onPress={() => {
                  if (this.props.isMyPage) {
                    Actions.spotDetail({ spotCode: this.props.spotCode, city: '', region: '' });
                  } else {
                    Actions.pop();
                  }
                }}
                style={style.buttonOutline}>
                <PText style={style.textButtonOutLine}>{RootStore.i18n.t('my-page.info')}</PText>
              </MyTouchableOpacity>

              <MyTouchableOpacity
                onPress={this.onClickCompleteSelect.bind(this)}
                style={[style.button, { marginLeft: 16 * WIDTH_SCALE_RATIO }]}>
                <PText
                  style={[
                    style.textButton,
                    {
                      color: COLOR.WHITE,
                    },
                  ]}>
                  {RootStore.i18n.t('reservation.my-reservation')}
                </PText>
              </MyTouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  nameProduct(item) {
    if (item.parent.name && !item.parent.parent) {
      return `${item.parent.name} | ${item.name}`;
    } else if (item.parent.parent) {
      return `${item.parent.parent.name} | ${item.parent.name} | ${item.name}`;
    } else {
      return item.name;
    }
  }

  renderProductValue() {
    return (
      <View
        style={{
          marginBottom: 80 * HEIGHT_SCALE_RATIO,
          minHeight: 0,
        }}>
        {this.state.requireDate || this.state.requireTime ? (
          <View
            style={{
              flexDirection: 'row',
              // borderBottomColor: COLOR.appBorderColor,
              // borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
              alignItems: 'center',
              paddingLeft: 8 * WIDTH_SCALE_RATIO,
              marginHorizontal: 16 * WIDTH_SCALE_RATIO,
            }}>
            {this.state.requireDate ? this.renderSelectedDate(COLOR.GREY40, true) : <Fragment />}
            {this.state.requireTime ? this.renderSelectedTime(COLOR.GREY40, true) : <Fragment />}
          </View>
        ) : null}
        {this.state.cartProducts.length > 0 || this.state.deliverFee !== null ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingLeft: 8 * WIDTH_SCALE_RATIO,
              width: '100%',
              maxHeight: HEIGHT / 1.5 - 200 * HEIGHT_SCALE_RATIO,
              minHeight: 0,
            }}>
            {this.state.deliverFee !== null && this.state.deliverFee !== 0 && (
              <View style={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} />
                <View
                  style={{
                    paddingTop: 12 * HEIGHT_SCALE_RATIO,
                    paddingBottom: 10 * HEIGHT_SCALE_RATIO,
                    borderBottomColor: COLOR.appBorderColor,
                    borderBottomWidth: 0.5 * WIDTH_SCALE_RATIO,
                    paddingVertical: 0 * HEIGHT_SCALE_RATIO,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <PText
                      numberOfLines={numberOfLineNameProduct}
                      style={[
                        style.text,
                        ptText.H4,
                        {
                          width: '90%',
                          color: COLOR.GREY80,
                        },
                      ]}>
                      {RootStore.i18n.t('reserve.delivery-fee')}
                    </PText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                      paddingRight: 4 * WIDTH_SCALE_RATIO,
                    }}>
                    <PText
                      style={[
                        style.text,
                        {
                          // width: '70%',
                          color: COLOR.GREY40,
                        },
                      ]}>
                      {`￦ ${Util.price_comma(this.state.deliverFee)}`}
                    </PText>
                  </View>
                </View>
              </View>
            )}
            {/* product bought */}
            {this.state.cartProducts.map((item, index) => {
              const temp = this.state.cartProducts.filter((item2, index2) => index2 < index);
              return (
                <View style={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }} key={item}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} />
                  <View
                    style={{
                      paddingTop: 12 * HEIGHT_SCALE_RATIO,
                      paddingBottom: 10 * HEIGHT_SCALE_RATIO,
                      borderBottomColor: COLOR.appBorderColor,
                      borderBottomWidth: 0.5 * WIDTH_SCALE_RATIO,
                      paddingVertical: 0 * HEIGHT_SCALE_RATIO,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10 * HEIGHT_SCALE_RATIO,
                      }}>
                      <PText
                        numberOfLines={numberOfLineNameProduct}
                        style={[
                          style.text,
                          // ptText.H4,
                          {
                            width: '90%',
                            color: COLOR.GREY80,
                          },
                        ]}>
                        {this.nameProduct(item)}
                      </PText>
                      <MyTouchableOpacity
                        onPress={() => {
                          this.onClickDeleteItem(item);
                        }}>
                        <Image
                          source={ICON.CLOSE_ICON}
                          style={{
                            // padding: 7 * WIDTH_SCALE_RATIO,
                            tintColor: COLOR.GREY40,
                            width: 10 * WIDTH_SCALE_RATIO,
                            height: 10 * WIDTH_SCALE_RATIO,
                            resizeMode: 'contain',
                          }}
                        />
                      </MyTouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <MyTouchableOpacity
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={this.onClickDecreaseCount.bind(this, item)}>
                          <Feather
                            name="minus-circle"
                            size={20 * WIDTH_SCALE_RATIO}
                            color={COLOR.GREY20}
                          />
                        </MyTouchableOpacity>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 20 * WIDTH_SCALE_RATIO,
                          }}>
                          <PText style={[style.text, { fontWeight: '600' }]}>{item.count}</PText>
                        </View>
                        <MyTouchableOpacity
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={this.onClickIncreaseCount.bind(this, item)}>
                          <Feather
                            name="plus-circle"
                            size={20 * WIDTH_SCALE_RATIO}
                            color={COLOR.GREY20}
                          />
                        </MyTouchableOpacity>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          alignContent: 'flex-end',
                        }}>
                        <PText
                          style={[
                            style.text,
                            {
                              color: COLOR.GREY40,
                            },
                          ]}>
                          {item.discount_price && parseInt(item.discount_price, 10)
                            ? `￦ ${Util.price_comma(item.discount_price)}`
                            : ''}
                          <PText
                            style={[
                              style.textCaption,
                              {
                                color: COLOR.GREY20,
                                textDecorationLine: 'line-through',
                              },
                            ]}>
                            {item.price && parseInt(item.price, 10)
                              ? `￦ ${Util.price_comma(item.price)}`
                              : ''}
                          </PText>
                        </PText>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Fragment />
        )}
      </View>
    );
  }

  renderSelectedDate(color, isSmall) {
    return (
      <View style={{}}>
        <MyTouchableOpacity
          onPress={this.toggleModal.bind(this)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Feather
            name="calendar"
            size={isSmall ? 14 * WIDTH_SCALE_RATIO : 16 * WIDTH_SCALE_RATIO}
            style={{
              marginRight: 8 * WIDTH_SCALE_RATIO,
              color: color,
            }}
          />
          <PText style={[isSmall ? ptText.BODY1 : ptText.H4, { color: color }]}>
            {this.state.selectDate === ''
              ? RootStore.i18n.t('reserve.reserve-date-select')
              : this.state.selectDate}
          </PText>
        </MyTouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}>
          <View
            style={{
              padding: 10 * WIDTH_SCALE_RATIO,
              borderRadius: 4 * WIDTH_SCALE_RATIO,
              borderColor: '#f5f5f5',
              backgroundColor: '#fff',
              width: '100%',
            }}>
            <Calendar
              headerStyle={{
                fontFamily:
                  RootStore.language === 'en' || RootStore.language === 'vi'
                    ? 'Raleway-Regular'
                    : 'Roboto',
              }}
              current={this.state.selectDate}
              minDate={this.state.minDate}
              maxDate={this.state.limitDate}
              markedDates={{
                ...this.state.blockDate,
                ...this.state.markDate,
              }}
              onDayPress={(day, localDay) => {
                this.onSelectDate(day, localDay);
              }}
              onDayLongPress={day => {
                this.onSelectDate(day);
              }}
              monthFormat="yyyy - MM"
              hideExtraDays
              theme={{
                todayTextColor: COLOR.PRIMARY,
                textDisabledColor: COLOR.GREY20,
                selectedDayTextColor: 'white',
                dayTextColor: COLOR.GREY80,
                textDayFontFamily:
                  RootStore.language === 'en' || RootStore.language === 'vi'
                    ? 'Raleway-Regular'
                    : 'Roboto',
                textDayFontSize: ptText.BODY2.fontSize,
                'stylesheet.calendar.header': {
                  dayHeader: {
                    fontFamily:
                      RootStore.language === 'en' || RootStore.language === 'vi'
                        ? 'Raleway-Regular'
                        : 'Roboto',
                    textTransform: 'uppercase',
                    color: COLOR.GREY40,
                  },
                  monthText: {
                    fontFamily:
                      RootStore.language === 'en' || RootStore.language === 'vi'
                        ? 'Raleway-Regular'
                        : 'Roboto',
                    fontSize: ptText.H1.fontSize,
                    color: COLOR.GREY80,
                    textTransform: 'uppercase',
                  },
                },
                'stylesheet.day.single': IS_IOS ? selected_date_style : null,
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
  renderSelectedTime(color, isSmall) {
    return (
      <View>
        <MyTouchableOpacity
          onPress={() => {
            this.setState({ modalSelectTime: !this.state.modalSelectTime });
          }}
          style={{
            marginVertical: 7 * HEIGHT_SCALE_RATIO,
            marginLeft: 8 * WIDTH_SCALE_RATIO,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5 * WIDTH_SCALE_RATIO,
          }}>
          {this.state.selectTime ? (
            <Feather
              name="clock"
              size={isSmall ? 14 * WIDTH_SCALE_RATIO : 16 * WIDTH_SCALE_RATIO}
              style={{
                marginRight: 10 * WIDTH_SCALE_RATIO,
                color: color,
              }}
            />
          ) : null}

          <PText style={[isSmall ? ptText.BODY1 : ptText.H4, { color: color }]}>
            {this.state.selectTime}
          </PText>
        </MyTouchableOpacity>
        <Modal
          isVisible={this.state.modalSelectTime}
          onBackdropPress={() => this.setState({ modalSelectTime: false })}>
          <View
            style={{
              padding: 10 * WIDTH_SCALE_RATIO,
              borderRadius: 4 * WIDTH_SCALE_RATIO,
              borderColor: '#f5f5f5',
              backgroundColor: '#fff',
              width: '100%',
            }}>
            <FlatList
              bounces={false}
              keyExtractor={(item, index) => `key ${index}`}
              showsVerticalScrollIndicator={false}
              data={this.state.isPossibleTime}
              numColumns={4}
              renderItem={v => (
                <View
                  key={`time-Rank-${v.index}`}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '25%',
                  }}>
                  {v.item.select === this.state.timeRank + 1 && (
                    <MyTouchableOpacity
                      style={{ paddingVertical: 10 * HEIGHT_SCALE_RATIO }}
                      onPress={
                        (this.onSelectTime.bind(this, v.index, 0),
                        this.setState({ selectTime: v.item.time }))
                      }>
                      <PText style={[style.text, { color: COLOR.PRIMARY, textAlign: 'center' }]}>
                        {v.item.time}
                      </PText>
                    </MyTouchableOpacity>
                  )}
                  {v.item.select !== this.state.timeRank + 1 && v.item.select === 0 && (
                    <MyTouchableOpacity
                      style={{
                        paddingVertical: 10 * HEIGHT_SCALE_RATIO,
                      }}
                      onPress={this.onSelectTime.bind(this, v.index, this.state.timeRank + 1)}>
                      <PText style={[style.text, { color: COLOR.GREY20, textAlign: 'center' }]}>
                        {v.item.time}
                      </PText>
                    </MyTouchableOpacity>
                  )}
                </View>
              )}
            />
          </View>
        </Modal>
      </View>
    );
  }

  onCloseAnimationDropdown = () => {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        if (this.accordionRef) {
          this.accordionRef.setState({
            selected: null,
          });
          this.setState({
            selected: null,
          });
          resolve();
        } else {
          reject();
        }
      });
    });
  };

  //* step 2.1
  _renderHeader = (item, expanded) => {
    const index = this.state.products.findIndex(value => value.code === item.code);

    const nameList = item && item.name;
    const informationList = item && item.information;

    let price = item.price
      ? !isNaN(parseInt(item.price))
        ? '￦ ' + Number(item.price).format()
        : ''
      : '';
    let discountPrice = item.discount_price
      ? !isNaN(parseInt(item.discount_price))
        ? '￦ ' + Number(item.discount_price).format()
        : ''
      : '';
    //*remove  price and discount price if both of them are 0:
    if (!isNaN(Number(item.price).format()) && Number(item.price) === 0) {
      price = '';
      discountPrice = '';
    }

    const imageTicket = item && item.images && item.images.length > 0 && item.images[0].url;

    const tempSelected = this.state.selected === item;
    const haveSelectedLv3Picker =
      tempSelected &&
      this.state.selected &&
      this.state.selected.options &&
      this.state.selected.options.length > 0 &&
      this.state.selectProductSecond &&
      this.state.selected.options.find(e => e.code === this.state.selectProductSecond.code) &&
      this.state.selected.options.find(e => e.code === this.state.selectProductSecond.code)
        .options &&
      this.state.selected.options.find(e => e.code === this.state.selectProductSecond.code).options
        .length > 0;

    if (item.options.length > 0) {
      return (
        <TouchableOpacity key={`reserveStep2.1${item.code}`}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
              paddingVertical: 16 * HEIGHT_SCALE_RATIO,
              // marginBottom: 20 * HEIGHT_SCALE_RATIO,
              width: WIDTH,
              alignItems: 'center',
              backgroundColor: tempSelected || expanded ? COLOR.PRIMARY : COLOR.WHITE,
            }}>
            <View style={{ flex: 1 }}>
              <MyTouchableOpacity
                onPress={() => {
                  this.selectProduct(this.state.products.findIndex(e => e === item));
                  if (this.accordionRef) {
                    this.accordionRef.setState({
                      selected: null,
                    });
                    this.setState({
                      selected: this.state.selected === item ? null : item,
                      //
                      selectProductStep2: null,
                      selectProductSecond: null,
                    });
                  }
                }}
                style={{}}>
                <PText
                  numberOfLines={numberOfLineNameItem}
                  style={[
                    style.textTitle,
                    {
                      color: tempSelected || expanded ? 'white' : COLOR.GREY80,
                      marginBottom: 5,
                    },
                  ]}>
                  {nameList}
                </PText>
                {!discountPrice && !price ? null : (
                  <PText
                    style={[
                      style.text,
                      {
                        color: tempSelected || expanded ? COLOR.WHITE : COLOR.GREY80,
                      },
                    ]}>
                    {discountPrice}
                    {'   '}
                    <PText
                      style={[
                        style.textCaption,
                        {
                          color: tempSelected || expanded ? COLOR.WHITE : COLOR.GREY20,
                          textDecorationLine: 'line-through',
                        },
                      ]}>
                      {price}
                    </PText>
                  </PText>
                )}
              </MyTouchableOpacity>
            </View>

            <View style={{ width: WIDTH * 0.1, alignItems: 'flex-end' }}>
              <MyTouchableOpacity
                onPress={() => {
                  if (this.accordionRef && this.state.products) {
                    this.setState({
                      selected:
                        this.accordionRef.state.selected ===
                        this.state.products.findIndex(e => e === item)
                          ? null
                          : this.state.products.findIndex(e => e === item),
                      //
                      selectProductStep2: null,
                      selectProductSecond: null,
                    });
                    this.accordionRef.setState({
                      selected:
                        this.accordionRef.state.selected ===
                        this.state.products.findIndex(e => e === item)
                          ? null
                          : this.state.products.findIndex(e => e === item),
                    });
                  }
                }}>
                {informationList || imageTicket ? (
                  expanded ? (
                    <Icon
                      type="Entypo"
                      name="chevron-thin-up"
                      style={[style.textTitle, { color: COLOR.WHITE }]}
                    />
                  ) : (
                    <Icon
                      type="Entypo"
                      name="chevron-thin-down"
                      style={[style.textTitle, { color: COLOR.GREY20 }]}
                    />
                  )
                ) : null}
              </MyTouchableOpacity>
            </View>
          </View>
          {this.state.products.length - 1 === index ? (
            <Fragment />
          ) : (
            <Divider
              style={{
                marginHorizontal: 6 * WIDTH_SCALE_RATIO,
                backgroundColor: COLOR.appBorderColor,
              }}
            />
          )}
          {/* lv 2 picker: */}
          <View
            style={[
              this.state.products.length - 1 === index ? null : ptShadow.BLUR10,
              { marginBottom: 12 * HEIGHT_SCALE_RATIO },
            ]}>
            {
              <AnimationDropdownComponent
                visible={tempSelected}
                data={item.options}
                onSelect={(productLV2Value, productLV2Index) => {
                  if (productLV2Value.options.length > 0) {
                    this.selectProduct2(productLV2Index, item);
                    this.setState({ selectProductStep2: productLV2Index });
                  } else {
                    this.addFirstParentToCart(productLV2Value, item);
                    this.setState({
                      chosenProductLevel2: productLV2Index,
                      selectProductSecond: productLV2Value,
                    });
                  }
                  this._toggleSubview(false);
                }}
                onClose={this.onCloseAnimationDropdown}
                hideClose={haveSelectedLv3Picker}
              />
            }
            {/* lv3 picker: */}
            {
              <AnimationDropdownComponent
                visible={haveSelectedLv3Picker}
                value={this.state.selectProductThird}
                data={
                  this.state.selectProductSecond &&
                  this.state.selectProductSecond.options &&
                  this.state.selectProductSecond.options.length > 0
                    ? this.state.selectProductSecond.options
                    : []
                }
                onSelect={(productLV3Value, productLV3Index) => {
                  this.addFirstParentToCart(productLV3Value, this.state.selectProductSecond);
                  this.setState({
                    chosenProductLevel3: productLV3Index,
                    selectProductThird: productLV3Value,
                  });
                  this._toggleSubview(false);
                }}
                onClose={this.onCloseAnimationDropdown}
              />
            }
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity>
        <View
          style={
            this.state.chosenProductLevel1 === this.state.products.findIndex(e => e === item) ||
            expanded
              ? {
                  left: 0 * WIDTH_SCALE_RATIO,
                  paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                  marginLeft: 0,
                  paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                  justifyContent: 'flex-end',

                  backgroundColor: COLOR.PRIMARY,
                  flexDirection: 'row',
                }
              : {
                  paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                  justifyContent: 'flex-end',
                  paddingLeft: 24 * WIDTH_SCALE_RATIO,

                  paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                  marginLeft: 0,

                  left: 0 * WIDTH_SCALE_RATIO,
                  backgroundColor: COLOR.WHITE,
                  flexDirection: 'row',
                }
          }>
          <View style={{ flex: 1 }}>
            <MyTouchableOpacity
              onPress={() => {
                this.addFirstParentToCart(item, {});
                this.setState({
                  chosenProductLevel1: this.state.products.findIndex(e => e === item),
                });
              }}
              key={`price-${this.state.products.findIndex(e => e === item)}`}>
              <View>
                <PText
                  numberOfLines={numberOfLineNameItem}
                  style={[
                    style.textTitle,
                    {
                      color:
                        this.state.chosenProductLevel1 ===
                          this.state.products.findIndex(e => e === item) || expanded
                          ? COLOR.WHITE
                          : COLOR.GREY80,
                    },
                  ]}>
                  {item.name || item.ko_name}
                </PText>
                <PText
                  style={[
                    style.text,
                    {
                      color: COLOR.GREY40,
                    },
                  ]}>
                  {item.discount_price &&
                  item.discount_price !== 'null' &&
                  parseInt(item.discount_price, 10)
                    ? `￦ ${Util.price_comma(item.discount_price)}`
                    : ''}
                  {'   '}
                  <PText
                    style={[
                      style.textCaption,
                      {
                        color: COLOR.GREY20,
                        textDecorationLine: 'line-through',
                      },
                    ]}>
                    {item.price && item.price !== 'null' && parseInt(item.price, 10)
                      ? `￦ ${Util.price_comma(item.price)}`
                      : ''}
                  </PText>
                </PText>
              </View>
              {/* phat cong tru nè */}
            </MyTouchableOpacity>
          </View>
          {/* <View
            style={{
              right: 0,
              justifyContent: 'flex-end',

              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                if (this.accordionRef && this.state.products) {
                  this.setState({
                    selected:
                      this.accordionRef.state.selected ===
                      this.state.products.findIndex(e => e === item)
                        ? null
                        : this.state.products.findIndex(e => e === item),
                  });
                  this.accordionRef.setState({
                    selected:
                      this.accordionRef.state.selected ===
                      this.state.products.findIndex(e => e === item)
                        ? null
                        : this.state.products.findIndex(e => e === item),
                  });
                }
              }}
              style={{
                paddingLeft: 20 * WIDTH_SCALE_RATIO,
              }}>
              {informationList || imageTicket ? (
                expanded ? (
                  <Icon
                    type="Entypo"
                    name="chevron-thin-up"
                    style={[style.textTitle, { color: COLOR.WHITE }]}
                  />
                ) : (
                  <Icon
                    type="Entypo"
                    name="chevron-thin-down"
                    style={[style.textTitle, { color: COLOR.GREY20 }]}
                  />
                )
              ) : null}
            </MyTouchableOpacity>
          </View> */}
        </View>
        <Divider
          style={{
            borderBottomColor: COLOR.appBorderColor,
            borderBottomWidth: 0.5,
            marginHorizontal: 12 * WIDTH_SCALE_RATIO,
          }}
        />
      </TouchableOpacity>
    );
  };
  renderItemMoreInfoSlider({ item, index }) {
    return (
      <MyTouchableOpacity
        key={index}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: 'transparent',
        }}
        onPress={() => {}}>
        <Image
          style={{
            width: WIDTH,
            height: 280 * HEIGHT_SCALE_RATIO,
          }}
          source={item ? { uri: item.url + '?d=450' } : IMAGE.DEFAULT_PROFILE_IMAGE}
        />
      </MyTouchableOpacity>
    );
  }

  // render content of parent step 1:
  _renderContent(item, expanded) {
    const informationList = item && item.information;
    const imageTicket = item && item.images;
    if (informationList || imageTicket) {
      return (
        <View style={{}}>
          {informationList ? (
            <PText
              style={[
                style.textSubTitle,
                {
                  paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                  paddingTop: 16 * HEIGHT_SCALE_RATIO,
                  marginBottom: 16 * HEIGHT_SCALE_RATIO,
                },
              ]}>
              {informationList}
            </PText>
          ) : null}
          {!!imageTicket && (
            <View>
              <Carousel
                ref={c => (this.sliderMoreInfo = c)}
                data={imageTicket}
                contentContainerCustomStyle={{
                  backgroundColor: 'transparent',
                }}
                renderItem={this.renderItemMoreInfoSlider}
                sliderWidth={WIDTH}
                itemWidth={WIDTH}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                activeSlideAlignment="center"
                loop
                enableSnap
                autoplay
                autoplayDelay={500}
                autoplayInterval={2500}
                onSnapToItem={index => {
                  this.setState({ activeMoreInfoSlide: index });
                }}
              />
              <Pagination
                containerStyle={{
                  position: 'absolute',
                  bottom: 8 * HEIGHT_SCALE_RATIO,
                  alignSelf: 'center',
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                }}
                carouselRef={this.sliderMoreInfo}
                dotsLength={imageTicket.length}
                activeDotIndex={this.state.activeMoreInfoSlide}
                renderDots={activeIndex =>
                  imageTicket.map((screen, i) => (
                    <View
                      style={{
                        width: 4 * WIDTH_SCALE_RATIO,
                        height: 4 * WIDTH_SCALE_RATIO,
                        borderRadius: 2 * WIDTH_SCALE_RATIO,
                        marginLeft: 4 * WIDTH_SCALE_RATIO,

                        backgroundColor: i === activeIndex ? COLOR.WHITE : '#ffffff50',
                      }}
                      key={`${i}`}
                    />
                  ))
                }
              />
            </View>
          )}
        </View>
      );
    }
  }

  renderFirstItemList() {
    return (
      <View
        style={{
          marginBottom: 20 * HEIGHT_SCALE_RATIO,
        }}>
        <View style={{ height: headerHeight }} />

        <View style={{ backgroundColor: COLOR.WHITE }}>
          <Accordion
            ref={instance => (this.accordionRef = instance)}
            style={[ptShadow.BLUR10, { borderColor: COLOR.WHITE }]}
            dataArray={this.state.products}
            key={{}}
            animation
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </View>
        <View style={{ position: 'absolute' }}>
          <BaseHeaderWithSearch
            hideRecommend
            noShadow
            backgroundColorWhite
            showBack
            leftIconStyle={{
              tintColor: COLOR.appColor,
            }}
            onLeftPress={this.onClickGoBack}
            leftIconType="Image"
            hideBackButton
            children={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  left: 0 * WIDTH_SCALE_RATIO,
                }}>
                {this.state.requireDate ? (
                  this.renderSelectedDate(COLOR.PRIMARY)
                ) : (
                  <PText style={[ptText.H4, { color: COLOR.PRIMARY }]}>BACK</PText>
                )}
                {this.state.requireTime && this.renderSelectedTime(COLOR.PRIMARY)}
              </View>
            }
          />
        </View>
      </View>
    );
  }
  //* step 2.2 chose service
  renderSecondItemList() {
    return (
      <View
        style={{
          marginBottom: 20 * HEIGHT_SCALE_RATIO,
        }}>
        <BaseHeaderWithSearch
          noShadow
          hideRecommend
          backgroundColorWhite
          showBack
          leftIconStyle={{
            tintColor: COLOR.appColor,
          }}
          onLeftPress={this.onClickGoBack}
          leftIconType="Image"
          children={
            <PText numberOfLines={2} style={[ptText.H3, { color: COLOR.PRIMARY }]}>
              {this.state.selectProductFirst.name}
            </PText>
          }
        />

        {this.state.selectProductFirst.options.length > 0 &&
          this.state.selectProductFirst.options[0].is_dropdown && (
            <Picker
              mode="dropdown"
              selectedValue={
                this.state.selectProductSecond
                  ? this.state.selectProductFirst.options.indexOf(this.state.selectProductSecond)
                  : 'none'
              }
              onValueChange={this.selectProduct.bind(this)}
              textStyle={ptText.H4}
              style={{ color: '#767676' }}>
              <Picker.Item
                label={RootStore.i18n.t('reserve-detail.select-product-placeholder')}
                value={'none'}
                disable
              />
              {this.state.selectProductFirst.options.map((v, i) => (
                <Picker.Item label={v.name || v.ko_name} value={i} key={`dropdown-product-${i}`} />
              ))}
            </Picker>
          )}
        {!this.state.selectProductFirst.options[0].is_dropdown &&
          this.state.selectProductFirst.options.map((v, i) => {
            if (v.options.length > 0) {
              return (
                <View key={v?.name}>
                  <TouchableOpacity
                    onPress={() => {
                      this.selectProduct2(i, this.state.selectProductFirst);
                      this.setState({ selectProductStep2: i });
                    }}
                    style={{
                      marginHorizontal: 16 * WIDTH_SCALE_RATIO,
                      paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
                      paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                      justifyContent: 'center',
                      borderWidth: 0,
                      borderBottomColor: COLOR.appBorderColor,
                      borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                      backgroundColor: COLOR.WHITE,
                    }}
                    key={`step2-2-${i}`}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <PText
                        numberOfLines={numberOfLineNameItem}
                        style={[
                          style.textTitle,
                          {
                            color: this.state.selectProductStep2 === i ? COLOR.WHITE : COLOR.GREY80,
                          },
                        ]}>
                        {v.name || v.ko_name}
                      </PText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <PText
                        style={[
                          style.text,
                          {
                            color: COLOR.GREY40,
                          },
                        ]}>
                        {v.discount_price &&
                        v.discount_price !== 'null' &&
                        parseInt(v.discount_price, 10)
                          ? `￦ ${Util.price_comma(v.discount_price)}`
                          : ''}
                        {'   '}
                        <PText
                          style={[
                            style.textCaption,
                            {
                              color: COLOR.GREY20,
                              textDecorationLine: 'line-through',
                            },
                          ]}>
                          {v.price && v.price !== 'null' && parseInt(v.price, 10)
                            ? `￦ ${Util.price_comma(v.price)}`
                            : ''}
                        </PText>
                      </PText>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
            return (
              <View key={v?.name}>
                <MyTouchableOpacity
                  onPress={() => {
                    this.addFirstParentToCart(v, this.state.selectProductFirst);
                    this.setState({ chosenProductLevel2: i });
                  }}
                  style={
                    this.state.chosenProductLevel2 === i
                      ? {
                          paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
                          right: 10 * WIDTH_SCALE_RATIO,
                          paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                          width: '98%',
                          borderWidth: 0,
                          borderBottomColor: COLOR.appBorderColor,
                          borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                          backgroundColor: COLOR.PRIMARY,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }
                      : {
                          marginHorizontal: 24 * WIDTH_SCALE_RATIO,
                          paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                          borderWidth: 0,
                          borderBottomColor: COLOR.appBorderColor,
                          borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                          backgroundColor: COLOR.WHITE,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }
                  }
                  key={`price-${i}`}>
                  <View
                    style={
                      this.state.chosenProductLevel2 === i
                        ? {
                            marginLeft: 24 * WIDTH_SCALE_RATIO,
                          }
                        : null
                    }>
                    <PText
                      numberOfLines={numberOfLineNameItem}
                      style={[
                        style.textTitle,
                        {
                          color: this.state.chosenProductLevel2 === i ? COLOR.WHITE : COLOR.GREY80,
                        },
                      ]}>
                      {v.name || v.ko_name}
                    </PText>
                    <View style={{ flexDirection: 'row' }}>
                      <PText
                        style={[
                          style.text,
                          {
                            width: '70%',
                            color: COLOR.GREY40,
                          },
                        ]}>
                        {v.discount_price &&
                        v.discount_price !== 'null' &&
                        parseInt(v.discount_price, 10)
                          ? `￦ ${Util.price_comma(v.discount_price)}`
                          : ''}
                        {'   '}
                        <PText
                          style={[
                            style.textCaption,
                            {
                              color: COLOR.GREY20,
                              textDecorationLine: 'line-through',
                            },
                          ]}>
                          {v.price && v.price !== 'null' && parseInt(v.price, 10)
                            ? `￦ ${Util.price_comma(v.price)}`
                            : ''}
                        </PText>
                      </PText>
                    </View>
                  </View>
                </MyTouchableOpacity>
              </View>
            );
          })}
      </View>
    );
  }

  //* step 2.3 choose service
  renderThirdItemList() {
    const { selectProductSecond } = this.state;

    return (
      <View
        style={{
          marginBottom: 20 * HEIGHT_SCALE_RATIO,
        }}>
        <BaseHeaderWithSearch
          noShadow
          hideRecommend
          backgroundColorWhite
          showBack
          leftIconStyle={{
            tintColor: COLOR.appColor,
          }}
          onLeftPress={this.onClickGoBack}
          leftIconType="Image"
          children={
            <PText numberOfLines={2} style={[ptText.H3, { color: COLOR.PRIMARY }]}>
              {selectProductSecond.name}
            </PText>
          }
        />

        {selectProductSecond.options.length > 0 && selectProductSecond.options[0].is_dropdown && (
          <Picker
            mode="dropdown"
            selectedValue={
              selectProductSecond
                ? selectProductSecond.options.indexOf(selectProductSecond)
                : 'none'
            }
            onValueChange={this.selectProduct.bind(this)}
            textStyle={ptText.H4}
            style={{ color: '#767676' }}>
            <Picker.Item
              label={RootStore.i18n.t('reserve-detail.select-product-placeholder')}
              value={'none'}
              disable
            />
            {selectProductSecond.options.map((v, i) => (
              <Picker.Item label={v.name || v.ko_name} value={i} key={`dropdown-product-${i}`} />
            ))}
          </Picker>
        )}
        {selectProductSecond.options &&
          !selectProductSecond.options[0].is_dropdown &&
          selectProductSecond.options.map((v, i) => {
            if (v.options.length > 0) {
              return (
                <View key={v?.name}>
                  <TouchableOpacity
                    onPress={() => {
                      this.selectProduct3(i);
                      this.setState({ selectProductStep3: i });
                    }}
                    style={
                      this.state.selectProductStep3 !== i
                        ? {
                            paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                            paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                            borderWidth: 0,
                            borderBottomColor: COLOR.appBorderColor,
                            borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                          }
                        : {
                            paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                            paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                            borderWidth: 0,
                            width: WIDTH,
                            left: -10 * WIDTH_SCALE_RATIO,
                            borderBottomColor: COLOR.appBorderColor,
                            borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                            backgroundColor: COLOR.PRIMARY,
                          }
                    }
                    key={`step2-2-${i}`}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <PText
                        numberOfLines={numberOfLineNameItem}
                        style={[
                          style.textTitle,
                          {
                            marginBottom: 5,
                            color:
                              this.state.selectProductStep3 === i ? COLOR.PRIMARY : COLOR.GREY80,
                          },
                        ]}>
                        {v.name || v.ko_name}
                      </PText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <PText
                        style={[
                          style.text,
                          {
                            color: COLOR.GREY40,
                          },
                        ]}>
                        {v.discount_price &&
                        v.discount_price !== 'null' &&
                        parseInt(v.discount_price, 10)
                          ? `￦ ${Util.price_comma(v.discount_price)}`
                          : ''}
                        {'   '}
                        <PText
                          style={[
                            style.textCaption,
                            {
                              color: COLOR.GREY20,
                              textDecorationLine: 'line-through',
                            },
                          ]}>
                          {v.price && v.price !== 'null' && parseInt(v.price, 10)
                            ? `￦ ${Util.price_comma(v.price)}`
                            : ''}
                        </PText>
                      </PText>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
            return (
              <MyTouchableOpacity
                onPress={() => {
                  this.addFirstParentToCart(v, this.state.selectProductSecond);

                  this.setState({
                    chosenProductLevel3: i,
                  });
                }}
                style={
                  this.state.chosenProductLevel3 === i
                    ? {
                        paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                        paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                        borderWidth: 0,
                        borderBottomColor: COLOR.appBorderColor,
                        borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                        backgroundColor: COLOR.PRIMARY,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }
                    : {
                        marginHorizontal: 24 * WIDTH_SCALE_RATIO,
                        paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                        borderWidth: 0,
                        borderBottomColor: COLOR.appBorderColor,
                        borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                        backgroundColor: COLOR.WHITE,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }
                }
                key={`price-${i}`}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}>
                    <PText
                      numberOfLines={numberOfLineNameItem}
                      style={[
                        style.textTitle,
                        {
                          color: this.state.chosenProductLevel3 === i ? COLOR.WHITE : COLOR.GREY80,
                        },
                      ]}>
                      {v.name || v.ko_name}
                    </PText>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <PText
                      style={[
                        style.text,
                        {
                          width: '70%',
                          color: COLOR.GREY40,
                        },
                      ]}>
                      {v.discount_price &&
                      v.discount_price !== 'null' &&
                      parseInt(v.discount_price, 10)
                        ? `￦ ${Util.price_comma(v.discount_price)}`
                        : ''}
                      {'   '}
                      <PText
                        style={[
                          style.textCaption,
                          {
                            color: COLOR.GREY20,
                            textDecorationLine: 'line-through',
                          },
                        ]}>
                        {v.price && v.price !== 'null' && parseInt(v.price, 10)
                          ? `￦ ${Util.price_comma(v.price)}`
                          : ''}
                      </PText>
                    </PText>
                  </View>
                </View>
              </MyTouchableOpacity>
            );
          })}
      </View>
    );
  }
}

ReserveSpot.propTypes = {
  spotCode: PropTypes.number,
  reserveCode: PropTypes.number,
};

const styles = StyleSheet.create({
  safeArea: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
  },

  inputDataForm: {
    height: 40 * HEIGHT_SCALE_RATIO,
    paddingLeft: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.appBorderColor,
  },
});
