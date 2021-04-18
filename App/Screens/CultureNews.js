import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import getAdvertisementList from '../../Common/gql/queries/getAdvertisementList.gql';
import getBlogListNew from '../../Common/gql/queries/getBlogListNew.gql';
import Util from '../../Common/Util';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import BlogCard from '../Components/BlogCard';
import CarouselBlog from '../Components/CarouselBlog';
import Divider from '../Components/Divider';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, KOREA_NEWS_TAG_CODE, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, FS, headerHeight, heightBottomBar, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import TagStore from '../Stores/TagStore';

@observer
class CultureNews extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showSearch: this.props.showSearch,
      advertise: [], //có dùng
      tags: [],
      spots: [],
      blogs: [],
      offset: 0,
      existOther: true,
      isLoading: false,
      refreshing: false,
      search: '',
      postType: this.props.postType ? this.props.postType : Const.PostType.Blog.code,
      orderType: Const.OrderType.Date.name,
      title: '',
      tag: null,
      paddingBottom: Util.getIOSPadding('bottom'),
      category: { code: 0, name: 'ALL' },
    };
    this.chooseAll = true;
    this.advertise = [];

    this.search = this.search.bind(this);

    this.onRefreshRequest = this.onRefreshRequest.bind(this);
    this.getAds = this.getAds.bind(this);
    this.getAdvertiseList = this.getAdvertiseList.bind(this);
    this.onClickBlogCard = this.onClickBlogCard.bind(this);
  }

  async componentDidMount() {
    analytics().setCurrentScreen('Korea-News');
    const { search } = this.props;
    const postType = this.props.postType ? this.props.postType : Const.PostType.Blog.code;

    if (this.baseHeaderWithSearchRef) {
      this.baseHeaderWithSearchRef.setState({
        showSearch: this.state.showSearch,
      });
    }

    this.setState({ search, postType }, () => {
      setTimeout(() => {
        this.search();
      }, 300);
      this.loadAds();
    });
  }

  loadAds() {
    this.setState({ advertise: [] });
    this.getAds();
  }

  async getAds(type) {
    await this.getAdvertiseList(type);
  }

  async getBlogListNew() {
    try {
      const variables = {
        languages: [RootStore.language],
        page: 1,
        order: Const.OrderType.Rand.name,
        tags: [KOREA_NEWS_TAG_CODE],
        isRecommend: true,
        isPublish: true,
        isMain: true,
        limit: 5,
      };

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

      this.setState({
        advertise,
      });
      this.forceUpdate();
    } catch (err) {
      console.log('29148 call blogListNew failed in CultureNews.js', err);
    }
  }

  async getAdvertiseList(type) {
    const variables = {
      type: this.props.advertiseType ? this.props.advertiseType : type, //uses type 4, 20, 21 but only type 4 have data
      languages: RootStore.language,
      order: Const.OrderType.Rand.name,
      page: 1,
      limit: 5,
    };
    const result = await RootStore.client.query({
      query: getAdvertisementList,
      variables,
    });
    let advertise = [];
    advertise = result.data.getAdvertisementList.advertisements.map((e) => {
      e.callingFromAPIGetAds = true;
      return e;
    });
    this.setState({
      advertise,
    });
  }

  async search() {
    if (!this.state.existOther) {
      return;
    }

    let spots = [];
    let blogs = [];
    let existOther = true;
    let title = '';
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      //start call api:
      try {
        const variables = {
          languages: [RootStore.language],
          order: this.state.orderType,
          offset: 24 * this.state.offset,
          limit: 24,
          tags: [KOREA_NEWS_TAG_CODE],
          isPublish: true,
        };
        //get categoryCode:
        if (this.state.category && this.state.category.code) {
          variables.tags.push(this.state.category.code);
        }

        //get SEARCH (text):
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

        if (this.state.tag && this.state.tag.code) {
          variables.tags.push(this.state.category.code);
        }
        if (TagStore.getSelectedCityObj && TagStore.getSelectedCityObj.code) {
          variables.tags.push(TagStore.getSelectedCityObj.code);
        }

        if (variables.tags && variables.tags.length === 0) {
          delete variables.tags;
        }
        console.log('29148 kamehameha variables:', variables);
        const result = await RootStore.client.query({
          query: getBlogListNew,
          variables,
        });

        blogs = this.state.blogs.concat(result.data.getBlogListNew.blogs);

        existOther = true;
        if (result.data.getBlogListNew.blogs.length === 0) {
          existOther = false;
        }
        title = '';
        //update data:
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
        console.log('Culture news this.search error:', err);
        this.setState({ refreshing: false, isLoading: false });
      }
    }
  }

  onRefreshRequest() {
    this.setState({ spots: [], blogs: [], existOther: true, offset: 0, refreshing: true }, () => {
      setTimeout(() => {
        this.search();
        this.loadAds();
      }, 500);
    });
  }

  onClickBlogCard(code) {
    Actions.blogDetail({ blogCode: code });
  }

  onClickOrderType(type) {
    if (this.state.orderType === type) {
      return;
    }

    this.setState({ orderType: type, spots: [], blogs: [], existOther: true, offset: 0 }, () => {
      this.search();
    });
  }

  onChangeCity = (selectedCity) => {
    this.setState(
      {
        postType: this.state.postType || Const.PostType.Blog.code,
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
      <View style={{ paddingBottom: this.state.paddingBottom, flex: 1 }}>
        {this.props.hideHeader ? null : <View style={{ height: headerHeight }} />}

        {/* Blog */}
        <Divider style={{ marginTop: 0 * HEIGHT_SCALE_RATIO }} />
        <FlatList
          data={this.state.blogs}
          ListHeaderComponent={
            this.state.advertise &&
            this.state.advertise.length > 0 && (
              <View style={{}}>
                <CarouselBlog data={this.state.advertise} />
                {/* menu */}
                {this.state.blogs.length > 0 && (
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginHorizontal: 16 * WIDTH_SCALE_RATIO,
                      marginTop: 40 * HEIGHT_SCALE_RATIO,
                      // flexDirection: 'row',
                    }}>
                    <Menu
                      ref="menuRef"
                      rendererProps={{
                        placement: 'bottom',
                      }}>
                      <MenuTrigger
                        style={{
                          flexDirection: 'row',
                        }}>
                        <PText style={[ptText.BODY2, { color: COLOR.GREY80 }]}>
                          {this.state.orderType === Const.OrderType.Like.name
                            ? RootStore.i18n.t('blog.best')
                            : RootStore.i18n.t('blog.latest')}
                        </PText>
                        <Icon
                          type="Entypo"
                          name="chevron-down"
                          color={COLOR.GREY80}
                          style={{
                            fontSize: FS(18),
                            // color: style.textSubTitle.color,
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
                              style={{
                                paddingBottom: 7 * HEIGHT_SCALE_RATIO,
                              }}
                              onPress={() => {
                                this.onClickOrderType(Const.OrderType.Like.name);
                                this.refs.menuRef.close();
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
                                    // color: 'blue',
                                  },
                                ]}>
                                {RootStore.i18n.t('blog.best')}
                              </PText>
                            </MyTouchableOpacity>
                            <MyTouchableOpacity
                              transparent
                              style={{
                                paddingBottom: 7 * HEIGHT_SCALE_RATIO,
                              }}
                              onPress={() => {
                                this.onClickOrderType(Const.OrderType.Date.name);
                                // this.onClickOrderType('renewal_date');

                                this.refs.menuRef.close();
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
                                    // color: 'blue',
                                  },
                                ]}>
                                {/* {RootStore.i18n.t("search.last")} */}
                                {RootStore.i18n.t('review.setting-latest')}
                              </PText>
                            </MyTouchableOpacity>
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                )}
              </View>
            )
          }
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                }}>
                <BlogCard layout2 blogData={item} click={this.onClickBlogCard} />
              </View>
            );
          }}
          contentContainerStyle={{
            marginTop: 2 * HEIGHT_SCALE_RATIO,
            backgroundColor: 'white',
            paddingBottom: heightBottomBar + 30 * HEIGHT_SCALE_RATIO,
          }}
          ListFooterComponent={() => {
            if (this.state.isLoading) {
              return (
                <ActivityIndicator
                  size="small"
                  color={COLOR.appColor}
                  style={{ paddingVertical: 10 * HEIGHT_SCALE_RATIO }}
                />
              );
            } else if (this.state.blogs && this.state.blogs.length === 0) {
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
            }
            return <View />;
          }}
          refreshing={false}
          onRefresh={this.onRefreshRequest}
          // onEndReachedThreshold={0.5}
          onEndReached={this.search}
          extraData={this.state}
          keyExtractor={(item, index) => `key ${item.code}${index}`}
          showsVerticalScrollIndicator={false}
        />
        {/* header */}
        <View style={{ position: 'absolute' }}>
          <BaseHeaderWithSearch
            ref={(instance) => (this.baseHeaderWithSearchRef = instance)}
            onShowSearch={this.onOpenSearchFunc}
            backgroundColorWhite
            // showSuggest
            showBack
            postType={Const.PostType.Blog.code}
            color={COLOR.appColor}
            isFromTravelInfo={true}
            onChangeKeyword={null}
            isKoreaNews
            showSuggest
            showSearch={this.state.showSearch}
            // showSearch={this.props.showSearch}
            selectedSearchCategory={null}
            initialSearchText={this.props.search}
            onChangeCity={this.onChangeCity}
            onSearch={(search, city) => {
              this.setState(
                {
                  spots: [],
                  blogs: [],
                  offset: 0,
                  search,
                  existOther: true,
                },
                () => {
                  setTimeout(() => {
                    this.search();
                  }, 500);
                },
              );
            }}
            onCloseSearch={() => {}}
          />
        </View>
      </View>
    );
  }
}

CultureNews.propTypes = {
  search: PropTypes.string,
  city: PropTypes.string,
  postType: PropTypes.number,
};

export default CultureNews;
