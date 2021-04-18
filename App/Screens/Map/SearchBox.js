import { Input } from 'native-base';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import Const from '../../../Common/Const';
import getSpotListNew from '../../../Common/gql/queries/getSpotListNew.gql';
import MyTouchableOpacity from '../../Components/MyTouchableOpacity';
import PText from '../../Components/PText';
import {
  HEIGHT,
  HEIGHT_SCALE_RATIO,
  IS_IOS,
  WIDTH,
  WIDTH_SCALE_RATIO,
} from '../../Constant/constant';
import style, { COLOR, heightBottomBar, textInputHeight } from '../../Constants/styles';
import { getTranslationObj } from '../../Constants/utils';
import RootStore from '../../Stores/RootStore';
import SearchRowListItem from './SearchRowListItem';
import { ICON } from '../../../asset/image/ImagePath';
const _ = require('lodash');

export default class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.isReqSearchOutOfData = false; //out of data flag for pagination of req search list
    this.reqSearchPage = 0; //offset for pagination of req search list
    this.isLoadingReqSearch = false;

    this.state = {
      searchSpotList: [], //searched list we got from input when calling reqSearchList
      searchText: '',
      currentSelectedCategory: null,
      LISTCATEGORY: [
        {
          title: RootStore.i18n.t('map.dining'),
          image: ICON.MAP_SURROUDING_FOOD, //* in swipe surrounding
          image2: ICON.MAP_MARKER_FOOD, //* icon on marker
          code: 6665,
          tag_code: 6665,
        },
        {
          title: RootStore.i18n.t('map.cafe'),
          image: ICON.MAP_SURROUDING_MILKTEA,
          image2: ICON.MAP_MARKER_MILKTEA,
          code: 18976,
          tag_code: 7270,
        },
        {
          title: RootStore.i18n.t('map.attraction'),
          image: ICON.MAP_SURROUDING_MOUNT,
          image2: ICON.MAP_MARKER_MOUNT,
          code: 2640,
          tag_code: 2640,
        },
        {
          title: RootStore.i18n.t('map.accommodation'),
          image: ICON.MAP_SURROUDING_BED,
          image2: ICON.MAP_MARKER_BED,
          code: 7280,
          tag_code: 7280,
        },
        {
          title: RootStore.i18n.t('map.shopping'),
          image: ICON.MAP_SURROUDING_BAG,
          image2: ICON.MAP_MARKER_BAG,
          code: 6664,
          tag_code: 6664,
        },
        {
          title: RootStore.i18n.t('map.activity'),
          image: ICON.MAP_SURROUDING_BINOCULARS,
          image2: ICON.MAP_MARKER_BINOCULARS,
          code: 16701,
          tag_code: 6675,
          //* activities from normal category
        },
        {
          title: RootStore.i18n.t('map.transportation'),
          image: ICON.MAP_SURROUDING_FRIDGE,
          image2: ICON.MAP_MARKER_FRIDGE,
          code: 6674,
          tag_code: 6674,
        },
        {
          title: RootStore.i18n.t('map.all'),
          image: ICON.MAP_SURROUDING_ALL,
          image2: ICON.MAP_MARKER_ALL,
          isAll: true,
          code: null,
          tag_code: null,
        },
      ],
    };

    this.onDebouncePress = _.debounce(this.onStartSearch, 500, {
      leading: false,
      trailing: true,
    });
  }

  onChangeTag = item => {
    this.setState({ currentSelectedCategory: item });

    if (this.props.onChangeTagDone) {
      setTimeout(() => {
        this.props.onChangeTagDone(item);
      }, 200);
    }
  };

  renderItem = ({ item }) => {
    return (
      <MyTouchableOpacity
        onPress={() => this.onChangeTag(item)}
        style={{
          height: 32 * HEIGHT_SCALE_RATIO,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginHorizontal: 3 * WIDTH_SCALE_RATIO,
          backgroundColor: COLOR.WHITE,
          paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
          borderRadius: 18 * WIDTH_SCALE_RATIO,
        }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            width: WIDTH / 25,
            height: WIDTH / 25,
            tintColor: COLOR.appTextSubColor,
          }}
        />

        <PText
          style={[
            style.textCaption,
            {
              textAlign: 'center',
              marginLeft: 7 * WIDTH_SCALE_RATIO,
              color: COLOR.appTextSubColor,
            },
          ]}
          numberOfLines={1}>
          {item.title}
        </PText>
      </MyTouchableOpacity>
    );
  };

  /**
   * get list of searched spot in input
   */

  reqSearchList = async param => {
    if (param === '') {
      this.setState({ searchSpotList: [], showSearchList: false });
      return;
    }
    if (this.isReqSearchOutOfData || this.isLoadingReqSearch) return;
    this.isLoadingReqSearch = true;
    const variables = {
      title: param,
      offset: this.reqSearchPage * 10,
      limit: 10,
      order: Const.OrderType.Like.name,
      languages: [RootStore.language],
    };

    const result = await RootStore.client.query({
      query: getSpotListNew, //call api here
      variables,
    });

    const newAddedSearchSpotList = [];

    if (
      result.data.getSpotListNew &&
      result.data.getSpotListNew.spots !== null &&
      result.data.getSpotListNew.spots !== undefined
    ) {
      if (result.data.getSpotListNew.spots < 10) {
        this.isReqSearchOutOfData = true;
      }

      result.data.getSpotListNew.spots.forEach(v => {
        const tag = v.tags.filter(v2 => v2.type === Const.TagType.City.code);
        const cityName = tag.length > 0 ? tag[0].name : '';
        const location = { latitude: v.latitude, longitude: v.longitude };
        newAddedSearchSpotList.push({
          ...v,
          name: getTranslationObj(v) ? getTranslationObj(v).spot_name : '',
          location,
        });
      });
    }
    this.reqSearchPage = this.reqSearchPage + 1;
    this.isLoadingReqSearch = false;

    this.setState(prevState => ({
      searchSpotList: prevState.searchSpotList.concat(newAddedSearchSpotList),
    }));
  };

  renderRowItem = ({ item, index }) => {
    return <SearchRowListItem item={item} onPressItem={this.onPressItem} />;
  };

  onStartSearch = text => {
    this.isReqSearchOutOfData = false;
    this.reqSearchPage = 0;
    this.reqSearchList(text);
  };

  onChangeSearch = searchText => {
    this.setState({ searchText, searchSpotList: [] }, () => {
      this.onDebouncePress(searchText);
    });
  };

  onSubmitEditting = () => {
    this.onChangeSearch(this.state.searchText);
  };
  onPressItem = item => {
    this.setState({ searchText: item.name, currentSelectedCategory: null });
    this.isReqSearchOutOfData = false;
    this.reqSearchPage = 0;
    this.setState({ searchSpotList: [] });
    if (this.props.onPressItemFromSearchList) {
      this.setState({ currentSelectedCategory: null });
      this.props.onPressItemFromSearchList(item);
    }
  };
  onPressClear = () => {
    this.isReqSearchOutOfData = false;
    this.reqSearchPage = 0;
    setTimeout(() => {
      this.setState({
        searchText: '',
      });
    }, 100);
    this.setState({ currentSelectedCategory: null, searchSpotList: [] }, () => {
      if (this.props.onPressClearSearchBox) {
        this.props.onPressClearSearchBox();
      }
    });
  };

  render() {
    const { showBackButton } = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          top: 10 * HEIGHT_SCALE_RATIO,
          alignSelf: 'center',
          shadowOpacity: 0.1 * WIDTH_SCALE_RATIO,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: textInputHeight / 2,
            width: 343 * WIDTH_SCALE_RATIO,
            alignSelf: 'center',
            height: textInputHeight,
            paddingLeft: 10 * WIDTH_SCALE_RATIO,
            paddingRight: 10 * WIDTH_SCALE_RATIO,
          }}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
              }}>
              <Image
                source={ICON.BACK_ICON}
                resizeMode="contain"
                style={{
                  width: 18 * WIDTH_SCALE_RATIO,

                  height: 18 * WIDTH_SCALE_RATIO,

                  tintColor: COLOR.PRIMARY,
                }}
              />
            </TouchableOpacity>
          )}

          <Input
            ref={instance => (this.searchInputRef = instance)}
            value={this.state.searchText}
            autoCapitalize="none"
            placeholder={RootStore.i18n.t('map.search-placeholder')}
            onChangeText={this.onChangeSearch}
            onSubmitEditing={this.onSubmitEditting}
            returnKeyType="search"
            clearButtonMode={'never'}
            onTouchStart={this.closePanel}
            placeholderTextColor={COLOR.appTextPlaceholderColor}
            style={[
              style.input,

              { height: 42 * HEIGHT_SCALE_RATIO, paddingHorizontal: 0, paddingVertical: 0 },
            ]}
          />

          {this.state.searchText !== '' && (
            <MyTouchableOpacity onPress={this.onPressClear}>
              {this.isLoadingReqSearch ? (
                <SkypeIndicator color={COLOR.appColor} size={20 * WIDTH_SCALE_RATIO} />
              ) : (
                  <Image
                    source={ICON.CLOSE_ICON}
                    style={{
                      width: 14 * WIDTH_SCALE_RATIO,
                      height: 14 * WIDTH_SCALE_RATIO,
                      tintColor: COLOR.GREY20,
                    }}
                    resizeMode="contain"
                  />
                )}
            </MyTouchableOpacity>
          )}
        </View>

        {this.state.searchSpotList.length > 0 ? (
          <View
            style={{
              width: 343 * WIDTH_SCALE_RATIO,
              paddingTop: 5 * HEIGHT_SCALE_RATIO,
              zIndex: 9999999,
              backgroundColor: COLOR.WHITE,
              alignSelf: 'center',
              borderRadius: textInputHeight / 2,
              marginTop: 6 * HEIGHT_SCALE_RATIO,
              paddingHorizontal: 15 * WIDTH_SCALE_RATIO,
              paddingVertical: 5 * HEIGHT_SCALE_RATIO,
              height: HEIGHT * 0.3,
            }}>
            <FlatList
              keyExtractor={item => `${item.code}`}
              showsVerticalScrollIndicator={false}
              extraData={this.state.searchSpotList}
              onEndReached={() =>
                this.reqSearchList(this?.searchInputRef?._root?._lastNativeText ?? '')
              }
              onEndReachedThreshold={0.05}
              data={this.state.searchSpotList}
              renderItem={this.renderRowItem}
            />
          </View>
        ) : (
            <View
              style={{
                position: IS_IOS ? 'absolute' : null,

                marginTop: IS_IOS
                  ? 14 * HEIGHT_SCALE_RATIO + textInputHeight
                  : 14 * HEIGHT_SCALE_RATIO,

                left: IS_IOS ? -16 * WIDTH_SCALE_RATIO : 0,

                width: WIDTH,
              }}>
              <FlatList
                key="category"
                numColumns={1}
                horizontal
                keyExtractor={(item, index) => `key${index}`}
                showsHorizontalScrollIndicator={false}
                data={this.state.LISTCATEGORY}
                renderItem={this.renderItem}
                contentContainerStyle={{
                  paddingLeft: 16 * WIDTH_SCALE_RATIO,
                }}
              />
            </View>
          )}
      </View>

      // </View>
    );
  }
}
