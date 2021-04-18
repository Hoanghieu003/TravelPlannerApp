import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import React from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { mergeArraysWithKey } from '../../Common/arrayUtils';
import Const from '../../Common/Const';
import getBlogListNew from '../../Common/gql/queries/getBlogListNew.gql';
import getSpotListNew from '../../Common/gql/queries/getSpotListNew.gql';
import BlogCard from '../Components/BlogCard';
import InfiniteScroll from '../Components/InfiniteScroll';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import SpotCard from '../Components/SpotCard';
import { HEIGHT, HEIGHT_SCALE_RATIO, IS_IOS, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import { COLOR, ptColor, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { convertLikeBlogToMobx } from '../Utils/likeAction';
import PFlatList from '../Components/PFlatList';
import { ICON } from '../../asset/image/ImagePath';

const LIMIT = 10;

const BenefitSpotCard = React.memo((props) => {
  const { spot, onClickSpotCard, onCLickHeartProps } = props;
  return (
    <View
      style={{
        width: 165 * WIDTH_SCALE_RATIO,
      }}
      key={`spot-${spot.code}`}>
      <SpotCard
        spotData={spot}
        key={`spot-${spot.code}`}
        click={onClickSpotCard}
        onCLickHeartProps={onCLickHeartProps}
      />
    </View>
  );
});

const BenefitBlogCard = React.memo((props) => {
  const { blog, onClickBlogCard, onCLickHeartProps } = props;
  return (
    <View
      style={{
        width: 165 * WIDTH_SCALE_RATIO,
      }}
      key={`blog-${blog.code}`}>
      <BlogCard
        blogData={blog}
        key={`blog-${blog.code}`}
        click={onClickBlogCard}
        onCLickHeartProps={onCLickHeartProps}
      />
    </View>
  );
});

const CategoryListItem = React.memo((props) => {
  const { item, category } = props;
  let code = item && item.code ? item.code : '';
  if (item && item.code === 0 && category && category.code === 0) {
    code = 0;
  }
  const name = item && item.name ? item.name : '';
  return (
    <MyTouchableOpacity
      onPress={item.onPress}
      key={`tag-${code}`}
      style={{
        paddingHorizontal: 12 * WIDTH_SCALE_RATIO,
        borderBottomWidth: 2 * HEIGHT_SCALE_RATIO,
        borderBottomColor: COLOR.WHITE,
      }}>
      <PText
        style={[
          ptText.BODY1,
          category.code === code ? ptColor.GREY80 : ptColor.GREY20,
          {
            textTransform: 'uppercase',
          },
        ]}>
        {name}
      </PText>
    </MyTouchableOpacity>
  );
});

@observer
class MyBenefit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      spots: [],
      spotTags: [],

      blogs: [],
      excludeBlogTags: [6119],
      blogTags: [],

      showOptionSpotOrBlog: true,
      offset: 0,
      postType: Const.PostType.Blog.code,
      types: null,
      existOther: true,
      isLoading: false,
      category: { code: 0, name: RootStore.i18n.t('home.travel-info').toUpperCase() },
      tagMenu: [
        {
          code: 0,
          name: RootStore.i18n.t('home.travel-info').toUpperCase(),
          onPress: () => {
            console.log('press 0');
            this.setState(
              {
                category: { code: 0, name: RootStore.i18n.t('home.travel-info').toUpperCase() },
                postType: Const.PostType.Blog.code,
                existOther: true,
                offset: 0,
                showOptionSpotOrBlog: true,
                excludeBlogTags: [6119],
                types: null,
                blogTags: [],
                blogs: [],
                spots: [],
              },
              this.search,
            );
          },
        },

        {
          code: 1,
          name: RootStore.i18n.t('home.korea-news').toUpperCase(),
          onPress: () => {
            console.log('press 1');
            this.setState(
              {
                category: {
                  code: 1,
                  name: RootStore.i18n.t('home.korea-news').toUpperCase(),
                },
                postType: Const.PostType.Blog.code,
                existOther: true,
                offset: 0,
                types: null,
                showOptionSpotOrBlog: false,
                excludeBlogTags: [],

                blogTags: [6119],
                blogs: [],
                spots: [],
              },
              this.search,
            );
          },
        },
        {
          code: 2,
          name: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
          onPress: () => {
            console.log('press 2');
            this.setState(
              {
                category: {
                  code: 2,
                  name: RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
                },
                postType: Const.PostType.Spot.code,
                existOther: true,
                offset: 0,
                showOptionSpotOrBlog: false,

                types: Const.SpotListType.reservation.code,
                excludeBlogTags: [],

                blogTags: [],
                blogs: [],
                spots: [],
              },
              this.search,
            );
          },
        },

        {
          code: 3,
          name: RootStore.i18n.t('home.main-coupon').toUpperCase(),
          onPress: () => {
            console.log('press 3');
            this.setState(
              {
                category: {
                  code: 3,
                  name: RootStore.i18n.t('home.main-coupon').toUpperCase(),
                },
                postType: Const.PostType.Spot.code,
                existOther: true,
                offset: 0,
                excludeBlogTags: [],

                types: Const.SpotListType.coupon.code,
                showOptionSpotOrBlog: false,

                blogTags: [],
                blogs: [],
                spots: [],
              },
              this.search,
            );
          },
        },
        {
          code: 4,
          name: RootStore.i18n.t('proxy-shopping').toUpperCase(),
          onPress: () => {
            console.log('press 4');
            this.setState(
              {
                category: {
                  code: 4,
                  name: RootStore.i18n.t('home.main-coupon').toUpperCase(),
                },
                postType: Const.PostType.Spot.code,
                existOther: true,
                offset: 0,
                excludeBlogTags: [],

                types: [4],
                showOptionSpotOrBlog: false,

                blogTags: [],
                blogs: [],
                spots: [],
              },
              this.search,
            );
          },
        },
      ],
    };

    this.search = this.search.bind(this);
    this.renderCategory = this.renderCategory.bind(this);

    this.onRefreshRequest = this.onRefreshRequest.bind(this);
  }

  componentDidMount() {
    analytics().setCurrentScreen('My-like-tab-MyPage');
  }

  onRestartBenefit = async () => {
    this.setState({ spots: [], blogs: [], existOther: true, offset: 0 }, () => {
      setTimeout(() => {
        this.search();
      }, 500);
    });
  };

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.addListener('restartMyBenefit', this.onRestartBenefit);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('restartMyBenefit', this.onRestartBenefit);
  }

  getMyLikeSpot = async (trueOffsetNumber) => {
    try {
      const variables = {
        // type: Const.PostType.Spot.code,
        languages: [RootStore.language],
        limit: LIMIT,
        offset: trueOffsetNumber,
        isMine: true,
        isConfirm: true,
        isReserved: true,
      };
      if (this.state.types !== null) {
        variables.types = this.state.types;
      }
      const result = await RootStore.client.query({
        query: getSpotListNew,
        variables,
      });

      let existOther = true;
      if (result.data.getSpotListNew.spots.length < LIMIT) {
        existOther = false;
      }

      const spots = mergeArraysWithKey([...this.state.spots, ...result.data.getSpotListNew.spots]);

      this.setState({ spots });
      return { isSpotContinueable: existOther, spotOffset: trueOffsetNumber + LIMIT };
    } catch (error) {
      return { isSpotContinueable: false, spotOffset: trueOffsetNumber };
    }
  };

  getMyLikeBlog = async (trueOffsetNumber) => {
    try {
      const variables = {
        // type: Const.PostType.Blog.code,
        languages: [RootStore.language],
        limit: LIMIT,
        isPublish: true,
        isMine: true,
        offset: trueOffsetNumber,
      };

      if (this.state.blogTags.length > 0) {
        variables.tags = this.state.blogTags;
      }
      if (this.state.excludeBlogTags !== []) {
        variables.excludeTags = this.state.excludeBlogTags;
      }
      const result = await RootStore.client.query({
        query: getBlogListNew,
        variables,
      });

      let existOther = true;
      if (result.data.getBlogListNew.blogs.length < LIMIT) {
        existOther = false;
      }
      convertLikeBlogToMobx(result.data.getBlogListNew.blogs);
      const blogs = mergeArraysWithKey([...this.state.blogs, ...result.data.getBlogListNew.blogs]);
      // this.mergeArraysBlog(result.data.getBlogListNew.blog);

      this.setState({ blogs });
      return { isBlogContinueable: existOther, blogOffset: trueOffsetNumber + LIMIT };
    } catch (error) {
      return { isBlogContinueable: false, blogOffset: trueOffsetNumber };
    }
  };

  async search() {
    if (!this.state.existOther || this.state.isLoading) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    const trueOffsetNumber = this.state.offset;
    let shouldCall = null;
    if (this.state.postType === Const.PostType.Blog.code) {
      shouldCall = await this.getMyLikeBlog(trueOffsetNumber);
    } else {
      shouldCall = await this.getMyLikeSpot(trueOffsetNumber);
    }
    this.setState({
      offset: shouldCall
        ? shouldCall.spotOffset
        : Math.min(shouldCall.spotOffset, shouldCall.blogOffset),
      existOther: shouldCall.isSpotContinueable || shouldCall.isBlogContinueable,
      isLoading: false,
    });
  }

  onRefreshRequest() {
    this.setState({ spots: [], blogs: [], existOther: true, offset: 0 }, () => {
      setTimeout(() => {
        DeviceEventEmitter.emit('refreshMyPage');
        this.search();
        this.refs.infiniteScroll._stopRefreshSpinner();
      }, 500);
    });
  }

  onClickSpotCard = (code, city, region) => {
    if (code) {
      Actions.spotDetail({ spotCode: code, city: city, region: region });
    }
  };

  onClickBlogCard = (code) => {
    Actions.blogDetail({ blogCode: code });
  };

  renderCategory({ item, index }) {
    return <CategoryListItem item={item} category={this.state.category} />;
  }

  onClickSpotHeartProps = (code, nowState) => {
    if (nowState) {
      this.setState({
        spots: this.state.spots.filter((e) => e.code !== code),
      });
    }
  };

  renderBenefitSpotCard = ({ item }) => {
    return (
      <BenefitSpotCard
        spot={item}
        onClickSpotCard={this.onClickSpotCard}
        onCLickHeartProps={this.onClickSpotHeartProps}
      />
    );
  };

  onClickBlogHeartProps = (code, nowState) => {
    if (nowState) {
      this.setState({
        blogs: this.state.blogs.filter((e) => e.code !== code),
      });
    }
  };

  renderBenefitBlogCard = ({ item }) => {
    return (
      <BenefitBlogCard
        blog={item}
        key={item.code}
        onClickBlogCard={this.onClickBlogCard}
        onCLickHeartProps={this.onClickBlogHeartProps}
      />
    );
  };

  render() {
    if (!this.props.allowLoadData) {
      return this.renderIndicator();
    }
    const finalData =
      this.state?.postType === Const.PostType.Spot.code ? this.state.spots : this.state.blogs;

    return (
      <View style={{ flex: 1 }}>
        <InfiniteScroll
          ref="infiniteScroll"
          horizontal={false}
          onLoadMoreAsync={this.search}
          onRefresh={this.onRefreshRequest}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10 * HEIGHT_SCALE_RATIO,
              marginHorizontal: 12 * WIDTH_SCALE_RATIO,
            }}>
            <Image
              source={ICON.BACK_ICON}
              resizeMode="contain"
              style={{
                width: 15 * WIDTH_SCALE_RATIO,
                height: 15 * WIDTH_SCALE_RATIO,
                tintColor: 'gray',
              }}
            />
            <PFlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.tagMenu}
              renderItem={this.renderCategory}
              extraData={this.state}
            />

            <Image
              source={ICON.NEXT_ICON}
              resizeMode="contain"
              style={{
                width: 15 * WIDTH_SCALE_RATIO,
                height: 15 * WIDTH_SCALE_RATIO,
                tintColor: 'gray',
              }}
            />
          </View>

          {this.state.postType === Const.PostType.Spot.code && (
            <PFlatList
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={finalData}
              renderItem={this.renderBenefitSpotCard}
              style={{ flex: 1 }}
              columnWrapperStyle={{
                paddingBottom: IS_IOS ? 5 * WIDTH_SCALE_RATIO : WIDTH_SCALE_RATIO,
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}
              contentContainerStyle={[
                {
                  backgroundColor: 'white',
                  paddingBottom: 12 * HEIGHT_SCALE_RATIO,
                  paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                },
              ]}
            />
          )}
          {this.state.postType === Const.PostType.Blog.code && (
            <PFlatList
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={finalData}
              renderItem={this.renderBenefitBlogCard}
              style={{ flex: 1 }}
              columnWrapperStyle={{
                paddingBottom: IS_IOS ? 5 * WIDTH_SCALE_RATIO : WIDTH_SCALE_RATIO,
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}
              contentContainerStyle={[
                {
                  backgroundColor: 'white',
                  paddingBottom: 10 * HEIGHT_SCALE_RATIO,
                  paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                },
              ]}
            />
          )}
        </InfiniteScroll>
      </View>
    );
  }

  renderIndicator() {
    return (
      <View style={{ height: HEIGHT * 0.5, width: WIDTH }}>
        <ActivityIndicator size={'small'} />
      </View>
    );
  }
}

export default MyBenefit;
