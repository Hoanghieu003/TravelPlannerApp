/* eslint-disable prettier/prettier */
import { observer } from 'mobx-react';
import { View } from 'native-base';
import React from 'react';
import { DeviceEventEmitter, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { mergeArraysWithKey } from '../../Common/arrayUtils';
import Const from '../../Common/Const';
import getSearchTag from '../../Common/gql/queries/getSearchTag.gql';
import getTagRecommendList from '../../Common/gql/queries/getTagRecommendList.gql';
import { HEIGHT, HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, fontSize, FS, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
import { ICON } from '../../asset/image/ImagePath';

// const listCity = ['서울', '대전', '대구', '부산', '제주'];

@observer
class SuggestWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTagsList: [],
      showSearch: false,
      showSearchList: false,
      city: '',
      suggest: [],
      selectedTag: null,
    };

    this.reqSearchList = this.reqSearchList.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.onClickGoSearch = this.onClickGoSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

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

  closeSearch = () => {
    this.setState(
      {
        showSearchList: false,
        showSearch: false,
        selectedTag: null,
      },
      () => {
        if (this.props.onClearSearchText) {
          this.props.onClearSearchText();
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
    await this.search().catch((e) =>
      console.log('phat: SuggestWrapper -> componentDidMount -> e', e),
    );
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('closeSearchBar', this.closeSearch);
  }

  onUpdateSearchList = (text) => {
    clearTimeout(this.timeoutText);
    if (text === '') {
      this.reqSearchList('');
    } else {
      this.timeoutText = setTimeout(() => this.reqSearchList(text), 200);
    }
  };

  async reqSearchList(param) {
    //call list suggest when user input to search text box
    if (param === '') {
      this.setState({
        showSearchList: false,
        searchTagsList: [],
      });
      return;
    }
    const variables = {
      language: RootStore.language,
      name: param,
    };

    const result = await RootStore.client.query({
      query: getSearchTag,
      variables,
    });
    if (result && result.data && result.data.searchTag && result.data.searchTag.tags) {
      console.log('29148 result.data.searchTag.tags.length:', result.data.searchTag.tags.length);
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

    console.log('29148 result khi search tagne nha:', result);
  }

  async search() {
    //get city data:
    // const defaultTags = await RootStore.client.query({
    //   query: getRecommendList,
    //   variables: {
    //     tagType: Const.TagType.City.code,
    //     language: RootStore.language,
    //     categoryType: this.props.useReservationCategory
    //       ? Const.CategoryType.Reserve.code
    //       : Const.CategoryType.Normal.code,
    //   },
    // });
    // const city = [];
    // city.push({ translations: [{ name: RootStore.i18n.t('global.all') }] });
    // await defaultTags.data.getRecommendList.recommends.forEach(v => {
    //   city.push(v.city);
    // });
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

  showSearch = () => {
    this.setState({ showSearch: true });
    if (this.props.onShowSearch) {
      this.props.onShowSearch();
    }
  };

  onClickSearchListItem(param) {
    console.log('29148 3131313131 param:', param);
    if (this.props.onClickSearchListItem) {
      this.props.onClickSearchListItem(param);
    }
    this.setState({ showSearchList: false, showSearchModal: false, searchTagsList: [] }, () => {
      setTimeout(() => {
        this.onClickGoSearch();
      }, 500);
    });
  }

  onClickGoSearch() {
    if (this.props.onClickGoSearch) {
      this.props.onClickGoSearch();
    }
  }

  renderItem({ item }) {
    return (
      <MyTouchableOpacity
        style={{
          height: 40 * HEIGHT_SCALE_RATIO,
          justifyContent: 'center',
          paddingRight: 16 * WIDTH_SCALE_RATIO,
        }}
        onPress={async () => {
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
        }}>
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
  }

  render() {
    const { showSuggest, backgroundColorWhite } = this.props;
    return (
      <View
        style={{
          backgroundColor: backgroundColorWhite ? 'white' : '#fafafa',
        }}>
        {this.props.children}
        {!this.state.showSearchList && showSuggest ? (
          <FlatList
            key="suggest"
            keyExtractor={(item, index) => `key${index}`}
            // horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.suggest}
            renderItem={this.renderItem}
            style={{
              height: HEIGHT * HEIGHT_SCALE_RATIO,
            }}
            contentContainerStyle={{
              paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
            }}
          />
        ) : (
          <View />
        )}
        {this.state.showSearchList ? (
          <View
            style={[
              style.shadow,
              {
                zIndex: 9999999,
                marginTop: showSuggest ? 0 : 10,
                paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
                paddingVertical: 5 * HEIGHT_SCALE_RATIO,
                width: WIDTH * 0.95,
                alignSelf: 'center',
                backgroundColor: 'white',

                borderRadius: 10,
                height: HEIGHT * 0.3,
              },
            ]}>
            <View
              style={{
                backgroundColor: 'white',
              }}>
              {this.state.searchTagsList && this.state.searchTagsList.length ? (
                <FlatList
                  keyExtractor={(item) => `${item.code}`}
                  showsVerticalScrollIndicator={false}
                  extraData={this.state}
                  maxToRenderPerBatch={20}
                  data={mergeArraysWithKey(this.state.searchTagsList, 'name')}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={this.onClickSearchListItem.bind(this, item)}
                        style={styles.item}>
                        <PText style={[styles.list, { fontSize: FS(fontSize) + 2 }]}>
                          {item.name}
                        </PText>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <PText style={styles.list}>No results</PText>
              )}
            </View>
          </View>
        ) : null}

        {/* <SearchBox ref="searchBox" /> */}
      </View>
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

export default SuggestWrapper;
