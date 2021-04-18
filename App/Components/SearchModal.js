import React, { useState, useEffect, Fragment, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  // Modal,
} from 'react-native';
import Modal from 'react-native-modal';

import getTagRecommendList from '../../Common/gql/queries/getTagRecommendList.gql';
import getSearchTag from '../../Common/gql/queries/getSearchTag.gql';
import PFlatList from './PFlatList';
import { mergeArraysWithKey } from '../../Common/arrayUtils';
import RootStore from '../Stores/RootStore';
import Highlighter from 'react-native-highlight-words';
import style, { fontSize, FS, COLOR, ptText } from '../Constants/styles';
import { WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO, HEIGHT, WIDTH, IS_IOS } from '../Constant/constant';
import { ICON } from '../../asset/image/ImagePath';
import MyTouchableOpacity from './MyTouchableOpacity';
import BaseHeader from './BaseHeader';
import CustomSearchBar from './CustomSearchBar';
import { Actions } from 'react-native-router-flux';
import globalUtils from '../Constants/globalUtils';
import Const from '../../Common/Const';
import PText from './PText';

const SearchModal = (props) => {
  // const { visible } = props;
  // console.log('29148 : AnimationDropdownComponent -> props', props);
  const [visible, setVisible] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchTagsList, setSearchTagsList] = useState([]);
  const [suggestList, setSuggestList] = useState([]);
  const searchBarRef = useRef(null);
  useEffect(() => {}, []);

  useEffect(() => {
    setVisible(props.visible);
    if (props.visible) {
      searchSuggest();
      setShowSuggest(true);

      setTimeout(() => {
        if (searchBarRef && searchBarRef.current && searchBarRef.current.searchInput) {
          searchBarRef.current.searchInput.focus();
        }
      }, 500);
    }
  }, [props.visible]);

  const reqSearchList = async (body) => {
    console.log('29148 : BaseHeaderWithSearch -> reqSearchList -> body', body);
    if (body === '') {
      setShowSearchList(true);
      setSearchTagsList([]);
      return;
    }
    const variables = {
      language: RootStore.language,
      name: body,
      limit: 10,
    };

    const result = await RootStore.client.query({
      query: getSearchTag,
      variables,
    });
    if (result && result.data && result.data.searchTag && result.data.searchTag.tags) {
      setShowSearchList(true);
      setSearchTagsList(
        result.data.searchTag.tags
          .filter((e) => e && e.translations && e.translations[0])
          .map((e, i) => {
            return {
              ...e,
              name: e.translations[0].name,
            };
          }),
      );
    }
    return;
  };

  const searchSuggest = async () => {
    //get suggest list:
    const suggestList = [];
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

    const temp = listSuggest.data.getTagRecommendList.tags;

    await temp.forEach((v) => {
      if (v.translations && v.translations[0]) {
        suggestList.push(v.translations[0].name);
      }
    });

    //other flow will call this to get the wanted suggestList list:
    setSuggestList(suggestList);
  };

  const onClickGoSearch = (item) => {
    console.log('29148 : onClickGoSearch item', item);
    // if (this.searchBarRef) {
    //   tempSearchedText = this.searchBarRef.state.search;
    //   this.searchBarRef.onChangeText('');
    //   this.searchBarRef.onHideMenu();
    //   this.setState({ showSuggest: false });
    // }
    // if (this.suggestWrapperRef) {
    //   this.suggestWrapperRef.closeSearch();
    // }
    onCloseModal();
    if (props.onClickSearchItem) {
      props.onClickSearchItem(item);
    } else {
      globalUtils.isFromHomeScreen = true;
      Actions.push('search', {
        isFromSearch: props.isFromSearch,
        isFromHomeScreen: props.isHomePage,
        hideTabBar: true,
        search: item.name,
        postType: Const.PostType.Spot.code,
        showSearch: true,
        selectedCategory: null,
        isFromTravelInfo: false,
        isKoreaNews: false,
      });
    }
  };

  const onCloseModal = () => {
    console.log('close nào 2608 : onCloseModal -> onCloseModal');
    setVisible(false);
    if (props.onClose) {
      props.onClose();
    }
  };
  if (!visible) {
    return <Fragment />;
  }

  const renderSuggestItem = ({ item }) => {
    console.log('29148 chay cai nay ne nen en en en en ene', item);
    return (
      <MyTouchableOpacity
        style={{
          height: 40 * HEIGHT_SCALE_RATIO,
          justifyContent: 'center',
          // paddingRight: 16 * WIDTH_SCALE_RATIO,
        }}
        onPress={async () => {
          setSearchText(item);
          onClickGoSearch({ name: item });
          // setTimeout(() => {
          //   if (this.props.onChangeKeyword) {
          //     const keywordsList = this.listSuggest;
          //     const selectedKeywordStr = item;
          //     this.props.onChangeKeyword(selectedKeywordStr, keywordsList);
          //   }
          //   if (
          //     this.props.isFromTravelInfo ||
          //     this.props.isKoreaNews ||
          //     this.props.isFromCityScreen ||
          //     this.props.isHomeScreen ||
          //     this.props.isFromDetail ||
          //     this.props.onSearch
          //   ) {
          //     this.onClickGoSearch();
          //   }
          // }, 200);
        }}
        // onPress={this.onPressSuggest.bind(this, item)}
      >
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

  if (!visible) {
    return <></>;
  }
  return (
    <Modal
      isVisible={visible}
      backdropColor={COLOR.WHITE}
      style={{
        height: HEIGHT,
        width: WIDTH + 20 * WIDTH_SCALE_RATIO,
        marginVertical: IS_IOS ? 5 * HEIGHT_SCALE_RATIO : -12 * HEIGHT_SCALE_RATIO,
        marginLeft: IS_IOS ? 0 : -4 * WIDTH_SCALE_RATIO,
      }}>
      {/* <View style={{ flex: 1, backgroundColor: 'red' }}>
        <SearchModal />
      </View> */}

      <View style={{ flex: 1, backgroundColor: 'white', height: HEIGHT, width: WIDTH }}>
        <BaseHeader
          styleContent={{
            paddingVertical: 5,
            backgroundColor: 'white',
          }}
          isSearch
          children={
            <CustomSearchBar
              initialSearchText={searchText}
              ref={searchBarRef}
              // onChangeCity={this.onChangeCity}
              onTextChanged={(text) => {
                setSearchText(text);
                reqSearchList(text);
              }}
              // autoFocus
              // onClickGoSearch={this.onClickGoSearch}
              // onCloseSearch={this.closeSearch}
              searchPlaceHolderText={null}
              // isFromSearch={this.props.isFromSearch}
              backgroundColorWhite={null}
              // onFocusFunc={this.onTextUpdate}
              onCloseSearch={onCloseModal}
              onClearSearch={() => {
                setSearchText('');
                reqSearchList('');
              }}
            />
          }
        />
        {(!showSearchList && showSuggest) || searchText === '' ? (
          <PFlatList
            key="suggest"
            // horizontal
            data={suggestList}
            keyboardShouldPersistTaps={'handled'}
            renderItem={renderSuggestItem}
            style={{ height: HEIGHT }}
            contentContainerStyle={{ paddingHorizontal: 16 * WIDTH_SCALE_RATIO }}
          />
        ) : (
          <PFlatList
            extraData={searchTagsList}
            maxToRenderPerBatch={20}
            data={mergeArraysWithKey(searchTagsList, 'name')}
            renderItem={({ item }) => {
              return (
                <MyTouchableOpacity
                  onPress={() => onClickGoSearch(item)}
                  style={[
                    styles.item,
                    {
                      flexDirection: 'row',
                      height: 40 * HEIGHT_SCALE_RATIO,
                      marginLeft: 20 * WIDTH_SCALE_RATIO,
                    },
                  ]}>
                  <Image
                    source={ICON.SEARCH_ICON}
                    style={{
                      width: 20 * WIDTH_SCALE_RATIO,
                      height: 20 * WIDTH_SCALE_RATIO,
                      tintColor: COLOR.GREY40,
                    }}
                    resizeMode="contain"
                  />
                  <Highlighter
                    style={StyleSheet.flatten([
                      styles.list,
                      { fontSize: FS(fontSize) + 2, marginLeft: 20 * WIDTH_SCALE_RATIO },
                      {
                        fontFamily:
                          RootStore.language === 'en' || RootStore.language === 'vi'
                            ? 'Raleway'
                            : 'Roboto',
                      },
                    ])}
                    highlightStyle={StyleSheet.flatten([
                      props.style,
                      {
                        fontFamily:
                          RootStore.language === 'en' || RootStore.language === 'vi'
                            ? 'Raleway'
                            : 'Roboto',
                        color: COLOR.appColor,
                      },
                    ])}
                    searchWords={[searchText]}
                    textToHighlight={item.name}
                  />
                </MyTouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </Modal>
  );
};

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

export default SearchModal;
