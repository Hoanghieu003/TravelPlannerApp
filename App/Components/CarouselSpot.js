import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptColor, ptShadow, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { myAlert } from './MyAlert';
import MyImage from './MyImage';
import MyModalShowAd from './MyModalShowAd';
import MyTouchableOpacity from './MyTouchableOpacity';
import MyWebView from './MyWebView';
import PText from './PText';
import { IMAGE } from '../../asset/image/ImagePath';

Number.prototype.format = function () {
  return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
class ItemCarouselSpot extends React.PureComponent {
  constructor(props) {
    super(props);
    const item = this.props.item;
    this.state = {
      isLikeSpot:
        item && item.like_members && item.like_members.length > 0 && RootStore.auth.id !== ''
          ? true
          : false,
      data: item,
      // image:
      //   item.callingFromAPIGetAds && item.image
      //     ? item.image
      //     : item.images && item.images.length > 0 && item.images[0].url
      //     ? item.images[0].url
      //     : item.images && item.images.length > 0 && item.images[0].origin_path
      //     ? `${RootStore.config.imgHost_500}/${item.images[0].origin_path}?d=750`
      //     : '',
      image:
        item.callingFromAPIGetAds &&
        item.translations.length > 0 &&
        item.translations[0] &&
        item.translations[0].image
          ? item.translations[0].image
          : item.images && item.images.length > 0 && item.images[0].url
          ? item.images[0].url
          : item.images && item.images.length > 0 && item.images[0].origin_path
          ? `${RootStore.config.imgHost_500}/${item.images[0].origin_path}?d=750`
          : '',
    };

    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    const item = this.state.data;
    //được gọi từ api getad hay không?por
    const isFromAPIGetAds = item.callingFromAPIGetAds;

    if (!isFromAPIGetAds) {
      this.getImage();
    }
  }

  onClickSpotCard = async (code, city, region) => {
    if (
      code &&
      String(code) &&
      (String(code).includes('https://') ||
        String(code).includes('http://') ||
        String(code).includes('creatrip'))
    ) {
      await this.props.self.refs.modalWebView.open(code);
    } else if (code !== '') {
      let _city = city ? city : '';
      let _region = region ? region : '';
      if (code) {
        Actions.spotDetail({ spotCode: code, city: _city, region: _region });
      }
    } else if (this.props.item && this.props.item.code) {
      let _city = city ? city : null;
      let _region = region ? region : null;
      Actions.spotDetail({ spotCode: this.props.item.code, city: _city, region: _region });
    }
  };

  async getImage() {
    // Mr.Han wants to change the logic, show the 1st image only (Kakaotalk Jan 29 2020 - 8:47 AM Vietnam time)
    if (this.props.item && this.props.item.images && this.props.item.images.length > 0) {
      const image = this.props.item.images[0].url
        ? this.props.item.images[0].url
        : this.props.item.images[0].origin_path
        ? `${RootStore.config.imgHost_500}/${this.props.item.images[0].origin_path}`
        : '';
      this.setState({ image });
    }
  }

  spotCardPress = () => {
    const item = this.state.data;
    //được gọi từ api getad hay không?
    const isFromAPIGetAds = item.callingFromAPIGetAds;
    const spotCode = isFromAPIGetAds
      ? item && item.spot_code
        ? item.spot_code
        : item.url
        ? item.url
        : ''
      : item && item.translations && item.translations[0] && item.translations[0].spot_code;

    if (item.code && item.code !== '') {
      this.onClickSpotCard(
        spotCode,
        isFromAPIGetAds ? '' : item.tags.find((e) => e.type === 1).name,
        isFromAPIGetAds
          ? ''
          : item.tags && item.tags.find((e) => e.type === 7)
          ? `${item.tags.find((e) => e.type === 7).name}`
          : '',
      );
    } else {
      myAlert('warning', 'Spot has been deleted');
    }
  };

  render() {
    const item = this.state.data;
    //được gọi từ api getad hay không?
    const isFromAPIGetAds = item.callingFromAPIGetAds;

    let titlePriceJson =
      item && item.translations && item.translations[0] && item.translations[0].title_price
        ? JSON.parse(item.translations[0].title_price)
        : null;
    const nameTitle = isFromAPIGetAds
      ? item && item.translations && item.translations[0] && item.translations[0].title
      : item && item.translations && item.translations[0] && item.translations[0].spot_name;
    const price = titlePriceJson && titlePriceJson.normal ? titlePriceJson.normal : '';
    const discountPrice = titlePriceJson && titlePriceJson.cancel ? titlePriceJson.cancel : '';
    // ----
    let description = null;

    let optional_Description = null;

    if (
      Number(
        item && item.translations && item.translations[0] && item.translations[0].description,
      ) ||
      Number(
        item &&
          item.translations &&
          item.translations[0] &&
          item.translations[0].optional_description,
      )
    ) {
      description =
        item &&
        item.translations &&
        item.translations[0] &&
        '￦' + Number(item.translations[0].description).format();
      optional_Description =
        item &&
        item.translations &&
        item.translations[0] &&
        '￦' + Number(item.translations[0].optional_description).format();
    } else {
      description =
        item && item.translations && item.translations[0] && item.translations[0].description;
      optional_Description =
        item &&
        item.translations &&
        item.translations[0] &&
        item.translations[0].optional_description;
    }

    const image =
      isFromAPIGetAds && item.image
        ? item.image + '?d=750'
        : this.state.image + '?d=750'
        ? this.state.image + '?d=750'
        : '';
    const cityTag = item && item.tags && item.tags.filter((v) => v && v.type && v.type === 1);
    const regionTag = item && item.tags && item.tags.filter((v) => v && v.type && v.type === 7);
    const city =
      (cityTag &&
        cityTag.length > 0 &&
        cityTag[0] &&
        cityTag[0].translations &&
        cityTag[0].translations[0] &&
        cityTag[0].translations[0].name) ||
      '';
    const region =
      (regionTag &&
        regionTag.length > 0 &&
        regionTag[0] &&
        regionTag[0].translations &&
        regionTag[0].translations[0] &&
        regionTag[0].translations[0].name) ||
      '';
    const reserveSpot = item && item.reserve_info && item.reserve_info !== null;
    return (
      <View
        style={[
          reserveSpot ? ptShadow.BLUR0 : null,
          {
            width: WIDTH,
            height: 240 * HEIGHT_SCALE_RATIO,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <MyTouchableOpacity onPress={this.spotCardPress}>
          <View
            style={{
              backgroundColor: 'black',
              width: WIDTH,
              height: 240 * HEIGHT_SCALE_RATIO,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyImage
              resizeMode="cover"
              source={image ? { uri: image } : IMAGE.UNAVAILABLE_IMG}
              style={{
                opacity: 0.95,
                flex: 1,
                width: WIDTH,
                height: 240 * HEIGHT_SCALE_RATIO,
                backgroundColor: COLOR.appTextPlaceholderColor,
              }}
            />
            <View
              style={{
                position: 'absolute',
                alignSelf: 'flex-start',
                paddingHorizontal: 36 * WIDTH_SCALE_RATIO,
              }}>
              {/* hiện city và region */}
              <PText
                style={[style.textShadow2, style.textSubTitle, ptText.SMALL1, { color: '#fff' }]}
                numberOfLines={1}>
                {city} {region}
              </PText>
              <PText
                style={[style.textShadow2, style.textTitle, ptText.H4, { color: '#fff' }]}
                numberOfLines={1}>
                {nameTitle}
              </PText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 5 * HEIGHT_SCALE_RATIO,
                }}>
                <PText
                  style={[ptText.BODY2, ptColor.GREY80, { maxWidth: discountPrice ? '50%' : null }]}
                  numberOfLines={1}>
                  {price || description}
                </PText>
                <PText
                  style={[
                    ptText.SMALL1,
                    ptColor.GREY20,
                    {
                      width: '50%',
                      marginLeft: 5 * WIDTH_SCALE_RATIO,
                      textDecorationLine: 'line-through',
                    },
                  ]}
                  numberOfLines={1}>
                  {discountPrice || optional_Description}
                </PText>
              </View>
            </View>
          </View>
        </MyTouchableOpacity>
      </View>
    );
  }
}

export default class CarouselSpot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      data: this.props.data,
    };
    this.renderItemCarouselSpot = this.renderItemCarouselSpot.bind(this);
  }

  renderItemCarouselSpot({ item }) {
    let itemData = item;
    return (
      <ItemCarouselSpot
        item={itemData}
        onChange={(data) => {
          itemData = data;
        }}
        self={this}
      />
    );
  }

  openShowAd = () => {
    if (this.refs && this.refs.modalShowAd) {
      this.refs.modalShowAd.open();
    }
  };

  renderSeeAllAdvertise() {
    let totalItemAd = this.props.data.length;
    let activeAd = this.state.activeSlide + 1;
    return (
      <MyTouchableOpacity
        onPress={this.openShowAd}
        style={{
          zIndex: 999,
          alignItems: 'center',
          opacity: 0.8,
          justifyContent: 'center',
          borderBottomLeftRadius: 8 * WIDTH_SCALE_RATIO,
          borderTopLeftRadius: 8 * WIDTH_SCALE_RATIO,
          top: 205 * HEIGHT_SCALE_RATIO,
          right: -16 * WIDTH_SCALE_RATIO,
          height: 24 * HEIGHT_SCALE_RATIO,
          position: 'absolute',
          backgroundColor: COLOR.WHITE,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
            alignItems: 'center',
          }}>
          <PText style={[ptText.SMALL1, COLOR.GREY80, {}]}>{`${activeAd}/${totalItemAd} `}</PText>
          <MaterialIcons name={'add'} size={13} />
          <PText style={[ptText.SMALL1, COLOR.GREY80, {}]}>
            {`${RootStore.i18n.t('global.see-all')}`}
          </PText>
        </View>
      </MyTouchableOpacity>
    );
  }

  snapToItemFunc = (index) => {
    this.setState({ activeSlide: index });
  };
  render() {
    return (
      <View>
        <View
          style={{
            left: -16 * WIDTH_SCALE_RATIO,
            borderRadius: 4 * WIDTH_SCALE_RATIO,
            backgroundColor: COLOR.WHITE,
          }}>
          {this.props.data.length > 0 ? (
            <Carousel
              ref={(c) => (this.sliderRef = c)}
              data={this.props.data}
              renderItem={this.renderItemCarouselSpot}
              sliderWidth={WIDTH}
              itemWidth={WIDTH}
              itemHeight={240 * HEIGHT_SCALE_RATIO}
              sliderHeight={240 * HEIGHT_SCALE_RATIO}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              activeSlideAlignment="center"
              loop
              enableSnap
              autoplay
              autoplayDelay={1000}
              autoplayInterval={4000}
              shouldOptimizeUpdates
              onSnapToItem={this.snapToItemFunc}
            />
          ) : (
            <Fragment />
          )}
        </View>
        {/* Spot */}
        {this.renderSeeAllAdvertise()}
        <MyWebView ref="modalWebView" />
        <MyModalShowAd ref="modalShowAd" data={this.props.data} spot />
      </View>
    );
  }
}
