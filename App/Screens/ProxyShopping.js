import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import React, { Fragment } from 'react';
import { ActivityIndicator, Animated, View, FlatList, Image, Platform } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Const from '../../Common/Const';
import getAdvertiseQuery from '../../Common/gql/queries/getAdvertisementList.gql';
import getSpotListNew from '../../Common/gql/queries/getSpotListNew.gql';
import getTagRecommendList from '../../Common/gql/queries/getTagRecommendList.gql';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import CarouselBlog from '../Components/CarouselBlog';
import Divider from '../Components/Divider';
import { myAlert } from '../Components/MyAlert';
import MyModalShowAd from '../Components/MyModalShowAd';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import MyWebView from '../Components/MyWebView';
import PFlatList from '../Components/PFlatList';
import PText from '../Components/PText';
import SpotCard from '../Components/SpotCard';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, FS, headerHeight, ptColor, ptText, ptShadow } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { convertLikeSpotToMobx } from '../Utils/likeAction';
import { ICON, IMAGE } from '../../asset/image/ImagePath';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const _ = require('lodash');

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const RenderItemMenuComponent = React.memo((props) => {
  const { item, category, handleClickParentCategory } = props;
  const code = item && item.code ? item.code : 0;
  const name = item && item.name ? item.name : 'ALL';
  const onPress = () => handleClickParentCategory(item);
  return (
    <MyTouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12 * WIDTH_SCALE_RATIO,
        paddingBottom: 6 * WIDTH_SCALE_RATIO,
        borderBottomWidth: 2 * HEIGHT_SCALE_RATIO,
        borderBottomColor: category.code === code ? COLOR.PRIMARY : '#fff',
      }}>
      <PText
        style={[
          ptText.H4,
          {
            color: COLOR.GREY80,
            textTransform: 'uppercase',
          },
        ]}>
        {name}
      </PText>
    </MyTouchableOpacity>
  );
});

@observer
class ProxyShopping extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      curY: new Animated.Value(0),
      oldCoordinate: 0,
      widthAdvertise: 0,
      fadeAnim: new Animated.Value(1),
      isLoading: false,
      tags: [],
      indicatorOffsetX: 0,
      activeIndicatorIndex: 0,
      category: { code: 0, name: 'ALL' },
      selectedChildrenCategory: {},
      isShowChildrenCategory: false,
      modalAllAdvertise: false,
      childrenTags: [],
      advertise: [],
      spots: [],
      indicator: new Animated.Value(0),
      wholeHeight: 1,
      visibleHeight: 0,
      spotNewest: [],
      isShowButtonBottom: true,
      orderType: Const.OrderType.Like.name,
      offset: 0,
      showBack: true,
      title: '',
      existOther: true,
    };
    this.currentIndex = 0;
    this.oldCoordinate = 0;

    this.getSpots = this.getSpots.bind(this);
    this.getSpotNewestList = this.getSpotNewestList.bind(this);
    this.getTags = this.getTags.bind(this);
    this.renderMenu = this.renderMenu.bind(this);

    this.onRefreshRequest = this.onRefreshRequest.bind(this);
    this.getAdvertiseList = this.getAdvertiseList.bind(this);
    this.renderChildrenCategory = this.renderChildrenCategory.bind(this);
    this.onClickCategoryTag = this.onClickCategoryTag.bind(this);
    this.clickAskForProduct = this.clickAskForProduct.bind(this);
    this.onScrollDebounce = _.debounce(
      (event) => {
        this.handleScroll(event);
      },
      200,
      {
        leading: true,
        trailing: false,
      },
    );
    this.onDebounceIndicatorChange = _.debounce(this.onIndicatorChange, 200, {
      leading: false,
      trailing: true,
    });
  }
  onIndicatorChange = () => {
    this.setState({
      activeIndicatorIndex: this.state.advertise[this.indicatorIndex].indicatorIndex,
    });
  };
  async componentDidMount() {
    analytics().setCurrentScreen('Proxy-Shopping');
    this.getTags();
    this.getAdvertiseList();
    await this.getSpotNewestList();
    this.getSpots();

    this.startInterval();
  }

  startInterval() {
    //Mr.Han wants to remove autoplay feature. But maybe we need to use in the future so please keep this code
    // this._interval = setInterval(() => {
    //   this.scrollingRight = true;
    //   if (this._flatList && this.state.advertise && this.state.advertise.length > 0) {
    //     this.currentIndex = Math.round(this.lastx / WIDTH) + 1;
    //     const originalAdvertiseListLength = this.state.advertise.length / 5;
    //     if (this.currentIndex > originalAdvertiseListLength * 5 - 1) {
    //       this.currentIndex = originalAdvertiseListLength * 5 - 1;
    //     }
    //     this._flatList.scrollToIndex({
    //       animated: true,
    //       index: this.currentIndex,
    //     });
    //   }
    // }, 4000);
  }

  stopInterval() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  async getTags() {
    const result = await RootStore.client.query({
      query: getTagRecommendList,
      variables: {
        type: Const.NewTagType.MAIN_PROXY_SHOPPING_CATEGORY,
        isRecommend: false,
        languages: [RootStore.language],
      },
    });
    let tempTags = [{ code: 0, name: 'ALL' }];

    let tags = result.data.getTagRecommendList.tags.map((v) => ({
      code: v.code,
      name: v.translations[0].name,
      children: v.children,
    }));
    tags = tempTags.concat(tags);

    this.setState({ tags });
  }
  getAdvertiseList = async () => {
    const variables = {
      order: Const.OrderType.Rand.name,
      type: Const.AdvertiseType.Purchase.code,
      page: 1,
      isPublish: true,
      languages: RootStore.language,
      limit: 5,
    };

    const result = await RootStore.client.query({
      query: getAdvertiseQuery,
      variables,
    });
    let advertise = result.data.getAdvertisementList.advertisements.map((e) => {
      e.callingFromAPIGetAds = true;
      return e;
    });

    advertise = advertise.map((e, index) => {
      e.indicatorIndex = index;
      return e;
    });

    if (advertise && advertise.length > 1) {
      advertise = [...advertise, ...advertise, ...advertise, ...advertise, ...advertise];
      this.currentIndex = (this.state.advertise.length * 2) / 5;
    }

    this.setState({ advertise });
  };

  async getSpotNewestList() {
    let spotNewest = [];
    let title = '';

    try {
      const variables = {
        order: 'renewal_date',
        languages: [RootStore.language],
        limit: 15,
        isConfirm: true,
        types: [4],
        isMain: true,
        isReserved: true,
      };

      const result = await RootStore.client.query({
        query: getSpotListNew,
        variables,
      });

      convertLikeSpotToMobx(result.data.getSpotListNew.spots);
      spotNewest = this.state.spots.concat(result.data.getSpotListNew.spots);

      title = '';
      this.setState({
        spotNewest,
        // offset: this.state.offset + 1,
        title,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }
  async getSpots() {
    if (!this.state.existOther) {
      return;
    }
    let spots = [];
    let title = '';

    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      try {
        const variables = {
          order: this.state.orderType,
          languages: [RootStore.language],
          limit: 24,
          isConfirm: true,
          tags: [],
          types: [4],
          isMain: true,
          offset: 24 * this.state.offset,
          isReserved: true,
        };
        if (
          this.state.category &&
          this.state.category.code &&
          this.state.selectedChildrenCategory.length === 0
        ) {
          variables.tags.push(this.state.category.code);
        }
        if (
          this.state.category &&
          this.state.category.code === 0 &&
          this.state.selectedChildrenCategory.length === 0
        ) {
          delete variables.tags;
        }

        if (this.state.selectedChildrenCategory && this.state.selectedChildrenCategory.code) {
          variables.tags.push(this.state.selectedChildrenCategory.code);
        }
        if (this.state.selectedChildrenCategory && this.state.selectedChildrenCategory.code === 0) {
          variables.tags.push(this.state.category.code);
        }
        if (variables.tags && variables.tags.length === 0) {
          delete variables.tags;
        }
        const result = await RootStore.client.query({
          query: getSpotListNew,
          variables,
        });

        convertLikeSpotToMobx(result.data.getSpotListNew.spots);
        spots = this.state.spots.concat(result.data.getSpotListNew.spots);
        let existOther = true;
        if (result.data.getSpotListNew.spots.length === 0) {
          existOther = false;
        }

        title = '';
        this.setState({
          existOther,
          spots,
          offset: this.state.offset + 1,
          title,
          isLoading: false,
        });
      } catch (err) {
        this.setState({ isLoading: false });
      }
    }
  }
  onRefreshRequest() {
    this.setState(
      { isLoading: false, advertise: [], spots: [], offset: 0, existOther: true },
      () => {
        this.getSpots();
        this.getAdvertiseList();
      },
    );
  }

  onClickSpotCard = (code, city, region) => {
    let _city = city ? city : '';
    let _region = region ? region : '';
    console.log('29148 code , city , region ne', code, city, region);
    if (code) {
      Actions.spotDetail({ spotCode: code, city: _city, region: _region, isProxyShopping: true });
    }
  };

  openSearchModal() {
    this.refs.searchBox.openSearchModal();
  }
  clickAskForProduct() {
    switch (RootStore.language) {
      case 'zh-TW':
        return this.refs.modalWebView.open(Const.LinkInProxyShoping.Taiwan);
      case 'zh-HK':
        return this.refs.modalWebView.open(Const.LinkInProxyShoping.HongKong);
      case 'th':
        return this.refs.modalWebView.open(Const.LinkInProxyShoping.Thailand);
      default:
        return myAlert('', 'Coming soon');
    }
  }
  onClickOrderType(type) {
    if (this.state.orderType === type) {
      return;
    }
    this.setState({ orderType: type, spots: [], blogs: [], existOther: true, offset: 0 }, () => {
      this.getSpots();
    });
  }

  renderSeeAllAdvertise() {
    return (
      <MyTouchableOpacity
        onPress={() => {
          this.refs.modalShowAd.open();
        }}
        style={{
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'center',
          top: 213 * HEIGHT_SCALE_RATIO,
          right: 0,
          width: 28 * WIDTH_SCALE_RATIO,
          height: 28 * HEIGHT_SCALE_RATIO,
          position: 'absolute',
          backgroundColor: COLOR.WHITE,
        }}>
        {/* <PText style={[ptText.H1, { color: COLOR.GREY80 }]}></PText> */}
        <Image
          source={ICON.PLUS_ICON}
          resizeMode="contain"
          style={{
            tintColor: COLOR.GREY60,
            height: 16 * WIDTH_SCALE_RATIO,
            width: 16 * WIDTH_SCALE_RATIO,
          }}
        />
      </MyTouchableOpacity>
    );
  }
  onClickCategoryTag(tag) {
    if (this.state.category === tag) {
      return;
    }
    if (tag.code === 0) {
      this.chooseAll = true;
    } else {
      this.chooseAll = false;
    }
    this.setState(
      { advertise: [], category: tag, spots: [], blogs: [], existOther: true, offset: 0 },
      () => {
        this.getAdvertiseList();
        this.getSpots();
      },
    );
  }

  onClickChildrenCategoryTag(tag) {
    if (this.state.childrenTags === tag) {
      return;
    }
    this.setState(
      {
        advertise: [],
        selectedChildrenCategory: tag,
        spots: [],
        blogs: [],
        existOther: true,
        offset: 0,
      },
      () => {
        this.getAdvertiseList();

        this.getSpots();
      },
    );
  }
  renderChildrenCategory({ item, index }) {
    const correctData = item?.translations ? item.translations[0] : item;
    const code = correctData && correctData.tag_code ? correctData.tag_code : 0;
    const name = correctData && correctData.name ? correctData.name : 'ALL';
    return (
      <MyTouchableOpacity
        onPress={() => {
          this.onClickChildrenCategoryTag(item);
        }}
        style={{
          paddingBottom: 0 * WIDTH_SCALE_RATIO,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <PText
          numberOfLines={1}
          style={[
            style.textSubTitle,
            this.state.selectedChildrenCategory.code === code ? ptColor.GREY80 : ptColor.GREY20,
            {
              paddingVertical: 5 * HEIGHT_SCALE_RATIO,
              textAlign: 'center',
              textTransform: 'uppercase',
            },
          ]}>
          {name}
        </PText>

        <View
          style={{
            width: 1 * WIDTH_SCALE_RATIO,
            height: 12 * HEIGHT_SCALE_RATIO,
            backgroundColor:
              index !== this.state?.childrenTags?.length - 1 ? COLOR.GREY20 : COLOR.WHITE,
            marginHorizontal: 16 * WIDTH_SCALE_RATIO,
          }}
        />
      </MyTouchableOpacity>
    );
  }
  handleClickParentCategory = (item) => {
    if (item?.children?.length > 0) {
      let allItem = [{ code: 0, name: 'ALL' }];
      let childrenTags = allItem.concat(item.children);
      this.onClickChildrenCategoryTag(childrenTags[0]);
      this.setState({
        selectedChildrenCategory: childrenTags[0],
        category: item,
        isShowChildrenCategory: true,
        childrenTags: childrenTags,
      });
      // this.forceUpdate();
    } else {
      this.setState({
        isShowChildrenCategory: false,
      });
      this.onClickCategoryTag(item);
    }
  };

  renderMenu = ({ item, index }) => {
    return (
      <RenderItemMenuComponent
        item={item}
        handleClickParentCategory={this.handleClickParentCategory}
        category={this.state.category}
      />
    );
  };

  onScrollFunc = (event) => {
    this.onScrollDebounce(event);
  };

  onChangeCityFunc = (selectedCity) => {
    this.setState(
      {
        spots: [],
        existOther: true,
        offset: 0,
      },
      () => {
        this.getSpots();
      },
    );
  };

  onSearchFunc = (search, city) => {
    this.setState(
      {
        spots: [],
        offset: 0,
        search,
        existOther: true,
      },
      () => {
        setTimeout(() => {
          this.getSpots();
        }, 500);
      },
    );
  };

  onShowSearchFunc = () => {
    this.setState(
      {
        showSearch: true,
        category: { code: 0, name: 'ALL' },
      },
      () => {
        if (this.baseHeaderWithSearchRef) {
          this.baseHeaderWithSearchRef.onTextUpdate();
          if (this.baseHeaderWithSearchRef.searchBarRef) {
            this.baseHeaderWithSearchRef.searchBarRef.setState({
              search: this.state.search,
              autoFocusState: true,
            });
          }
        }
      },
    );
  };

  onCloseSearchFunc = () => {
    this.setState({
      tag: null,
      category: { code: 0, name: 'ALL' },
    });
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };
  onOpenSearchFunc = () => {
    this.setState(
      {
        showSearch: true,
      },
      () => {
        if (this.baseHeaderWithSearchRef) {
          this.baseHeaderWithSearchRef.onTextUpdate();
          if (this.baseHeaderWithSearchRef.searchBarRef) {
            this.baseHeaderWithSearchRef.searchBarRef.setState({
              search: this.state.search,
              autoFocusState: true,
            });
          }
        }
      },
    );
  };

  render() {
    return (
      <View
        style={[
          style.container,
          {
            paddingBottom: this.state.paddingBottom,
          },
        ]}>
        <View style={{ height: headerHeight }} />
        <View style={{ paddingLeft: 16 * WIDTH_SCALE_RATIO }}>
          <PFlatList
            horizontal
            data={this.state?.tags}
            extraData={this.state.category?.code}
            renderItem={this.renderMenu}
          />
        </View>
        <Divider style={{ marginTop: 0 * HEIGHT_SCALE_RATIO }} />
        <View style={{ paddingLeft: 16 * WIDTH_SCALE_RATIO }}>
          {this.state.isShowChildrenCategory && (
            <PFlatList
              horizontal
              data={this.state.childrenTags}
              extraData={this.state.selectedChildrenCategory?.code}
              renderItem={this.renderChildrenCategory}
            />
          )}
        </View>
        {this.renderModalProxyShopping()}
        <Animated.ScrollView
          ref="scrollView"
          bounces={false}
          scrollEventThrottle={400}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.curY } } }], {
            useNativeDriver: false,
            listener: (event) => {
              if (isCloseToBottom(event.nativeEvent)) {
                console.log('bambi is close to bottom');
                this.getSpots();
              }
            },
          })}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20 * HEIGHT_SCALE_RATIO }}>
          {this.state.advertise.length > 0 && this.renderAdvertiseProxyShopping()}
          {this.state.spotNewest.length > 0 &&
            this.state.category.code === 0 &&
            this.renderHeaderNewestItem()}
          {this.state.spots.length > 0 ? this.renderSpotList() : this.renderHaventSpotItem()}
        </Animated.ScrollView>
        {this.renderRequestButton()}
        <View style={{ position: 'absolute' }}>
          <BaseHeaderWithSearch
            ref={(instance) => (this.baseHeaderWithSearchRef = instance)}
            // showSuggest
            showBack
            postType={Const.PostType.Blog.code}
            color={COLOR.appColor}
            isFromTravelInfo={true}
            onChangeKeyword={null}
            backgroundColorWhite
            showSuggest
            showSearch
            isFromProxyShopping
            selectedSearchCategory={null}
            onChangeCity={this.onChangeCityFunc}
            onSearch={this.onSearchFunc}
            onShowSearch={this.onShowSearchFunc}
            onCloseSearch={this.onCloseSearchFunc}
          />
        </View>
      </View>
    );
  }

  renderModalProxyShopping() {
    return (
      <Fragment>
        <MyWebView ref="modalWebView" />
        <MyModalShowAd
          ref="modalShowAd"
          data={Array.from(new Set(this.state.advertise))}
          spot
          proxyShopping
        />
      </Fragment>
    );
  }

  renderRequestButton() {
    const headerDistance = Animated.diffClamp(this.state.curY, 0, 60).interpolate({
      inputRange: [0, 60],
      outputRange: [1, 0],
    });
    const fixTouch = Animated.diffClamp(this.state.curY, 0, 60).interpolate({
      inputRange: [0, 0],
      outputRange: [50, 0],
    });
    return (
      <Animated.View
        style={[
          ptShadow.BLUR20,
          {
            opacity: headerDistance,
            height: 80 * HEIGHT_SCALE_RATIO,
            width: WIDTH + 20,
            marginLeft: -10 * WIDTH_SCALE_RATIO,
            paddingHorizontal: 20 * WIDTH_SCALE_RATIO,

            position: 'absolute',
            bottom: 0,
          },
        ]}>
        <MyTouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 80 * HEIGHT_SCALE_RATIO,

            backgroundColor: 'white',
            alignItems: 'center',
          }}
          onPress={this.clickAskForProduct}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              resizeMode="contain"
              source={IMAGE.PROXY_SHOPPING_IMAGE}
              style={{
                width: 84 * WIDTH_SCALE_RATIO,
                height: 64 * HEIGHT_SCALE_RATIO,
              }}
            />
            <View
              style={{
                marginLeft: 16 * WIDTH_SCALE_RATIO,
                justifyContent: 'center',
              }}>
              <PText
                numberOfLines={1}
                style={{
                  color: COLOR.GREY80,
                  // textTransform: 'uppercase',
                  // fontWeight: 'bold',
                  fontSize: FS(22),
                }}>
                {RootStore.i18n.t('ask-for-product')}
              </PText>
              <PText
                numberOfLines={1}
                style={{
                  color: COLOR.GREY40,
                  // textTransform: 'uppercase',
                  // fontWeight: 'bold',
                  fontSize: FS(14),
                }}>
                {RootStore.i18n.t('sub-ask-for-product')}
              </PText>
            </View>
          </View>
          <MyTouchableOpacity
            onPress={this.clickAskForProduct}
            style={{
              height: fixTouch,
              justifyContent: 'center',
              right: 0 * WIDTH_SCALE_RATIO,
            }}>
            <Image
              source={ICON.TAIL_RIGHT_ICON}
              style={{
                width: 16 * WIDTH_SCALE_RATIO,
                height: 16 * WIDTH_SCALE_RATIO,
                tintColor: COLOR.GREY40,
                // backgroundColor: COLOR.PRIMARY,
              }}
              resizeMode={'contain'}
            />

            {/* <PText numberOfLines={1} style={{ color: COLOR.WHITE, textTransform: 'uppercase' }}>
            {RootStore.i18n.t('ask-for-product')}
          </PText> */}
          </MyTouchableOpacity>
        </MyTouchableOpacity>
      </Animated.View>
    );
  }

  renderHaventSpotItem() {
    return (
      <MyTouchableOpacity onPress={this.onRefreshRequest}>
        <PText
          style={[
            style.textSubTitle,
            {
              position: 'relative',
              textAlign: 'center',
              alignSelf: 'center',
              paddingTop: 30 * HEIGHT_SCALE_RATIO,
            },
          ]}>
          {'There is currently no content.\nClick to update the latest'}
        </PText>
      </MyTouchableOpacity>
    );
  }
  renderAdvertise() {
    return ({ item }) => {
      const image = item?.translations[0]?.image + '?d=750';
      const regionTag = item && item.tags && item.tags.filter((v) => v && v.type && v.type === 7);
      const cityTag = item && item.tags && item.tags.filter((v) => v && v.type && v.type === 1);

      const region =
        (regionTag &&
          regionTag[0] &&
          regionTag[0].translations &&
          regionTag[0].translations.find((v) => v.language === RootStore.language).name) ||
        '';
      const city =
        (cityTag &&
          cityTag[0] &&
          cityTag[0].translations &&
          cityTag[0].translations.find((v) => v.language === RootStore.language).name) ||
        '';
      const spotCode = item.spot?.code;

      const name = item.translations[0].title ? item.translations[0].title : '';
      return (
        <View>
          <MyTouchableOpacity
            onPress={this.onClickSpotCard.bind(this, spotCode, city, region)}
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
    };
  }

  proceedLoopAdvertisement() {
    const OFFSET = 5;
    if (
      (this.gestureEnded || Platform.OS === 'android') &&
      !this.shouldBlockAdvertisementScrollEventForAWhile
    ) {
      const notNeedSnapping = this.lastx % WIDTH <= OFFSET && this.lastx % WIDTH >= -OFFSET;
      //console.log('bambi coi thu this.scrollingRight, notNeedSnapping', this.scrollingRight, notNeedSnapping);
      if (notNeedSnapping) {
        this.currentIndex = Math.round(this.lastx / WIDTH);

        const originalAdvertiseListLength = this.state.advertise.length / 5;

        if (this.scrollingRight && this.currentIndex >= originalAdvertiseListLength * 4) {
          //console.log('bambi lon hon 4 lan list -> swipe ve trai');
          this.currentIndex = this.currentIndex - originalAdvertiseListLength;
          this.lastx = originalAdvertiseListLength * WIDTH;
          this.gestureEnded = false;
          this._flatList.scrollToIndex({
            animated: false,
            index: this.currentIndex,
          });
          this.shouldBlockAdvertisementScrollEventForAWhile = true;
          setTimeout(() => {
            this.shouldBlockAdvertisementScrollEventForAWhile = false;
          }, 100);
        } else if (!this.scrollingRight && this.currentIndex <= originalAdvertiseListLength) {
          this.currentIndex += originalAdvertiseListLength;
          this.lastx += originalAdvertiseListLength * WIDTH;
          //console.log('bambi nho hon 1 lan list -> swipe ve phai', this.currentIndex);
          this.gestureEnded = false;
          this._flatList.scrollToIndex({
            animated: false,
            index: this.currentIndex,
          });
          this.shouldBlockAdvertisementScrollEventForAWhile = true;
          setTimeout(() => {
            this.shouldBlockAdvertisementScrollEventForAWhile = false;
          }, 100);
        }
      }
    }

    const indicatorValue = Math.min((this.lastx + OFFSET) % (WIDTH * 5), WIDTH * 4);
    if (indicatorValue !== 5) {
      this.state.indicator.setValue(indicatorValue);
    }
  }

  renderAdvertiseProxyShopping() {
    const indicatorArr = [];
    for (let i = 0; i < this.state.advertise?.length / 5; i++) {
      indicatorArr.push(i);
    }
    return (
      <View style={{ paddingBottom: 30 * HEIGHT_SCALE_RATIO }}>
        {this.renderSeeAllAdvertise()}
        {/* <CarouselBlog data={this.state.advertise} proxyShopping /> */}
        <FlatList
          onContentSizeChange={(width, height) => {
            this.setState({ wholeHeight: height });
          }}
          onLayout={({
            nativeEvent: {
              layout: { x, y, width, height },
            },
          }) => this.setState({ visibleHeight: height })}
          ref={(el) => (this._flatList = el)}
          data={this.state.advertise}
          initialScrollIndex={(this.state.advertise.length * 2) / 5}
          decelerationRate={'fast'}
          renderItem={this.renderAdvertise()}
          // keyExtractor={item => item?.translations[0]?.image}
          horizontal={true}
          snapToAlignment={'start'}
          snapToInterval={WIDTH}
          showsHorizontalScrollIndicator={false}
          // onScroll={({ nativeEvent }) => {

          //   const { x } = nativeEvent.contentOffset;
          //   if (x === (this.state.advertise.length - 1) * WIDTH) {
          //     this._flatList.scrollToOffset({ offset: WIDTH, animated: false });
          //   }
          // }}
          pagingEnabled
          onScrollEndDrag={(event) => {
            if (event.nativeEvent.contentOffset.x < 0) {
              return; //This is an issue of Flatlist on Android, sometimes this event return < 0 value
            }

            this.startInterval();
            this.gestureEnded = true;
            const nextx = event.nativeEvent.contentOffset.x;
            let needProceedLoop = false;
            if (nextx !== this.lastx) {
              this.scrollingRight = nextx > this.lastx;
              needProceedLoop = true;
            }

            this.lastx = nextx;
            if (needProceedLoop) {
              this.proceedLoopAdvertisement();
            }
          }}
          bounces={false}
          getItemLayout={(data, index) => ({
            length: WIDTH,
            offset: WIDTH * index,
            index,
          })}
          onScrollBeginDrag={(event) => {
            if (event.nativeEvent.contentOffset.x < 0) {
              return; //This is an issue of Flatlist on Android, sometimes this event return < 0 value
            }

            this.stopInterval();
            this.gestureEnded = false;
            const nextx = event.nativeEvent.contentOffset.x;
            if (nextx !== this.lastx) {
              this.scrollingRight = nextx > this.lastx;
            }
            this.lastx = nextx;
          }}
          onScroll={(event) => {
            if (event.nativeEvent.contentOffset.x < 0) {
              return; //This is an issue of Flatlist on Android, sometimes this event return < 0 value
            }

            const nextx = event.nativeEvent.contentOffset.x;
            let needProceedLoop = false;
            if (nextx !== this.lastx) {
              //console.log('bambi coi thu nextt va lastx', nextx, this.lastx, WIDTH);
              this.scrollingRight = nextx > this.lastx;
              needProceedLoop = true;
            }

            this.lastx = nextx;
            if (needProceedLoop) {
              this.proceedLoopAdvertisement();
            }
          }}
          removeClippedSubviews={Platform.OS !== 'ios'}
        />

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLOR.GREY20,
            marginLeft: 18 * WIDTH_SCALE_RATIO,
            width: WIDTH - 36 * WIDTH_SCALE_RATIO,
          }}>
          <Animated.View
            style={{
              width: (WIDTH - 36 * WIDTH_SCALE_RATIO) / indicatorArr.length,
              height: 4 * WIDTH_SCALE_RATIO,
              backgroundColor: 'black',
              transform: [
                {
                  translateX: this.state.indicator.interpolate({
                    inputRange: [0, WIDTH * 5],
                    outputRange: [0, WIDTH - 36 * WIDTH_SCALE_RATIO],
                  }),
                },
              ],
            }}
          />
          {/* <View
            style={{
              width: (WIDTH - 36 * WIDTH_SCALE_RATIO) / indicatorArr.length,
              height: 4 * WIDTH_SCALE_RATIO,
              marginLeft: this.state.indicatorOffsetX,
              backgroundColor: 'black',
            }}
          /> */}
        </View>
      </View>
    );
  }

  renderHeaderNewestItem() {
    return (
      <View style={{ marginTop: 20 * HEIGHT_SCALE_RATIO }}>
        <PText style={[ptText.H4, { color: COLOR.GREY80, paddingLeft: 16 * WIDTH_SCALE_RATIO }]}>
          {RootStore.i18n.t('new-product')}
        </PText>
        <PFlatList
          keyExtractor={(item) => `${item.code}-Newest`}
          data={this.state.spotNewest}
          header
          renderItem={this.renderProduct()}
          contentContainerStyle={{
            marginTop: 14 * HEIGHT_SCALE_RATIO,
            backgroundColor: 'white',
          }}
          horizontal
          extraData={this.state}
        />
      </View>
    );
  }

  renderSpotList() {
    return (
      <PFlatList
        data={this.state.spots}
        numColumns={2}
        ListHeaderComponentStyle={{
          marginHorizontal: 16 * WIDTH_SCALE_RATIO,
          alignItems: 'flex-end',
        }}
        ListHeaderComponent={this.ListHeaderComponent()}
        renderItem={this.renderSpotItem()}
        contentContainerStyle={{
          marginTop: 14 * HEIGHT_SCALE_RATIO,
          backgroundColor: 'white',
        }}
        ListFooterComponent={this.renderFooterSpotItems()}
        refreshing={false}
        onRefresh={this.onRefreshRequest}
        // onEndReached={() => {
        //   console.log('bambi chay on end reach');
        //   this.getSpots();
        // }
        extraData={this.state}
      />
    );
  }

  renderFooterSpotItems() {
    return (
      <View style={{ marginBottom: 64 * HEIGHT_SCALE_RATIO }}>
        {this.state.isLoading && (
          <ActivityIndicator size="large" color={COLOR.PRIMARY} style={{ alignSelf: 'center' }} />
        )}
      </View>
    );
  }

  renderSpotItem() {
    return ({ item }) => {
      return (
        <View
          style={{
            alignSelf: 'center',
            paddingLeft: 14 * WIDTH_SCALE_RATIO,
          }}>
          <SpotCard
            proxyShopping
            normalProduct
            spotData={item}
            click={this.onClickSpotCard.bind(this)}
          />
        </View>
      );
    };
  }

  renderProduct() {
    return ({ item }) => {
      return (
        <View
          style={{
            alignSelf: 'center',
            paddingLeft: 10 * WIDTH_SCALE_RATIO,
            paddingRight: 10 * WIDTH_SCALE_RATIO,
          }}>
          <SpotCard proxyShopping spotData={item} click={this.onClickSpotCard.bind(this)} />
        </View>
      );
    };
  }

  ListHeaderComponent() {
    return () => {
      return (
        <Menu
          rendererProps={{
            placement: 'bottom',
          }}>
          <MenuTrigger
            style={{
              flexDirection: 'row',
            }}>
            <PText style={[ptText.BODY2, { color: COLOR.GREY80 }]}>
              {this.state.orderType === Const.OrderType.Like.name
                ? RootStore.i18n.t('review.setting-best')
                : RootStore.i18n.t('review.setting-latest')}
            </PText>
            <Icon
              type="Entypo"
              name="chevron-down"
              color={COLOR.GREY80}
              style={{
                fontSize: FS(18),
                paddingBottom: 6 * HEIGHT_SCALE_RATIO,
              }}
            />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              borderRadius: 8 * WIDTH_SCALE_RATIO,
              width: 100 * WIDTH_SCALE_RATIO,
              marginTop: 20 * HEIGHT_SCALE_RATIO,
              paddingTop: 4 * HEIGHT_SCALE_RATIO,
            }}>
            <MenuOption disableTouchable style={{}}>
              <View style={{}}>
                <MyTouchableOpacity
                  transparent
                  style={{
                    paddingBottom: 7 * HEIGHT_SCALE_RATIO,
                  }}
                  onPress={() => {
                    this.onClickOrderType(Const.OrderType.Like.name);
                  }}>
                  <PText
                    style={[
                      style.textCaption,
                      {
                        color:
                          this.state.orderType === Const.OrderType.Like.name
                            ? COLOR.PRIMARY
                            : COLOR.appTextPlaceholderColor,
                        textTransform: 'uppercase',
                        textAlign: 'center',

                        paddingHorizontal: 5 * WIDTH_SCALE_RATIO,
                      },
                    ]}>
                    {RootStore.i18n.t('review.setting-best')}
                  </PText>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  transparent
                  style={{
                    paddingBottom: 7 * HEIGHT_SCALE_RATIO,
                  }}
                  onPress={() => {
                    this.onClickOrderType(Const.OrderType.Date.name);
                  }}>
                  <PText
                    style={[
                      style.textCaption,
                      {
                        color:
                          this.state.orderType === Const.OrderType.Date.name
                            ? COLOR.PRIMARY
                            : COLOR.appTextPlaceholderColor,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        paddingHorizontal: 5 * WIDTH_SCALE_RATIO,
                      },
                    ]}>
                    {RootStore.i18n.t('review.setting-latest')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      );
    };
  }
}

export default ProxyShopping;
