import { Button, Content, Input } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Const from '../../Common/Const';
import getTagList from '../../Common/gql/queries/getTagList.gql';
import SearchQuery from '../../Common/gql/queries/search.gql';
import style, { COLOR } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import PText from './PText';

export default class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.openSearchModal = this.openSearchModal.bind(this);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeCitySearch = this.onChangeCitySearch.bind(this);

    this.onHandleKeyEventSearch = this.onHandleKeyEventSearch.bind(this);
    this.onHandleKeyEventCitySearch = this.onHandleKeyEventCitySearch.bind(this);

    this.reqSearchList = this.reqSearchList.bind(this);
    this.reqCityList = this.reqCityList.bind(this);

    this.onClickGoSearch = this.onClickGoSearch.bind(this);

    this.state = {
      showSearchModal: false,

      search: '',
      searchSpotList: [],
      searchBlogList: [],
      showSearchList: false,
      city: '',
      cityList: [],
      showCityList: false,
    };
  }

  openSearchModal() {
    this.setState(
      {
        search: '',
        searchSpotList: [],
        searchBlogList: [],
        showSearchList: false,
        city: '',
        cityList: [],
        showCityList: false,
        showSearchModal: true,
      },
      () => {
        this.searchInput._root.focus();
      },
    );
  }

  onChangeSearch(search) {
    this.setState({ search }, () => {
      this.reqSearchList(search);
    });
  }

  onChangeCitySearch(city) {
    this.setState({ searchCity: city }, () => {
      this.reqCityList(city);
    });
  }

  onHandleKeyEventSearch() {
    this.setState({ searchSpotList: [], searchBlogList: [], showSearchList: false }, () => {
      this.cityInput._root.focus();
    });
  }

  onHandleKeyEventCitySearch() {
    if (this.state.cityList.length > 0) {
      this.setState({ showSearchModal: false, city: this.state.cityList[0].name }, () => {
        Actions.search({ search: this.state.search, city: this.state.city });
      });
    }
  }

  async reqSearchList(param) {
    if (param === '') {
      this.setState({
        searchSpotList: [],
        searchBlogList: [],
        showSearchList: false,
      });
      return;
    }

    const variables = {
      language: RootStore.language,
      search: param,
      city: '',
      blog_offset: 0,
      spot_offset: 0,
      blog_limit: 3,
      spot_limit: 3,
      is_confirm: true,
      is_publish: true,
    };
    const result = await RootStore.client.query({
      query: SearchQuery,
      variables,
    });

    const searchSpotList = [];
    const searchBlogList = [];

    if (
      result.data.search &&
      result.data.search.spot !== null &&
      result.data.search.spot !== undefined
    ) {
      result.data.search.spot.forEach(v => {
        const tag = v.tags.filter(v2 => v2.type === Const.TagType.City.code);
        const cityName = tag.length > 0 ? tag[0].name : '';

        searchSpotList.push({
          type: 'spot',
          name: v.translations[0].spot_name,
          cityName,
          code: v.code,
        });
      });
    }

    if (
      result.data.search &&
      result.data.search.blog !== null &&
      result.data.search.blog !== undefined
    ) {
      result.data.search.blog.forEach(v => {
        searchBlogList.push({
          type: 'blog',
          name: v.translations[0].title,
          code: v.code,
        });
      });
    }

    let showSearchList = false;
    console.log('show search list1', showSearchList);

    if (searchSpotList.length > 0 || searchBlogList.length > 0) {
      showSearchList = true;
      console.log('show search list2', showSearchList);
    }

    this.setState({ searchSpotList, searchBlogList, showSearchList });
  }

  async reqCityList(param) {
    if (param === '') {
      this.setState({ cityList: [], showCityList: false });
      return;
    }

    const result = await RootStore.client.query({
      query: getTagList,
      variables: {
        isMyLanguage: RootStore.language,
        types: [Const.TagType.City.code],
        name: param,
        limit: 5,
      },
    });
    const cityList = result.data.getTagList.map(v => {
      const isLanguage = v.translations.findIndex(t => t.language === RootStore.language);
      const cityName = isLanguage < 0 ? v.translations[0].name : v.translations[isLanguage].name;
      return { code: v.code, name: cityName };
    });

    let showCityList = false;
    if (cityList.length > 0) {
      showCityList = true;
    }

    this.setState({ cityList, showCityList });
  }

  onClickSearchListItem(param) {
    this.setState({ showSearchModal: false, search: param.name }, () => {
      if (param.type === 'spot') {
        Actions.spotDetail({ spotCode: param.code });
      }

      if (param.type === 'blog') {
        Actions.blogDetail({ blogCode: param.code });
      }
    });
  }

  onClickCityListItem(param) {
    this.setState({ showSearchModal: false, city: param.name }, () => {
      Actions.search({ search: this.state.search, city: this.state.city });
    });
  }

  onClickGoSearch() {
    this.setState({ showSearchModal: false }, () => {
      Actions.search({ search: this.state.search, city: this.state.city });
    });
  }

  render() {
    return (
      <Modal
        backdropColor="#fff"
        backdropOpacity={1}
        animationIn="fadeInDown"
        animationInTiming={0}
        animationOutTiming={0}
        isVisible={this.state.showSearchModal}
        onRequestClose={() => {
          this.setState({ showSearchModal: false });
        }}
        style={{
          margin: 0,
          padding: 0,
          paddingHorizontal: 10,
          paddingVertical: 10,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={{ padding: 5, alignSelf: 'flex-end' }}
          onPress={() => {
            this.setState({ showSearchModal: false });
          }}>
          <FontAwesome name="close" size={25} style={{ marginTop: -3 }} />
        </TouchableOpacity>

        <Content style={{ paddingTop: 15 }} showsVerticalScrollIndicator={false}>
          <View style={{}}>
            <View
              style={[
                style.shadow,
                {
                  marginBottom: 10,
                  alignSelf: 'center',
                  width: '95%',
                  zIndex: 99999,
                  backgroundColor: 'white',
                  borderRadius: 20,
                },
              ]}>
              <Input
                ref={input => {
                  this.searchInput = input;
                }}
                autoCapitalize="none"
                placeholder={RootStore.i18n.t('home.search-placeholder')}
                onChangeText={this.onChangeSearch}
                onSubmitEditing={this.onHandleKeyEventSearch}
                returnKeyType="search"
                style={style.input}
                placeholderTextColor={COLOR.appTextPlaceholderColor}
              />
            </View>

            {this.state.showSearchList && (
              <View
                style={[
                  style.shadow,
                  {
                    zIndex: -1,
                    marginTop: -30,
                    paddingTop: 25,
                    marginBottom: 10,
                    alignSelf: 'center',
                    width: '100%',
                    padding: 10,
                    // backgroundColor: 'red',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    // borderRadius: 20,
                  },
                ]}>
                {this.state.searchBlogList.length > 0 && (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      marginBottom: 5,
                      paddingBottom: 5,
                    }}>
                    <PText style={{ fontWeight: '400', color: 'red' }}>
                      {RootStore.i18n.t('search.blog')}
                    </PText>
                    {this.state.searchBlogList.map((v, i) => (
                      <TouchableOpacity
                        onPress={this.onClickSearchListItem.bind(this, v)}
                        key={`auto-${i}`}
                        style={styles.item}>
                        <PText style={styles.list}>{v.name}</PText>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {this.state.searchSpotList.length > 0 && (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      marginBottom: 5,
                      paddingBottom: 5,
                    }}>
                    <PText style={{ fontWeight: '400', color: '#767676' }}>
                      {RootStore.i18n.t('search.spot')}
                    </PText>
                    {this.state.searchSpotList.map((v, i) => (
                      <TouchableOpacity
                        onPress={this.onClickSearchListItem.bind(this, v)}
                        key={`auto-${i}`}
                        style={styles.item}>
                        <PText style={styles.list}>{v.name}</PText>
                        <PText style={[styles.city, styles.list]}>{v.cityName}</PText>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                <TouchableOpacity onPress={this.onHandleKeyEventSearch} style={styles.item}>
                  <PText style={styles.list}>
                    {this.state.search}
                    {RootStore.i18n.t('search.search')}
                  </PText>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View>
            <View
              style={[
                style.shadow,
                {
                  marginBottom: 10,
                  alignSelf: 'center',
                  width: '95%',
                  zIndex: 99999,
                  backgroundColor: 'white',
                  borderRadius: 20,
                },
              ]}>
              <Input
                autoCapitalize="none"
                ref={input => {
                  this.cityInput = input;
                }}
                placeholder={RootStore.i18n.t('home.search-city')}
                onChangeText={this.onChangeCitySearch}
                onSubmitEditing={this.onHandleKeyEventCitySearch}
                returnKeyType="search"
                style={style.input}
                placeholderTextColor={COLOR.appTextPlaceholderColor}
              />
            </View>
            {this.state.showCityList && (
              <View
                style={[
                  style.shadow,
                  {
                    zIndex: -1,
                    marginTop: -30,
                    paddingTop: 25,
                    marginBottom: 10,
                    alignSelf: 'center',
                    width: '90%',
                    padding: 10,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  },
                ]}>
                {this.state.cityList.map((v, i) => (
                  <TouchableOpacity
                    onPress={this.onClickCityListItem.bind(this, v)}
                    key={`auto-${i}`}
                    style={styles.item}>
                    <PText style={{ fontWeight: '400', color: '#767676' }}>{v.name}</PText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <Button
            onPress={this.onClickGoSearch}
            style={{
              width: '95%',
              minWidth: 64,
              marginTop: 30,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: COLOR.appColor,
            }}
            color={COLOR.appColor}>
            <PText style={[style.textInput, { textTransform: 'uppercase', color: 'white' }]}>
              {RootStore.i18n.t('search.search')}
            </PText>
          </Button>
        </Content>
      </Modal>
    );
  }
}

SearchBox.propTypes = {
  search: PropTypes.string,
  city: PropTypes.string,
};

const styles = StyleSheet.create({
  item: {
    margin: 2,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {
    fontSize: RootStore.fontSize(2.2),
    fontWeight: '400',
    color: '#767676',
  },
  city: {
    position: 'absolute',
    right: 0,
  },
});
