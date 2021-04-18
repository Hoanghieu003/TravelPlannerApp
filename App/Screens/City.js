import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import changeLike from '../../Common/gql/mutations/changeLike.gql';
import getAdvertiseQuery from '../../Common/gql/queries/getAdvertisementList.gql';
import getBlogListNew from '../../Common/gql/queries/getBlogListNew.gql';
import getSpotListNew from '../../Common/gql/queries/getSpotListNew.gql';
import getTagRecommendList from '../../Common/gql/queries/getTagRecommendList.gql';
import Util from '../../Common/Util';
import CarouselSpot from '../Components/CarouselSpot';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PFlatList from '../Components/PFlatList';
import PText from '../Components/PText';
import SpotCard from '../Components/SpotCard';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, FS, heightBottomBar, heightCarouselSpot, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import TagStore from '../Stores/TagStore';
import { convertLikeSpotToMobx } from '../Utils/likeAction';
import { getListCity } from '../Utils/tagAction';

@observer
class City extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: this.props.showSearch ? true : false,
      isLikeBlog: false,
      tags: [],
      childrenTags: [],
      spots: [],
      blogs: [],
      offset: 0,
      refreshing: false,
      existOther: true,
      activeSlide: 0,
      postType: this.props.postType ? this.props.postType : Const.PostType.Spot.code,
      orderType: Const.OrderType.Like.name,
      isLoading: false,
      title: '',
      tag: null,
      category: { code: 0, name: 'ALL' },
      selectedChildrenCategory: {},
      isShowChildrenCategory: false,
      showBack: false,
      advertise: [],
    };
    this.chooseAll = true;
    this.getTags = this.getTags.bind(this);
    this.search = this.search.bind(this);

    this.openSearchModal = this.openSearchModal.bind(this);
    this.onRefreshRequest = this.onRefreshRequest.bind(this);
    this.renderMenu = this.renderMenu.bind(this);

    this.onClickHeartBlog = this.onClickHeartBlog.bind(this);
    this.onClickCategoryTag = this.onClickCategoryTag.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);

    this.getAds = this.getAds.bind(this);
    this.getAdvertiseList = this.getAdvertiseList.bind(this);
  }
  render() {
    return (
      <View style={[style.container, { paddingBottom: Util.getIOSPadding('bottom') }]}>
        {this.renderListMenu()}
        {this.state.postType === Const.PostType.Spot.code && this.renderListPost()}
      </View>
    );
  }

  onShowBackInCity = (e) => {
    this.setState({ showBack: e });
  };

  renderListMenu() {
    return (
      <View
        style={{
          height: 32 * HEIGHT_SCALE_RATIO,
          paddingVertical: 8 * HEIGHT_SCALE_RATIO,
          paddingRight: 0 * WIDTH_SCALE_RATIO,
          paddingLeft: 16 * WIDTH_SCALE_RATIO,
          backgroundColor: COLOR.WHITE,
        }}>
        <PFlatList
          horizontal
          data={this.state.tags}
          renderItem={this.renderMenu}
          extraData={this.state.category}
        />
      </View>
    );
  }

  renderListPost() {
    return (
      <PFlatList
        data={this.state.spots}
        ListHeaderComponent={this.renderListHeaderComponentSpots()}
        renderItem={this.renderItemListPost}
        contentContainerStyle={{
          marginTop: 2 * HEIGHT_SCALE_RATIO,
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          backgroundColor: 'white',
          paddingBottom: heightBottomBar + 50 * HEIGHT_SCALE_RATIO,
        }}
        isLoading={this.state.isLoading}
        refreshing={false}
        onRefresh={this.onRefreshRequest}
        onEndReached={this.search}
        extraData={this.state}
        keyExtractor={(item) => `${item.code}`}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  renderListHeaderComponentSpots = () => {
    return (
      this.state.postType === Const.PostType.Spot.code &&
      this.state.advertise &&
      this.state.advertise.length > 0 && (
        <View>
          <CarouselSpot data={this.state.advertise} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40 * HEIGHT_SCALE_RATIO,
            }}>
            {this.renderIsShowChildrenCategory()}
            {this.renderMenuFilter()}
          </View>
          {this.state.spots.length === 0 && !this.state.isLoading ? (
            <MyTouchableOpacity key={`LoadMore`} onPress={this.onRefreshRequest}>
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
          ) : null}
        </View>
      )
    );
  };
  renderIsShowChildrenCategory = () => {
    return this.state.isShowChildrenCategory ? (
      <Menu ref="menuChildrenCategory" rendererProps={{ placement: 'bottom' }}>
        <MenuTrigger
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // paddingBottom: 6 * HEIGHT_SCALE_RATIO,
          }}>
          <PText style={[ptText.BODY2, { color: COLOR.GREY80, textTransform: 'uppercase' }]}>
            {(this.state.selectedChildrenCategory &&
              this.state.selectedChildrenCategory.translations &&
              this.state.selectedChildrenCategory.translations[0].name) ||
              RootStore.i18n.t('travel.category')}
          </PText>
          <Icon
            type="Entypo"
            name="chevron-down"
            color={COLOR.GREY80}
            style={{
              fontSize: FS(18),
            }}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            borderRadius: 8 * WIDTH_SCALE_RATIO,
            marginTop: 20 * HEIGHT_SCALE_RATIO,
            width: 130 * WIDTH_SCALE_RATIO,
            paddingTop: 4 * HEIGHT_SCALE_RATIO,
          }}>
          <MenuOption disableTouchable>
            {this.state.childrenTags.map((v) => {
              const correctData = v?.translations ? v.translations[0] : v;
              const code = correctData && correctData.tag_code ? correctData.tag_code : 0;
              const name =
                correctData && correctData.name
                  ? correctData.name
                  : RootStore.i18n.t('travel.category');
              return (
                <MyTouchableOpacity
                  key={`tagChilrenCategory-${code}`}
                  transparent
                  style={{
                    paddingBottom: 7 * HEIGHT_SCALE_RATIO,
                    flex: 1,
                  }}
                  onPress={() => {
                    this.onClickChildrenCategoryTag(v);
                    this.refs.menuChildrenCategory.close();
                  }}>
                  <PText
                    numberOfLines={1}
                    style={[
                      style.textCaption,
                      {
                        paddingHorizontal: 5 * WIDTH_SCALE_RATIO,
                        paddingRight: 5 * WIDTH_SCALE_RATIO,
                        flex: 1,
                        color: COLOR.GREY80,
                        textAlign: 'left',
                        paddingVertical: 7 * HEIGHT_SCALE_RATIO,
                        textTransform: 'uppercase',
                      },
                    ]}>
                    {name}
                  </PText>
                </MyTouchableOpacity>
              );
            })}
          </MenuOption>
        </MenuOptions>
      </Menu>
    ) : (
        <View style={{ width: 120 * WIDTH_SCALE_RATIO }} />
      );
  };
  renderItemListPost = ({ item }) => {
    return (
      <SpotCard
        layout2
        heightLayout2={heightCarouselSpot}
        spotData={item}
        click={this.onClickSpotCard.bind(this)}
      />
    );
  };

  renderMenuFilter() {
    return (
      <Menu ref="menuRef" rendererProps={{ placement: 'bottom' }}>
        <MenuTrigger
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 6 * HEIGHT_SCALE_RATIO,
          }}>
          <PText style={[ptText.BODY2, { color: COLOR.GREY80 }]}>
            {this.state.orderType === Const.OrderType.Like.name
              ? RootStore.i18n.t('review.setting-best')
              : RootStore.i18n.t('blog.latest')}
          </PText>
          <Icon
            type="Entypo"
            name="chevron-down"
            color={COLOR.GREY80}
            style={{
              fontSize: FS(15),
              // paddingBottom: 0 * HEIGHT_SCALE_RATIO,
            }}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            borderRadius: 8 * WIDTH_SCALE_RATIO,
            width: 70 * WIDTH_SCALE_RATIO,
            marginTop: 20 * HEIGHT_SCALE_RATIO,
            paddingTop: 4 * HEIGHT_SCALE_RATIO,
          }}>
          <MenuOption disableTouchable style={{}}>
            <View>
              <MyTouchableOpacity
                key={`BestTouch`}
                transparent
                style={{ paddingVertical: 13 * HEIGHT_SCALE_RATIO }}
                onPress={() => {
                  this.onClickOrderType(Const.OrderType.Like.name);
                  this.refs.menuRef.close();
                }}>
                <PText
                  style={[
                    style.textCaption,
                    {
                      color: COLOR.GREY80,
                      textTransform: 'uppercase',
                      textAlign: 'left',
                      paddingHorizontal: 5 * WIDTH_SCALE_RATIO,
                    },
                  ]}>
                  {RootStore.i18n.t('review.setting-best')}
                </PText>
              </MyTouchableOpacity>
              <MyTouchableOpacity
                key={`LastestTouch`}
                transparent
                style={{ paddingVertical: 13 * HEIGHT_SCALE_RATIO }}
                onPress={() => {
                  this.onClickOrderType(Const.OrderType.Date.name);
                  this.refs.menuRef.close();
                }}>
                <PText
                  style={[
                    style.textCaption,
                    {
                      color: COLOR.GREY80,
                      textTransform: 'uppercase',
                      textAlign: 'left',
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
  }

  async componentDidMount() {
    if (this.props.reservations) {
      analytics().setCurrentScreen('Reservations');
    }
    if (this.props.isCouponScreen) {
      analytics().setCurrentScreen('Coupon-Screen');
    }
    DeviceEventEmitter.addListener('showBackInCity', this.onShowBackInCity);
    await this.getTags();
    if (!TagStore.getListCitiesArray) {
      const res = await getListCity();
      res.unshift({
        code: null,
        cityCode: null,
        cityName: RootStore.i18n.t('home.search-city'),
        translations: [{ name: RootStore.i18n.t('home.search-city') }],
      });
      TagStore.setListCitiesArray(res);
    }
    this.loadAds();
    if (this.props.parentCategory) {
      let tempCategory = this.state.tags.filter((v) => v.code === this.props.parentCategory.code);
      this.handleClickParentCategory(tempCategory[0]);
    } else {
      await this.search();
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('showBackInCity', this.onShowBackInCity);
  }

  getBlogList = async () => {
    const variables = {
      isRecommend: true,
      languages: [RootStore.language],
      limit: 5,
      page: 1,
      order: Const.OrderType.Rand.name,
      tags: [],
      isMain: true,
      isPublish: true,
    };

    //get categoryCode:
    if (this.state.category && this.state.category.code) {
      variables.tags.push(this.state.category.code);
    }
    if (variables.tags && variables.tags.length === 0) {
      delete variables.tags;
    }

    const result = await RootStore.client.query({
      query: getBlogListNew,
      variables,
    });

    const advertise = result.data.getBlogListNew.blogs.map((e) => {
      e.callingFromAPIGetAds = false;
      return e;
    });
    this.setState({ advertise });
  };

  getSpotList = async () => {
    const variables = {
      isRecommend: true,
      languages: [RootStore.language],
      limit: 5,
      order: Const.OrderType.Rand.name,
      isMain: true,
      isConfirm: true,
      isReserved: this.props.showReservationSpotsOnly,
      tags: [],
    };
    //get categoryCode:
    if (this.state.category && this.state.category.code) {
      variables.tags.push(this.state.category.code);
    }
    if (variables.tags && variables.tags.length === 0) {
      delete variables.tags;
    }

    const result = await RootStore.client.query({
      query: getSpotListNew,
      variables,
    });

    const advertise = result.data.getSpotListNew.spots.map((e) => {
      e.callingFromAPIGetAds = false;
      return e;
    });
    this.setState({ advertise });
  };

  getAds = async (type) => {
    await this.getAdvertiseList(type);
  };

  loadAds = async () => {
    try {
      const postType = this.props.postType ? this.props.postType : Const.PostType.Spot.code;
      //chose all type 4 choose another get spotlist have isrecommend
      if (postType === Const.PostType.Spot.code) {
        await this.getAds(Const.AdvertiseType.SpotMain.code);
      } else {
        await this.getAds(Const.AdvertiseType.BlogMain.code);
      }
    } catch (error) { }
  };

  getAdvertiseList = async (type) => {
    const variables = {
      order: Const.OrderType.Rand.name,
      type: this.props.advertiseType ? this.props.advertiseType : type,
      page: 1,
      languages: RootStore.language,
      limit: 5,
    };

    const result = await RootStore.client.query({
      query: getAdvertiseQuery,
      variables,
    });
    const advertise = result.data.getAdvertisementList.advertisements.map((e) => {
      e.callingFromAPIGetAds = true;
      return e;
    });
    this.setState({ advertise });
  };

  getTags = async () => {
    const variables = {
      type: Const.NewTagType.MAIN_RESERVATION_CATEGORY,
      isRecommend: this.props.tagsIsRecommend,
      languages: [RootStore.language],
    };
    if (this.props.reservations) {
      delete variables.isRecommend;
    }
    const result = await RootStore.client.query({
      query: getTagRecommendList,
      variables,
    });
    let tempTags = [{ code: 0, name: 'ALL' }];
    let tags = result.data.getTagRecommendList.tags.map((v) => ({
      code: v.code,
      name: v.translations[0].name,
      children: v.children,
    }));
    tags = tempTags.concat(tags);
    this.setState({ tags });
  };

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
        this.loadAds();
        this.search();
      },
    );
  }

  onClickChildrenCategoryTag(tag) {
    if (this.state.childrenTags === tag) {
      return;
    }
    this.setState(
      {
        // advertise: [],
        selectedChildrenCategory: tag,
        spots: [],
        blogs: [],
        existOther: true,
        offset: 0,
      },
      () => {
        // this.loadAds();
        this.search();
      },
    );
  }

  onClickPostType = (type) => {
    if (this.state.postType === type) {
      return;
    }

    this.setState(
      { postType: type, spots: [], blogs: [], existOther: true, offset: 0 },
      async () => {
        await this.search();
        await this.getAds(
          type === Const.PostType.Spot.code
            ? Const.AdvertiseType.SpotMain.code
            : Const.AdvertiseType.BlogMain.code,
        );
      },
    );
  };

  onClickOrderType = (type) => {
    if (this.state.orderType === type) {
      return;
    }

    this.setState(
      { orderType: type, spots: [], blogs: [], existOther: true, offset: 0 },
      async () => {
        await this.search();
      },
    );
  };

  async search() {
    if (!this.state.existOther) {
      return;
    }
    const willGetSpot = this.state.postType === Const.PostType.Spot.code;
    let spots = [];
    let blogs = [];
    let existOther = true;
    let title = '';
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      try {
        const variables = {
          languages: [RootStore.language],
          order: this.state.orderType,
          limit: 24,
          isConfirm: true,
          isMain: true,
          offset: 24 * this.state.offset,
          isReserved: this.props.showReservationSpotsOnly,
          tags: [],
        };
        if (this.props.typesOfSpot) {
          variables.types = this.props.typesOfSpot;
        }

        if (
          this.state.category &&
          this.state.category.code &&
          this.state.category.children.length === 0
        ) {
          variables.tags.push(this.state.category.code);
        }

        if (
          this.state.search !== null &&
          this.state.search !== undefined &&
          this.state.search !== ''
        ) {
          if (variables.search) {
            variables.search = variables.search + ' ' + this.state.search;
          } else {
            variables.search = this.state.search;
          }
        }

        //get tag code:
        if (this.state.tag && this.state.tag.code) {
          variables.tags.push(this.state.tag.code);
        }

        if (this.state.selectedChildrenCategory && this.state.selectedChildrenCategory.code) {
          variables.tags.push(this.state.selectedChildrenCategory.code);
        }
        if (this.state.selectedChildrenCategory && this.state.selectedChildrenCategory.code === 0) {
          variables.tags.push(this.state.category.code);
        }

        if ((variables.tags && variables.tags.length === 0) || this.state.category.code === 0) {
          delete variables.tags;
        }

        if (TagStore.getSelectedCityObj && TagStore.getSelectedCityObj.code) {
          if (!variables.tags) {
            variables.tags = [];
          }
          variables.tags.push(TagStore.getSelectedCityObj.code);
        }

        const result = await RootStore.client.query({
          query: getSpotListNew,
          variables,
        });

        if (willGetSpot) {
          convertLikeSpotToMobx(result.data.getSpotListNew.spots);
          spots = this.state.spots.concat(result.data.getSpotListNew.spots);
        }

        existOther = true;
        if (willGetSpot) {
          if (result.data.getSpotListNew.spots.length === 0) {
            existOther = false;
          }
        }
        title = '';
        this.setState({
          existOther,
          spots,
          blogs,
          offset: this.state.offset + 1,
          title,
          refreshing: false,
          isLoading: false,
        });
      } catch (err) {
        this.setState({ refreshing: false, isLoading: false });
      }
    }
  }

  onRefreshRequest() {
    this.setState({ spots: [], blogs: [], existOther: true, offset: 0, refreshing: true }, () => {
      this.search();
      this.loadAds();
    });
  }

  onClickSpotCard = (code, city, region) => {
    let _city = city ? city : '';
    let _region = region ? region : '';
    if (code) {
      Actions.spotDetail({ spotCode: code, city: _city, region: _region });
    }
  };

  onClickBlogCard = (code) => {
    Actions.blogDetail({ blogCode: code });
  };

  openSearchModal() {
    this.refs.searchBox.openSearchModal();
  }

  showSearch = () => {
    this.setState({ showSearch: true });
  };

  closeSearch = () => {
    this.setState({ showSearch: false });
  };
  handleClickParentCategory(item) {
    if (item?.children?.length > 0) {
      let allItem = [{ code: 0, name: RootStore.i18n.t('travel.category') }];
      let childrenRecommend = item.children.filter((v) =>
        this.props.typesOfSpot === Const.SpotListType.reservation.code
          ? v.is_recommend === 0 || 1
          : v.is_recommend === 1,
      );
      let childrenTags = allItem.concat(childrenRecommend);
      let defaultIndexChildren = 0;
      if (this.props.childrenCategory) {
        defaultIndexChildren = childrenTags.findIndex(
          (v) => v.code === this.props.childrenCategory.code,
        );
      }
      this.setState(
        {
          selectedChildrenCategory: childrenTags[defaultIndexChildren],
          category: item,
          isShowChildrenCategory: true,
          childrenTags: childrenTags,
        },
        () => this.onClickChildrenCategoryTag(childrenTags[defaultIndexChildren]),
      );
    } else {
      this.setState({
        isShowChildrenCategory: false,
        selectedChildrenCategory: {},
      });

      this.onClickCategoryTag(item);
    }
  }

  renderMenu({ item, index }) {
    const code = item && item.code ? item.code : 0;
    const name = item && item.name ? item.name : 'ALL';
    return (
      <MyTouchableOpacity
        onPress={() => {
          this.handleClickParentCategory(item);
        }}
        key={`tagMenu-${code}`}
        style={{
          paddingBottom: 0 * WIDTH_SCALE_RATIO,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <PText
          style={[
            ptText.BODY1,
            {
              color: this.state.category.code === code ? COLOR.GREY80 : COLOR.GREY20,
              textTransform: 'uppercase',
            },
          ]}>
          {name}
        </PText>
        <View
          style={{
            width: 1 * WIDTH_SCALE_RATIO,
            height: 12 * HEIGHT_SCALE_RATIO,
            backgroundColor: index !== this.state.tags.length - 1 ? COLOR.GREY20 : COLOR.WHITE,
            marginHorizontal: 16 * WIDTH_SCALE_RATIO,
          }}
        />
      </MyTouchableOpacity>
    );
  }

  async onClickHeartBlog(code) {
    if (RootStore.auth.id === '') {
      return;
    }

    const variables = {
      nowState: this.state.isLikeBlog,
      where: 'blog',
      code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });

    if (result.data.changeLike) {
      this.setState({ isLikeBlog: !this.state.isLikeBlog });
    }
  }

  onChangeCity() {
    const postType = this.props.postType ? this.props.postType : Const.PostType.Spot.code;
    this.setState(
      {
        postType,
        spots: [],
        blogs: [],
        existOther: true,
        offset: 0,
      },
      () => {
        this.search();
      },
    );
  }
}

City.propTypes = {
  city: PropTypes.string,
  postType: PropTypes.number,
};

export default City;
