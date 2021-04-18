import Clipboard from '@react-native-community/clipboard';
import analytics from '@react-native-firebase/analytics';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';
import Const from '../../Common/Const';
import changeLike from '../../Common/gql/mutations/changeLike.gql';
import createReview from '../../Common/gql/mutations/createReview.gql';
import deleteReview from '../../Common/gql/mutations/deleteReview.gql';
import getBlogInfo from '../../Common/gql/queries/getBlogDetail.gql';
import getReviewlist from '../../Common/gql/queries/getReviewlist.gql';
import getSpotDetail from '../../Common/gql/queries/getSpotDetail.gql';
import getSpotListNew from '../../Common/gql/queries/getSpotListNew.gql';
import Util from '../../Common/Util';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import Divider from '../Components/Divider';
import FurtherReadingItem from '../Components/FurtherReadingItem';
import HeartButton from '../Components/HeartButton';
import { myAlert } from '../Components/MyAlert';
import MyImage from '../Components/MyImage';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import MyWebView from '../Components/MyWebView';
import PFlatList from '../Components/PFlatList';
import PText from '../Components/PText';
import ReviewInput from '../Components/ReviewInput';
import ReviewItem from '../Components/ReviewItem';
import WebViewAutoHeight from '../Components/WebViewAutoHeight';
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
import RootStore from '../Stores/RootStore';
import { htmlBlog } from '../Utils/htmlBlog';
import TimeAgo from './TimeAgo';
import { ICON, IMAGE } from '../../asset/image/ImagePath';

export default class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.isFirstTime = false;
    this.webView = {
      canGoBack: false,
      ref: null,
    };
    this.state = {
      requireInfo: [],
      isLoadding: true,
      emailToSupport: '',
      nameToSupport: '',
      contentToSupport: '',
      modalShare: false,
      visible: true,
      canGoBack: false,
      blog: null,
      modalMailSupport: false,
      loaded: false,
      cityTags: [],
      interestTags: [],
      showModal: false,
      title: '',
      subTitle: '',
      content: '',
      html: '',
      isLike: false,

      writer: {
        code: 0,
        nickname: '',
        picture: '',
      },

      images: [],

      reviews: [],
      reviewCount: 0,
      offset: 0,
      existOther: true,

      spotLink: [],
      isReserveable: false,

      paddingBottom: Util.getIOSPadding('bottom'),

      suggestBlog: [],
      suggestSpot: [],
      rating: 0,
    };

    this.isDeleteable = this.isDeleteable.bind(this);

    this.getBlog = this.getBlog.bind(this);
    this.getReviews = this.getReviews.bind(this);

    this.renderShare = this.renderShare.bind(this);
    this.onClickRegistReview = this.onClickRegistReview.bind(this);
    this.onClickDeleteReview = this.onClickDeleteReview.bind(this);
    this.onClickChildRegistReview = this.onClickChildRegistReview.bind(this);
    this.onClickChildDeleteReview = this.onClickChildDeleteReview.bind(this);
    this.onClickShowSpotLink = this.onClickShowSpotLink.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.onClickGoBack = this.onClickGoBack.bind(this);

    this.renderReserveButton = this.renderReserveButton.bind(this);

    this.renderComment = this.renderComment.bind(this);
    this.renderItemComment = this.renderItemComment.bind(this);
    this.renderFurtherReadings = this.renderFurtherReadings.bind(this);
    this.renderSuggest = this.renderSuggest.bind(this);
    this.getSpotList = this.getSpotList.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  render() {
    if (this.state.html === '' || this.state.isLoadding) {
      return (
        <View style={{ flex: 1, paddingBottom: this.state?.paddingBottom }}>
          <BaseHeaderWithSearch
            isFromDetail
            showBack
            backgroundColorWhite
            showSuggest
            color={COLOR.appColor}
            onLeftPress={this.onBack.bind(this)}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            {this.renderGeneralBlogDetail()}
            <SkypeIndicator
              color={COLOR.appColor}
              size={30 * WIDTH_SCALE_RATIO}
              style={{
                paddingTop: 18 * HEIGHT_SCALE_RATIO,
                paddingBottom: 16 * HEIGHT_SCALE_RATIO,
              }}
            />
          </ScrollView>
          {this.state?.spotLink.length > 0 && this.renderReserveButton()}
        </View>
      );
    }
    return (
      <View style={{ flex: 1, paddingBottom: this.state?.paddingBottom }}>
        <BaseHeaderWithSearch
          isFromDetail
          showBack
          backgroundColorWhite
          showSuggest
          color={COLOR.appColor}
          onLeftPress={this.onBack.bind(this)}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderGeneralBlogDetail()}
          {this.renderContentBlogDetail()}
          <View style={{ minHeight: 40 }} />
          {this.renderCommentAndFurther()}
          {this.state?.spotLink.length > 0 && <View style={{ minHeight: 40 }} />}
        </ScrollView>
        {this.state?.spotLink.length > 0 && this.renderReserveButton()}
      </View>
    );
  }
  componentDidMount = async () => {
    analytics().setCurrentScreen('Blog-Detail');
    //*content Blog detail
    await this.getBlog();
    this.getReviews();
    this.getSpotList();
  };

  UNSAFE_componentWillMount() {
    clearTimeout(this.getBlogTimeout);
    clearTimeout(this.getReviewTimeout);
    clearTimeout(this.getSpotListTimeout);
  }

  bookingReserveInBlogDetail() {
    if (globalUtils.isLogin) {
      Actions.reserveSpot({
        spotCode: Number(globalUtils.spotCode),
        requireInfo: this.state?.requireInfo,
      });
    } else {
      myAlert('', 'Login required.', () => {
        globalUtils.isBackToBlogDetail = true;
        globalUtils.spotDetail = {
          type: Const.ReserveType.Stand.code,
          spot: this.state?.spot,
        };
        Actions.jump('login');
      });
    }
  }

  hideSpinner = () => {
    this.setState({ visible: false });
  };

  onClickGoBack() {
    Actions.pop();
  }

  renderComment() {
    return (
      <View>
        <Divider style={{ marginVertical: 16 * HEIGHT_SCALE_RATIO }} />
        <View
          style={{
            paddingTop: 12 * HEIGHT_SCALE_RATIO,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={ICON.CHAT_ICON} resizeMode="contain" style={styles.icon2} />
          <PText style={[style.textTitle, { paddingLeft: 8 * WIDTH_SCALE_RATIO }]}>
            {RootStore.i18n.t('blog.detail.reviews')}
          </PText>
        </View>
        {/* rating app */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12 * HEIGHT_SCALE_RATIO,
            marginLeft: (24 + 8) * WIDTH_SCALE_RATIO,
          }}>
          <PText style={style.textHeader}>{this.state?.rating}</PText>
          <View style={{ marginLeft: 15 * WIDTH_SCALE_RATIO }}>
            <PText
              style={[
                style.textCaption,
                {
                  color: COLOR.GREY40,
                  fontSize: style.textCaption.fontSize - 1,
                },
              ]}>
              {RootStore.i18n.t('review.review-count', {
                count: this.state?.reviewCount,
              })}
            </PText>
          </View>
        </View>
        {!RootStore.auth.isGuest && <ReviewInput registReview={this.onClickRegistReview} />}
        {this.renderItemComment()}
        <PText>{this.state?.existOther}</PText>
        {this.state?.existOther && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this.getReviews}>
            <PText style={style.textButtonOutLine}>
              {RootStore.i18n.t('spot.show-all-review')}
            </PText>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  renderItemComment = () => {
    return (
      <PFlatList
        extraData={this.state}
        data={this.state?.reviews}
        renderItem={this.renderItemReview()}
      />
    );
  };

  renderFurtherReadings = () => {
    return (
      <View
        style={{
          marginBottom: 30 * HEIGHT_SCALE_RATIO,
        }}>
        <Divider style={{ marginVertical: 16 * HEIGHT_SCALE_RATIO }} />
        <View
          style={{
            paddingTop: 16 * HEIGHT_SCALE_RATIO,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Image source={ICON.LIKE_ICON} resizeMode="contain" style={styles.icon2} />
            <View style={{ flex: 1 }} />
          </View>

          <View>
            <PText
              style={[
                style.textTitle,
                { paddingLeft: 8 * WIDTH_SCALE_RATIO, lineHeight: 24 * HEIGHT_SCALE_RATIO },
              ]}>
              {RootStore.i18n.t('spot.further-readings')}
            </PText>
          </View>
        </View>
        <PFlatList
          data={this.state?.suggestSpot}
          renderItem={this.renderSuggest}
          horizontal
          contentContainerStyle={{ marginTop: 16 * HEIGHT_SCALE_RATIO }}
        />
      </View>
    );
  };

  renderSuggest = ({ item, index }) => {
    return <FurtherReadingItem item={item} index={index} suggestSpot={this.state?.suggestSpot} />;
  };

  onClickShareButton = () => {
    this.setState({ modalShare: !this.state?.modalShare });
  };

  onClickHeart = async () => {
    if (RootStore.auth.id === '') {
      return;
    }
    const variables = {
      nowState: this.state?.isLike,
      where: 'blog',
      code: this.state?.blog?.code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });
    if (result.data.changeLike) {
      this.setState({ isLike: !this.state?.isLike });
    }
  };

  onClickRegistReview = async review => {
    if (globalUtils.isLogin) {
      const variables = {
        where: 'blog',
        code: this.props.blogCode,
        star_rating: 0,
        content: review.content,
        language: RootStore.language,
      };

      const result = await RootStore.client.mutate({
        mutation: createReview,
        variables,
      });

      if (result.data.createReview.result) {
        const reviews = this.state?.reviews;
        const reviewCount = this.state?.reviewCount + 1;

        const data = { ...result.data.createReview.review };
        data.childReview = [];

        const found =
          result.data &&
          result.data.createReview &&
          result.data.createReview.review &&
          result.data.createReview.review.translations &&
          result.data.createReview.review.translations.find(
            item => item.language === RootStore.language,
          );
        const defaultTranslation =
          result.data &&
          result.data.createReview &&
          result.data.createReview.review &&
          result.data.createReview.review.translations &&
          result.data.createReview.review.translations.find(item => item.language === 'en');
        if (found) {
          data.translations = found;
        } else {
          data.translations = defaultTranslation;
        }

        data.writer = {
          nickname: RootStore.auth.nickname,
          picture: RootStore.auth.picture,
          id: RootStore.auth.id,
        };

        reviews.unshift(data);
        this.setState({ reviews, reviewCount });
      }
    } else {
      myAlert('', 'Login required.', () => {
        globalUtils.isBackToBlogDetail = true;
        globalUtils.isComment = true;
        globalUtils.blogCode = this.props.blogCode;

        Actions.jump('login');
      });
    }
  };

  //*call from reviewItem
  onClickDeleteReview = async review => {
    const result = await RootStore.client.mutate({
      mutation: deleteReview,
      variables: { code: review.code },
    });

    if (result.data.deleteReview.result) {
      const reviews = this.state?.reviews;
      const reviewCount = this.state?.reviewCount - 1;

      const index = reviews.indexOf(review);
      if (index !== -1) {
        reviews.splice(index, 1);
      }

      this.setState({ reviews, reviewCount });
    }
  };

  //* call from reviewItem
  onClickCreateReplyForm = async index => {
    const reviews = this.state?.reviews;
    reviews[index].addReply = true;

    this.setState({ reviews: [...reviews] });
  };
  //*call from reviewItem
  isDeleteable = review => {
    if (RootStore.auth.level >= Const.MemberLevel.AdminMax.code) {
      return true;
    }

    if (RootStore.auth.id === review.writer.id) {
      return true;
    }

    return false;
  };
  //*call from reviewItem

  onClickChildRegistReview = async (review, code, index) => {
    const variables = {
      where: 'review',
      parentWhere: 'blog',
      code,
      parentCode: this.props.blogCode,
      star_rating: 0,
      content: review.content,
      language: RootStore.language,
    };
    const result = await RootStore.client.mutate({
      mutation: createReview,
      variables,
    });

    if (result.data.createReview.result) {
      const reviews = this.state?.reviews;
      const data = { ...result.data.createReview.review };
      const found =
        result.data &&
        result.data.createReview &&
        result.data.createReview.review &&
        result.data.createReview.review.translations &&
        result.data.createReview.review.translations.find(
          item => item.language === RootStore.language,
        );
      const defaultTranslation =
        result.data &&
        result.data.createReview &&
        result.data.createReview.review &&
        result.data.createReview.review.translations &&
        result.data.createReview.review.translations.find(item => item.language === 'en');
      if (found) {
        data.translations = [found];
      } else {
        data.translations = [defaultTranslation];
      }
      data.writer = {
        nickname: RootStore.auth.nickname
          ? RootStore.auth.nickname
          : RootStore.i18n.t('global.unknown-contributor'),
        picture: RootStore.auth.picture,
        id: RootStore.auth.id,
      };

      reviews[index].childReview.unshift(data);
      reviews[index].addReply = false;
      const reviewCount = this.state?.reviewCount + 1;

      this.setState({ reviews, reviewCount });
    }
  };
  //*call from reviewItem

  onClickChildDeleteReview = async (review, child) => {
    const result = await RootStore.client.mutate({
      mutation: deleteReview,
      variables: { code: child.code },
    });

    if (result.data.deleteReview.result) {
      const reviews = this.state?.reviews;
      const reviewCount = this.state?.reviewCount - 1;

      const index = reviews.indexOf(review);
      if (index !== -1) {
        const childIndex = reviews[index].childReview.indexOf(child);

        if (childIndex !== -1) {
          reviews[index].childReview.splice(childIndex, 1);
        }
      }
      this.setState({ reviews, reviewCount });
    }
  };

  onClickShowSpotLink = () => {
    if (this.state?.spotLink.length === 1) {
      Actions.spotDetail({ spotCode: this.state?.spotLink[0].code });
      return;
    }
    Actions.blogSpotLink({
      spotLink: this.state?.spotLink,
    });
  };

  renderItemReview() {
    return ({ item, index }) => {
      return (
        <ReviewItem
          review={item}
          index={index}
          onRegistReview={this.onClickRegistReview}
          this={this}
        />
      );
    };
  }

  onClickGoReserve() {
    if (this.state?.spotLink) {
      Actions.blogSpotReserve({
        spotLink: this.state?.spotLink.filter(e => e && e.spot && e.spot.reserve_info),
      });
    }
  }
  getSpotList = async () => {
    const variables = {
      isRecommend: true,
      languages: [RootStore.language],
      limit: 5,
      order: Const.OrderType.Rand.name,
    };

    const result = await RootStore.client.query({
      query: getSpotListNew,
      variables,
    });
    this.setState({
      suggestSpot: result.data.getSpotListNew.spots,
    });
  };
  getBlog = async () => {
    const variables = {
      code: this.props.blogCode,
      language: RootStore.language,
    };
    const result = await RootStore.client.query({
      query: getBlogInfo,
      variables,
    });

    const blog = result.data.getBlogDetail.blog;

    let rating = 0.0;
    let reviewCount = 0;

    if (blog.spot && blog.spot.length > 0) {
      if (blog.spot[0].rating_review_count > 0) {
        const ratingResult = blog.spot[0].review_total_score / blog.spot[0].rating_review_count;
        rating = ratingResult.toFixed(1);
      } else {
        rating = Const.Default.Spot_Rating;
      }
    }
    reviewCount = blog.review_count;
    const cityTags = blog.tags.filter(v => v && v.type && v.type === Const.TagType.City.code);
    const interestTags = blog.tags.filter(
      v => v && v.type && v.type === Const.TagType.Interest.code,
    );

    const defaultTransData = blog.translations.find(t => t.is_default);
    const isTransData = blog.translations.find(t => t.language === RootStore.language);

    const title = isTransData ? isTransData.title : defaultTransData.title;
    const subTitle = isTransData ? isTransData.sub_title : defaultTransData.sub_title;
    const content = isTransData ? isTransData.content : defaultTransData.content;

    let isLike = false;
    if (blog.like) {
      isLike = true;
    }

    const writer = {
      nickname: blog.writer.nickname,
      picture: blog.writer.picture,
    };

    const html = htmlBlog(content);

    let spotLink = [];
    let isReserveable = false;
    let reserveType = 0;
    if (blog.spots && blog.spots.length > 0) {
      const links = blog.spots;
      spotLink = links.map(v => {
        const defaultTrans = v.translations.find(t => t.is_default);
        const trans = v.translations.find(t => t.language === RootStore.language);

        const name = trans ? trans.spot_name : defaultTrans.spot_name;
        const precautions = trans ? trans.precautions : defaultTrans.precautions;

        return {
          city: '',
          interest: '',
          images: v.images ? v.images[0].url : '',
          updated_at: v.updated_at ? v.updated_at : 0,
          code: v.code,
          spot: v,
          name,
          precautions,
          is_active: v.reserve_info ? v.reserve_info.is_active : 0,
          type: v.reserve_info ? v.reserve_info.type : Const.ReserveType.Stand.code,
          outsideURL: v.reserve_info ? v.reserve_info.outside_url : '',
        };
      });

      if (spotLink.length > 0) {
        spotLink.forEach(v => {
          if (v.is_active) {
            reserveType = v.type;
            isReserveable = true;
          }
        });
      }
    }

    this.setState({
      blog,
      cityTags,
      interestTags,
      title,
      subTitle,
      html,
      isLike,
      rating,
      writer,
      reviewCount,
      spotLink,
      reserveType,
      isReserveable,
      isLoadding: false,
    });
  };
  getReviews = async () => {
    if (!this.state?.existOther) {
      return;
    }
    const variables = {
      where: 'blog',
      code: this.props.blogCode,
      offset: PAGING_LIMIT * this.state?.offset,
      limit: PAGING_LIMIT,
      language: RootStore.language,
    };
    const result = await RootStore.client.query({
      query: getReviewlist,
      variables,
    });
    const reviewList = [];
    result.data.getReviewList.reviews.forEach((v, i) => {
      const checkLang = v.translations.find(rt => rt.language === RootStore.language);
      const translations = checkLang || v.translations[0];
      reviewList.push({ ...v, translations });
    });
    const reviews = this.state?.reviews.concat(reviewList);
    let existOther = true;
    if (result.data.getReviewList.reviews.length < PAGING_LIMIT) {
      existOther = false;
    }
    this.setState({ reviews, offset: this.state?.offset + 1, existOther });
  };

  renderReserveButton = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
          paddingBottom: 8 * WIDTH_SCALE_RATIO,
        }}>
        <Divider style={{ marginBottom: 8 * HEIGHT_SCALE_RATIO }} />
        {/* 링크된 스팟 하나일 때, 예약 종류는 일반 예약일때 */}
        {this.state?.spotLink.length === 1 &&
          this.state?.reserveType === Const.ReserveType.Stand.code &&
          this.state?.isReserveable && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  grey
                  isLike={this.state?.isLike}
                  click={this.onClickHeart.bind(this, !this.state?.isLike)}
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state?.blog}
                  isBlog
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MyTouchableOpacity
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickShowSpotLink.bind(this, Const.ReserveType.Stand.code)}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('blog.go-reserve')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        {/* 링크된 스팟 하나일 때, 예약 종류는 일반 예약일때 */}
        {this.state?.spotLink.length === 1 &&
          this.state?.reserveType === Const.ReserveType.MemberBenefit.code &&
          this.state?.isReserveable && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16 * WIDTH_SCALE_RATIO,

                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15 * WIDTH_SCALE_RATIO,
                }}>
                <HeartButton
                  grey
                  isLike={this.state?.isLike}
                  click={this.onClickHeart.bind(this, !this.state?.isLike)}
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state?.blog}
                  isBlog
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
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
                    {RootStore.i18n.t('blog.go-benefit')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        {/* 링크된 스팟 하나일 때, 예약 종류는 일반 예약일때 */}
        {this.state?.spotLink.length === 1 &&
          this.state?.reserveType === Const.ReserveType.Outside.code &&
          this.state?.isReserveable && (
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
                  grey
                  isLike={this.state?.isLike}
                  click={this.onClickHeart.bind(this, !this.state?.isLike)}
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state?.blog}
                  isBlog
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
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
                    {RootStore.i18n.t('blog.go-url')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        {this.state?.spotLink.length === 1 &&
          this.state?.reserveType === Const.ReserveType.Coupon.code &&
          this.state?.isReserveable && (
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
                  grey
                  isLike={this.state?.isLike}
                  click={this.onClickHeart.bind(this, !this.state?.isLike)}
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state?.blog}
                  isBlog
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MyTouchableOpacity
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickShowSpotLink.bind(this, Const.ReserveType.Coupon.code)}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('blog.go-benefit')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        {this.state?.spotLink.length === 1 &&
          this.state?.reserveType === Const.ReserveType.Shopping.code &&
          this.state?.isReserveable && (
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
                  grey
                  isLike={this.state?.isLike}
                  click={this.onClickHeart.bind(this, !this.state?.isLike)}
                  size={25 * WIDTH_SCALE_RATIO}
                  data={this.state?.blog}
                  isBlog
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MyTouchableOpacity
                  style={[
                    style.button,
                    { height: style.button.height * 1.2, width: style.button.width * 1.1 },
                  ]}
                  rounded
                  onPress={this.onClickShowSpotLink.bind(this, Const.ReserveType.Stand.code)}>
                  <PText
                    uppercase={false}
                    style={[ptText.BODY1, { textAlign: 'center', color: COLOR.WHITE }]}>
                    {RootStore.i18n.t('buy-now')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          )}
        {/* 링크된 스팟 여러개 있을 때 */}
        {/* phat button review reservation */}
        {this.state?.spotLink.length > 1 && this.state?.isReserveable && (
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
                grey
                isLike={this.state?.isLike}
                click={this.onClickHeart.bind(this, !this.state?.isLike)}
                size={25 * WIDTH_SCALE_RATIO}
                data={this.state?.blog}
                isBlog
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
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
                  {RootStore.i18n.t('blog.go-reserve')}
                </PText>
              </MyTouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };
  getRequireInfo = async spotCode => {
    const variables = {
      code: spotCode,
      is_confirm: true,
      language: RootStore.language,
    };
    const result = await RootStore.client.query({
      query: getSpotDetail,
      variables,
    });
    const spot = result.data.getSpotDetail.spot;
    const requireInfo = spot && spot.reserve_info && spot.reserve_info;
    this.setState({ requireInfo });
  };

  onNavigationStateChange = async navState => {
    if (this.isFirstTime) {
      return;
    }
    console.log('29148 kamehameha onNavigationStateChange navState:', navState);
    if (navState && navState.url !== 'about:blank' && navState.url !== this.state?.html) {
      await this.webView.webview.stopLoading();
      this.webView.webview.goBack();
      if (navState.url.includes('http')) {
        if (navState.url.includes(`/blog/`)) {
          console.log(
            '29148 kamehameha onNavigationStateChange vo /blog/ ne:',
            navState,
            this.isFirstTime,
          );

          if (!this.isFirstTime) {
            this.isFirstTime = true;
            setTimeout(() => {
              this.isFirstTime = false;
            }, 3000);
            const tempString = navState.url.split('/blog/');
            const getBlogCode = tempString[1].split('/');
            Actions.blogDetail({ blogCode: Number(getBlogCode[0]) });
          }
        } else if (navState.url.includes(`/spot/`)) {
          console.log(
            '29148 kamehameha onNavigationStateChange vo /spot/ ne:',
            navState,
            this.isFirstTime,
          );
          if (!this.isFirstTime) {
            this.isFirstTime = true;
            setTimeout(() => {
              this.isFirstTime = false;
            }, 3000);
            const tempString = navState.url.split('/spot/');
            const getspotCode = tempString[1].split('/');
            Actions.spotDetail({ spotCode: Number(getspotCode[0]) });
          }
        } else if (navState.url.includes(`/mypage`)) {
          Actions.jump('myPage');
        } else if (navState.url.includes(`/reserve/`)) {
          if (!this.isFirstTime) {
            this.isFirstTime = true;
            setTimeout(() => {
              this.isFirstTime = false;
            }, 3000);
            const tempString = navState.url.split('/reserve/');
            const getspotCode = tempString[1].split('/');
            await this.getRequireInfo(Number(getspotCode[0]));
            globalUtils.spotCode = Number(getspotCode[0]);
            globalUtils.blogCode = this.props.blogCode;
            this.bookingReserveInBlogDetail();
          }
        } else {
          console.log(
            '29148 kamehameha onNavigationStateChange vo ELSE ne:',
            navState,
            this.isFirstTime,
          );
          this.refs.modalWebView.open(navState.url);
        }
      }
    }
  };

  onBack = () => {
    if (this.state?.canGoBack && this.webView && this.webView.webview) {
      this.webView.webview.goBack();
    } else {
      Actions.pop();
    }
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
              myAlert(
                'Install notice',
                'Your device not install this application, please install Whatsapp and try again',
              );
            }
          });
        } else {
          console.log(Linking.canOpenURL('whatsapp:'));
          Linking.canOpenURL('whatsapp:').then(isInstalled => {
            if (isInstalled) {
              Share.shareSingle({
                social: Share.Social.WHATSAPP,
                url: shareOptions.message,
                ...shareOptions,
              });
            } else {
              myAlert(
                'Install notice',
                'Your device not install this application, please install Whatsapp and try again',
              );
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
                ...shareOptions,
              });
            } else {
              myAlert(
                'Install notice',
                'Your device not install this application, please install Instagram and try again',
              );
            }
          });
        } else {
          Linking.canOpenURL('instagram:').then(isInstalled => {
            if (isInstalled) {
              Share.shareSingle({
                social: Share.Social.INSTAGRAM,
                url: shareOptions.message,
                ...shareOptions,
              });
            } else {
              myAlert(
                'Install notice',
                'Your device not install this application, please install Instagram and try again',
              );
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
        break;
      }
    }
  };
  renderShare = () => {
    return (
      <Modal
        isVisible={this.state?.modalShare}
        onBackdropPress={() => this.setState({ modalShare: false })}
        backdropColor="#00000060"
        animationIn="fadeInUp"
        animationInTiming={500}
        animationOutTiming={0}
        onSwipeComplete={() => {
          this.setState({ modalShare: false });
        }}
        onRequestClose={() => {
          this.setState({ modalShare: false });
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
              this.setState({ modalShare: false });
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
  renderIconShare = (icon, social) => {
    const shareOptions = {
      title: `${Util.encodeURI(this.state?.title)}`,
      message: `https://www.creatrip.com/${
        RootStore.language === 'zh-TW' ? '' : RootStore.language + '/'
      }blog/${this.props.blogCode}/${Util.encodeURI(this.state?.title)}`,
    };
    return (
      <MyTouchableOpacity
        onPress={() => {
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
            Share.open(shareOptions)
              .then(value => console.log(value))
              .catch(reason => this.onCancel());
          } else {
            this.shareSocialOptions(shareOptions, social);
          }
        }}
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
  onCancel = () => {
    this.setState({ modalShare: false });
  };

  renderCommentAndFurther() {
    return (
      <View
        style={{
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          {!RootStore.auth.isGuest && this.renderComment()}
        </KeyboardAvoidingView>

        {this.state?.suggestSpot.length > 0 ? this.renderFurtherReadings() : null}
        <View
          style={{
            height:
              this.state?.suggestSpot.length > 0
                ? 60 * HEIGHT_SCALE_RATIO
                : 90 * HEIGHT_SCALE_RATIO,
          }}
        />
      </View>
    );
  }

  renderContentBlogDetail() {
    return (
      <>
        <MyWebView ref="modalWebView" />
        <WebViewAutoHeight
          onNavigationStateChange={this.onNavigationStateChange}
          originWhitelist={['*']}
          source={{ html: this.state?.html }}
          ref={webView => (this.webView = webView)}
          javaScriptEnabled
          domStorageEnabled
          this={this}
          onLoad={() => this.hideSpinner()}
        />
        {this.state?.visible && (
          <ActivityIndicator
            style={{ position: 'absolute', top: HEIGHT / 2, left: WIDTH / 2, right: WIDTH / 2 }}
          />
        )}
      </>
    );
  }

  renderGeneralBlogDetail() {
    return (
      <View style={styles.content}>
        {(this.state?.title || this.state?.textSubTitle) && (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {this.renderShare()}
              <PText
                style={[
                  style.textTitle,
                  { textAlign: 'left', paddingRight: 10 * WIDTH_SCALE_RATIO },
                ]}>
                {this.state?.title}
              </PText>
            </View>
            <PText style={[style.textSubTitle, {}]}>{this.state?.subTitle}</PText>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            marginTop: 35 * HEIGHT_SCALE_RATIO,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              paddingRight: 10 * WIDTH_SCALE_RATIO,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MyImage
              source={
                this.state?.blog?.writer?.picture
                  ? { uri: `${this.state?.blog?.writer?.picture}` }
                  : IMAGE.DEFAULT_PROFILE_IMAGE
              }
              style={{
                width: 40 * WIDTH_SCALE_RATIO,
                height: 40 * WIDTH_SCALE_RATIO,
                borderRadius: 20 * WIDTH_SCALE_RATIO,
              }}
            />
            <View style={{ marginLeft: 10 * WIDTH_SCALE_RATIO, width: '60%' }}>
              <PText style={[style.textCaption, { color: COLOR.GREY80 }]}>
                {this.state?.writer.nickname}
              </PText>
              <TimeAgo
                time={this.state?.blog?.created_at}
                style={[
                  style.textCaption,
                  ptColor.GREY40,
                  {
                    fontSize: style.textCaption.fontSize - 1,
                  },
                ]}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: 16 * HEIGHT_SCALE_RATIO,
              }}>
              <HeartButton
                size={24}
                isLike={this.state?.isLike}
                click={this.onClickHeart.bind(this, !this.state?.isLike)}
                grey
                data={this.state?.blog}
                isBlog
              />
            </View>
            <MyTouchableOpacity
              style={{ alignItems: 'flex-end' }}
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
      </View>
    );
  }
}

BlogDetail.propTypes = {
  blogCode: PropTypes.number,
};

const styles = StyleSheet.create({
  icon2: {
    tintColor: COLOR.GREY60,
    height: 24 * WIDTH_SCALE_RATIO,
    width: 24 * WIDTH_SCALE_RATIO,
  },
  content: {
    padding: 16,
  },
});
