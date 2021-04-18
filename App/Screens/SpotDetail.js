import Clipboard from '@react-native-community/clipboard';
import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import { Accordion, Button, Content, Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SwipableRating from 'react-native-swipeable-rating';
import Swiper from 'react-native-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ICON, IMAGE } from '../../asset/image/ImagePath';
import Const from '../../Common/Const';
import changeLike from '../../Common/gql/mutations/changeLike.gql';
import createReview from '../../Common/gql/mutations/createReview.gql';
import deleteReview from '../../Common/gql/mutations/deleteReview.gql';
import getReviewlist from '../../Common/gql/queries/getReviewlist.gql';
import getSpotDetail from '../../Common/gql/queries/getSpotDetail.gql';
import getSpotList from '../../Common/gql/queries/getSpotList.gql';
import getSpotOptionList from '../../Common/gql/queries/getSpotOptionList.gql';
import Util from '../../Common/Util';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import Divider from '../Components/Divider';
import FurtherReadingItem from '../Components/FurtherReadingItem';
import HeartButton from '../Components/HeartButton';
import InfiniteScroll from '../Components/InfiniteScroll';
import ModalContact from '../Components/ModalContact';
import ModalGallery from '../Components/ModalGallery';
import { myAlert } from '../Components/MyAlert';
import MyImage from '../Components/MyImage';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import MyWebView from '../Components/MyWebView';
import PFlatList from '../Components/PFlatList';
import PText from '../Components/PText';
import ReviewInput from '../Components/ReviewInput';
import ReviewItem from '../Components/ReviewItem';
import {
  HEIGHT,
  HEIGHT_SCALE_RATIO,
  IS_ANDROID,
  PAGING_LIMIT,
  WIDTH,
  WIDTH_SCALE_RATIO,
} from '../Constant/constant';
import globalUtils from '../Constants/globalUtils';
import style, { COLOR, ptColor, ptText } from '../Constants/styles';
import { convertTime12to24 } from '../Constants/utils';
import RootStore from '../Stores/RootStore';

const deviceWidth = Dimensions.get('window').width;
const borderRadius = 10;

moment.suppressDeprecationWarnings = true;

const CarouselListItem = React.memo((props) => {
  const { item, index, onPress } = props;
  return (
    <MyTouchableOpacity
      key={item}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
      }}
      onPress={onPress}>
      <MyImage
        style={{
          width: 343 * WIDTH_SCALE_RATIO,
          height: 264 * HEIGHT_SCALE_RATIO,
          borderRadius,
        }}
        source={item ? { uri: item } : IMAGE.DEFAULT_PROFILE_IMAGE}
      />
    </MyTouchableOpacity>
  );
});
const PrecautionsListItem = React.memo((props) => {
  const { item } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10 * HEIGHT_SCALE_RATIO,
        marginRight: 16 * WIDTH_SCALE_RATIO,
      }}>
      <View
        style={{
          marginHorizontal: 8 * WIDTH_SCALE_RATIO,
          marginTop: 8 * WIDTH_SCALE_RATIO,
          width: 6 * WIDTH_SCALE_RATIO,
          height: 6 * WIDTH_SCALE_RATIO,
          borderRadius: (6 * WIDTH_SCALE_RATIO) / 2,
          backgroundColor: COLOR.GREY60,
        }}
      />
      <PText
        style={[
          style.text,
          ptColor.GREY80,
          {
            marginLeft: 8 * HEIGHT_SCALE_RATIO,
            marginRight: 5 * WIDTH_SCALE_RATIO,
          },
        ]}>
        {item}
      </PText>
    </View>
  );
});
const MoreInfomationListItem = React.memo((props) => {
  const { item } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 16 * HEIGHT_SCALE_RATIO,
        marginRight: 24 * WIDTH_SCALE_RATIO,
      }}>
      <View
        style={{
          width: 24 * WIDTH_SCALE_RATIO,
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: style.text.fontSize / 2,
            width: 6 * WIDTH_SCALE_RATIO,
            height: 6 * WIDTH_SCALE_RATIO,
            borderRadius: (6 * WIDTH_SCALE_RATIO) / 2,
            backgroundColor: COLOR.GREY60,
          }}
        />
      </View>

      <PText style={[style.text, ptColor.GREY80, { paddingLeft: 8 * WIDTH_SCALE_RATIO }]}>
        {item}
      </PText>
    </View>
  );
});
const AccordionHeaderListItem = React.memo((props) => {
  const {
    item,
    expanded,
    selected,
    onAccordingHeaderNamePress,
    onAccordingHeaderIconPress,
  } = props;
  const nameList = JSON.parse(item && item.name);
  const nameTicket = nameList && nameList[RootStore.language];
  const informationList = JSON.parse(item && item.information);
  const informationTicket =
    informationList && informationList[RootStore.language]
      ? informationList[RootStore.language]
      : '';
  const price = item.price ? '￦ ' + item.price.format() : '';
  const discountPrice = item.discount_price ? '￦ ' + item.discount_price.format() : '';
  const imageTicket = item && item.images && item.images.length > 0 && item.images[0].url;

  const tempSelected = selected === item;

  const onPress = () => onAccordingHeaderNamePress(item);

  const onIconPress = () => onAccordingHeaderIconPress(item);
  if (nameList && nameTicket) {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
            paddingVertical: 16 * HEIGHT_SCALE_RATIO,
            height: 80 * HEIGHT_SCALE_RATIO,
            width: deviceWidth,
            alignItems: 'center',
            backgroundColor: tempSelected ? COLOR.appColor : 'white',
          }}>
          <View style={{ flex: 1 }}>
            <MyTouchableOpacity onPress={onPress} style={{}}>
              <PText
                numberOfLines={2}
                style={[
                  style.textTitle,
                  {
                    color: tempSelected ? 'white' : COLOR.GREY80,
                    marginBottom: 5,
                  },
                ]}>
                {nameTicket}
              </PText>
              <PText
                style={[
                  style.text,
                  {
                    color: tempSelected ? COLOR.WHITE : COLOR.GREY40,
                  },
                ]}>
                {discountPrice}
                {'   '}
                <PText
                  style={[
                    style.textCaption,
                    {
                      color: tempSelected ? COLOR.WHITE : COLOR.GREY20,
                      textDecorationLine: 'line-through',
                    },
                  ]}>
                  {price}
                </PText>
              </PText>
            </MyTouchableOpacity>
          </View>

          <View style={{ width: deviceWidth * 0.1, alignItems: 'flex-end' }}>
            <MyTouchableOpacity
              onPress={onIconPress}
              style={{
                paddingTop: 10 * WIDTH_SCALE_RATIO,
                paddingBottom: 10 * WIDTH_SCALE_RATIO,
                paddingLeft: 20 * WIDTH_SCALE_RATIO,
              }}>
              {informationList && (informationTicket || imageTicket) ? (
                expanded ? (
                  <Icon
                    type="Entypo"
                    name="chevron-thin-up"
                    style={[style.textTitle, { color: COLOR.GREY60 }]}
                  />
                ) : (
                  <Icon type="Entypo" name="chevron-thin-down" style={style.textTitle} />
                )
              ) : null}
            </MyTouchableOpacity>
          </View>
        </View>
        <Divider style={{ marginHorizontal: 16 * WIDTH_SCALE_RATIO }} />
      </TouchableOpacity>
    );
  }
});
const AccordionContentListItem = React.memo((props) => {
  const { item, expanded } = props;
  // activeMoreInfoSlide
  const [activeMoreInfoSlide, setActiveMoreInfoSlide] = useState(0);

  const informationList = JSON.parse(item && item.information);
  const informationTicket =
    informationList && informationList[RootStore.language]
      ? informationList[RootStore.language]
      : '';
  const imageTicket = item && item.images;
  if (informationList && (informationTicket || imageTicket)) {
    const renderDots = () => {
      return (activeIndex) =>
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
        ));
    };

    const renderItemMoreInfoSlider = ({ item, index }) => {
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
            style={{ width: WIDTH, height: 280 * HEIGHT_SCALE_RATIO }}
            source={item ? { uri: item.url + '?d=450' } : IMAGE.DEFAULT_PROFILE_IMAGE}
          />
        </MyTouchableOpacity>
      );
    };

    let sliderMoreInfo = null;
    return (
      <View style={{}}>
        {informationTicket ? (
          <PText
            style={[
              style.textSubTitle,
              {
                paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
                paddingTop: 16 * HEIGHT_SCALE_RATIO,
                marginBottom: 16 * HEIGHT_SCALE_RATIO,
              },
            ]}>
            {informationTicket}
          </PText>
        ) : null}
        {imageTicket ? (
          <View>
            <Carousel
              ref={(c) => (sliderMoreInfo = c)}
              data={imageTicket}
              contentContainerCustomStyle={{
                backgroundColor: 'transparent',
              }}
              renderItem={renderItemMoreInfoSlider}
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
              onSnapToItem={(index) => {
                setActiveMoreInfoSlide(index);
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
              carouselRef={sliderMoreInfo}
              dotsLength={imageTicket.length}
              activeDotIndex={activeMoreInfoSlide}
              renderDots={renderDots}
            />
          </View>
        ) : null}
      </View>
    );
  }
});

export default class SpotDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalMailSupport: false,
      spot: null,
      selected: null,
      isShowTranslate: false,
      cityTags: [],
      region: '',
      city: '',
      interestTags: [],
      titleName: '',
      koreanSpotName: '',
      isLike: false,
      rating: 0,
      writer: { code: 0, nickname: '', picture: '' },
      openingHours: [],
      openingInfo: { isOpen: '', time: null, isNotData: true },
      dayText: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      address: '',
      phone: '',
      requireInfo: [],
      products: [],
      price: [],
      defaultPrice: [],
      priceInfo: { text: '', isNotData: true },
      location: {
        latitude: 37.561641,
        longitude: 126.992382,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      },
      marker: { latitude: 37.561641, longitude: 126.992382 },
      images: [],
      imageIndex: 0,
      reviews: [],
      reviewCount: 0,
      offset: 0,
      existOther: true,
      isOpeningDetailVisible: false,
      isPriceDetailVisible: false,
      blogLink: [],
      isBlogLinkVisible: false,
      isReserveable: false,
      reserveType: 0,
      moreInfomation: [],
      precautions: [],
      reserveSpotRemarkList: [],
      selectRemarks: [],
      titlePrice: '',
      cancelPrice: '',
      showImage: false,
      paddingBottom: Util.getIOSPadding('bottom'),
      isWriteComment: true,
      visible: false,
      activeSlide: 0,
      suggestSpot: [],
      expandInformation: [],
    };
    this.getSpot = this.getSpot.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.renderSuggest = this.renderSuggest.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this.computedPriceText = this.computedPriceText.bind(this);
    this.isDeleteable = this.isDeleteable.bind(this);
    this.isOpenCheck = this.isOpenCheck.bind(this);
    this.createReserveInfo = this.createReserveInfo.bind(this);
    this.createReserveCaution = this.createReserveCaution.bind(this);
    this.onClickShowBlogLink = this.onClickShowBlogLink.bind(this);
    this.onClickGoReserve = this.onClickGoReserve.bind(this);
    this.onClickGoSpotMap = this.onClickGoSpotMap.bind(this);
    this.onClickGoBack = this.onClickGoBack.bind(this);
    this.onClickRegistReview = this.onClickRegistReview.bind(this);
    this.onClickDeleteReview = this.onClickDeleteReview.bind(this);
    this.onClickChildRegistReview = this.onClickChildRegistReview.bind(this);
    this.onClickChildDeleteReview = this.onClickChildDeleteReview.bind(this);
    this.onClickCreateReplyForm = this.onClickCreateReplyForm.bind(this);
    this.onClickSpotImage = this.onClickSpotImage.bind(this);
    this.renderNormalSpotDetail = this.renderNormalSpotDetail.bind(this);
    this.renderReserveSpotDetail = this.renderReserveSpotDetail.bind(this);
    this.renderReserveButton = this.renderReserveButton.bind(this);
    this.renderModals = this.renderModals.bind(this);
    this.renderLargeImage = this.renderLargeImage.bind(this);

    this.renderShare = this.renderShare.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.renderItemSlider = this.renderItemSlider.bind(this);
    this.onPressShowButton = this.onPressShowButton.bind(this);
    this.renderInfomation = this.renderInfomation.bind(this);
    this.renderOpenningHours = this.renderOpenningHours.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
    this.renderTicketOptions = this.renderTicketOptions.bind(this);
    this.renderPrecaution = this.renderPrecaution.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.renderItemComment = this.renderItemComment.bind(this);
    this.renderFurtherReadings = this.renderFurtherReadings.bind(this);
  }

  render() {
    return this.state.isReserveable
      ? this.renderReserveSpotDetail()
      : this.renderNormalSpotDetail();
  }

  componentWillUnmount = () => {
    DeviceEventEmitter.removeListener(
      'keepGoingBooking',
      this.onClickGoReserve.bind(this, globalUtils.spotDetail?.type),
    );
  };
  componentDidMount = () => {
    analytics().setCurrentScreen('Spot-Detail');
    this.getSpot().finally(() =>
      this.getSpotOption().finally(() => this.getReviews().finally(() => this.getSpotList())),
    );
    DeviceEventEmitter.addListener(
      'keepGoingBooking',
      this.onClickGoReserve.bind(this, globalUtils.spotDetail?.type),
    );
  };

  getSpotOption = async () => {
    const variables = {
      spot_code: this.props.spotCode,
    };

    const result = await RootStore.client.query({
      query: getSpotOptionList,
      variables,
    });

    const expandInformation = result.data.getSpotOptionList.options.filter(
      (v) => v.is_reserve === true && v.p_code === 0,
    );
    this.setState({
      expandInformation,
    });
  };

  getSpotList = async () => {
    const variables = {
      isRecommend: true,
      language: RootStore.language,
      limit: 5,
    };

    const result = await RootStore.client.query({
      query: getSpotList,
      variables,
    });
    this.setState({ suggestSpot: result.data.getSpotList.spots });
  };

  onPressShowButton = () => {
    this.setState({ isShowTranslate: !this.state.isShowTranslate });
  };

  getSpot = async () => {
    const variables = {
      code: this.props.spotCode,
      languages: [RootStore.language, 'ko'],
    };
    const result = await RootStore.client.query({
      query: getSpotDetail,
      variables,
    });

    const spot = result?.data?.getSpotDetail?.spot;
    spot.spot_reserve = spot.reserve_info;
    const requireInfo = spot?.reserve_info;
    const cityTags = spot?.tags?.filter((v) => v?.type === Const.TagType.City.code);
    const regionTag = spot?.tags?.filter((v) => v?.type === 7);

    const region =
      this.props.region && this.props.region !== 'undefined'
        ? this.props.region
        : regionTag && regionTag.length > 0 && regionTag[0].name
        ? regionTag[0].name
        : (regionTag &&
            regionTag.length > 0 &&
            regionTag[0].translations.length > 0 &&
            regionTag[0].translations.filter((v) => v.language === RootStore.language)[0].name) ||
          '';
    // this.props.region && this.props.region !== 'undefined'
    //   ? this.props.region
    //   : regionTag &&
    //     regionTag.length > 0 &&
    //     regionTag.filter((v) => v.language === RootStore.language)
    //   ? regionTag[0].name
    //   : '';

    const city =
      this.props.city && this.props.city !== 'undefined'
        ? this.props.city
        : cityTags && cityTags.length > 0 && cityTags[0].name
        ? cityTags[0].name
        : cityTags &&
          cityTags.length > 0 &&
          cityTags[0].translations.length > 0 &&
          cityTags[0].translations[0].name
        ? cityTags[0].translations[0].name
        : '';

    const interestTags =
      spot && spot.tags && spot.tags.filter((v) => v?.type === Const.TagType.Interest.code);

    const defaultTransData = spot?.translations?.find((t) => t.is_default) || [];

    const isTransData = spot?.translations?.find((t) => t.language === RootStore.language);
    const koreanTransData = spot?.translations?.find((t) => t.language === 'ko');
    const titleName = isTransData ? isTransData.spot_name : defaultTransData.spot_name;

    const koreanSpotName =
      spot.spot_name_ko && spot.spot_name_ko !== ''
        ? spot.spot_name_ko
        : koreanTransData?.spot_name
        ? koreanTransData.spot_name
        : '';

    let isLike = false;
    if (spot && spot.like && RootStore.auth.id !== '') {
      isLike = true;
    }

    let rating = 5.0;
    if (spot.rating_review_count > 0) {
      const ratingResult = spot.review_total_score / spot.rating_review_count;
      rating = ratingResult.toFixed(1);
    } else {
      rating = Const.Default.Spot_Rating;
    }

    const writer = {
      nickname: spot.register.nickname,
      picture: spot.register.picture,
    };

    const openingHours = JSON.parse(spot.opening_hours);

    const address = spot.address !== '' ? spot.address : '주소정보 없음';

    const phone = spot.telephone !== '' ? spot.telephone : '전화번호 없음';

    const price =
      isTransData && isTransData.price
        ? JSON.parse(isTransData.price)
        : defaultTransData.price
        ? JSON.parse(defaultTransData.price)
        : [];

    const defaultPrice = defaultTransData.leng ? JSON.parse(defaultTransData.price) : [];

    const priceInfo = this.computedPriceText(
      isTransData ? JSON.parse(isTransData.price) : JSON.parse(defaultTransData.price),
    );

    const openingInfo = this.isOpenCheck(openingHours);

    let isReserveable = false;
    let reserveType = 0;
    let moreInfomation = [];
    let precautions = [];

    const preCuation = isTransData ? isTransData.precautions : defaultTransData.precautions;
    precautions = this.createReserveCaution(preCuation);

    if (spot.reserve_info) {
      const moreInfo = isTransData ? isTransData.more_infomation : defaultTransData.more_infomation;
      moreInfomation = this.createReserveInfo(moreInfo);

      if (spot.is_reservable) {
        reserveType = spot.reserve_info.type;
        isReserveable = true;
      }
    }

    const blogLinkTemp = spot?.blogs?.map((e) => {
      const defaultTrans = e?.translations?.find((t) => t.is_default) || '';
      const trans = e.translations.find((t) => t.language === RootStore.language);
      const name = trans?.title || defaultTrans.title;
      return { blog: e, code: e.code, name };
    });

    const blogLink = blogLinkTemp.filter((v) => v.blog.translations.length > 0);

    //* 지도 용 위치
    const location = {
      latitude: spot.latitude,
      longitude: spot.longitude,
      latitudeDelta: 0.0015,
      longitudeDelta: 0.0015,
    };

    //* 마커용 위치
    const marker = {
      latitude: spot.latitude,
      longitude: spot.longitude,
    };

    //* 슬라이드 형태로 만들기 위해, 미리 이미지 url을 만들어서 배열에 저장한다.
    const tempImage = spot?.images?.filter((v) => v?.main_image === true);
    const tempImage2 = spot?.images?.filter((v) => v?.main_image === false);
    const mainImageToFirst = tempImage?.concat(tempImage2);
    const images = mainImageToFirst?.map((v) => `${v.url + '?d=750'}`);

    const reviewCount = spot.rating_review_count + spot.no_rating_review_count;

    const titlePriceInfo = isTransData
      ? JSON.parse(isTransData.title_price)
      : JSON.parse(defaultTransData.title_price);
    let titlePrice = null;
    let cancelPrice = null;
    if (Number(titlePriceInfo.normal)) {
      titlePrice = '￦' + titlePriceInfo.normal;
    } else {
      titlePrice = titlePriceInfo.normal;
    }
    if (Number(titlePriceInfo.cancel)) {
      cancelPrice = '￦' + titlePriceInfo.cancel;
    } else {
      cancelPrice = titlePriceInfo.cancel;
    }

    const products = [];
    spot.options?.map((v) => {
      const nameObj = JSON.parse(v.name);
      if (v.p_code === 0) {
        const priceObj = {
          code: v.code,
          price: v.price,
          defaultName: nameObj.ko !== undefined ? nameObj.ko : '',
          transName: nameObj[RootStore.language] !== undefined ? nameObj[RootStore.language] : '',
        };

        const lv2 = spot.options?.filter((f) => v.code === f.p_code);
        if (lv2.length > 0) {
          lv2.map((v2) => {
            const nameObj = JSON.parse(v2.name);
            const lv3 = spot.options?.filter((f) => v2.code === f.p_code);
            const defaultName = `${priceObj.defaultName}|${
              nameObj.ko !== undefined ? nameObj.ko : ''
            }`;
            const transName = `${priceObj.transName}|${
              nameObj[RootStore.language] !== undefined ? nameObj[RootStore.language] : ''
            }`;

            if (lv3.length > 0) {
              lv3.map((v3) => {
                const nameObj = JSON.parse(v3.name);

                products.push({
                  ...priceObj,
                  price: v3.price,
                  defaultName: `${defaultName}|${nameObj.ko !== undefined ? nameObj.ko : ''}`,
                  transName: `${transName}|${
                    nameObj[RootStore.language] !== undefined ? nameObj[RootStore.language] : ''
                  }`,
                });
              });
            } else {
              products.push({
                ...priceObj,
                price: v2.price,
                defaultName: `${priceObj.defaultName}|${
                  nameObj.ko !== undefined ? nameObj.ko : ''
                }`,
                transName: `${priceObj.transName}|${
                  nameObj[RootStore.language] !== undefined ? nameObj[RootStore.language] : ''
                }`,
              });
            }
          });
        } else {
          products.push(priceObj);
        }
      }
    });

    const remarks = spot.reserve_info ? JSON.parse(spot.reserve_info.remarks) : [];
    const reserveSpotRemarkList = Object.values(Const.ReserveSpotRemarks).map((v) => {
      let select = false;
      remarks.forEach((v2) => {
        if (v.code === v2) {
          select = true;
        }
      });

      return {
        code: v.code,
        icon: v.icon,
        translationKey: v.translationKey,
        select,
      };
    });

    this.setState({
      spot,
      cityTags,
      region,
      city,
      interestTags,
      titleName,
      requireInfo,
      koreanSpotName,
      isLike,
      rating,
      writer,
      openingHours,
      openingInfo,
      address,
      phone,
      products,
      price,
      defaultPrice,
      priceInfo,
      location,
      marker,
      images,
      reviewCount,
      blogLink,

      isReserveable,
      reserveType,
      moreInfomation,
      precautions,

      reserveSpotRemarkList,
      selectRemarks: remarks,

      titlePrice,
      cancelPrice,
    });
  };

  computedPriceText = (defaultPrice) => {
    if (defaultPrice.length > 0) {
      const sortPriceData = defaultPrice.sort((a, b) =>
        Number(a.price) > Number(b.price) ? 1 : Number(b.price) > Number(a.price) ? -1 : 0,
      );

      if (sortPriceData.length === 1) {
        return {
          text: `${sortPriceData[0].price} ~ ${sortPriceData[0].price}`,
          isNotData: false,
        };
      }

      return {
        text: `${sortPriceData[0].price} ~ ${sortPriceData[sortPriceData.length - 1].price}`,
        isNotData: false,
      };
    }

    return {
      text: RootStore.i18n.t('spot.empty-info'),
      isNotData: true,
    };
  };

  isDeleteable = (review) => {
    if (RootStore.auth.level >= Const.MemberLevel.AdminMax.code) {
      return true;
    }

    if (RootStore.auth.id === review.writer.id) {
      return true;
    }

    return false;
  };

  isOpenCheck = (timeData) => {
    const todayIndex = moment().day() - 1 < 0 ? 6 : moment().day() - 1;
    const today = timeData[todayIndex];
    if (today.open === '' || today.close === '') {
      return {
        isOpen: '',
        time: RootStore.i18n.t('spot.empty-info'),
        isNotData: true,
      };
    } else if (today.open === 'FullTime' && today.close === 'FullTime') {
      return {
        isOpen: 'Open Now',
        time: '24 Hours',
        isNotData: false,
      };
    }

    const isBefore = moment(today.open, 'hh:mmA').isBefore(today.close, 'hh:mmA');
    const todayFormat = moment().format('YYYY-MM-DD');

    const time = isBefore
      ? {
          openTime: moment(today.open, 'hh:mmA'),
          closeTime: moment(today.close, 'hh:mmA'),
        }
      : {
          openTime: moment(`${todayFormat} ${today.open}`, 'YYYY-MM-DD hh:mmA'),
          closeTime: moment(`${todayFormat} ${today.close}`, 'YYYY-MM-DD hh:mmA').add(1, 'day'),
        };

    return moment().isBetween(time.openTime, time.closeTime)
      ? {
          isOpen: 'Open Now',
          time: `Open Now ${today.open} - ${today.close}`,
          isNotData: false,
        }
      : {
          isOpen: 'Close Now',
          time: `Close Now ${today.open} - ${today.close}`,
          isNotData: false,
        };
  };

  createReserveInfo = (moreInfomation) => {
    if (!moreInfomation) {
      return [];
    }
    const moreInfo = [];
    if (moreInfomation && moreInfomation !== '') {
      moreInfomation.split(/\r\n|\r|\n/).forEach((i) => {
        if (Util.trim(i) !== '') moreInfo.push(i);
      });
    }

    return moreInfo;
  };

  createReserveCaution = (preCuation) => {
    if (!preCuation) {
      return [];
    }

    const caution = [];
    if (preCuation && preCuation !== '') {
      preCuation.split(/\r\n|\r|\n/).forEach((i) => {
        if (Util.trim(i) !== '') {
          caution.push(i);
        }
      });
    }

    return caution;
  };

  getReviews = async () => {
    if (!this.state.existOther) {
      return;
    }

    const variables = {
      where: 'spot',
      code: this.props.spotCode,
      offset: PAGING_LIMIT * this.state.offset,
      limit: PAGING_LIMIT,
      language: RootStore.language,
    };
    const result = await RootStore.client.query({
      query: getReviewlist,
      variables,
    });
    const reviewList = [];
    result.data.getReviewList.reviews.forEach((v, i) => {
      const checkLang = v.translations.find((rt) => rt.language === RootStore.language);
      const translations = checkLang || v.translations[0];

      reviewList.push({ ...v, translations });
    });
    const reviews = this.state.reviews.concat(reviewList);

    let existOther = true;
    if (result.data.getReviewList.reviews.length < PAGING_LIMIT) {
      existOther = false;
    }

    this.setState({
      reviews: [...reviews],
      offset: this.state.offset + 1,
      existOther,
    });
  };
  onCancel = () => {
    this.setState({ visible: false });
  };

  onClickShareButton = () => {
    this.setState({ visible: true });
  };

  onClickCreateLink = () => {
    Clipboard.setString(
      `https://www.creatrip.com/spot/${this.props.spotCode}/${Util.encodeURI(
        this.state.titleName,
      )}`,
    );
    Alert.alert(
      '',
      RootStore.i18n.t('global.copy-url'),
      [{ text: RootStore.i18n.t('global.close') }],
      { cancelable: true },
    );
  };

  onClickHeart = async (change) => {
    if (RootStore.auth.id === '') {
      return;
    }

    const variables = {
      nowState: this.state.isLike,
      where: 'spot',
      code: this.state.spot.code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });

    if (result.data.changeLike) {
      this.setState({ isLike: !this.state.isLike });
    }
  };

  onClickRegistReview = async (review) => {
    if (globalUtils.isLogin) {
      const variables = {
        where: 'spot',
        code: this.props.spotCode,
        star_rating: review.isQuestion ? 0 : review.rating,
        content: review.content,
        language: RootStore.language,
      };
      const result = await RootStore.client.mutate({
        mutation: createReview,
        variables,
      });

      if (result.data.createReview.result) {
        const reviews = this.state.reviews;
        const reviewCount = this.state.reviewCount + 1;

        const data = { ...result.data.createReview.review };
        data.childReview = [];
        const found = result?.data?.createReview?.review?.translations?.find(
          (item) => item.language === RootStore.language,
        );
        const defaultTranslation = result?.data?.createReview?.review?.translations?.find(
          (item) => item.language === 'en',
        );
        if (found) {
          data.translations = found;
        } else {
          data.translations = defaultTranslation;
        }
        data.star_rating = review.isQuestion ? 0 : review.rating;
        data.writer = {
          nickname: RootStore.auth?.nickname ?? RootStore.i18n.t('global.unknown-contributor'),
          picture: RootStore.auth.picture,
          id: RootStore.auth.id,
        };
        reviews.unshift(data);
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
          sum += reviews[i].star_rating;
        }
        let rating = (sum / reviews.length).toFixed(1);
        this.setState({ rating, reviews: [...reviews], reviewCount });
      }
    } else {
      myAlert('', 'Login required.', () => {
        globalUtils.isBackToSpotDetail = true;
        globalUtils.isComment = true;

        globalUtils.spotDetail = {
          type: Const.ReserveType.Stand.code,
          spot: this.state.spot,
        };
        Actions.jump('login');
      });
    }
  };

  onClickDeleteReview = async (review) => {
    const result = await RootStore.client.mutate({
      mutation: deleteReview,
      variables: { code: review.code },
    });

    if (result.data.deleteReview.result) {
      const reviews = this.state.reviews;
      const reviewCount = this.state.reviewCount - 1;

      const index = reviews.indexOf(review);
      if (index !== -1) {
        reviews.splice(index, 1);
      }

      let sum = 0;

      for (let i = 0; i < reviews.length; i++) {
        sum += reviews[i].star_rating;
      }
      let rating = (sum / reviews.length).toFixed(1);

      this.setState({ rating, reviews: [...reviews], reviewCount });
    }
  };

  onClickCreateReplyForm = async (index) => {
    const reviews = this.state.reviews;
    console.log('29148 nhan reply ne ', index, reviews);
    reviews[index].addReply = true;
    console.log('29148 nhan reply ne reviews', reviews);

    this.setState({ reviews: [...reviews] });
  };

  onClickChildRegistReview = async (review, code, index) => {
    const variables = {
      where: 'review',
      parentWhere: 'spot',
      code,
      parentCode: this.props.spotCode,
      star_rating: 0,
      content: review.content,
      language: RootStore.language,
    };
    const result = await RootStore.client.mutate({
      mutation: createReview,
      variables,
    });

    if (result.data.createReview.result) {
      const reviews = this.state.reviews;
      const data = { ...result.data.createReview.review };
      const found = result?.data?.createReview?.review?.translations?.find(
        (item) => item.language === RootStore.language,
      );
      const defaultTranslation = result?.data?.createReview?.review?.translations?.find(
        (item) => item.language === 'en',
      );
      data.translations = found ? [found] : [defaultTranslation];

      data.writer = {
        nickname: RootStore?.auth?.nickname ?? RootStore.i18n.t('global.unknown-contributor'),
        picture: RootStore.auth.picture,
        id: RootStore.auth.id,
      };

      reviews[index].childReview.unshift(data);
      reviews[index].addReply = false;
      const reviewCount = this.state.reviewCount + 1;
      this.setState({ reviews: [...reviews], reviewCount });
    }
  };

  onClickChildDeleteReview = async (review, child) => {
    const result = await RootStore.client.mutate({
      mutation: deleteReview,
      variables: { code: child.code },
    });

    if (result.data.deleteReview.result) {
      const reviews = this.state.reviews;
      const reviewCount = this.state.reviewCount - 1;

      const index = reviews.indexOf(review);
      if (index !== -1) {
        const childIndex = reviews[index].childReview.indexOf(child);

        if (childIndex !== -1) {
          reviews[index].childReview.splice(childIndex, 1);
        }
      }
      this.setState({ reviews: [...reviews], reviewCount });
    }
  };

  onClickBlogLink = (blog) => {
    this.setState({ isBlogLinkVisible: false }, () => {
      Actions.blogDetail({ blogCode: blog.code });
    });
  };

  onClickShowBlogLink = () => {
    if (this.state.blogLink.length === 1) {
      Actions.blogDetail({
        blogCode: this.state.blogLink[0].code,
      });
      return;
    }

    Actions.spotBlogLink({
      blogLink: this.state.blogLink,
      city: this.state.city,
      region: this.state.region,
      title:
        !this.state.isReserveable && this.state.blogLink.length > 0
          ? RootStore.i18n.t('spot.related-blogs')
          : RootStore.i18n.t('spot.show-link'),
    });
  };

  onClickGoReserve = async (type) => {
    if (globalUtils.isLogin) {
      switch (type) {
        case Const.ReserveType.Stand.code:
          Actions.reserveSpot({
            spotCode: this.props.spotCode,
            requireInfo: this.state.requireInfo,
          });
          break;

        case Const.ReserveType.MemberBenefit.code:
          Actions.memberBenefit({
            spotCode: this.props.spotCode,
            spotName: this.state.titleName,
            benefits: this.state.precautions,
          });
          break;

        case Const.ReserveType.Outside.code:
          if (this.state?.spot?.reserve_info?.outside_url?.includes('http')) {
            if (this.state?.spot?.reserve_info?.outside_url !== '') {
              this.refs.modalWebView.open(this.state.spot.reserve_info.outside_url);
            } else {
              this.refs.modalWebView.open('http://www.Creatrip.com');
            }
          } else {
            if (this.state?.spot?.reserve_info?.outside_url !== '') {
              this.refs.modalWebView.open(this.state.spot.reserve_info.outside_url);
            } else {
              this.refs.modalWebView.open('http://www.Creatrip.com');
            }
          }
          break;

        default:
          Actions.reserveSpot({
            spotCode: this.props.spotCode,
            requireInfo: this.state.requireInfo,
          });
      }
    } else {
      myAlert('', 'Login required.', () => {
        globalUtils.isBackToSpotDetail = true;
        globalUtils.spotDetail = { type, spot: this.state.spot };
        Actions.jump('login');
      });
    }
  };

  onClickGoSpotMap = () => {
    Actions.push('map', { spot: this.state.spot, isFromSpotDetail: true });
  };

  onClickGoBack = () => {
    if (this.props.spotDetailRequire) {
      Actions.reset('giftScreen', {
        postType: Const.PostType.Spot.code,
        typesOfSpot: Const.SpotListType.reservation.code,
        categoryType: Const.CategoryType.Reserve.code,
        showReservationSpotsOnly: true,
        reservations: true,
        isHome: 'home',
      });
    } else {
      Actions.pop();
    }
  };

  onClickSpotImage = () => {
    let pos = this._slider.state.position;
    if (pos < 0 || pos >= this.state.images.length) {
      pos = 0;
    }

    this.setState({ showImage: true, imageIndex: pos });
  };

  shareSocialOptions = (shareOptions, socialApp) => {
    switch (socialApp) {
      case 'facebook':
        Share.shareSingle({
          social: Share.Social.FACEBOOK,
          url: shareOptions.message,
          ...shareOptions,
        });
        break;
      case 'whatsapp':
        if (IS_ANDROID) {
          Share.isPackageInstalled('com.whatsapp.android').then(({ isInstalled }) => {
            if (isInstalled) {
              Share.shareSingle({
                social: Share.Social.WHATSAPP,
                url: shareOptions.message,
                ...shareOptions,
              });
            } else {
              alertNotInstallApp('Whatsapp');
            }
          });
        } else {
          Linking.canOpenURL('whatsapp:').then((isInstalled) => {
            if (isInstalled) {
              Share.shareSingle({
                social: Share.Social.WHATSAPP,
                url: shareOptions.message,
                ...shareOptions,
              });
            } else {
              alertNotInstallApp('Whatsapp');
            }
          });
        }

        break;
      case 'instagram': {
        if (IS_ANDROID) {
          Share.isPackageInstalled('com.instagram.android').then(({ isInstalled }) => {
            if (isInstalled) {
              Share.shareSingle({
                social: Share.Social.INSTAGRAM,
                url: shareOptions.message,
                backgroundImage: ICON.SHARE_FACEBOOK_ICON,
                ...shareOptions,
              });
            } else {
              alertNotInstallApp('Instagram');
            }
          });
        } else {
          Linking.canOpenURL('instagram:').then((isInstalled) => {
            if (isInstalled) {
              Share.shareSingle({
                social: Share.Social.INSTAGRAM,
                url: shareOptions.message,
                ...shareOptions,
              });
            } else {
              alertNotInstallApp('Instagram');
            }
          });
        }

        break;
      }
      case 'email': {
        Share.shareSingle({
          social: Share.Social.EMAIL,
          ...shareOptions,
        });

        // if (IS_ANDROID) {
        //   Share.isPackageInstalled('com.email.android').then(({ isInstalled }) => {
        //     if (isInstalled) {
        //       Share.shareSingle({
        //         social: Share.Social.EMAIL,
        //         url: shareOptions.message,
        //         backgroundImage: ICON.SHARE_EMAIL_ICON,
        //         ...shareOptions,
        //       });
        //     } else {
        //       alertNotInstallApp('Email');
        //     }
        //   });
        // } else {
        //   Linking.canOpenURL('email:').then((isInstalled) => {
        //     if (isInstalled) {
        //       Share.shareSingle({
        //         social: Share.Social.EMAIL,
        //         url: shareOptions.message,
        //         ...shareOptions,
        //       });
        //     } else {
        //       alertNotInstallApp('Email');
        //     }
        //   });
        // }

        break;
      }
    }
  };

  renderIconShare = (icon, social) => {
    const shareOptions = {
      title: `${Util.encodeURI(this.state.titleName)}`,
      message: `https://www.creatrip.com/${
        RootStore.language === 'zh-TW' ? '' : RootStore.language + '/'
      }spot/${this.props.spotCode}/${Util.encodeURI(this.state.titleName)}`,
    };
    return (
      <MyTouchableOpacity
        onPress={this.onPressIconShare(social, shareOptions)}
        style={{
          width: WIDTH / 7,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.WHITE,
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}>
        <Image
          source={icon}
          style={{
            width: WIDTH / 15,
            height: WIDTH / 15,
            marginBottom: 5,
            tintColor: COLOR.appTextColor,
          }}
          resizeMode="contain"
        />
        <PText
          numberOfLines={1}
          style={[
            style.textCaption,
            {
              fontSize: style.textCaption.fontSize * 0.7,
              textTransform: 'capitalize',
            },
          ]}>
          {social}
        </PText>
      </MyTouchableOpacity>
    );
  };

  onPressIconShare = (social, shareOptions) => {
    return () => {
      if (social === 'link') {
        if (typeof shareOptions.message !== undefined) {
          Clipboard.setString(shareOptions.message);
          if (Platform.OS === 'android') {
            ToastAndroid.show('Links are copied to the clipboard', ToastAndroid.SHORT);
            this.onCancel();
          } else if (Platform.OS === 'ios') {
            Alert.alert(
              '',
              'Links are copied to the clipboard',
              [
                {
                  text: RootStore.i18n.t('global.close'),
                  onPress: () => {
                    this.onCancel();
                  },
                },
              ],
              { cancelable: true },
            );
          }
        }
      }
      if (social === 'more') {
        Share.open(shareOptions).catch(() => this.onCancel());
      } else {
        this.shareSocialOptions(shareOptions, social);
      }
    };
  };

  renderShare = () => {
    return (
      <Modal
        key={'shareModal'}
        isVisible={this.state.visible}
        onBackdropPress={() => this.setState({ visible: false })}
        backdropColor="#00000060"
        animationIn="fadeInUp"
        animationInTiming={500}
        animationOutTiming={0}
        onSwipeComplete={() => {
          this.setState({ visible: false });
        }}
        onRequestClose={() => {
          this.setState({ visible: false });
        }}
        onCancel={this.onCancel.bind(this)}
        overlayStyle={{ backgroundColor: '#00000030' }}
        style={{
          margin: 0,
          padding: 0,
        }}>
        <View
          style={{
            position: 'absolute',
            height: HEIGHT * 0.17,
            bottom: 0,
            alignSelf: 'center',
            backgroundColor: COLOR.WHITE,
            width: WIDTH - 20 * WIDTH_SCALE_RATIO,
            borderTopRightRadius: 8 * WIDTH_SCALE_RATIO,
            borderTopLeftRadius: 8 * WIDTH_SCALE_RATIO,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ visible: false });
            }}>
            <Image
              source={ICON.DOWN_ICON}
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                width: 20 * WIDTH_SCALE_RATIO,
                height: 8 * WIDTH_SCALE_RATIO,
                marginTop: 6 * HEIGHT_SCALE_RATIO,
                marginBottom: 10 * HEIGHT_SCALE_RATIO,
                tintColor: COLOR.GREY20,
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: COLOR.WHITE,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {this.renderIconShare(ICON.SHARE_FACEBOOK_ICON, 'facebook')}
            {this.renderIconShare(ICON.SHARE_WHATSAPP_ICON, 'whatsapp')}
            {this.renderIconShare(ICON.SHARE_EMAIL_ICON, 'email')}
            {this.renderIconShare(ICON.SHARE_CLIPBOARD_ICON, 'link')}
            {this.renderIconShare(ICON.SHARE_MORE_ICON, 'more')}
          </View>
        </View>
        <View style={{ height: 20 }} />
      </Modal>
    );
  };
  onClickCloseMailContact = () => {
    this.setState({ modalMailSupport: !this.state.modalMailSupport });
  };

  changeRatingScore = (score) => {
    this.setState({ rating: score });
  };

  renderItemComment = () => {
    return <PFlatList data={this.state.reviews} renderItem={this.renderReviewItem} />;
  };
  renderReviewItem = ({ item, index }) => {
    return (
      <ReviewItem
        review={item}
        index={index}
        onRegistReview={this.onClickRegistReview}
        this={this}
      />
    );
  };

  onClickSuggestCard = (code) => {
    Actions.spotDetail({ spotCode: code });
  };
  renderSuggest = ({ item, index }) => (
    <FurtherReadingItem item={item} index={index} isSpot suggestSpot={this.state.suggestSpot} />
  );

  onCarouselItemPressed = () => {
    ModalGallery.show(this.state.images, this.sliderRefBlog.currentIndex);
  };

  renderItemSlider = ({ item, index }) => {
    return <CarouselListItem item={item} index={index} onPress={this.onCarouselItemPressed} />;
  };

  renderSilder = () => {
    return (
      <View
        style={{
          marginTop: 8 * HEIGHT_SCALE_RATIO,
          width: '100%',
          height: 264 * HEIGHT_SCALE_RATIO,
          borderRadius,
          backgroundColor: '#00000020',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Carousel
          ref={(c) => (this.sliderRefBlog = c)}
          data={this.state.images ? this.state.images : null}
          contentContainerCustomStyle={{
            backgroundColor: 'transparent',
          }}
          renderItem={this.renderItemSlider}
          sliderWidth={WIDTH}
          itemWidth={WIDTH}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          activeSlideAlignment="center"
          loop
          enableSnap
          onSnapToItem={(index) => {
            this.setState({ activeSlide: index });
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
          carouselRef={this.sliderRef}
          dotsLength={this.state.images.length}
          activeDotIndex={this.state.activeSlide}
          renderDots={this.renderDots(this.state.images)}
        />
      </View>
    );
  };

  renderPrecaution = () => {
    if (this.state.precautions && this.state.precautions.length > 0) {
      return (
        <View
          style={{
            paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
            paddingBottom: 10 * HEIGHT_SCALE_RATIO,
            marginTop: 10 * HEIGHT_SCALE_RATIO,
          }}>
          {this.state.precautions && (
            <PFlatList data={this.state.precautions} renderItem={this.renderItemPrecaution} />
          )}
        </View>
      );
    }
  };
  renderOpenningHours = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          marginTop: 20 * HEIGHT_SCALE_RATIO,
          flexDirection: 'row',
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width: 180 * WIDTH_SCALE_RATIO,
            height: 180 * WIDTH_SCALE_RATIO,
          }}
          region={this.state.location}
          initialRegion={this.state.location}
          scrollEnabled={false}
          onPress={this.onClickGoSpotMap}>
          <Marker
            coordinate={this.state.marker}
            title={this.state.titleName}
            tracksViewChanges={false}
            identifier={this.state.titleName}
          />
        </MapView>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            width: 140 * WIDTH_SCALE_RATIO,
            marginLeft: 10 * WIDTH_SCALE_RATIO,
            marginTop: -5 * HEIGHT_SCALE_RATIO,
            marginBottom: -3 * HEIGHT_SCALE_RATIO,
          }}>
          {this.state.address && this.state.address !== null ? (
            <PText
              numberOfLines={3}
              style={[
                style.textCaption,
                ptColor.GREY40,
                {
                  fontSize: style.textCaption.fontSize,
                  marginBottom: 10 * HEIGHT_SCALE_RATIO,
                },
              ]}>
              {this.state.address}
            </PText>
          ) : null}
          {this.state.openingHours && (
            <PFlatList data={this.state.openingHours} renderItem={this.renderItemopeningHours()} />
          )}
        </View>
      </View>
    );
  };
  renderTicketOptions = () => {
    if (
      this.state.expandInformation &&
      this.state.expandInformation !== null &&
      this.state.expandInformation.length > 0
    ) {
      return (
        <View>
          <View
            style={{
              paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
              paddingTop: 16 * HEIGHT_SCALE_RATIO,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={ICON.TICKET_ICON}
              resizeMode="contain"
              style={{
                height: 14 * HEIGHT_SCALE_RATIO,
                width: 20 * WIDTH_SCALE_RATIO,
                tintColor: COLOR.GREY60,
              }}
            />
            <PText style={[style.textTitle, { paddingLeft: 8 * WIDTH_SCALE_RATIO }]}>
              {RootStore.i18n.t('spot.ticket-options')}
            </PText>
          </View>
          <View
            style={{
              paddingTop: 16 * HEIGHT_SCALE_RATIO,
              paddingBottom: 10 * HEIGHT_SCALE_RATIO,
            }}>
            <Accordion
              ref={(instance) => (this.accordionRef = instance)}
              contentStyle={{ borderWidth: 0 }}
              style={{ borderWidth: 0 }}
              expanded={this.state.expandInformation.length === 1 ? 0 : null}
              dataArray={this.state.expandInformation}
              animation
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
            />
          </View>
        </View>
      );
    }
  };
  renderPrice = () => {
    if (this.state.products && this.state.products.length > 0) {
      return (
        <View>
          <View
            style={{
              paddingTop: 16 * HEIGHT_SCALE_RATIO,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={ICON.EXCHANGE_MONEY_ICON} resizeMode="contain" style={styles.icon} />
            <PText style={[style.textTitle, { paddingLeft: 8 * WIDTH_SCALE_RATIO }]}>
              {RootStore.i18n.t('spot.price-info')}
            </PText>
          </View>
          <View
            style={{
              paddingLeft: (24 + 8) * WIDTH_SCALE_RATIO,
              marginTop: 8 * HEIGHT_SCALE_RATIO,
            }}>
            {this.state.products &&
              this.state.products.map(
                (v, i) =>
                  i < 3 && (
                    <View
                      style={{
                        borderBottomWidth: 0,
                        paddingBottom: 8 * WIDTH_SCALE_RATIO,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      key={`price-info-${v.transName}`}>
                      <View
                        style={{
                          justifyContent: 'flex-start',
                          borderColor: COLOR.appBorderColor,
                          borderStyle: 'dashed',
                          borderWidth: 1 * WIDTH_SCALE_RATIO,
                          position: 'absolute',
                          top: style.text.fontSize * 0.8,
                          width: '100%',
                        }}
                      />
                      <View style={{ width: '68%' }}>
                        <PText
                          style={[
                            style.text,
                            {
                              paddingRight: 5 * WIDTH_SCALE_RATIO,
                              alignSelf: 'flex-start',
                              backgroundColor: '#fff',
                            },
                          ]}>
                          {v.transName}
                        </PText>
                        <PText
                          style={[
                            style.textCaption,
                            {
                              fontSize: style.textCaption.fontSize - 1,
                              alignSelf: 'flex-start',
                              backgroundColor: '#fff',
                            },
                          ]}>
                          {v.defaultName}
                        </PText>
                      </View>
                      <View style={{ width: '28%' }}>
                        <PText
                          style={[
                            style.text,
                            {
                              paddingLeft: 5 * WIDTH_SCALE_RATIO,
                              alignSelf: 'flex-end',
                              backgroundColor: '#fff',
                            },
                          ]}>
                          {`₩ ${Util.price_comma(v.price)}`}
                        </PText>
                      </View>
                    </View>
                  ),
              )}

            {!this.state.priceInfo.isNotData &&
              this.state.products &&
              this.state.products.length > 3 && (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    this.setState({
                      isPriceDetailVisible: true,
                    })
                  }>
                  <PText
                    style={[
                      style.textButton,
                      { color: '#00afa0', textTransform: 'lowercase', fontSize: 16 },
                    ]}>
                    {RootStore.i18n.t('spot.show-more')}
                  </PText>
                </TouchableOpacity>
              )}
          </View>
          <Divider style={{ marginVertical: 16 * HEIGHT_SCALE_RATIO }} />
        </View>
      );
    }
  };

  renderInfomation = () => {
    if (this.state.moreInfomation && this.state.moreInfomation.length > 0) {
      return (
        <View style={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}>
          <View
            style={{
              paddingTop: 16 * HEIGHT_SCALE_RATIO,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={ICON.PRECAUTION_ICON} resizeMode="contain" style={styles.icon} />
            <PText style={[style.textTitle, { paddingLeft: 8 * WIDTH_SCALE_RATIO }]}>
              {RootStore.i18n.t('spot.more-info')}
            </PText>
          </View>
          {/* precautions */}
          <PFlatList
            contentContainerStyle={{ marginTop: 8 * HEIGHT_SCALE_RATIO }}
            data={this.state.moreInfomation}
            extraData={this.state.moreInfomation}
            renderItem={this.renderItemMoreInfomation}
          />
        </View>
      );
    }
  };
  renderComment = () => {
    return (
      <View style={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}>
        <Divider style={{ marginVertical: 16 * HEIGHT_SCALE_RATIO }} />

        <View
          style={{
            paddingTop: 12 * HEIGHT_SCALE_RATIO,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={ICON.CHAT_ICON} resizeMode="contain" style={styles.icon} />
          <PText style={[style.textTitle, { paddingLeft: 8 * WIDTH_SCALE_RATIO }]}>
            {RootStore.i18n.t('blog.detail.reviews')}
          </PText>
          {/* <MyTouchableOpacity
            onPress={() =>
              checkLogin(() => this.setState({ isWriteComment: !this.state.isWriteComment }))
            }
            style={[
              ptShadow.BLUR10,
              {
                position: 'absolute',
                zIndex: 9999,
                right: 0,
                top: 8 * WIDTH_SCALE_RATIO,
                alignItems: 'center',
                justifyContent: 'center',
                height: 36 * WIDTH_SCALE_RATIO,
                width: 36 * WIDTH_SCALE_RATIO,
                borderRadius: (36 * WIDTH_SCALE_RATIO) / 2,
                backgroundColor: COLOR.PRIMARY,
              },
            ]}
          >
            <Image
              source={replyPlus}
              resizeMode="contain"
              style={{
                tintColor: '#fff',
                height: '60%',
                width: '60%',
              }}
            />
          </MyTouchableOpacity> */}
        </View>
        {/* rating app */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12 * HEIGHT_SCALE_RATIO,
            marginLeft: (24 + 8) * WIDTH_SCALE_RATIO,
          }}>
          <PText style={style.textHeader}>{this.state.rating}</PText>
          <View style={{ marginLeft: 15 * WIDTH_SCALE_RATIO }}>
            <SwipableRating
              color={COLOR.appColor}
              emptyColor={COLOR.appTextPlaceholderColor}
              size={12 * WIDTH_SCALE_RATIO}
              swipeable={false}
              rating={+this.state.rating.valueOf()}
            />
            <PText
              style={[
                style.textCaption,
                ptColor.GREY40,
                {
                  fontSize: style.textCaption.fontSize - 1,
                },
              ]}>
              {RootStore.i18n.t('review.review-count', {
                count: this.state.reviewCount,
              })}
            </PText>
          </View>
        </View>
        {!RootStore.auth.isGuest && this.state.isWriteComment && (
          <ReviewInput registReview={this.onClickRegistReview} isSpot />
        )}
        {this.renderItemComment()}

        <PText>{this.state.existOther}</PText>
        {this.state.existOther && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({});
            }}>
            <PText style={style.textButtonOutLine}>
              {RootStore.i18n.t('spot.show-all-review')}
            </PText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderFurtherReadings = () => {
    return (
      <View style={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}>
        <Divider style={{ marginVertical: 16 * HEIGHT_SCALE_RATIO }} />
        <View
          style={{
            paddingTop: 16 * HEIGHT_SCALE_RATIO,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={ICON.LIKE_ICON}
              resizeMode="contain"
              style={[styles.icon, { height: styles.icon.height - 2 * WIDTH_SCALE_RATIO }]}
            />
            <View style={{ flex: 1 }} />
          </View>
          <View>
            <PText
              style={[
                style.textTitle,
                {
                  paddingLeft: 8 * WIDTH_SCALE_RATIO,
                  lineHeight: 24 * HEIGHT_SCALE_RATIO,
                },
              ]}>
              {RootStore.i18n.t('spot.further-readings')}
            </PText>
          </View>
        </View>
        <PFlatList
          data={this.state.suggestSpot}
          renderItem={this.renderSuggest}
          horizontal
          contentContainerStyle={{ marginTop: 16 * HEIGHT_SCALE_RATIO }}
        />
      </View>
    );
  };
  // phat khong price
  renderNormalSpotDetail = () => {
    // this.state.isLike
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: this.state.paddingBottom,
        }}>
        <BaseHeaderWithSearch
          onLeftPress={() => this.onClickGoBack()}
          isFromDetail
          showSuggest
          showBack
          backgroundColorWhite
          color={COLOR.appColor}
        />
        <InfiniteScroll
          ref="infiniteScroll"
          horizontal={false}
          onRefresh={() => {
            this.refs.infiniteScroll._stopRefreshSpinner();
          }}>
          <View style={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}>{this.renderSilder()}</View>
          <View style={{}}>
            <View
              style={{
                marginTop: 5 * HEIGHT_SCALE_RATIO,
                borderColor: COLOR.appBorderColor,
                borderBottomWidth: 1 * HEIGHT_SCALE_RATIO,
                paddingBottom: 10 * HEIGHT_SCALE_RATIO,
                marginHorizontal: 16 * WIDTH_SCALE_RATIO,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10 * HEIGHT_SCALE_RATIO,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '80%',
                  }}>
                  <PText style={[style.text, ptColor.GREY40]}>
                    {this.state.city} {this.state.region}
                  </PText>

                  <PText
                    style={[style.textTitle, this.state.koreanSpotName ? null : style.textNull]}>
                    {this.state.titleName ? `(${this.state.titleName})` : ''}
                  </PText>
                </View>
                <View
                  style={{
                    width: '10%',
                    alignItems: 'flex-end',
                    marginTop: 5 * HEIGHT_SCALE_RATIO,
                  }}>
                  <HeartButton
                    isLike={this.state.isLike}
                    click={this.onClickHeart.bind(this, !this.state.isLike)}
                    // grey
                    data={this.state.spot}
                    isSpot
                  />
                </View>
                <MyTouchableOpacity
                  style={{
                    width: '10%',
                    alignItems: 'flex-end',
                    marginTop: 5 * HEIGHT_SCALE_RATIO,
                  }}
                  onPress={this.onClickShareButton}>
                  <Image
                    resizeMode="contain"
                    source={ICON.SHARE_ICON}
                    style={{
                      width: 20 * WIDTH_SCALE_RATIO,
                      height: 20 * WIDTH_SCALE_RATIO,
                      tintColor: COLOR.GREY20,
                    }}
                  />
                </MyTouchableOpacity>
              </View>
            </View>

            {/* phat precaution */}
            {this.renderPrecaution()}
            {/* phat price */}
            <View
              style={{
                marginHorizontal: 16 * WIDTH_SCALE_RATIO,
              }}>
              {this.renderPrice()}
            </View>
            {/* infomation */}

            {this.renderInfomation()}

            {/* openninghours */}
            {this.props.isProxyShopping ? null : this.renderOpenningHours()}

            {/* comment */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
              {this.renderComment()}
            </KeyboardAvoidingView>
            {this.state.suggestSpot.length > 0 ? this.renderFurtherReadings() : null}
            {this.renderAskAdminSupport()}

            <View style={{ height: 30 * HEIGHT_SCALE_RATIO }} />
          </View>
          {this.renderModals()}
        </InfiniteScroll>
        {this.renderShare()}
        {/* nếu có blog thì render bottom bar */}
        {this.state.blogLink.length > 0 && this.renderReserveButton()}
      </View>
    );
  };

  onAccordingHeaderNamePress = (item) => {
    if (this.accordionRef) {
      this.accordionRef.setState({
        selected: null,
      });
      this.setState({
        selected: this.state.selected === item ? null : item,
      });
    }
  };

  onAccordingHeaderIconPress = (item) => {
    if (this.accordionRef && this.state.expandInformation) {
      this.setState({
        selected:
          this.accordionRef.state.selected ===
          this.state.expandInformation.findIndex((e) => e === item)
            ? null
            : this.state.expandInformation.findIndex((e) => e === item),
      });
      this.accordionRef.setState({
        selected:
          this.accordionRef.state.selected ===
          this.state.expandInformation.findIndex((e) => e === item)
            ? null
            : this.state.expandInformation.findIndex((e) => e === item),
      });
    }
  };

  _renderHeader = (item, expanded) => {
    return (
      <AccordionHeaderListItem
        item={item}
        expanded={expanded}
        selected={this.state.selected}
        onAccordingHeaderNamePress={this.onAccordingHeaderNamePress}
        onAccordingHeaderIconPress={this.onAccordingHeaderIconPress}
      />
    );
  };

  _renderContent = (item, expanded) => {
    return <AccordionContentListItem item={item} expanded={expanded} />;
  };

  renderDots = (listItem) => {
    return (activeIndex) =>
      listItem.map((screen, i) => (
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
      ));
  };

  openMailSupportModal = () => {
    this.setState({ modalMailSupport: true });
  };

  closeMailSupportModal = () => {
    this.setState({ modalMailSupport: false });
  };

  renderAskAdminSupport = () => {
    return (
      <View style={{ marginHorizontal: 16 * WIDTH_SCALE_RATIO }}>
        <ModalContact
          spotCode={this.props.spotCode}
          isVisible={this.state.modalMailSupport}
          onBackdropPress={this.closeMailSupportModal}
          clickClose={this.onClickCloseMailContact}
        />
        <Divider style={{ marginVertical: 16 * HEIGHT_SCALE_RATIO }} />
        <View
          style={{
            marginBottom: 12 * HEIGHT_SCALE_RATIO,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={ICON.QUESTION_ICON}
              resizeMode="contain"
              style={[
                styles.icon,
                { height: styles.icon.height + 2 * WIDTH_SCALE_RATIO, tintColor: COLOR.GREY80 },
              ]}
            />
          </View>

          <View>
            <PText
              style={[
                style.textTitle,
                { paddingLeft: 8 * WIDTH_SCALE_RATIO, lineHeight: 24 * HEIGHT_SCALE_RATIO },
              ]}>
              {RootStore.i18n.t('ask-question')}
              {/* Ask for admin to help you */}
            </PText>
          </View>
        </View>
        <MyTouchableOpacity
          onPress={this.openMailSupportModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 48 * HEIGHT_SCALE_RATIO,
            borderWidth: 1,
            borderColor: COLOR.GREY80,
            borderRadius: 5 * WIDTH_SCALE_RATIO,
          }}>
          <PText> {RootStore.i18n.t('ask-question-send-email')}</PText>
        </MyTouchableOpacity>
      </View>
    );
  };
  // phat co price
  renderReserveSpotDetail = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: this.state.paddingBottom,
        }}>
        <BaseHeaderWithSearch
          onLeftPress={() => this.onClickGoBack()}
          isFromDetail
          showSuggest
          showBack
          backgroundColorWhite
          color={COLOR.appColor}
        />
        {this.renderShare()}
        <InfiniteScroll
          ref="infiniteScroll"
          horizontal={false}
          onRefresh={() => {
            this.refs.infiniteScroll._stopRefreshSpinner();
          }}>
          <View style={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}>{this.renderSilder()}</View>
          <MyWebView ref="modalWebView" />
          <View>
            <View
              style={{
                paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                width: deviceWidth,
              }}>
              <View
                style={{
                  marginTop: 5 * HEIGHT_SCALE_RATIO,
                  borderColor: COLOR.appBorderColor,
                  borderBottomWidth: 1 * HEIGHT_SCALE_RATIO,
                  paddingBottom: 10 * HEIGHT_SCALE_RATIO,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10 * HEIGHT_SCALE_RATIO,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '80%',
                    }}>
                    <PText style={[style.text, ptColor.GREY40]}>
                      {this.state.city ? `${this.state.city} ` : ''}
                      {this.state.region ? `${this.state.region}` : ''}
                    </PText>
                    <View style={{ flexDirection: 'row' }}>
                      <PText style={style.textTitle}>
                        {`${this.state.titleName} `}
                        {!this.props.isProxyShopping && this.state.requireInfo.type !== 4 ? (
                          <PText
                            style={[
                              style.textSubTitle,
                              {
                                color: COLOR.GREY80,
                                paddingTop: 5 * HEIGHT_SCALE_RATIO,
                              },
                            ]}>
                            {`(${this.state.koreanSpotName})`}
                          </PText>
                        ) : (
                          <Fragment />
                        )}
                      </PText>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      alignItems: 'flex-end',
                      marginTop: 5 * HEIGHT_SCALE_RATIO,
                    }}>
                    <HeartButton
                      isLike={this.state.isLike}
                      click={this.onClickHeart.bind(this, !this.state.isLike)}
                      grey
                      data={this.state.spot}
                      isSpot
                    />
                  </View>
                  <MyTouchableOpacity
                    style={{
                      width: '10%',
                      height: 22 * WIDTH_SCALE_RATIO,
                      alignItems: 'flex-end',
                      marginTop: 5 * HEIGHT_SCALE_RATIO,
                    }}
                    onPress={this.onClickShareButton}>
                    <Image
                      resizeMode="contain"
                      source={ICON.SHARE_ICON}
                      style={{
                        width: 20 * WIDTH_SCALE_RATIO,
                        height: 20 * WIDTH_SCALE_RATIO,
                        tintColor: COLOR.GREY20,
                      }}
                    />
                  </MyTouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: 8 * HEIGHT_SCALE_RATIO,
                  }}>
                  <PText style={[style.textTitle, { fontWeight: '600', color: COLOR.PRIMARY }]}>
                    {this.state.titlePrice} {'  '}
                    {this.state.cancelPrice !== '' && (
                      <PText
                        style={[
                          style.textSubTitle,
                          {
                            textDecorationLine: 'line-through',
                            color: COLOR.appTextPlaceholderColor,
                          },
                        ]}>
                        {this.state.cancelPrice}
                      </PText>
                    )}
                  </PText>
                </View>
              </View>
              {/* member benefit */}
              {this.props.isAccomodationSpot && (
                <View
                  style={{
                    paddingVertical: 8,
                    borderBottomColor: COLOR.appBorderColor,
                    borderBottomWidth: 1,
                  }}>
                  <PText>바로확정ㅣ무료취소ㅣ조식포함</PText>
                </View>
              )}
              {this.state.selectRemarks && this.state.selectRemarks.length > 0 && (
                <View
                  style={{
                    marginTop: 18 * HEIGHT_SCALE_RATIO,
                  }}>
                  {this.renderReserveSpotRemarkList()}
                  <Divider
                    style={{
                      marginBottom: 16 * HEIGHT_SCALE_RATIO,
                      marginTop: 10 * HEIGHT_SCALE_RATIO,
                    }}
                  />
                </View>
              )}
            </View>

            <View style={{}}>
              {/* phat 2 precaution */}
              {this.renderPrecaution()}
              {/* phat ticket */}
              {this.renderTicketOptions()}
              {/* infomation */}
              {this.renderInfomation()}
              {/* openninghours */}
              {this.props.isProxyShopping ? null : this.renderOpenningHours()}
              {/* comment */}
              <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                {this.renderComment()}
              </KeyboardAvoidingView>

              {/* Further Readings */}
              {this.state.suggestSpot.length > 0 ? this.renderFurtherReadings() : null}
              {this.renderAskAdminSupport()}
              <View style={{ height: 30 * HEIGHT_SCALE_RATIO }} />
            </View>
          </View>
          {this.renderModals()}
        </InfiniteScroll>
        {this.renderReserveButton()}

        {this.renderShare()}
      </View>
    );
  };
  renderIconRemark = (code) => {
    switch (code) {
      case 1:
      case 2:
        return <Image source={ICON.PAYMENT_ICON} style={styles.remarkIcon} />;
      case 3:
      case 4:
      case 5:
      case 6:
        return <Image source={ICON.REFUND_ICON} style={styles.remarkIcon} />;
      case 7:
        return <Image source={ICON.VOUCHER_MOBILE_ICON} style={styles.remarkIcon} />;
      case 8:
        return <Image source={ICON.VOUCHER_PRINT_ICON} style={styles.remarkIcon} />;
      case 9:
        return <Image source={ICON.TICKET_REMARKS_ICON} style={styles.remarkIcon} />;
      case 10:
        return <Image source={ICON.VOUCHER_NONE_ICON} style={styles.remarkIcon} />;
      case 11:
      case 12:
      case 13:
        return <Image source={ICON.TIME_ICON} style={styles.remarkIcon} />;
      case 14:
        return <Image source={ICON.DATETIME_ICON} style={styles.remarkIcon} />;
      case 15:
      case 21:
        return <Image source={ICON.MEMBER_AUTH_ICON} style={styles.remarkIcon} />;
      case 16:
        return <Image source={ICON.GIFT_REMARK_ICON} style={styles.remarkIcon} />;
      case 17:
        return <Image source={ICON.TOUR_ICON} style={styles.remarkIcon} />;
      case 18:
      case 19:
      case 20:
        return <Image source={ICON.LANGUAGE_ICON} style={styles.remarkIcon} />;

      default:
        break;
    }
  };
  renderReserveSpotRemarkList = () => {
    return (
      this.state.reserveSpotRemarkList &&
      this.state.reserveSpotRemarkList.map((v, i) => {
        if (v.select) {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 8 * HEIGHT_SCALE_RATIO,
              }}
              key={`remarks-${v.translationKey}`}>
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    height: 21 * HEIGHT_SCALE_RATIO,
                  }}>
                  {this.renderIconRemark(v.code)}
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                />
              </View>

              <View
                style={{
                  alignItems: 'center',
                }}>
                <PText style={[style.text, { lineHeight: 21 * HEIGHT_SCALE_RATIO }]}>
                  {RootStore.i18n.t(v.translationKey)}
                </PText>
              </View>
            </View>
          );
        }
      })
    );
  };

  renderReserveButton = () => {
    if (this.state.isReserveable) {
      return (
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            paddingBottom: 8 * WIDTH_SCALE_RATIO,
          }}>
          <Divider
            style={{
              marginBottom: 8 * HEIGHT_SCALE_RATIO,
            }}
          />
          {this.renderReserveTypeStand()}
          {this.renderReserveTypeMemberBenefit()}
          {this.renderReserveTypeMemberOutside()}
          {this.renderReserveTypeMemberCoupon()}
          {this.renderReserveTypeMemberShopping()}
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            paddingBottom: 8 * WIDTH_SCALE_RATIO,
          }}>
          <Divider
            style={{
              marginBottom: 8 * HEIGHT_SCALE_RATIO,
            }}
          />
        </View>
      );
    }
  };
  renderReserveTypeStand = () => {
    return (
      this.state.reserveType === Const.ReserveType.Stand.code && (
        <View>
          {/* 링크된 블로그 없음, 예약 종류는 일반 예약일때 */}
          {this.state.blogLink.length === 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state.spot}
                  isSpot
                />
              </View>
              <Button
                style={[
                  style.button,
                  { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                ]}
                rounded
                onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Stand.code)}>
                <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.WHITE }]}>
                  {RootStore.i18n.t('spot.go-reserve')}
                </PText>
              </Button>
            </View>
          )}
          {/* 링크된 블로그 있음, 예약 종류는 일반 예약일때  */}
          {this.state.blogLink.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state.spot}
                  isSpot
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MyTouchableOpacity
                  style={[
                    style.buttonOutline,
                    {
                      height: style.buttonOutline.height * 1.2,
                      width: style.buttonOutline.width * 1.1,
                      marginRight: 12 * WIDTH_SCALE_RATIO,
                    },
                  ]}
                  rounded
                  bordered
                  onPress={this.onClickShowBlogLink}>
                  <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.PRIMARY }]}>
                    {RootStore.i18n.t('spot.show-link')}
                  </PText>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Stand.code)}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('spot.go-reserve')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )
    );
  };
  renderReserveTypeMemberBenefit = () => {
    return (
      this.state.reserveType === Const.ReserveType.MemberBenefit.code && (
        <View>
          {/* 링크된 블로그 없음, 예약 종류는 회원 혜택 예약일때 */}
          {this.state.blogLink.length === 0 && (
            <View
              style={{
                flexDirection: 'row',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state.spot}
                  isSpot
                />
              </View>
              <MyTouchableOpacity
                style={[
                  style.button,
                  { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                ]}
                rounded
                onPress={this.onClickGoReserve.bind(this, Const.ReserveType.MemberBenefit.code)}>
                <PText
                  uppercase={false}
                  style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                  {RootStore.i18n.t('spot.go-benefit')}
                </PText>
              </MyTouchableOpacity>
            </View>
          )}
          {/* 링크된 블로그 있음, 예약 종류는 회원 혜택 예약일때 */}
          {this.state.blogLink.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              {/* phat heart share duoi ne */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state.spot}
                  isSpot
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={[
                    style.buttonOutline,
                    {
                      height: style.buttonOutline.height * 1.2,
                      width: style.buttonOutline.width * 1.1,
                      marginRight: 12 * WIDTH_SCALE_RATIO,
                    },
                  ]}
                  rounded
                  bordered
                  onPress={this.onClickShowBlogLink}>
                  <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.PRIMARY }]}>
                    {RootStore.i18n.t('spot.show-link')}
                  </PText>
                </Button>
                <Button
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickGoReserve.bind(this, Const.ReserveType.MemberBenefit.code)}>
                  <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('spot.go-benefit')}
                  </PText>
                </Button>
              </View>
            </View>
          )}
        </View>
      )
    );
  };
  renderReserveTypeMemberOutside = () => {
    return (
      this.state.reserveType === Const.ReserveType.Outside.code && (
        <View>
          {this.state.blogLink.length === 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  data={this.state.spot}
                  isSpot
                  size={25 * WIDTH_SCALE_RATIO}
                />
              </View>
              {/* reservation button */}
              <MyTouchableOpacity
                style={[
                  style.button,
                  { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                ]}
                rounded
                onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Outside.code)}>
                <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.WHITE }]}>
                  {RootStore.i18n.t('spot.go-url')}
                </PText>
              </MyTouchableOpacity>
            </View>
          )}
          {/* 링크된 블로그 있음, 예약 종류는 외부 링크 예약일때 */}
          {this.state.blogLink.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state.spot}
                  isSpot
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MyTouchableOpacity
                  style={[
                    style.buttonOutline,
                    {
                      height: style.buttonOutline.height * 1.2,
                      width: style.buttonOutline.width * 1.1,
                      marginRight: 12 * WIDTH_SCALE_RATIO,
                    },
                  ]}
                  rounded
                  bordered
                  onPress={this.onClickShowBlogLink}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.PRIMARY }]}>
                    {RootStore.i18n.t('spot.show-link')}
                  </PText>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Outside.code)}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('spot.go-url')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )
    );
  };
  renderReserveTypeMemberCoupon = () => {
    return (
      this.state.reserveType === Const.ReserveType.Coupon.code && (
        <View>
          {this.state.blogLink.length === 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  data={this.state.spot}
                  isSpot
                  size={25 * WIDTH_SCALE_RATIO}
                />
              </View>
              {/* reservation button */}
              <MyTouchableOpacity
                style={[
                  style.button,
                  { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                ]}
                rounded
                onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Outside.code)}>
                <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.WHITE }]}>
                  {RootStore.i18n.t('spot.go-benefit')}
                </PText>
              </MyTouchableOpacity>
            </View>
          )}
          {this.state.blogLink.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,
                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  size={30 * WIDTH_SCALE_RATIO}
                  data={this.state.spot}
                  isSpot
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MyTouchableOpacity
                  style={[
                    style.buttonOutline,
                    {
                      height: style.buttonOutline.height * 1.2,
                      width: style.buttonOutline.width * 1.1,
                      marginRight: 12 * WIDTH_SCALE_RATIO,
                    },
                  ]}
                  rounded
                  bordered
                  onPress={this.onClickShowBlogLink}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.PRIMARY }]}>
                    {RootStore.i18n.t('spot.show-link')}
                  </PText>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Outside.code)}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('spot.go-benefit')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )
    );
  };
  renderReserveTypeMemberShopping = () => {
    return (
      this.state.reserveType === Const.ReserveType.Shopping.code && (
        <View>
          {this.state.blogLink.length === 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  data={this.state.spot}
                  isSpot
                  size={25 * WIDTH_SCALE_RATIO}
                />
              </View>
              {/* reservation button */}
              <MyTouchableOpacity
                style={[
                  style.button,
                  { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                ]}
                rounded
                onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Stand.code)}>
                <PText uppercase={false} style={[ptText.BODY1, { color: COLOR.WHITE }]}>
                  {RootStore.i18n.t('buy-now')}
                </PText>
              </MyTouchableOpacity>
            </View>
          )}
          {this.state.blogLink.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,
                justifyContent: 'space-between',
              }}>
              {/* phat heart share 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  isLike={this.state.isLike}
                  click={this.onClickHeart.bind(this, !this.state.isLike)}
                  grey
                  size={30 * WIDTH_SCALE_RATIO}
                  data={this.state.spot}
                  isSpot
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MyTouchableOpacity
                  style={[
                    style.buttonOutline,
                    {
                      height: style.buttonOutline.height * 1.2,
                      width: style.buttonOutline.width * 1.1,
                      marginRight: 12 * WIDTH_SCALE_RATIO,
                    },
                  ]}
                  rounded
                  bordered
                  onPress={this.onClickShowBlogLink}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.PRIMARY }]}>
                    {RootStore.i18n.t('spot.show-link')}
                  </PText>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickGoReserve.bind(this, Const.ReserveType.Stand.code)}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('buy-now')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )
    );
  };

  renderModals = () => {
    return (
      <View key="openningDetailModal">
        <Modal
          isVisible={this.state.isOpeningDetailVisible}
          onBackdropPress={() => this.setState({ isOpeningDetailVisible: false })}>
          <Content
            style={{
              borderRadius: 4,
              width: '100%',
              padding: 20,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                justifyContent: 'center',
                paddingBottom: 20,
              }}>
              <PText style={{ fontSize: RootStore.fontSize(3.0) }}>
                {RootStore.i18n.t('spot.open-time')}
              </PText>
              <PFlatList
                data={this.state.openingHours}
                renderItem={this.renderItemOpeningHours()}
              />
            </View>
          </Content>
          <Button
            block
            primary
            style={[style.buttonOutline, { borderWidth: 0 }]}
            onPress={() => this.setState({ isOpeningDetailVisible: false })}>
            <PText uppercase={false} style={styles.buttonText}>
              {RootStore.i18n.t('spot.confirm')}
            </PText>
          </Button>
        </Modal>
        <Modal
          isVisible={this.state.isPriceDetailVisible}
          onBackdropPress={() => this.setState({ isPriceDetailVisible: false })}
          backdropColor="#00000060"
          animationIn="fadeInUp"
          animationInTiming={0}
          animationOutTiming={0}
          onSwipeComplete={() => {
            this.setState({ isPriceDetailVisible: false });
          }}
          onRequestClose={() => {
            this.setState({ isPriceDetailVisible: false });
          }}
          style={{
            borderRadius,
            paddingHorizontal: 10,
            paddingVertical: 10,
            flex: 1,
            marginBottom: -60,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{ padding: 5, alignSelf: 'flex-end' }}
            onPress={() => {
              this.setState({ isPriceDetailVisible: false });
            }}>
            <MaterialIcons name="close" size={25} style={{ marginTop: -3 }} />
          </TouchableOpacity>
          <Content
            showsVerticalScrollIndicator={false}
            style={{
              borderRadius: 4,
              width: '100%',
              paddingTop: 0,
              padding: 20,
              backgroundColor: '#fff',
            }}>
            <PFlatList
              contentContainerStyle={{ paddingBottom: 20 * HEIGHT_SCALE_RATIO, marginBottom: 40 }}
              data={this.state.products}
              renderItem={this.renderItemProducts()}
            />
          </Content>
        </Modal>
      </View>
    );
  };

  onClickImageCard = (index) => {
    this.setState({ imageIndex: index });
  };
  renderLargeImage = () => {
    const width = Dimensions.get('window').width - 20;
    const height = Dimensions.get('window').height - 148 - 20;

    return (
      <View style={styles.imageBox}>
        <Swiper
          ref={(swiper) => {
            this._swiper = swiper;
          }}
          index={this.state.imageIndex}
          loop={false}
          showsButtons
          showsPagination={false}
          nextButton={<PText />}
          prevButton={<PText />}>
          {this.state.images.map((v, i) => (
            <Image
              source={{ uri: v }}
              resizeMode="contain"
              key={`image-${v}`}
              style={{ width, height, padding: 10, margin: 10 }}
            />
          ))}
        </Swiper>

        <Content
          horizontal
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: COLOR.appTextSubColor,
            width: '100%',
          }}>
          <View style={{ flexDirection: 'row' }}>
            {this.state.images.map((image, index) => (
              <TouchableOpacity
                onPress={this.onClickImageCard.bind(this, index)}
                key={`image-list-${image}`}>
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={{
                    width: 102,
                    height: 102,
                    padding: 10,
                    margin: 10,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Content>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            padding: 5,
            backgroundColor: '#fff',
            borderRadius: 4,
          }}
          onPress={() => {
            this.setState({ showImage: false });
          }}>
          <MaterialIcons name="close" size={25} style={{ marginTop: -3 }} />
        </TouchableOpacity>
      </View>
    );
  };

  renderItemProducts() {
    return ({ item, index }) => {
      return (
        <View
          style={{
            borderBottomWidth: 0,
            paddingVertical: 16 * WIDTH_SCALE_RATIO,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
              borderColor: COLOR.appBorderColor,
              borderStyle: 'dashed',
              borderWidth: 1 * WIDTH_SCALE_RATIO,
              position: 'absolute',
              top: style.text.fontSize * 1.8,
              width: '100%',
            }}
          />
          <View style={{ width: '68%' }}>
            <PText
              style={[
                style.text,
                {
                  paddingRight: 5 * WIDTH_SCALE_RATIO,
                  alignSelf: 'flex-start',
                  backgroundColor: '#fff',
                },
              ]}>
              {item.defaultName}
            </PText>
            <PText
              style={[
                style.textCaption,
                {
                  fontSize: style.textCaption.fontSize - 1,
                  alignSelf: 'flex-start',
                  backgroundColor: '#fff',
                },
              ]}>
              {item.transName}
            </PText>
          </View>
          <View style={{ width: '28%' }}>
            <PText
              style={[
                style.text,
                {
                  paddingLeft: 5 * WIDTH_SCALE_RATIO,
                  alignSelf: 'flex-end',
                  backgroundColor: '#fff',
                },
              ]}>
              ₩ {Util.price_comma(item.price)}
            </PText>
          </View>
        </View>
      );
    };
  }

  renderItemOpeningHours() {
    return ({ item, index }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            borderBottomWidth: 0.5,
          }}>
          <View sm={4}>
            <PText style={styles.priceTable}>{this.state.dayText[index]}</PText>
          </View>
          <View sm={8}>
            <PText
              style={[
                styles.priceTable,
                {
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                },
              ]}>
              {item.open === 'FullTime' && item.close === 'FullTime'
                ? '24 Hours'
                : `${item.open} - ${item.close}`}
            </PText>
          </View>
        </View>
      );
    };
  }

  renderItemMoreInfomation = ({ item }) => {
    return <MoreInfomationListItem item={item} />;
  };

  renderItemopeningHours() {
    return ({ item, index }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <PText style={[style.textCaption, ptColor.GREY40, { width: '30%' }]}>
            {this.state.dayText[index]}
          </PText>

          <PText style={[style.textCaption, ptColor.GREY40, { width: '70%' }]}>
            {item.open === 'FullTime' && item.close === 'FullTime'
              ? '24 Hours'
              : item.open && item.close
              ? `${convertTime12to24(item.open)} - ${convertTime12to24(item.close)}`
              : ''}
          </PText>
        </View>
      );
    };
  }

  renderItemPrecaution = ({ item }) => {
    return <PrecautionsListItem item={item} />;
  };
}

SpotDetail.propTypes = {
  spotCode: PropTypes.number,
};

const styles = StyleSheet.create({
  icon: {
    tintColor: COLOR.GREY60,
    height: 24 * WIDTH_SCALE_RATIO,
    width: 24 * WIDTH_SCALE_RATIO,
  },

  imageBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  priceTable: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    fontSize: RootStore.fontSize(2.7),
    fontWeight: '400',
    color: COLOR.appTextSubColor,
  },

  buttonText: {
    fontSize: RootStore.fontSize(3.5),
    fontWeight: 'bold',
    color: '#ffffff',
  },

  remarkIcon: {
    resizeMode: 'contain',
    width: 18 * WIDTH_SCALE_RATIO,
    height: 18 * WIDTH_SCALE_RATIO,
    padding: 4 * WIDTH_SCALE_RATIO,
    marginRight: 8 * WIDTH_SCALE_RATIO,
  },
});
function alertNotInstallApp(name: String) {
  myAlert(
    'Install notice',
    `Your device not install this application, please install ${name} and try again`,
  );
}
