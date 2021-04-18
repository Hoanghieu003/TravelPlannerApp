import { Content } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Const from '../../Common/Const';
import getRecommendList from '../../Common/gql/queries/getRecommendList.gql';
import getSpotReserveList from '../../Common/gql/queries/getSpotReserveList.gql';
import InfiniteScroll from '../Components/InfiniteScroll';
import PText from '../Components/PText';
import SpotCard from '../Components/SpotCard';
import RootStore from '../Stores/RootStore';

export default class Reserve extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      spots: [],

      checkReserveSpot: true,
      checkDiscount: true,

      offset: 0,
      existOther: true,

      cityCode: 0,
      categoryCode: 0,
    };

    this.getTags = this.getTags.bind(this);
    this.search = this.search.bind(this);

    this.onClickReserveOption = this.onClickReserveOption.bind(this);
    this.onClickDiscountOption = this.onClickDiscountOption.bind(this);

    this.onRefreshRequest = this.onRefreshRequest.bind(this);
  }

  componentDidMount() {
    if (RootStore.auth.isGuest) {
      Alert.alert(
        '',
        RootStore.i18n.t('global.require-login'),
        [
          {
            text: RootStore.i18n.t('global.close'),
            onPress: () => {
              Actions.replace('welcome');
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }

    let checkDiscount = true;
    if (this.props.discount !== undefined && this.props.discount === false) {
      checkDiscount = false;
    }
    let checkReserveSpot = true;
    if (this.props.reserve !== undefined && this.props.reserve === false) {
      checkReserveSpot = false;
    }

    this.setState({ checkDiscount, checkReserveSpot });

    this.getTags();
    this.search();
  }

  async getTags() {
    const result = await RootStore.client.query({
      query: getRecommendList,
      variables: {
        tagType: Const.TagType.HashTag.code,
        categoryType: Const.CategoryType.Reserve.code,
        language: RootStore.language,
      },
    });
    const tags = result.data.getRecommendList.recommends.map((v) => ({
      code: v.category.code,
      name: v.category.translations[0].name,
    }));

    this.setState({ tags });
  }

  async search() {
    if (!this.state.existOther) {
      return;
    }

    const variables = {
      isActive: 1,
      types: [
        Const.ReserveType.Stand.code,
        Const.ReserveType.MemberBenefit.code,
        Const.ReserveType.Outside.code,
      ],
      offset: 16 * this.state.offset,
      limit: 16,
      language: RootStore.language,
    };

    if (this.state.cityCode) {
      variables.cityCode = this.state.cityCode;
    }

    if (this.state.categoryCode) {
      variables.categoryCode = this.state.categoryCode;
    }

    const result = await RootStore.client.query({
      query: getSpotReserveList,
      variables,
    });
    const spots = this.state.spots.concat(result.data.getSpotReserveList.spots);

    let existOther = true;
    if (result.data.getSpotReserveList.spots.length < 16) {
      existOther = false;
    }

    this.setState({ spots, offset: this.state.offset + 1, existOther });
  }

  onClickMyReserve() {
    Actions.myReserve({ toReserve: true });
  }

  onClickCityTag(tag) {
    if (this.state.categoryCode === tag) {
      return;
    }

    this.setState({ categoryCode: tag, offset: 0, spots: [], existOther: true }, () => {
      this.search();
    });
  }

  onClickReserveOption() {
    this.setState(
      {
        checkReserveSpot: !this.state.checkReserveSpot,
        offset: 0,
        existOther: true,
        spots: [],
      },
      () => {
        this.search();
      },
    );
  }

  onClickDiscountOption() {
    this.setState(
      {
        checkDiscount: !this.state.checkDiscount,
        offset: 0,
        existOther: true,
        spots: [],
      },
      () => {
        this.search();
      },
    );
  }

  onRefreshRequest() {
    this.setState({ offset: 0, spots: [], existOther: true }, () => {
      setTimeout(() => {
        this.search();
        this.refs.infiniteScroll._stopRefreshSpinner();
      }, 500);
    });
  }

  onClickCard(code) {
    Actions.spotDetail({ spotCode: code });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerBox}>
          <PText style={styles.headerTitle}>{RootStore.i18n.t('reserve.benefit')}</PText>
          <TouchableOpacity onPress={this.onClickMyReserve.bind(this)} style={styles.headerRight}>
            <PText
              style={{
                fontSize: RootStore.fontSize(2.8),
                fontWeight: '400',
                color: '#767676',
              }}>
              {RootStore.i18n.t('reserve.my-reserve')}
            </PText>
            <View style={styles.icon}>
              <Icon name="chevron-right" color="#767676" size={15} style={{ marginTop: 5 }} />
            </View>
          </TouchableOpacity>
        </View>
        <InfiniteScroll
          ref="infiniteScroll"
          style={styles.bodyBox}
          horizontal={false}
          onLoadMoreAsync={this.search}
          onRefresh={this.onRefreshRequest}>
          <Content horizontal>
            <View style={{ padding: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
              <TouchableOpacity onPress={this.onClickCityTag.bind(this, 0)}>
                <PText
                  style={{
                    fontSize: RootStore.fontSize(2.5),
                    marginRight: 12,
                    fontWeight: '400',
                    color: this.state.categoryCode === 0 ? '#00afa0' : '#767676',
                  }}>
                  {RootStore.i18n.t('global.all')}
                </PText>
              </TouchableOpacity>
              <FlatList
                keyExtractor={(item) => `${item.code}`}
                showsVerticalScrollIndicator={false}
                extraData={this.state}
                data={this.state.tags}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={this.onClickCityTag.bind(this, item.code)}
                      key={`tag-${index}`}>
                      <PText
                        style={{
                          fontSize: RootStore.fontSize(2.5),
                          marginRight: 12,
                          fontWeight: '400',
                          color: this.state.categoryCode === item.code ? '#00afa0' : '#767676',
                        }}>
                        {item.name}
                      </PText>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Content>
          <View
            style={{
              borderColor: '#9b9b9b',
              borderBottomWidth: 0.5,
              marginLeft: 15,
              marginRight: 15,
            }}
          />
          <View style={styles.block}>
            <FlatList
              keyExtractor={(item) => `${item.code}`}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              data={this.state.spots}
              renderItem={this.renderItemSpots()}
            />
          </View>
        </InfiniteScroll>
      </View>
    );
  }

  renderItemSpots() {
    return ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{ width: '50%', maxHeight: 220, marginBottom: 20 }}
          key={`card-${index}`}>
          <SpotCard spotData={item} click={this.onClickCard.bind(this, item.code)} />
        </TouchableOpacity>
      );
    };
  }
}

Reserve.propTypes = {
  reserve: PropTypes.bool,
  discount: PropTypes.bool,
};

const styles = StyleSheet.create({
  headerBox: {
    width: '100%',
    height: '10%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerTitle: {
    fontSize: RootStore.fontSize(3.8),
    fontWeight: '400',
    color: '#767676',
  },
  headerRight: {
    // backgroundColor: '#aaa',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginRight: 3,
  },
  icon: {
    marginTop: -2,
    marginLeft: 5,
  },
  myReserveIcon: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  bodyBox: {
    width: '100%',
    height: '100%',
  },
  block: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
});
