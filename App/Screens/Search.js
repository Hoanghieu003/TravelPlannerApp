import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import getBlogListNew from '../../Common/gql/queries/getBlogListNew.gql';
import getSpotListNew from '../../Common/gql/queries/getSpotListNew.gql';
import Util from '../../Common/Util';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import BlogCard from '../Components/BlogCard';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PFlatList from '../Components/PFlatList';
import PText from '../Components/PText';
import SpotCard from '../Components/SpotCard';
import {
  HEIGHT,
  HEIGHT_SCALE_RATIO,
  KOREA_NEWS_TAG_CODE,
  WIDTH,
  WIDTH_SCALE_RATIO,
} from '../Constant/constant';
import style, {
  COLOR,
  FS,
  headerHeight,
  heightBottomBar,
  heightCarouselSpot,
  ptColor,
  ptText,
} from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import TagStore from '../Stores/TagStore';
import { convertLikeBlogToMobx, convertLikeSpotToMobx } from '../Utils/likeAction';
import CustomSearchBar from '../Components/CustomSearchBar';
import SearchModal from '../Components/SearchModal';
import globalUtils from '../Constants/globalUtils';

export const TAB = {
  TRAVEL: {
    CODE: 5,
    NAME: RootStore.i18n.t('home.travel').toUpperCase(),
  },
  KOREAN_NEWS: {
    CODE: 1,
    NAME: RootStore.i18n.t('home.korea-news').toUpperCase(),
  },
  PROXY_SHOPPING: {
    CODE: 4,
    NAME: RootStore.i18n.t('proxy-shopping').toUpperCase(),
  },
  RESERVATION: {
    CODE: 2,
    NAME: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
  },
  COUPON: {
    CODE: 3,
    NAME: RootStore.i18n.t('home.main-coupon').toUpperCase(),
  },
  REVIEWS: {
    CODE: 0,
    NAME: RootStore.i18n.t('home.travel-info').toUpperCase(),
  },
};
@observer
class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickGoSearch = this.onClickGoSearch.bind(this);

    let selectedParentCategory = null;
    let selectedChildCategory = null;
    if (this.props.isFromHomeScreen) {
      selectedParentCategory = {
        code: TAB.TRAVEL.CODE,
        name: RootStore.i18n.t('home.travel').toUpperCase(),
      };
      selectedChildCategory = {
        code: TAB.RESERVATION.CODE,
        name: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
      };
    } else {
      selectedParentCategory = this.props.selectedCategory || {
        code: TAB.TRAVEL.CODE,
        name: RootStore.i18n.t('home.travel').toUpperCase(),
      };
      selectedChildCategory = this.props.selectedChildCategory
        ? this.props.selectedChildCategory
        : selectedParentCategory.code === TAB.TRAVEL.CODE
        ? {
            code: TAB.RESERVATION.CODE,
            name: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
          }
        : null;
    }
    const search = this.props.search ? this.props.search : '';
    const parentTags = [
      {
        code: TAB.TRAVEL.CODE,
        name: RootStore.i18n.t('home.travel').toUpperCase(),
        onPress: () => {
          const newPostType = Const.PostType.Spot.code;
          const newSearchText = this.state.search;
          this.setState(
            {
              postType: newPostType,
              search: newSearchText,
              isReservedSpot: true,
              parentCategory: {
                code: TAB.TRAVEL.CODE,
                name: RootStore.i18n.t('home.travel').toUpperCase(),
              },
              childCategory: {
                code: TAB.RESERVATION.CODE,
                name: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
              },
            },
            () => {
              this.initData(newSearchText, newPostType);
            },
          );
        },
        childs: [
          {
            code: TAB.RESERVATION.CODE,
            name: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
            onPress: () => {
              const newPostType = Const.PostType.Spot.code;
              const newSearchText = this.state.search;
              this.setState(
                {
                  postType: newPostType,
                  search: newSearchText,
                  isReservedSpot: true,
                  childCategory: {
                    code: TAB.RESERVATION.CODE,
                    name: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
                  },
                },
                () => {
                  this.initData(newSearchText, newPostType);
                },
              );
            },
          },
          {
            code: TAB.COUPON.CODE,
            name: RootStore.i18n.t('home.main-coupon').toUpperCase(),
            onPress: () => {
              const newPostType = Const.PostType.Spot.code;
              const newSearchText = this.state.search;

              this.setState(
                {
                  postType: newPostType,
                  search: newSearchText,
                  isReservedSpot: true,
                  childCategory: {
                    code: TAB.COUPON.CODE,
                    name: RootStore.i18n.t('home.main-coupon').toUpperCase(),
                  },
                },
                () => {
                  this.initData(newSearchText, newPostType);
                },
              );
            },
          },
          {
            code: TAB.REVIEWS.CODE,
            name: RootStore.i18n.t('home.travel-info').toUpperCase(),
            onPress: () => {
              const newPostType = Const.PostType.Blog.code;
              const newSearchText = this.state.search;
              this.setState(
                {
                  postType: newPostType,
                  search: newSearchText,
                  childCategory: {
                    code: TAB.REVIEWS.CODE,
                    name: RootStore.i18n.t('home.travel-info').toUpperCase(),
                  },
                },
                () => {
                  this.initData(newSearchText, newPostType);
                },
              );
            },
          },
        ],
      },
      {
        code: TAB.PROXY_SHOPPING.CODE,
        name: RootStore.i18n.t('proxy-shopping').toUpperCase(),
        onPress: () => {
          const newPostType = Const.PostType.Spot.code;
          const newSearchText = this.state.search;

          this.setState(
            {
              postType: newPostType,
              search: newSearchText,
              isReservedSpot: true,
              parentCategory: {
                code: TAB.PROXY_SHOPPING.CODE,
                name: RootStore.i18n.t('proxy-shopping').toUpperCase(),
              },
              childCategory: null,
            },
            () => {
              this.initData(newSearchText, newPostType);
            },
          );
        },
      },
      {
        code: TAB.KOREAN_NEWS.CODE,
        name: RootStore.i18n.t('home.korea-news').toUpperCase(),
        onPress: () => {
          const newPostType = Const.PostType.Blog.code;
          const newSearchText = this.state.search;

          this.setState(
            {
              postType: newPostType,
              search: newSearchText,
              parentCategory: {
                code: TAB.KOREAN_NEWS.CODE,
                name: RootStore.i18n.t('home.korea-news').toUpperCase(),
              },
              childCategory: null,
            },
            () => {
              this.initData(newSearchText, newPostType);
            },
          );
        },
      },
    ];
    this.state = {
      spots: [],
      blogs: [],
      offset: 0,
      existOther: true,
      isLoading: false,
      refreshing: false,
      showSuggest: false,
      //
      paddingBottom: Util.getIOSPadding('bottom'),
      showSearch: this.props.showSearch,
      search: search,
      postType: this.props.postType ? this.props.postType : Const.PostType.Blog.code,
      orderType: Const.OrderType.Date.name,
      //
      parentTags: parentTags ?? [],
      title: '',
      parentCategory: this.props.parentCategory
        ? this.props.parentCategory
        : selectedParentCategory,
      childCategory: this.props.childCategory ? this.props.childCategory : selectedChildCategory,
    };
    this.search = this.search.bind(this);

    this.onRefreshRequest = this.onRefreshRequest.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderChildCategory = this.renderChildCategory.bind(this);

    this.onClickOrderType = this.onClickOrderType.bind(this);

    this.renderPostTypeMenu = this.renderPostTypeMenu.bind(this);
    this.initData = this.initData.bind(this);
  }
  onClickGoSearch = () => {
    let tempSearchedText = '';
    if (this.searchBarRef) {
      tempSearchedText = this.searchBarRef.state.search;
      this.searchBarRef.onChangeText('');
      this.searchBarRef.onHideMenu();
      this.setState({ showSuggest: false });
    }
    if (this.suggestWrapperRef) {
      this.suggestWrapperRef.closeSearch();
    }
    this.setState({ showSearch: true }, () => {
      globalUtils.isFromHomeScreen = true;
      Actions.reset('search', {
        isFromHomeScreen: true,
        hideTabBar: true,
        search: tempSearchedText,
        postType: Const.PostType.Spot.code,
        showSearch: true,
        selectedCategory: null,
        isFromTravelInfo: false,
        isKoreaNews: false,
      });
    });
  };
  render() {
    return (
      <View style={{ paddingBottom: this.state.paddingBottom, flex: 1 }}>
        {this.props.hideHeader ? null : (
          <View
            style={{ height: this.state.showSearch ? headerHeight * 0.7 : 10 * HEIGHT_SCALE_RATIO }}
          />
        )}
        {this.renderHeaderContent()}
        {this.renderListPost(this.state.postType)}
        <View style={{ position: 'absolute' }}>
          {this.props.hideHeader ? null : (
            // <TouchableOpacity onPress={this.onOpenSearchFunc}>
            //   <BaseHeaderWithSearch
            //     ref={(instance) => (this.baseHeaderWithSearchRef = instance)}
            //     showSearch
            //     isFromSearch
            //     backgroundColorWhite
            //     showBack
            //     // showSuggest={this.state.showSearch}
            //     selectedParentCategory={this.state.parentCategory}
            //     selectedChildCategory={this.state.childCategory}
            //     color={COLOR.appColor}
            //     postType={this.state.postType}
            //     onFocusFunc
            //     initialSearchText={this.state.search}
            //     // onChangeKeyword={this.onChangeKeyWordFunc}
            //     // onChangeCity={this.onChangeCityFunc}
            //     // onCloseSearch={this.onCloseSearchFunc}
            //     onShowSearch={this.onOpenSearchFunc}
            //   />
            // </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 20 * HEIGHT_SCALE_RATIO,
                width: WIDTH,
                justifyContent: 'center',
                marginVertical: 28 * HEIGHT_SCALE_RATIO,
                paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
              }}
              onPress={() => this.setState({ showSuggest: true })}>
              <CustomSearchBar
                ref={(instance) => (this.searchBarRef = instance)}
                initialSearchText={null}
                onClickGoSearch={this.onClickGoSearch}
                isFromSearch
                onTextChanged={(text) => {
                  if (this.suggestWrapperRef) {
                    this.suggestWrapperRef.onUpdateSearchList(text);
                  }
                }}
                onFocusFunc={() => this.setState({ showSuggest: true })}
                hideClearSearch
                searchPlaceHolderText={this.state.search}
                backgroundColorWhite={null}
                // isHomePage
              />
            </TouchableOpacity>
          )}
        </View>
        <SearchModal
          visible={this.state.showSuggest}
          isHomePage={false}
          isFromSearch
          onClose={() =>
            this.setState({
              // search: '',
              // text: '',
              // visible: false,
              // showSearch: false,
              showSuggest: false,
            })
          }
        />
      </View>
    );
  }

  async initData(newSearchText, newPostType) {
    if (this.baseHeaderWithSearchRef) {
      this.baseHeaderWithSearchRef.setState({
        showSearch: this.state.showSearch,
      });
    }

    this.setState(
      {
        search: newSearchText,
        postType: newPostType,
        spots: [],
        blogs: [],
        existOther: true,
        isLoading: false,
        offset: 0,
      },
      this.search,
    );
  }

  async componentDidMount() {
    analytics().setCurrentScreen('Search-Screen');
    const search = this.props.search ? this.props.search : '';
    const postType = this.props.postType ? this.props.postType : Const.PostType.Blog.code;
    await this.initData(search, postType);
  }

  renderCategory({ item, index }) {
    let code = item && item.code ? item.code : '';
    if (
      item &&
      item.code === 0 &&
      this.state.parentCategory &&
      this.state.parentCategory.code === 0
    ) {
      code = 0;
    }
    const name = item && item.name ? item.name : '';
    return (
      <MyTouchableOpacity onPress={() => item.onPress()} key={`tag-${code}`}>
        <View
          style={{
            paddingHorizontal: 12 * WIDTH_SCALE_RATIO,
            paddingBottom: 6 * WIDTH_SCALE_RATIO,
            borderBottomWidth: 2 * HEIGHT_SCALE_RATIO,
            borderBottomColor: this.state.parentCategory.code === code ? COLOR.PRIMARY : '#fafafa',
          }}>
          <PText
            numberOfLines={1}
            style={[
              ptText.BODY1,
              this.state.parentCategory.code === code ? ptColor.GREY80 : ptColor.GREY20,
              {
                width: '100%',
                textTransform: 'uppercase',
              },
            ]}>
            {name}
          </PText>
        </View>
      </MyTouchableOpacity>
    );
  }

  renderChildCategory({ item, index }) {
    let code = item && item.code ? item.code : '';
    if (
      item &&
      item.code === 0 &&
      this.state.childCategory &&
      this.state.childCategory.code === 0
    ) {
      code = 0;
    }
    const name = item && item.name ? item.name : '';
    return (
      <MyTouchableOpacity
        onPress={() => item.onPress()}
        key={`tag-${code}`}
        style={{
          paddingHorizontal: 12 * WIDTH_SCALE_RATIO,
          paddingBottom: 6 * WIDTH_SCALE_RATIO,
        }}>
        <PText
          style={[
            ptText.BODY1,
            this.state.childCategory.code === code ? ptColor.GREY80 : ptColor.GREY20,
            { textTransform: 'uppercase' },
          ]}>
          {name}
        </PText>
      </MyTouchableOpacity>
    );
  }

  onClickOrderType(type) {
    if (this.state.orderType === type) {
      return;
    }

    this.setState({ orderType: type, spots: [], blogs: [], existOther: true, offset: 0 }, () => {
      this.search();
    });
  }

  async search() {
    const willGetSpot = this.state.postType === Const.PostType.Spot.code;
    const willGetBlog = this.state.postType === Const.PostType.Blog.code;

    if (!this.state.existOther) {
      return;
    }

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
          tags: [],
          limit: 24,
          offset: 24 * this.state.offset,
        };
        if (willGetBlog) {
          variables.isPublish = true;
        }
        if (this.haveIsMain) {
          variables.isMain = this.haveIsMain;
          this.haveIsMain = false;
        }
        //get categoryCode:
        if (this.state.parentCategory) {
          if (this.state.parentCategory.code === TAB.TRAVEL.CODE && this.state.childCategory) {
            //child
            if (this.state.childCategory.code === TAB.RESERVATION.CODE) {
              variables.types = Const.SpotListType.reservation.code;
            } else if (this.state.childCategory.code === TAB.COUPON.CODE) {
              variables.types = Const.SpotListType.coupon.code;
            } else if (this.state.childCategory.code === TAB.REVIEWS.CODE) {
              variables.excludeTags = [KOREA_NEWS_TAG_CODE];
            }
          } else if (this.state.parentCategory.code === TAB.KOREAN_NEWS.CODE) {
            variables.tags.push(KOREA_NEWS_TAG_CODE);
          } else if (this.state.parentCategory.code === TAB.PROXY_SHOPPING.CODE) {
            variables.isConfirm = true;
            variables.types = Const.SpotListType.proxyshopping.code;
          }
        }
        //get SEARCH (text):
        if (
          this.state.search !== null &&
          this.state.search !== undefined &&
          this.state.search !== ''
        ) {
          variables.title = this.state.search;
        }
        //get tag code:
        if (TagStore.getSelectedCityObj && TagStore.getSelectedCityObj.code) {
          variables.tags.push(TagStore.getSelectedCityObj.code);
        }

        if (
          //code tam sau nay se xoa va optimize sau
          variables.tags &&
          variables.tags.filter((e) => e === 0 || e === 1 || e === 2 || e === 3 || e === 4).length >
            0
        ) {
          variables.tags = variables.tags.filter(
            (e) => e !== 0 && e !== 1 && e !== 2 && e !== 3 && e !== 4,
          );
        }
        if (variables.tags && variables.tags.length === 0) {
          delete variables.tags;
        }
        if (willGetSpot) {
          variables.isConfirm = true;
          variables.isReserved = this.props.isReservedSpot;
        }
        const result = await RootStore.client.query({
          query: willGetSpot ? getSpotListNew : getBlogListNew,
          variables,
        });
        if (willGetSpot) {
          convertLikeSpotToMobx(result.data.getSpotListNew.spots);
          spots = this.state.spots.concat(result.data.getSpotListNew.spots);
        }
        if (willGetBlog) {
          convertLikeBlogToMobx(result.data.getBlogListNew.blogs);
          blogs = this.state.blogs.concat(result.data.getBlogListNew.blogs);
        }

        existOther = true;
        if (willGetSpot) {
          if (result.data.getSpotListNew.spots.length === 0) {
            existOther = false;
          }
        } else {
          if (result.data.getBlogListNew.blogs.length === 0) {
            existOther = false;
          }
        }
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
        console.log('29148 chay cai ne nay', err);
        this.setState({ refreshing: false, isLoading: false });
      }
    }
  }

  onRefreshRequest() {
    this.setState(
      { spots: [], blogs: [], existOther: true, offset: 0, refreshing: true },
      this.search,
    );
  }

  onChangeCity = (selectedCity) => {
    const postType = this.state.postType ? this.state.postType : Const.PostType.Blog.code;

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
  };

  renderPostTypeMenu() {
    return (
      <View
        style={{
          alignItems: 'flex-end',
          marginHorizontal: 16 * WIDTH_SCALE_RATIO,
          marginTop: 40 * HEIGHT_SCALE_RATIO,
        }}>
        <Menu ref={(instance) => (this.menuRef = instance)} rendererProps={{ placement: 'bottom' }}>
          <MenuTrigger style={{ flexDirection: 'row' }}>
            <PText style={[ptText.BODY2, { color: COLOR.GREY80 }]}>
              {RootStore.i18n.t(
                this.state.orderType === Const.OrderType.Like.name ? 'blog.best' : 'blog.latest',
              )}
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
            {/* Blog Place */}
            <MenuOption disableTouchable style={{}}>
              <View style={{}}>
                <MyTouchableOpacity
                  transparent
                  style={{ paddingBottom: 7 * HEIGHT_SCALE_RATIO }}
                  onPress={() => {
                    this.onClickOrderType(Const.OrderType.Like.name);
                    this.menuRef.close();
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
                    {RootStore.i18n.t('blog.best')}
                  </PText>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  transparent
                  style={{ paddingBottom: 7 * HEIGHT_SCALE_RATIO }}
                  onPress={() => {
                    this.onClickOrderType(Const.OrderType.Date.name);
                    this.menuRef.close();
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
      </View>
    );
  }

  onClickSpotCard(code, city, region) {
    if (code) {
      Actions.spotDetail({ spotCode: code, city: city, region: region });
    }
  }

  onClickBlogCard(code) {
    Actions.blogDetail({ blogCode: code });
  }

  renderHeaderContent = () => {
    const childCateList =
      (this.state.parentCategory &&
        this.state.parentTags.find((e) => e.code === this.state.parentCategory.code) &&
        this.state.parentTags.find((e) => e.code === this.state.parentCategory.code).childs) ||
      [];
    return (
      <View>
        {this.props.hideCategory ? null : (
          <View
            style={{
              width: WIDTH,
              height: 40 * HEIGHT_SCALE_RATIO,
              left: 0 * WIDTH_SCALE_RATIO,
              alignItems: 'flex-end',
              marginTop: 25 * HEIGHT_SCALE_RATIO,
              flexDirection: 'row',
            }}>
            <PFlatList
              //reservations,coupons, proxyshops,...
              ref={(ref) => (this.flatListCategory = ref)}
              style={{ width: WIDTH }}
              horizontal
              data={this.state.parentTags}
              renderItem={this.renderCategory}
            />
          </View>
        )}
        {/* Blog */}
        {childCateList && childCateList.length > 0 && (
          <View
            style={{
              width: WIDTH,
              height: 40 * HEIGHT_SCALE_RATIO,
              left: 0 * WIDTH_SCALE_RATIO,
              alignItems: 'flex-end',
              flexDirection: 'row',
            }}>
            <PFlatList //reservations,coupons, proxyshops,...
              ref={(ref) => (this.flatListChildCategory = ref)}
              horizontal
              data={childCateList}
              renderItem={this.renderChildCategory}
              ItemSeparatorComponent={this.ItemSeparatorComponent()}
            />
          </View>
        )}
        {/* {this.renderPostTypeMenu()} */}
      </View>
    );
  };

  ItemSeparatorComponent() {
    return () => (
      <View
        style={{
          width: 1 * WIDTH_SCALE_RATIO,
          height: 12 * HEIGHT_SCALE_RATIO,
          backgroundColor: COLOR.GREY20,
          alignSelf: 'center',
          marginBottom: 6 * WIDTH_SCALE_RATIO,
        }}
      />
    );
  }

  renderListPost(postType) {
    const isBlog = postType === Const.PostType.Blog.code;
    const listStyle = isBlog
      ? {}
      : {
          flex: 1,
          minHeight: HEIGHT,
        };
    const contentContainerStyle = isBlog
      ? {
          marginTop: 2 * HEIGHT_SCALE_RATIO,
          backgroundColor: 'white',
          paddingBottom: heightBottomBar + 30 * HEIGHT_SCALE_RATIO,
        }
      : {
          marginTop: 24 * HEIGHT_SCALE_RATIO,
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          backgroundColor: 'white',
          paddingBottom: heightBottomBar + 120 * HEIGHT_SCALE_RATIO,
        };
    return (
      <PFlatList
        data={isBlog ? this.state.blogs : this.state.spots}
        style={listStyle}
        renderItem={this.renderItemBlogCard(isBlog)}
        contentContainerStyle={contentContainerStyle}
        ListFooterComponent={this.ListFooterComponentBlog(isBlog)}
        refreshing={false}
        onRefresh={this.onRefreshRequest}
        onEndReached={this.search}
        extraData={this.state}
        // ListHeaderComponent={this.renderHeaderContent}
      />
    );
  }

  onChangeCityFunc = (selectedCity) => {
    const postType = this.state.postType ? this.state.postType : Const.PostType.Blog.code;
    this.haveIsMain = true;
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
  };

  onCloseSearchFunc = () => {
    console.log('29148 : onCloseSearchFunc -> onCloseSearchFunc');
    this.setState({
      showSearch: false,
    });
    this.search();
  };

  onOpenSearchFunc = () => {
    this.setState(
      {
        showSearch: true,
      },
      () => {
        setTimeout(() => {
          if (this.baseHeaderWithSearchRef.searchBarRef) {
            this.baseHeaderWithSearchRef.searchBarRef.setState({
              search: this.state.search,
            });
          }
        });
      },
    );
  };

  onChangeKeyWordFunc = (keyword, keywordsList) => {
    this.setState(
      {
        spots: [],
        blogs: [],
        existOther: true,
        offset: 0,
        search: keyword,
      },
      () => {
        this.haveIsMain = true;
        this.search();
      },
    );
  };

  ListFooterComponentBlog(isBlog) {
    return () => {
      if (this.state.isLoading) {
        return (
          <ActivityIndicator
            size="small"
            color={COLOR.appColor}
            style={{ paddingVertical: 10 * HEIGHT_SCALE_RATIO }}
          />
        );
      } else if (isBlog && this.state.blogs && this.state.blogs.length === 0) {
        return (
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
            No results
          </PText>
        );
      } else if (!isBlog && this.state.spots && this.state.spots.length === 0) {
        return (
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
            No results{' '}
          </PText>
        );
      }
      return <View />;
    };
  }

  renderItemBlogCard(isBlog) {
    return ({ item }) => {
      if (isBlog) {
        return (
          <View
            style={{
              paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
            }}>
            <BlogCard layout2 blogData={item} click={this.onClickBlogCard.bind(this)} />
          </View>
        );
      }
      return (
        <SpotCard
          layout2
          heightLayout2={heightCarouselSpot}
          spotData={item}
          click={this.onClickSpotCard.bind(this)}
        />
      );
    };
  }
}

Search.propTypes = {
  search: PropTypes.string,
  city: PropTypes.string,
  postType: PropTypes.number,
};

export default Search;
