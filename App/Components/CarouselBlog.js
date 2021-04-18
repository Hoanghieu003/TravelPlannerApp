import React from 'react';
import { Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import changeLike from '../../Common/gql/mutations/changeLike.gql';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptColor, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import MyImage from './MyImage';
import MyModalShowAd from './MyModalShowAd';
import MyTouchableOpacity from './MyTouchableOpacity';
import MyWebView from './MyWebView';
import PText from './PText';
import { IMAGE } from '../../asset/image/ImagePath';

const heightCarouselBlog = 240 * HEIGHT_SCALE_RATIO;

class ItemCarouselBlog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLike:
        this.props.item &&
        this.props.item.like_members &&
        this.props.item.like_members.length > 0 &&
        RootStore.auth.id !== ''
          ? true
          : false,
      data: this.props.item,
      image: '',
    };
    this.onClickHeart = this.onClickHeart.bind(this);
    this.onClickBlogCard = this.onClickBlogCard.bind(this);
    this.getImage = this.getImage.bind(this);
    this.onUpdateImage = this.onUpdateImage.bind(this);
  }

  async onClickSpotCard(code, city, region) {
    if (code) {
      Actions.spotDetail({ spotCode: code, isProxyShopping: true });
    }
  }

  async onClickBlogCard(code, city, region) {
    if (
      code &&
      String(code) &&
      (String(code).includes('https://') ||
        String(code).includes('http://') ||
        String(code).includes('creatrip'))
    ) {
      await this.props.self.refs.modalWebView.open(code);
    } else if (code !== '') {
      Actions.blogDetail({ blogCode: code });
    } else if (this.props.item && this.props.item.code) {
      Actions.blogDetail({ blogCode: this.props.item.code });
    }
  }

  async onClickHeart(code) {
    if (RootStore.auth.id === '') {
      return;
    }

    const variables = {
      nowState: this.state.isLike,
      where: 'blog',
      code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });

    if (result.data.changeLike) {
      this.setState({ isLike: !this.state.isLike }, () => {
        this.setState(
          {
            data: { ...this.state.data, like_members: this.state.isLike ? [{}] : [] },
          },
          () => {
            this.props.onChange(this.state.data);
          },
        );
      });
    }
  }

  onUpdateImage = (arraySize) => {
    const foundMaximumQualityIndex = arraySize.findIndex((e) => e && e === 450); //only get 450px image
    // this.props.item.images
    let image = '';
    if (foundMaximumQualityIndex >= 0 && this.props.item.images.length > 0) {
      image = this.props.item.images[foundMaximumQualityIndex].url
        ? this.props.item.images[foundMaximumQualityIndex].url
        : this.props.item.images[foundMaximumQualityIndex].origin_path
        ? `${RootStore.config.imgHost_500}/${this.props.item.images[foundMaximumQualityIndex].origin_path}`
        : '';
    } else if (this.props.item.images && this.props.item.images[0]) {
      //lay thang item dau tien
      image = this.props.item.images[0].url
        ? this.props.item.images[0].url
        : this.props.item.images[0].origin_path
        ? `${RootStore.config.imgHost_500}/${this.props.item.images[0].origin_path}`
        : '';
    }
    this.setState({ image });
  };

  async getImage() {
    const arraySize = [];
    if (this.props.item && this.props.item.images && this.props.item.images.length > 0) {
      this.props.item.images.forEach((e, i) => {
        if (e.url) {
          Image.getSize(
            e.url,
            (width, height) => {
              arraySize.push(width);
              if (i === arraySize.length - 1) {
                this.onUpdateImage(arraySize);
              }
            },
            (error) => {
              arraySize.push(null);
              if (i === arraySize.length - 1) {
                this.onUpdateImage(arraySize);
              }
            },
          );
        } else {
          Image.getSize(
            `${RootStore.config.imgHost_500}/${e.origin_path}`,
            (width, height) => {
              arraySize.push(width);
              if (i === arraySize.length - 1) {
                this.onUpdateImage(arraySize);
              }
            },
            (error) => {
              arraySize.push(null);
              if (i === arraySize.length - 1) {
                this.onUpdateImage(arraySize);
              }
            },
          );
        }
      });
    }
  }
  render() {
    const item = this.state.data;
    const isFromAPIGetAds = item.callingFromAPIGetAds;
    let titlePriceJson =
      item && item.translations && item.translations[0] && item.translations[0].title_price
        ? JSON.parse(item.translations[0].title_price)
        : null;
    const price = titlePriceJson && titlePriceJson.normal ? titlePriceJson.normal : '';
    const discountPrice = titlePriceJson && titlePriceJson.cancel ? titlePriceJson.cancel : '';
    const cityTag = item && item.tags && item.tags.filter((v) => v && v.type && v.type === 1);
    const regionTag = item && item.tags && item.tags.filter((v) => v && v.type && v.type === 7);
    const image = item?.translations[0]?.image + '?d=750';
    const name = isFromAPIGetAds
      ? item.translations[0].title
      : item.translations[0].title
      ? item.translations[0].title
      : '';
    let city, region;
    if (isFromAPIGetAds) {
      city =
        (cityTag &&
          cityTag.length > 0 &&
          cityTag[0] &&
          cityTag[0].translations &&
          cityTag[0].translations[0] &&
          cityTag[0].translations[0].name) ||
        '';
      region =
        (regionTag &&
          regionTag.length > 0 &&
          regionTag[0] &&
          regionTag[0].translations &&
          regionTag[0].translations[0] &&
          regionTag[0].translations[0].name) ||
        '';
    } else {
      city =
        (cityTag &&
          cityTag[0] &&
          cityTag[0].translations &&
          cityTag[0].translations.find((v) => v.language === RootStore.language).name) ||
        '';
      region =
        (regionTag &&
          regionTag[0] &&
          regionTag[0].translations &&
          regionTag[0].translations.find((v) => v.language === RootStore.language).name) ||
        '';
    }

    const spotCode = item.spot?.code;
    const blogCode = isFromAPIGetAds
      ? item && item.blog_code
        ? item.blog_code
        : item.url
        ? item.url
        : ''
      : item && item.code;
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
    if (this.props.specialCase) {
      return (
        <View
          style={{
            width: 343 * WIDTH_SCALE_RATIO,
            borderRadius: 4 * HEIGHT_SCALE_RATIO,
            marginVertical: 3 * HEIGHT_SCALE_RATIO,
          }}>
          <MyTouchableOpacity onPress={this.onClickBlogCard.bind(this, blogCode)}>
            <View
              style={{
                backgroundColor: 'black',
                flexDirection: 'row',
                height: 120 * HEIGHT_SCALE_RATIO,
              }}>
              <MyImage
                resizeMode="cover"
                source={image ? { uri: image } : IMAGE.UNAVAILABLE_IMG}
                style={{
                  opacity: 0.9,
                  flex: 1,
                  borderTopLeftRadius: 4 * HEIGHT_SCALE_RATIO,
                  borderBottomLeftRadius: 4 * HEIGHT_SCALE_RATIO,
                  width: 148 * WIDTH_SCALE_RATIO,
                  height: 120 * HEIGHT_SCALE_RATIO,
                  backgroundColor: COLOR.appTextPlaceholderColor,
                }}
              />
              <View
                style={{
                  marginLeft: 16 * WIDTH_SCALE_RATIO,
                  width: (343 - 148 - 16) * WIDTH_SCALE_RATIO,
                  paddingRight: 16 * WIDTH_SCALE_RATIO,
                  paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                  overflow: 'hidden',
                }}>
                <PText
                  style={[
                    style.textSubTitle,
                    ptText.BODY2,
                    { paddingBottom: 8 * HEIGHT_SCALE_RATIO },
                  ]}
                  numberOfLines={1}>
                  {city} {region}
                </PText>
                <PText style={[style.text, {}]} numberOfLines={1}>
                  {name}
                </PText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 5 * HEIGHT_SCALE_RATIO,
                  }}>
                  <PText
                    style={[
                      ptText.BODY2,
                      ptColor.GREY80,
                      { maxWidth: discountPrice ? '50%' : null },
                    ]}
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
    if (this.props.proxyShopping) {
      return (
        <View>
          <MyTouchableOpacity
            onPress={this.onClickSpotCard.bind(this, spotCode)}
            style={{
              backgroundColor: 'black',
              width: WIDTH,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="cover"
              source={{
                uri: image,
              }}
              style={{
                opacity: 0.95,
                width: WIDTH,
                height: 240 * HEIGHT_SCALE_RATIO,
                backgroundColor: COLOR.appTextPlaceholderColor,
              }}
            />

            <View
              style={{
                width: WIDTH,
                backgroundColor: COLOR.WHITE,
                alignSelf: 'center',
                paddingVertical: 8 * WIDTH_SCALE_RATIO,
              }}>
              <PText
                style={[style.textTitle, ptText.H4, { color: COLOR.GREY80, textAlign: 'center' }]}>
                {name.toUpperCase()}
              </PText>
              <PText
                style={[
                  style.textSubTitle,
                  ptText.H4,
                  { color: COLOR.GREY40, alignSelf: 'center' },
                ]}>
                {region}
              </PText>
            </View>
          </MyTouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <MyTouchableOpacity
          onPress={this.onClickBlogCard.bind(this, blogCode)}
          style={{
            backgroundColor: 'black',
            width: WIDTH,
            height: heightCarouselBlog,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="cover"
            source={{
              uri: image,
            }}
            style={{
              opacity: 0.95,
              width: WIDTH,
              height: heightCarouselBlog,
              backgroundColor: COLOR.appTextPlaceholderColor,
            }}
          />

          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-start',
              paddingHorizontal: 36 * WIDTH_SCALE_RATIO,
            }}>
            <PText style={[style.textShadow2, style.textTitle, ptText.H4, { color: '#fff' }]}>
              {name}
            </PText>
            <PText
              style={[style.textShadow2, style.textSubTitle, ptText.SMALL1, { color: '#fff' }]}>
              {region}
            </PText>
          </View>
        </MyTouchableOpacity>
      </View>
    );
  }
}

export default class CarouselBlog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderSeeAllAdvertise = this.renderSeeAllAdvertise.bind(this);
  }

  renderItem({ item }) {
    return (
      <ItemCarouselBlog
        item={item}
        onChange={(data) => {
          item = data;
        }}
        specialCase={this.props.specialCase}
        proxyShopping={this.props.proxyShopping}
        self={this}
      />
    );
  }

  pressAdvertise = () => {
    if (this.refs && this.refs.modalShowAd) {
      this.refs.modalShowAd.open();
    }
  };

  renderSeeAllAdvertise() {
    let totalItemAd = this.props.data.length;
    let activeAd = this.state.activeSlide + 1;
    return (
      <MyTouchableOpacity
        onPress={this.pressAdvertise}
        style={{
          zIndex: 999,
          alignItems: 'center',
          opacity: 0.8,
          justifyContent: 'center',
          borderBottomLeftRadius: 10 * WIDTH_SCALE_RATIO,
          borderTopLeftRadius: 10 * WIDTH_SCALE_RATIO,
          top: 205 * HEIGHT_SCALE_RATIO,
          right: 0,
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

  onSnapToItem = (index) => {
    // this.onDebouncePress = _.debounce(
    //   () => {
    //     this.setState({ activeSlide: index });
    //   },
    //   200,
    //   {
    //     leading: true,
    //     trailing: false,
    //   },
    // );
    this.setState({ activeSlide: index });
  };

  render() {
    return (
      <View>
        <Carousel
          ref={(c) => (this.sliderRef = c)}
          data={this.props.data}
          renderItem={this.renderItem}
          sliderWidth={WIDTH}
          itemWidth={WIDTH}
          itemHeight={heightCarouselBlog}
          sliderHeight={heightCarouselBlog}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          containerCustomStyle={{ overflow: 'visible' }}
          loop
          enableSnap
          autoplay={this.props.proxyShopping ? false : true}
          autoplayDelay={4000}
          autoplayInterval={4000}
          onSnapToItem={this.onSnapToItem}
        />
        {this.props.proxyShopping && (
          <Pagination
            containerStyle={{
              paddingTop: 10 * HEIGHT_SCALE_RATIO,
              paddingVertical: 0,
            }}
            dotsLength={this.props.data.length}
            renderDots={() =>
              this.props.data.map((screen, i) => (
                <View
                  style={{
                    width: (WIDTH - 36 * WIDTH_SCALE_RATIO) / this.props.data.length,
                    height: 4 * WIDTH_SCALE_RATIO,
                    backgroundColor: i === this.state.activeSlide ? 'black' : COLOR.GREY20,
                  }}
                  key={`${i}`}
                />
              ))
            }
          />
        )}
        {!this.props.proxyShopping && this.renderSeeAllAdvertise()}
        <MyWebView ref="modalWebView" />
        <MyModalShowAd ref="modalShowAd" data={this.props.data} blog />
      </View>
    );
  }
}
