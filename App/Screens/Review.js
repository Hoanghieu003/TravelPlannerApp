import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import getAdvertisementList from '../../Common/gql/queries/getAdvertisementList.gql';
import getBlogListNew from '../../Common/gql/queries/getBlogListNew.gql';
import getTagRecommendList from '../../Common/gql/queries/getTagRecommendList.gql';
import Util from '../../Common/Util';
import BlogCard from '../Components/BlogCard';
import CarouselBlog from '../Components/CarouselBlog';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PFlatList from '../Components/PFlatList';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, FS, heightBottomBar, ptColor, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import TagStore from '../Stores/TagStore';
import { convertLikeBlogToMobx } from '../Utils/likeAction';

@observer
class Review extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showSearch: this.props.showSearch,
      isPostTypeChangable: !this.props.disabledChangePostType,
      advertise: [],
      tags: [],
      childrenTags: [],
      selectedChildrenCategory: {},
      isShowChildrenCategory: false,
      blogs: [],
      offset: 0,
      isLikeBlog: false,
      existOther: true,
      isLoading: false,
      refreshing: false,
      activeSlide: 0,
      search: '',
      postType: Const.PostType.Blog.code,
      orderType: Const.OrderType.Date.name,
      title: '',
      tag: null,

      paddingBottom: Util.getIOSPadding('bottom'),
      category: this.props.selectedCategory
        ? this.props.selectedCategory
        : this.props.isFromTravelInfo
          ? { code: 0, name: 'ALL' }
          : { code: 0, name: RootStore.i18n.t('home.travel-info').toUpperCase() },
      selectedFilterType: this.props.isFromTravelInfo
        ? { code: 0, name: RootStore.i18n.t('home.travel-info').toUpperCase() }
        : this.props.isFromCityScreen
          ? RootStore.i18n.t('home.reservation-discounts').toUpperCase()
          : null,
    };
    this.advertise = [];
    this.search = this.search.bind(this);
    this.onRefreshRequest = this.onRefreshRequest.bind(this);
    this.getTags = this.getTags.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderChildrenCategory = this.renderChildrenCategory.bind(this);
    this.getAds = this.getAds.bind(this);
    this.getAdvertiseList = this.getAdvertiseList.bind(this);
  }
  render() {
    return (
      <View style={{ paddingBottom: this.state.paddingBottom, flex: 1 }}>
        {this.props.hideCategory ? null : (
          <View
            style={{
              height: 32 * HEIGHT_SCALE_RATIO,
              paddingVertical: 4 * HEIGHT_SCALE_RATIO,
              paddingRight: 0 * WIDTH_SCALE_RATIO,
              paddingLeft: 16 * WIDTH_SCALE_RATIO,
              alignItems: 'flex-end',
              flexDirection: 'row',
              backgroundColor: COLOR.WHITE,
              marginTop: this.state.showSearch ? 25 * HEIGHT_SCALE_RATIO : null,
            }}>
            <PFlatList
              ref={(ref) => (this.flatListCategory = ref)}
              getItemLayout={this.getItemLayout}
              horizontal
              data={this.state.tags}
              extraData={this.state.category}
              renderItem={this.props.isFromTravelInfo ? this.renderMenu : this.renderCategory}
            />
          </View>
        )}
        {this.state.postType === Const.PostType.Blog.code && (
          <PFlatList
            data={this.state.blogs}
            ListHeaderComponent={this.ListHeaderComponent()}
            renderItem={this.renderItem()}
            contentContainerStyle={{
              marginTop: 2 * HEIGHT_SCALE_RATIO,
              backgroundColor: 'white',
              paddingBottom: heightBottomBar + 30 * HEIGHT_SCALE_RATIO,
            }}
            isLoading={this.state.isLoading}
            ListFooterComponent={this.ListFooterComponent()}
            refreshing={false}
            onRefresh={this.onRefreshRequest}
            onEndReached={this.search}
            extraData={this.state}
          />
        )}
      </View>
    );
  }
  ListHeaderComponent() {
    return (
      this.state.advertise &&
      this.state.advertise.length > 0 && (
        <View style={{}}>
          <CarouselBlog data={this.state.advertise} />
          {this.state.blogs.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                marginTop: 40 * HEIGHT_SCALE_RATIO,
              }}>
              {this.state.isShowChildrenCategory ? (
                this.renderTravelCategory()
              ) : (
                  <View style={{ width: 120 * WIDTH_SCALE_RATIO }} />
                )}
              {this.renderMenuSort()}
            </View>
          )}
        </View>
      )
    );
  }

  renderTravelCategory() {
    return (
      <Menu
        ref="menuChildrenCategory"
        rendererProps={{
          placement: 'bottom',
        }}>
        <MenuTrigger
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
              // paddingBottom: 6 * HEIGHT_SCALE_RATIO,
            }}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            borderRadius: 8 * WIDTH_SCALE_RATIO,
            width: 130 * WIDTH_SCALE_RATIO,
            marginTop: 20 * HEIGHT_SCALE_RATIO,
            paddingTop: 4 * HEIGHT_SCALE_RATIO,
          }}>
          <MenuOption disableTouchable style={{}}>
            <View style={{}}>
              {this.state.childrenTags.map((v) => {
                const correctData = v?.translations ? v.translations[0] : v;
                const name =
                  correctData && correctData.name
                    ? correctData.name
                    : RootStore.i18n.t('travel.category');
                return (
                  <MyTouchableOpacity
                    key={`childrentag-${v.code}`}
                    transparent
                    style={{
                      paddingBottom: 7 * HEIGHT_SCALE_RATIO,
                    }}
                    onPress={() => {
                      this.onClickChildrenCategoryTag(v);
                      this.refs.menuChildrenCategory.close();
                    }}>
                    <PText
                      style={[
                        style.textCaption,
                        {
                          color: COLOR.GREY80,
                          textTransform: 'uppercase',
                          textAlign: 'left',
                          paddingVertical: 7 * HEIGHT_SCALE_RATIO,

                          paddingHorizontal: 7 * WIDTH_SCALE_RATIO,
                        },
                      ]}>
                      {name}
                    </PText>
                  </MyTouchableOpacity>
                );
              })}
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }

  renderMenuSort() {
    return (
      <Menu
        ref="menuRef"
        rendererProps={{
          placement: 'bottom',
        }}>
        <MenuTrigger
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
              // paddingBottom: 6 * HEIGHT_SCALE_RATIO,
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
            <View style={{}}>
              <MyTouchableOpacity
                transparent
                style={{
                  paddingVertical: 13 * HEIGHT_SCALE_RATIO,
                }}
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
                  {RootStore.i18n.t('blog.best')}
                </PText>
              </MyTouchableOpacity>
              <MyTouchableOpacity
                transparent
                style={{
                  paddingVertical: 13 * HEIGHT_SCALE_RATIO,
                }}
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

  renderItem() {
    return ({ item }) => {
      return (
        <View
          style={{
            paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          }}>
          <BlogCard layout2 blogData={item} click={this.onClickBlogCard.bind(this)} />
        </View>
      );
    };
  }

  ListFooterComponent() {
    return () => {
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
    };
  }

  async componentDidMount() {
    if (this.props.isFromTravelInfo) {
      analytics().setCurrentScreen('Travel-reviews');
    } else {
      analytics().setCurrentScreen('Search-Screen');
    }
    if (this.baseHeaderWithSearchRef) {
      this.baseHeaderWithSearchRef.setState({
        showSearch: this.state.showSearch,
      });
    }
    if (this.props.isFromTravelInfo) {
      await this.getTags();
    }
    await this.loadAds();
    this.search();
  }

  async getTags() {
    const result = await RootStore.client.query({
      query: getTagRecommendList,
      variables: {
        type: Const.NewTagType.MAIN_GENERAL_CATEGORY,
        isRecommend: true,
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
  handleClickParentCategory(item) {
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
    } else {
      this.setState({
        isShowChildrenCategory: false,
        selectedChildrenCategory: {},
      });
    }
    this.onClickCategoryTag(item);
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
        this.loadAds();
        this.search();
      },
    );
  }
  renderMenu({ item, index }) {
    const code = item && item.code ? item.code : 0;
    const name = item && item.name ? item.name : 'ALL';
    return (
      <MyTouchableOpacity
        key={() => `TouchMenu-${code}`}
        onPress={() => {
          this.handleClickParentCategory(item);
        }}
        style={{
          paddingBottom: 0 * WIDTH_SCALE_RATIO,
          flexDirection: 'row',
          // backgroundColor: 'red',
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
              index !== this.state.childrenTags.length - 1 ? COLOR.GREY20 : COLOR.WHITE,
            marginHorizontal: 16 * WIDTH_SCALE_RATIO,
          }}
        />
      </MyTouchableOpacity>
    );
  }

  renderCategory({ item, index }) {
    let code = item && item.code ? item.code : '';
    if (item && item.code === 0 && this.state.category && this.state.category.code === 0) {
      code = 0;
    }
    const name = item && item.name ? item.name : '';
    return (
      <MyTouchableOpacity
        onPress={() => {
          item.onPress();
        }}
        key={`tag-${code}`}
        style={{
          paddingHorizontal: 12 * WIDTH_SCALE_RATIO,
          paddingBottom: 6 * WIDTH_SCALE_RATIO,
          borderBottomWidth: 2 * HEIGHT_SCALE_RATIO,
          borderBottomColor: this.state.category.code === code ? COLOR.PRIMARY : '#fafafa',
        }}>
        <PText
          style={[
            ptText.BODY1,
            this.state.category.code === code ? ptColor.GREY80 : ptColor.GREY20,
            {
              textTransform: 'uppercase',
            },
          ]}>
          {name}
        </PText>
      </MyTouchableOpacity>
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
        blogs: [],
        existOther: true,
        offset: 0,
      },
      () => {
        this.loadAds();
        this.search();
      },
    );
  }

  async getAds(type) {
    await this.getAdvertiseList(type);
  }

  async loadAds() {
    this.setState({ advertise: [] });
    const { postType } = this.state;

    if (this.props.isFromTravelInfo) {
      if (postType === Const.PostType.Blog.code) {
        await this.getAds(Const.AdvertiseType.BlogMain.code);
      }
    }
  }

  async getBlogListNew() {
    const variables = {
      languages: [RootStore.language],
      page: 1,
      order: Const.OrderType.Rand.name,
      tags: [],
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
    this.setState({ advertise });
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
    if (this.props.isFromTravelInfo) {
      advertise = result.data.getAdvertisementList.advertisements.map((e) => {
        e.callingFromAPIGetAds = true;
        return e;
      });
    } else {
      advertise = result.data.getAdvertisementList.advertisements;
    }
    this.setState({ advertise });
  }

  onClickOrderType(type) {
    if (this.state.orderType === type) {
      return;
    }

    this.setState({ orderType: type, blogs: [], existOther: true, offset: 0 }, () => {
      this.search();
    });
  }

  async search() {
    const willGetBlog = Const.PostType.Blog.code;

    if (!this.state.existOther) {
      return;
    }

    let blogs = [];
    let existOther = true;
    let title = '';
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      try {
        if (this.props.isFromTravelInfo) {
          const variables = {
            languages: [RootStore.language],
            order: this.state.orderType,
            tags: [],

            limit: 24,
            offset: 24 * this.state.offset,
          };
          if (willGetBlog) {
            variables.excludeTags = [6119];
            variables.isPublish = true;
            variables.isMain = true;
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
              if (result.data.getBlogList.rows.length === 0) {
                existOther = false;
              }
            }
          }

          if (this.state.tag && this.state.tag.code) {
            variables.tags.push(this.state.category.code);
          }
          if (TagStore.getSelectedCityObj && TagStore.getSelectedCityObj.code) {
            variables.tags.push(TagStore.getSelectedCityObj.code);
          }
          if (this.state.selectedChildrenCategory && this.state.selectedChildrenCategory.code) {
            variables.tags.push(this.state.selectedChildrenCategory.code);
          }
          if (
            this.state.selectedChildrenCategory &&
            this.state.selectedChildrenCategory.code === 0
          ) {
            variables.tags.push(this.state.category.code);
          }
          if (variables.tags && variables.tags.length === 0) {
            delete variables.tags;
          }
          const result = await RootStore.client.query({
            query: getBlogListNew,
            variables,
          });

          if (willGetBlog) {
            convertLikeBlogToMobx(result.data.getBlogListNew.blogs);
            blogs = this.state.blogs.concat(result.data.getBlogListNew.blogs);
          }

          existOther = true;

          if (result.data.getBlogListNew.blogs.length === 0) {
            existOther = false;
          }
        } else {
          if (false) {
          } else {
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
            if (this.state.category && this.state.category.code) {
              variables.tags.push(this.state.category.code);
            }
            if (
              this.state.search !== null &&
              this.state.search !== undefined &&
              this.state.search !== ''
            ) {
              variables.title = this.state.search;
            }
            if (this.props.types) {
              variables.types = this.props.types;
            }
            if (this.state.tag && this.state.tag.code) {
              variables.tags.push(this.state.tag.code);
            }
            if (TagStore.getSelectedCityObj && TagStore.getSelectedCityObj.code) {
              variables.tags.push(TagStore.getSelectedCityObj.code);
            }
            if (this.state.category && this.state.category.code) {
              if (this.state.category.code === 0) {
              } else if (this.state.category.code === 1) {
              } else if (this.state.category.code === 2) {
              } else if (this.state.category.code === 3) {
                variables.tags.push(6119);
              } else if (this.state.category.code === 4) {
              }
            }
            if (
              //code tam sau nay se xoa va optimize sau
              variables.tags &&
              variables.tags.find((e) => e === 0 || e === 1 || e === 2 || e === 3 || e === 4)
            ) {
              variables.tags = variables.tags.filter(
                (e) => e !== 0 && e !== 1 && e !== 2 && e !== 3 && e !== 4,
              );
            }
            if (variables.tags && variables.tags.length === 0) {
              delete variables.tags;
            }

            const result = await RootStore.client.query({
              query: getBlogListNew,
              variables,
            });

            if (willGetBlog) {
              convertLikeBlogToMobx(result.data.getBlogListNew.blogs);
              blogs = this.state.blogs.concat(result.data.getBlogListNew.blogs);
            }

            existOther = true;

            if (result.data.getBlogListNew.blogs.length === 0) {
              existOther = false;
            }
          }
        }
        this.setState({
          existOther,
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
    this.setState({ blogs: [], existOther: true, offset: 0, refreshing: true }, () => {
      this.search();
      this.loadAds();
    });
  }

  onClickBlogCard(code) {
    Actions.blogDetail({ blogCode: code });
  }
}

Review.propTypes = {
  // search: PropTypes.string,
  // city: PropTypes.string,
  // postType: PropTypes.number,
};

export default Review;
