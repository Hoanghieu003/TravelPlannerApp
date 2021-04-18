import { observer } from 'mobx-react';
import { View } from 'native-base';
import React from 'react';
import { DeviceEventEmitter, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Highlighter from 'react-native-highlight-words';
import { mergeArraysWithKey } from '../../Common/arrayUtils';
import Const from '../../Common/Const';
import getSearchTag from '../../Common/gql/queries/getSearchTag.gql';
import getTagRecommendList from '../../Common/gql/queries/getTagRecommendList.gql';
import { HEIGHT, HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import globalUtils from '../Constants/globalUtils';
import style, { COLOR, fontSize, FS, iconSize, ptText } from '../Constants/styles';
import { TAB } from '../Screens/Search';
import RootStore from '../Stores/RootStore';
import BaseHeader from './BaseHeader';
import CustomSearchBar from './CustomSearchBar';
import MyTouchableOpacity from './MyTouchableOpacity';
import PFlatList from './PFlatList';
import PText from './PText';
import { ICON, IMAGE } from '../../asset/image/ImagePath';
import SearchModal from './SearchModal';

@observer
class BaseHeaderWithSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTagsList: [],
      showSearch: false,
      showSearchList: false,
      city: '',
      suggest: [],
      selectedTag: null,
      selectedCategory: null,
      selectedFilterType: null,
      searchText: '',
    };

    this.onTextUpdate = this.onTextUpdate.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.reqSearchList = this.reqSearchList.bind(this);
    this.onClickGoBack = this.onClickGoBack.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.onClickGoSearch = this.onClickGoSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
  }

  closeSearch = () => {
    console.log('29148 : BaseHeaderWithSearch -> closeSearch -> closeSearch');
    this.setState(
      {
        showSearchList: false,
        showSearch: false,
        selectedTag: null,
      },
      () => {
        if (this.searchBarRef) {
          this.searchBarRef.onChangeText('');
        }
        if (this.props.onCloseSearch) {
          this.props.onCloseSearch();
        }
      },
    );
  };

  async componentDidMount() {
    //get city name from storage;
    //if it is first time then cityNameFromStorage will be null => we will show "City" in search bar
    //if user select another city, cityNameFromStorage will have a value and from then, it will search a city name.

    DeviceEventEmitter.addListener('closeSearchBar', this.closeSearch);
    await this.search().catch((e) => {});
    if (this.searchBarRef) {
      this.searchBarRef.setState({
        search: this.props.initialSearchText || '',
      });
    }
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('closeSearchBar', this.closeSearch);
  }

  onTextUpdate(search) {
    this.onChangeSearch(search);
  }
  onChangeSearch(search) {
    this.reqSearchList(search);
  }

  async reqSearchList(param) {
    console.log('29148 : BaseHeaderWithSearch -> reqSearchList -> param', param);
    if (param === '') {
      this.setState({
        showSearchList: true,
        searchTagsList: [],
      });
      return;
    }
    const variables = {
      language: RootStore.language,
      name: param,
      limit: 10,
    };

    const result = await RootStore.client.query({
      query: getSearchTag,
      variables,
    });
    if (result && result.data && result.data.searchTag && result.data.searchTag.tags) {
      this.setState({
        showSearchList: true,
        searchTagsList: result.data.searchTag.tags
          .filter((e) => e && e.translations && e.translations[0])
          .map((e, i) => {
            return {
              ...e,
              name: e.translations[0].name,
            };
          }),
      });
    }
    return;
  }

  async search() {
    //get suggest list:
    const suggest = [];
    //this will contain suggest for travel info
    //run get getTagRecommendList API here
    //and update it into suggest state
    const listSuggest = await RootStore.client.query({
      query: getTagRecommendList,
      variables: {
        type: Const.TagType.HashTag.code,
        isRecommend: true,
        limit: 10,
        languages: [RootStore.language],
      },
    });

    this.listSuggest = listSuggest.data.getTagRecommendList.tags;

    await listSuggest.data.getTagRecommendList.tags.forEach((v) => {
      if (v.translations && v.translations[0]) {
        suggest.push(v.translations[0].name);
      }
    });
    //other flow will call this to get the wanted suggest list:
    this.setState({ suggest });
  }
  onClickGoBack() {
    if (this.props.isNavigateBackToHome) {
      Actions.pop();
    } else if (globalUtils.isFromHomeScreen) {
      globalUtils.isFromHomeScreen = false;
      Actions.jump('home');
    } else if (this.props.screenName) {
      Actions.jump(this.props.screenName);
    } else {
      Actions.pop();
    }
  }

  showSearch = () => {
    this.setState({ showSearch: true });
    if (this.props.onShowSearch) {
      this.props.onShowSearch();
    }
  };

  onClickSearchListItem(param) {
    // if (this.searchBarRef) {
    //   this.searchBarRef.onChangeText(param.name);
    // }
    this.setState(
      { searchText: param.name, showSearchList: false, showSearchModal: false, searchTagsList: [] },
      () => {
        setTimeout(() => {
          this.onClickGoSearch();
        }, 500);
      },
    );
  }

  onClickGoSearch() {
    let tempSearchedText = this.state.searchText ? this.state.searchText : '';
    // if (this) {
    //   tempSearchedText = this.state.searchText;
    //   this.searchBarRef.onChangeText('');
    // }
    this.setState({ showSearch: true, showSearchList: false, showSearchModal: true }, () => {
      if (this.props.isFromSearch) {
        Actions.reset('search', {
          parentCategory: this.props.selectedParentCategory,
          childCategory: this.props.selectedChildCategory,
          hideTabBar: true,
          search: tempSearchedText,
          showSearch: true,
          useReservationCategory: this.props.useReservationCategory,
          isReservedSpot: this.props.isReservedSpot,
          screenName: this.props.screenName,
          postType: this.props.postType,
          selectedCategory: this.props.selectedSearchCategory
            ? this.props.selectedSearchCategory
            : null, //used in only in search screen
          selectedFilterType: this.props.selectedFilterType ? this.props.selectedFilterType : null,
          isFromTravelInfo: false,
          disabledChangePostType: this.props.disabledChangePostType,
          isKoreaNews: false,
        });
      } else if (
        this.props.isFromCityScreen ||
        this.props.isFromTravelInfo ||
        this.props.isKoreaNews ||
        this.props.isFromProxyShopping
      ) {
        let parentCategory = null;
        let childCategory = null;
        if (this.props.isFromTravelInfo) {
          parentCategory = {
            code: TAB.TRAVEL.CODE,
            name: TAB.TRAVEL.NAME.toLowerCase(),
          };
          childCategory = this.props.childCategory;
        } else if (this.props.isKoreaNews) {
          parentCategory = {
            code: 1,
            name: RootStore.i18n.t('home.korea-news').toUpperCase(),
          };
        } else if (this.props.isFromProxyShopping) {
          parentCategory = {
            code: 4,
            name: RootStore.i18n.t('proxy-shopping').toUpperCase(),
          };
        }
        Actions.search({
          hideTabBar: true,
          search: tempSearchedText,
          showSearch: true,
          useReservationCategory: this.props.useReservationCategory,
          isReservedSpot: this.props.isReservedSpot,
          screenName: this.props.screenName,
          postType: this.props.postType,
          disabledChangePostType: this.props.disabledChangePostType,
          isFromTravelInfo: false,
          isKoreaNews: false,
          isFromCityScreen: false,
          selectedCategory: parentCategory,
          selectedChildCategory: childCategory,
        });
      } else {
        Actions.search({
          isFromHomeScreen: this.props.isHomeScreen,
          hideTabBar: true,
          search: tempSearchedText,
          useReservationCategory: this.props.useReservationCategory,
          screenName: this.props.screenName,
          postType: this.props.postType,
          disabledChangePostType: this.props.disabledChangePostType,
          isReservedSpot: this.props.isReservedSpot,
          showSearch: true,
          selectedCategory: this.props.selectedSearchCategory
            ? this.props.selectedSearchCategory
            : null,
          isFromTravelInfo: false,
          isKoreaNews: false,
        });
      }
    });
  }

  onPressSuggest = async (item) => {
    if (this.searchBarRef) {
      this.searchBarRef.setState({
        search: item || '',
      });
    }
    setTimeout(() => {
      if (this.props.onChangeKeyword) {
        const keywordsList = this.listSuggest;
        const selectedKeywordStr = item;
        this.props.onChangeKeyword(selectedKeywordStr, keywordsList);
      }
      if (
        this.props.isFromTravelInfo ||
        this.props.isKoreaNews ||
        this.props.isFromCityScreen ||
        this.props.isHomeScreen ||
        this.props.isFromDetail ||
        this.props.onSearch
      ) {
        this.onClickGoSearch();
      }
    }, 200);
  };

  renderItem = ({ item }) => {
    console.log('29148 chay cai nay ne nen en en en en ene', item);
    return (
      <MyTouchableOpacity
        style={{
          height: 40 * HEIGHT_SCALE_RATIO,
          justifyContent: 'center',
          // paddingRight: 16 * WIDTH_SCALE_RATIO,
        }}
        onPress={this.onPressSuggest.bind(this, item)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={ICON.SEARCH_ICON}
            style={{
              width: 20 * WIDTH_SCALE_RATIO,
              height: 20 * WIDTH_SCALE_RATIO,
              tintColor: COLOR.GREY40,
            }}
            resizeMode="contain"
          />
          <PText
            style={[
              ptText.H4,
              style.textShadow,
              {
                marginLeft: 16 * WIDTH_SCALE_RATIO,
                color: COLOR.GREY40,
                // this.state.selectedTag &&
                // this.state.selectedTag.translations &&
                // this.state.selectedTag.translations[0] &&
                // this.state.selectedTag.translations[0].name &&
                // item === this.state.selectedTag.translations[0].name
                //   ? COLOR.PRIMARY
                //   : COLOR.PRIMARY,
              },
            ]}>
            {item}
          </PText>
        </View>
      </MyTouchableOpacity>
    );
  };

  onChangeCity = () => {
    if (this.props.isFromCityScreen) {
      if (globalUtils.isLogin) {
        Actions.reset('giftScreen', { showSearch: true });
      } else {
        Actions.jump('aboutStack');
      }
    }
    if (this.props.onChangeCity) {
      this.props.onChangeCity();
    }
  };

  onLogoPress = () => {
    Actions.replace('home');
  };

  // search text hien o day ne
  renderSearchTagListItem = ({ item }) => {
    console.log('29148 : renderSearchTagListItem -> this.searchBarRef', this.searchBarRef);
    console.log('29148 : renderSearchTagListItem -> item', item);
    // const fullText = item.name;
    // let textArr = [];
    // if (this.searchBarRef?.state?.search !== '') {
    //   textArr = fullText.split(this.searchBarRef.state.search);
    // }
    return (
      <MyTouchableOpacity
        onPress={this.onClickSearchListItem.bind(this, item)}
        style={[styles.item, { flexDirection: 'row', height: 40 * HEIGHT_SCALE_RATIO }]}>
        <Image
          source={ICON.SEARCH_ICON}
          style={{
            width: 20 * WIDTH_SCALE_RATIO,
            height: 20 * WIDTH_SCALE_RATIO,
            tintColor: COLOR.GREY40,
          }}
          resizeMode="contain"
        />
        {/* <PText
          style={[styles.list, { fontSize: FS(fontSize) + 2, marginLeft: 20 * WIDTH_SCALE_RATIO }]}>
          {fullText}
        </PText> */}
        <Highlighter
          style={StyleSheet.flatten([
            styles.list,
            { fontSize: FS(fontSize) + 2, marginLeft: 20 * WIDTH_SCALE_RATIO },
            {
              fontFamily:
                RootStore.language === 'en' || RootStore.language === 'vi' ? 'Raleway' : 'Roboto',
            },
          ])}
          highlightStyle={StyleSheet.flatten([
            this.props.style,
            {
              fontFamily:
                RootStore.language === 'en' || RootStore.language === 'vi' ? 'Raleway' : 'Roboto',
              color: COLOR.appColor,
            },
          ])}
          searchWords={[this.searchBarRef?.state?.search]}
          textToHighlight={item.name}
        />
      </MyTouchableOpacity>
    );
  };

  render() {
    const {
      showSuggest,
      color,
      showBack,
      shadow,
      backgroundColorWhite,
      hideRecommend,
      initialSearchText,
    } = this.props;
    if (this.state.showSearch) {
      return (
        <View
          style={{
            backgroundColor: backgroundColorWhite ? 'white' : '#fafafa',
          }}>
          <BaseHeader
            styleContent={{
              paddingVertical: 5,
              backgroundColor: backgroundColorWhite ? 'white' : '#fafafa',
            }}
            isSearch
            children={
              <CustomSearchBar
                initialSearchText={initialSearchText}
                ref={(instance) => (this.searchBarRef = instance)}
                // onChangeCity={this.onChangeCity}
                // onTextChanged={this.onTextUpdate}
                // onClickGoSearch={this.onClickGoSearch}
                autoFocus={this.props.autoFocus}
                searchPlaceHolderText={null}
                isFromSearch={this.props.isFromSearch}
                backgroundColorWhite={null}
                onFocusFunc={this.onTextUpdate}
                onClearSearch={() => {
                  if (this.props.isFromSearch) {
                    this.setState({
                      showSearchList: true,
                    });
                    console.log('29148 ejqiehqehiqeq showSearchList:', this.state.showSearchList);
                  } else {
                    console.log('29148 vo day ne');
                    this.setState({
                      showSearch: false,
                    });
                  }
                }}
              />
            }
          />
          {/* {!this.state.showSearchList && showSuggest && (
            <PFlatList
              key="suggest"
              // horizontal
              data={this.state.suggest}
              renderItem={this.renderItem}
              style={{ height: HEIGHT }}
              contentContainerStyle={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}
            />
          )} */}
          <SearchModal
            // initialText={''}
            isHomePage={false}
            isFromSearch={this.props.isFromSearch}
            visible={this.state.showSearchList}
            onClickSearchItem={(searchItem) => {
              console.log('29148 chay cai ney na:', searchItem);
              this.searchBarRef.setState({ search: searchItem.name });
              this.onClickSearchListItem(searchItem);
            }}
            onClose={() => {
              if (this.props.isFromSearch) {
                this.setState({
                  search: '',
                  text: '',
                  visible: false,
                  showSearch: true,
                  showSuggest: false,
                });
              } else {
                this.setState({
                  search: '',
                  text: '',
                  visible: false,
                  showSearch: false,
                  showSuggest: false,
                });
              }
            }}
          />
          {/* {this.state.showSearchList && (
            <View
              style={[
                style.shadow,
                {
                  zIndex: 9999999,
                  marginTop: 0,
                  paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
                  paddingVertical: 10 * HEIGHT_SCALE_RATIO,
                  width: WIDTH,
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  // borderRadius: 10,
                  height: HEIGHT,
                },
              ]}>
              <View style={{ backgroundColor: 'transparent' }}>
                {this.state.searchTagsList && this.state.searchTagsList.length ? (
                  <PFlatList
                    extraData={this.state}
                    maxToRenderPerBatch={20}
                    data={mergeArraysWithKey(this.state.searchTagsList, 'name')}
                    renderItem={this.renderSearchTagListItem}
                  />
                ) : (
                  // <PText style={styles.list}>No results</PText>
                  <PFlatList
                    key="suggest"
                    // horizontal
                    data={this.state.suggest}
                    renderItem={this.renderItem}
                    style={{ height: HEIGHT }}
                    contentContainerStyle={{}}
                  />
                )}
              </View>
            </View>
          )} */}
        </View>
      );
    }
    return (
      <BaseHeader
        styleContent={{
          backgroundColor: backgroundColorWhite ? 'white' : '#fafafa',
          paddingRight: 4,
        }}
        noShadow={!shadow}
        leftIconType={showBack ? 'Image' : null}
        leftIcon={ICON.BACK_ICON}
        onLeftPress={
          this.props.onLeftPress ? this.props.onLeftPress : showBack ? this.onClickGoBack : null
        }
        leftIconStyle={[{ tintColor: color || COLOR.appTextColor }, this.props.leftIconStyle]}
        children={
          <MyTouchableOpacity onPress={this.onLogoPress}>
            <Image
              source={IMAGE.LOGO_PRIMARY}
              style={{
                alignSelf: 'center',
                height: 25 * HEIGHT_SCALE_RATIO,
                width: '100%',
              }}
              resizeMode="contain"
            />
          </MyTouchableOpacity>
        }
        rightIconType={!hideRecommend ? 'Image' : null}
        rightIcon={!hideRecommend ? ICON.SEARCH_ICON : null}
        rightIconStyle={[{ tintColor: COLOR.GREY20 }, this.props.rightIconStyle]}
        onRightPress={this.showSearch}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 2,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {
    fontSize: RootStore.fontSize(2.6),
    fontWeight: '400',
    color: '#767676',
  },
});

export default BaseHeaderWithSearch;
