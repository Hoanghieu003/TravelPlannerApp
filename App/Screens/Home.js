import analytics from '@react-native-firebase/analytics';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FlatList, Image, ScrollView, View, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Feather from 'react-native-vector-icons/dist/Feather';
import Const from '../../Common/Const';
import BaseHeader from '../Components/BaseHeader';
import CustomSearchBar from '../Components/CustomSearchBar';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import SuggestWrapper from '../Components/SuggestWrapper';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, heightBottomBar, ptColor, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { IMAGE } from '../../asset/image/ImagePath';
import globalUtils from '../Constants/globalUtils';
import SearchModal from '../Components/SearchModal';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      text: '',
      visible: false,
      showSearch: false,
      showSuggest: false,
    };
    this.listCategory = [
      {
        title: RootStore.i18n.t('home.travel'),
        image: IMAGE.TRAVEL_IMAGE,
        onPress: async () => Actions.push('travel'),
      },
      {
        title: RootStore.i18n.t('proxy-shopping'),
        image: IMAGE.PROXYSHOPPING_IMAGE,
        onPress: () => Actions.push('proxyShopping', { hideTabBar: true }),
      },
      {
        title: RootStore.i18n.t('home.korea-news'),
        image: IMAGE.NEWS_IMAGE,
        onPress: () =>
          Actions.push('cultureNews', {
            search: '',
            hideCategory: true,
            advertiseType: 10,
            postType: Const.PostType.Blog.code,
          }),
      },

      {
        title: RootStore.i18n.t('home.currency-rate'),
        image: IMAGE.CURRENCY_IMAGE,
        onPress: this.onClickExchange.bind(this),
      },
    ];
    this.listInterested = [
      {
        title: RootStore.i18n.t('home.title-suggest-one'),
        content: RootStore.i18n.t('home.content-suggest-one'),
        image: IMAGE.ACTIVITY_IMAGE,
        onPress: () => {
          //travel --> reservation --> activity screen
          Actions.push('travel', {
            suggestScreen: Const.ScreenInTravel.RESERVATIONSCREEN.code,
            parentCategory: Const.DefaultParentCategorySuggest.ACTIVITIES,
          });
        },
      },
      {
        title: RootStore.i18n.t('home.title-suggest-two'),
        content: RootStore.i18n.t('home.content-suggest-two'),
        image: IMAGE.CAFE_IMAGE,
        onPress: () => {
          //travel --> coupon --> Food --> cafe
          Actions.push('travel', {
            suggestScreen: Const.ScreenInTravel.COUPONSCREEN.code,
            parentCategory: Const.DefaultParentCategorySuggest.FOOD,
            childrenCategory: Const.DefaultChildrenCategorySuggest.CAFE,
          });
        },
      },
      {
        title: RootStore.i18n.t('home.title-suggest-three'),
        content: RootStore.i18n.t('home.content-suggest-three'),
        image: IMAGE.FOOD_DISCOUNT_IMAGE,
        onPress: () => {
          //travel --> coupon --> Food --> Must eats
          Actions.push('travel', {
            suggestScreen: Const.ScreenInTravel.COUPONSCREEN.code,
            parentCategory: Const.DefaultParentCategorySuggest.FOOD,
            childrenCategory: Const.DefaultChildrenCategorySuggest.MUSTEATS,
          });
        },
      },
      {
        title: RootStore.i18n.t('home.title-suggest-four'),
        content: RootStore.i18n.t('home.content-suggest-four'),
        image: IMAGE.FOOD_DELIVERY_IMAGE,
        onPress: () => {
          //travel --> reservation --> Food --> delivery

          Actions.push('travel', {
            suggestScreen: Const.ScreenInTravel.RESERVATIONSCREEN.code,
            parentCategory: Const.DefaultParentCategorySuggest.FOOD,
            childrenCategory: Const.DefaultChildrenCategorySuggest.DELIVERY,
          });
        },
      },
      {
        title: RootStore.i18n.t('home.title-suggest-five'),
        content: RootStore.i18n.t('home.content-suggest-five'),
        image: IMAGE.PROXY_IMAGE,
        onPress: () => {
          //just go shopping
          Actions.push('proxyShopping', { hideTabBar: true });
        },
      },
      {
        title: RootStore.i18n.t('home.title-suggest-six'),
        content: RootStore.i18n.t('home.content-suggest-six'),
        image: IMAGE.TIPS_IMAGE,
        onPress: () => {
          Actions.push('plusInformation', { isShowHeader: true });
        },
      },
    ];

    this.onClickGoSearch = this.onClickGoSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }
  render() {
    console.log('cường xem ngôn ngữ gì', RootStore.language);
    return (
      <View style={style.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
            paddingBottom: heightBottomBar + 30,
            paddingTop: 35 * HEIGHT_SCALE_RATIO,
          }}>
          {this.renderSearch()}
          {this.renderCategory()}
          {this.renderInterested()}
        </ScrollView>
        {this.state.showSuggest ? <Fragment /> : this.renderHeader()}
        <SearchModal
          visible={this.state.showSuggest}
          isHomePage
          isFromSearch={false}
          onClose={() =>
            this.setState({
              search: '',
              text: '',
              visible: false,
              showSearch: false,
              showSuggest: false,
            })
          }
        />
      </View>
    );
  }

  closeSearch = () => {
    this.setState(
      {
        showSearch: false,
      },
      () => {
        if (this.searchBarRef) {
          this.searchBarRef.onClearText();
        }
      },
    );
  };

  renderSearch = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ showSuggest: true }, () => console.log('hahah click rồi nè 0309'));
        }}>
        <View
          style={{
            marginVertical: 28 * HEIGHT_SCALE_RATIO,
            paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
          }}>
          <CustomSearchBar
            ref={(instance) => (this.searchBarRef = instance)}
            initialSearchText={null}
            onChangeCity={() => { }}
            onClickGoSearch={this.onClickGoSearch}
            onTextChanged={(text) => {
              if (this.suggestWrapperRef) {
                this.suggestWrapperRef.onUpdateSearchList(text);
              }
            }}
            onFocusFunc={() => this.setState({ showSuggest: true })}
            hideClearSearch
            searchPlaceHolderText={'KOREA YOUR WAY'}
            backgroundColorWhite={null}
            isHomePage
          />
        </View>
      </TouchableOpacity>
    );
  };

  onClickCategory = (search) => {
    globalUtils.isFromHomeScreen = true;
    Actions.push('search', {
      hideCategory: true,
      isFromHomeScreen: true,
    });
  };
  onClickExchange = () => {
    Actions.exchange();
  };
  componentDidMount = () => {
    analytics().setCurrentScreen('HomeScreen');
  };
  renderItem = ({ item }) => {
    return (
      <MyTouchableOpacity
        onPress={item.onPress}
        style={{
          width: 168 * WIDTH_SCALE_RATIO,
          height: 168 * WIDTH_SCALE_RATIO,
          alignItems: 'flex-start',
          borderRadius: 3 * WIDTH_SCALE_RATIO,
        }}>
        <Image
          source={item.image}
          style={{
            alignSelf: 'center',
            width: 168 * WIDTH_SCALE_RATIO,
            height: 168 * WIDTH_SCALE_RATIO,
            borderRadius: 3 * WIDTH_SCALE_RATIO,
            position: 'absolute',
          }}
          resizeMode="contain"
        />
        <PText
          style={[
            style.textTitle,
            ptColor.GREY80,
            {
              padding: 16 * HEIGHT_SCALE_RATIO,
              width: '100%',
              textTransform: 'uppercase',
            },
          ]}>
          {item.title}
        </PText>
      </MyTouchableOpacity>
    );
  };

  renderItemInterested = ({ item }) => {
    return (
      <MyTouchableOpacity
        onPress={item.onPress}
        style={{ width: WIDTH, marginTop: 10 * HEIGHT_SCALE_RATIO }}>
        <View
          style={{
            flexDirection: 'row',
            width: WIDTH,
            justifyContent: 'space-between',
            paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '70%',
            }}>
            <Image
              source={item.image}
              style={{
                alignSelf: 'center',
                width: 88 * WIDTH_SCALE_RATIO,
                height: 88 * WIDTH_SCALE_RATIO,
                borderRadius: 8 * WIDTH_SCALE_RATIO,
              }}
              resizeMode="contain"
            />
            <View style={{ marginLeft: 20 * WIDTH_SCALE_RATIO }}>
              <PText
                numberOfLines={1}
                style={(ptText.BODY1, { color: COLOR.GREY80, textTransform: 'uppercase' })}>
                {item.title}
              </PText>
              <PText numberOfLines={1} style={(ptText.SMALL1, { color: COLOR.GREY40 })}>
                {item.content}
              </PText>
            </View>
          </View>

          <View style={{ alignSelf: 'center', marginRight: 12 * WIDTH_SCALE_RATIO }}>
            <Feather name="arrow-right" size={20} color={COLOR.GREY40} />
          </View>
        </View>
      </MyTouchableOpacity>
    );
  };

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
      Actions.push('search', {
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

  renderInterested = () => {
    return (
      <View>
        <PText style={[ptText.H2, { color: COLOR.GREY80, paddingLeft: 8 * WIDTH_SCALE_RATIO }]}>
          {RootStore.i18n.t('home.suggest-keyword')}
        </PText>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item) => `key-${item.title}`}
          showsHorizontalScrollIndicator={false}
          data={this.listInterested}
          renderItem={this.renderItemInterested}
        />
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={{ position: 'absolute' }}>
        <BaseHeader
          styleContent={{ backgroundColor: '#ffff', paddingRight: 4 }}
          noShadow
          children={
            <MyTouchableOpacity onPress={this.onLogoPress}>
              <Image
                source={IMAGE.LOGO_PRIMARY}
                style={{ alignSelf: 'center', height: 25 * HEIGHT_SCALE_RATIO }}
                resizeMode="contain"
              />
            </MyTouchableOpacity>
          }
        />
      </View>
    );
  };

  renderCategory = () => {
    return (
      <FlatList
        scrollEnabled={false}
        bounces={false}
        keyExtractor={(item) => `key-${item.title}`}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        data={this.listCategory}
        numColumns={2}
        renderItem={this.renderItem}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        contentContainerStyle={[{ paddingBottom: 56 * HEIGHT_SCALE_RATIO }]}
      />
    );
  };
}
Home.propTypes = {
  RootStore: PropTypes.object,
};
