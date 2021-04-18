import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import React from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { mergeArraysWithKey } from '../../Common/arrayUtils';
import Const from '../../Common/Const';
import getSpotListNew from '../../Common/gql/queries/getSpotListNew.gql';
import SpotCard from '../Components/SpotCard';
import { HEIGHT, HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import RootStore from '../Stores/RootStore';
import PFlatList from '../Components/PFlatList';

@observer
class MyLike extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      spots: [],
      spotTags: [],
      offset: 0,
      existOther: true,
      refreshing: false,
      isLoading: false,
      selectTag: null,
      postType: Const.PostType.Spot.code,
    };

    this.getMyLikeSpot = this.getMyLikeSpot.bind(this);

    this.search = this.search.bind(this);

    this.onRefreshRequest = this.onRefreshRequest.bind(this);
  }

  async componentDidMount() {
    console.log('29148 tui chay MyLike.js');
    analytics().setCurrentScreen('My-Coupon-tab-MyPage');
  }

  onRestartLike = async () => {
    this.setState({ spots: [], existOther: true, offset: 0, refreshing: true }, () => {
      setTimeout(() => {
        this.search();
      }, 200);
    });
  };

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.addListener('restartMyLike', this.onRestartLike);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('restartMyLike', this.onRestartLike);
  }

  getMyLikeSpot() {
    this.setState({ isLoading: true }, async () => {
      const variables = {
        languages: [RootStore.language],
        // order: 'like_count',
        isMine: true,
        isMain: true,
        isConfirm: true,
        limit: 24,
        offset: 0,
        isReserved: true,
        types: Const.SpotListType.coupon.code,
      };
      if (this.state.selectTag) {
        variables.tag_code = this.state.selectTag;
      }
      const result = await RootStore.client.query({
        query: getSpotListNew,
        variables,
      });
      let existOther = this.state.existOther;
      if (result.data.getSpotListNew.spots.length < 10) {
        existOther = false;
      }
      const spots = mergeArraysWithKey([...this.state.spots, ...result.data.getSpotListNew.spots]);
      this.setState({
        existOther,
        spots,
        offset: this.state.offset + 1,
        refreshing: false,
        isLoading: false,
      });
    });
  }

  search() {
    if (!this.state.existOther) {
      return;
    }

    if (!this.state.isLoading) {
      this.getMyLikeSpot();
    }
  }

  onRefreshRequest() {
    this.setState({ spots: [], existOther: true, offset: 0, refreshing: true }, () => {
      setTimeout(() => {
        DeviceEventEmitter.emit('refreshMyPage');
        this.search();
        // this.refs.infiniteScroll._stopRefreshSpinner();
      }, 500);
    });
  }

  onClickSpotCard = (code, city, region) => {
    if (code) {
      Actions.spotDetail({ spotCode: code, city: city, region: region });
    }
  };

  renderItem = ({ item, index }) => {
    return <SpotCard layout2 spotData={item} key={item.code} click={this.onClickSpotCard} />;
  };

  render() {
    if (!this.props.allowLoadData) {
      return this.renderIndicator();
    }

    return (
      <PFlatList
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefreshRequest} />
        }
        onEndReachedThreshold={0.9}
        onEndReached={this.search}
        data={this.state.spots}
        renderItem={this.renderItem}
        contentContainerStyle={[
          {
            paddingTop: 24 * HEIGHT_SCALE_RATIO,
            backgroundColor: 'white',
            paddingBottom: 10 * HEIGHT_SCALE_RATIO,
            paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          },
        ]}
      />
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

export default MyLike;
