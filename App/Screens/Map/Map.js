import analytics from '@react-native-firebase/analytics';
import React from 'react';
import { DeviceEventEmitter, Dimensions, Image, StyleSheet, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
// import MapView from 'react-native-map-clustering';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import { mergeArraysWithKey } from '../../../Common/arrayUtils';
import Const from '../../../Common/Const';
import changeLike from '../../../Common/gql/mutations/changeLike.gql';
import getReserveListNew from '../../../Common/gql/queries/getReserveListNew.gql';
import getSpotListNew from '../../../Common/gql/queries/getSpotListNew.gql';
import {
  CUSTOM_MAP_STYLE,
  HEIGHT,
  HEIGHT_SCALE_RATIO,
  WIDTH,
  WIDTH_SCALE_RATIO,
} from '../../Constant/constant';
import { COLOR, heightBottomBar } from '../../Constants/styles';
import { getTranslationObj } from '../../Constants/utils';
import LikeStore from '../../Stores/LikeStore';
import RootStore from '../../Stores/RootStore';
import { convertLikeSpotToMobx, getMyLikeSpot } from '../../Utils/likeAction';
import BottomSpotInfo from './BottomSpotInfo';
import ExtraButton from './ExtraButton';
import MyCustomMarker from './MyCustomMarker';
import SearchBox from './SearchBox';
import SurroundingButton from './SurroundingButton';
import { ICON } from '../../../asset/image/ImagePath';
const default_location = {
  latitude: 37.561641,
  longitude: 126.992382,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922 * (Dimensions.get('window').width / Dimensions.get('window').height),
};

export const LISTCATEGORY = [
  {
    title: RootStore.i18n.t('map.dining'),
    image: ICON.MAP_SURROUDING_FOOD, //*in swipe surrounding
    image2: ICON.MAP_MARKER_FOOD, //*icon on marker
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
    //*activities from normal category
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
];

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.currentLocation = default_location;
    this.region = default_location;
    this.state = {
      spots: [], //list spot show in carousel
      offset: 0, //offset for pagination of carousel
      existOther: false, //out of data flag for pagination of carousel
      isLoading: false, // carousel loading status
      categorySourceImage: null,
      searchTagText: '',
      loading: true,
    };
    this.carouselSpotData = [];
    this.show1SpotOnly = false;
  }
  componentDidMount() {
    analytics().setCurrentScreen('Map-Screen');
  }

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.addListener('restartLikeInMap', this.onRestartLikeList);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('restartLikeInMap', this.onRestartLikeList);
    clearTimeout(this.timeoutInitData);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMap()}
        {this.renderSearchBox()}
        {this.renderSurrounding()}
        {((!this.show1SpotOnly && this.state.spots.length > 0) ||
          (this.show1SpotOnly && this.carouselSpotData.length > 0)) &&
          this.renderCarousel()}
        {this.renderButtonLocation()}
        {this.state.loading && this.renderLoading()}
      </View>
    );
  }
  renderMap = () => {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={CUSTOM_MAP_STYLE}
        region={this.region}
        onRegionChangeComplete={this.regionChangeCompleteFunc}
        onMapReady={this.mapReadyFunc}
        ref={(instance) => (this.mapView = instance)}>
        {this.state.spots.map((marker, i) => {
          return (
            <MyCustomMarker
              marker={marker}
              key={`${marker.code}`}
              like={marker.like}
              isReserved={marker.isReserved}
              categorySourceImage={this.state.categorySourceImage}
              onMarkerPress={this.onClickSpotMarker}
            />
          );
        })}
        {!!this.currentLocation && (
          <Marker
            coordinate={this.currentLocation}
            key={this.currentLocation.latitude + this.currentLocation.longitude}
            zIndex={99999999}>
            <Image
              key={'99999999'}
              style={{ width: 24 * WIDTH_SCALE_RATIO, height: 24 * HEIGHT_SCALE_RATIO }}
              source={ICON.MAP_CURRENT_LOCATION}
              resizeMode={'contain'}
            />
          </Marker>
        )}
      </MapView>
    );
  };

  renderLoading() {
    return (
      <View
        style={{
          backgroundColor: '#ffffff80',
          position: 'absolute',
          width: WIDTH,
          height: HEIGHT,
        }}>
        <SkypeIndicator
          color={COLOR.appColor}
          style={{ marginBottom: heightBottomBar + 15 * HEIGHT_SCALE_RATIO }}
          size={40 * HEIGHT_SCALE_RATIO}
        />
      </View>
    );
  }

  renderSearchBox() {
    console.log('29148 this.searchBoxRef:', this.searchBoxRef);
    return (
      <SearchBox
        ref={(instance) => (this.searchBoxRef = instance)}
        showBackButton={this.props.isFromExchange || this.props.isFromSpotDetail}
        onPressItemFromSearchList={this.onPressItemFromSearchListFunc}
        onPressClearSearchBox={this.onPressClearSearchBoxFunc}
        onChangeTagDone={this.onClickCategoryTag}
      />
    );
  }

  renderSurrounding() {
    return (
      <SurroundingButton
        ref={(instance) => (this.surroundingButtonRef = instance)}
        extraButtonRef={this.extraButtonRef}
        self={this}
      />
    );
  }

  renderButtonLocation() {
    return (
      <ExtraButton
        ref={(instance) => (this.extraButtonRef = instance)}
        moveUpper={
          (!this.show1SpotOnly && this.state.spots.length > 0) ||
          (this.show1SpotOnly && this.carouselSpotData.length > 0)
        }
        onGetLocationDone={this.onGetCurrentLocationDoneFunc}
        surroundingButtonRef={this.surroundingButtonRef}
        self={this}
      />
    );
  }

  onRestartLikeList = async () => {
    if (this.state.searchTagText) {
      this.searchBoxRef.setState({
        searchText: this.state.searchTagText || '',
      });
      await this.search(true);
      await getMyLikeSpot();
      const likedList = await LikeStore.getLikeSpotListsArray.slice(0, 24);
      this.setState({
        spots: mergeArraysWithKey([...this.state.spots, ...likedList]),
      });
      if (this.extraButtonRef) {
        this.extraButtonRef.closePanel();
      }
    } else {
      this.carouselSpotData = [];
      let tempListReservedSpot = [];
      tempListReservedSpot = await this.getReservedSpotList();
      await getMyLikeSpot();
      const likedList = await LikeStore.getLikeSpotListsArray.slice(0, 24);
      this.setState({
        spots: mergeArraysWithKey([...tempListReservedSpot, ...likedList]),
      });
    }
  };

  initData = async () => {
    this.show1SpotOnly = true;
    await this.onRestartLikeList();
  };

  getReservedSpotList = async () => {
    const variables = {
      isMine: true,
      offset: 0,
      limit: 24,
    };
    const result = await RootStore.client.query({
      query: getReserveListNew,
      variables,
    });
    if (result?.data?.getReserveListNew?.reserves) {
      return result.data.getReserveListNew.reserves.map((e) => ({ ...e.spot, isReserved: true }));
    } else {
      return [];
    }
  };

  renderCarouselItem = ({ item, index }) => {
    return (
      <BottomSpotInfo
        item={item}
        index={index}
        onClickSpotCard={this.onClickSpotCard}
        onClickHeart={this.onClickHeart}
        isLike={this.isLike}
        onDoneClickLike={this.onLikeCompleted}
      />
    );
  };

  onClickHeart = async (code, isLike) => {
    if (RootStore.auth.id === '') {
      return;
    }

    const variables = {
      nowState: isLike,
      where: 'spot',
      code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });

    if (result.data.changeLike) {
      let newSpots = this.state.spots.map((e) => {
        if (e && e.code === code) {
          const newData = { ...e };
          newData.like = !isLike;
          return newData;
        }
        return e;
      });
      this.setState({ spots: newSpots });
    } else {
      console.log('29148 click like chay api change like loi:');
    }
  };

  /**
   *  get spots list and show it on carousel
   *
   * @param {*} allowNavigateToFirstItem force to navigate to the first item in spots list
   */
  search = async (allowNavigateToFirstItem = true) => {
    if (!this.state.existOther || this.state.isLoading) {
      return;
    }
    this.setState({
      loadingCarousel: true,
    });
    try {
      const usingLocation = this.region;
      const variables = {
        coordinates: {
          east: usingLocation.longitude + usingLocation.longitudeDelta / 1,
          west: usingLocation.longitude - usingLocation.longitudeDelta / 1,
          south: usingLocation.latitude - usingLocation.latitudeDelta / 1,
          north: usingLocation.latitude + usingLocation.latitudeDelta / 1,
        },
        order: Const.OrderType.Like.name,
        offset: 20 * this.state.offset,
        limit: 20,
        languages: [RootStore.language],
      };

      const selectedCategory = this?.searchBoxRef?.state?.currentSelectedCategory;

      if (selectedCategory && selectedCategory.tag_code) {
        variables.tags = [selectedCategory.tag_code];
      }

      const result = await RootStore.client.query({
        query: getSpotListNew, //call api here
        variables,
      });
      const spots = this.state.spots;
      const newUpdatedLikeList = [];
      result.data.getSpotListNew.spots.forEach((v, i) => {
        const city = v.tags.filter((v2) => v2.type === Const.TagType.City.code);
        const category = v.tags.filter((v2) => v2.type === Const.TagType.Category.code);

        const exist = this.state.spots.find((v2) => v.code === v2.code);
        if (!exist) {
          const tagInfo = {
            city: city && getTranslationObj(city[0]) ? getTranslationObj(city[0]).name : '',
            category:
              category && getTranslationObj(category[0]) ? getTranslationObj(category[0]).name : '',
          };
          let normalPriceStr = '';
          let cancelPriceStr = '';
          if (v.translations && v.translations.length > 0 && getTranslationObj(v)) {
            try {
              const titlePriceObject = JSON.parse(getTranslationObj(v).title_price);
              normalPriceStr = titlePriceObject.normal;
              cancelPriceStr = titlePriceObject.cancel;
            } catch (e) {
              console.log('bambi parse json failed', e);
            }
          }
          newUpdatedLikeList.push({ ...v, tagInfo, normalPriceStr, cancelPriceStr });
          spots.push({ ...v, tagInfo, normalPriceStr, cancelPriceStr });
        }
      });

      convertLikeSpotToMobx(newUpdatedLikeList);

      // const count = result.data.getSpotListNew.count;

      let existOther = true;
      if (result.data.getSpotListNew.spots.length < 20) {
        existOther = false;
      }

      if (spots.length > 0 && allowNavigateToFirstItem) {
        //navigate to 1st item
        this.region = {
          region: {
            latitude: spots[0].latitude,
            longitude: spots[0].longitude,
            latitudeDelta: this.location.latitudeDelta,
            longitudeDelta: this.location.longitudeDelta,
          },
        };
      }

      this.setState({
        existOther,
        spots,
        search: this.state.search
          ? this.state.search
          : this.state.selectedCategory && this.state.selectedCategory.title
          ? this.state.selectedCategory.title
          : '',
        searchSpotList: [],
        offset: this.state.offset + 1,
      });
    } catch (error) {
      this.setState({
        isLoadingNearby: false,
        loadingCarousel: false,
      });
    }
  };

  onClickSpotCard = (spot, city, region) => {
    if (spot && spot.code) {
      Actions.spotDetail({ spotCode: spot.code, city: city, region: region });
    }
  };

  onPressItemFromSearchListFunc = (item) => {
    this.setState({
      spots: [item],
      existOther: false,
    });
    this.show1SpotOnly = false;
    this.carouselSpotData = [];
    this.region = {
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: this.region.latitudeDelta,
      longitudeDelta: this.region.longitudeDelta,
    };
    this?.mapView?.animateToRegion(this.region, 500);
  };

  onPressClearSearchBoxFunc = () => {
    this.setState(
      {
        spots: [],
        offset: 0, //offset for pagination of carousel
        existOther: false, //out of data flag for pagination of carousel
        categorySourceImage: null,
      },
      () => {
        this.region = default_location;
        this?.mapView?.animateToRegion(this.region, 500);
        this.initData();
      },
    );
  };

  onSnapToItem = (index) => {
    if (index >= 0 && this?.state?.spots && this?.state?.spots[index]) {
      this.region = {
        latitude: this.state.spots[index].latitude,
        longitude: this.state.spots[index].longitude,
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
      };
      this?.mapView?.animateToRegion(this.region, 500);
    }
  };

  renderCarousel = () => {
    const data = this.show1SpotOnly
      ? this.carouselSpotData
        ? this.carouselSpotData
        : []
      : this.state.spots;
    return (
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: heightBottomBar + 10,
          height: 120 * HEIGHT_SCALE_RATIO,
        }}>
        <Carousel
          ref={(c) => (this._carousel = c)}
          data={data}
          onSnapToItem={this.onSnapToItem}
          onEndReached={this.search}
          onEndReachedThreshold={0.01}
          maxToRenderPerBatch={3}
          renderItem={this.renderCarouselItem}
          sliderWidth={WIDTH}
          itemWidth={333 * WIDTH_SCALE_RATIO}
          initialNumToRender={5}
          shouldOptimizeUpdates
          removeClippedSubviews
          renderToHardwareTextureAndroid
        />
      </View>
    );
  };

  onClickCategoryTag = (tag) => {
    clearTimeout(this.timeoutInitData);
    this.haventChooseCategory = false;
    this.show1SpotOnly = false;
    this.carouselSpotData = [];
    this.setState(
      {
        existOther: true,
        spots: [],
        offset: 0,
        searchTagText: tag?.title || '',
      },
      async () => {
        this.setState({
          categorySourceImage: tag
            ? this?.searchBoxRef?.state?.LISTCATEGORY.find((e) => e === tag).image2
            : this?.searchBoxRef?.state?.LISTCATEGORY.find((e) => e.isAll).image2,
        });
        this.searchBoxRef.setState({
          searchText: tag?.title || '',
        });
        await this.search(true);
        if (this.extraButtonRef) {
          this.extraButtonRef.closePanel();
        }
      },
    );
  };

  onClickSpotMarker = (item) => {
    const index =
      this.state.spots && this.state.spots.length > 0
        ? this.state.spots.findIndex((e) => e.code === item.code)
        : -1;
    if (index !== -1) {
      this.region = {
        latitude: this.state.spots[index].latitude,
        longitude: this.state.spots[index].longitude,
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
      };
      this?.mapView?.animateToRegion(this.region, 500);

      if (this.show1SpotOnly) {
        if (index >= 0 && this?.state?.spots && this?.state?.spots[index]) {
          this.carouselSpotData = [this.state.spots[index]];
          this.forceUpdate();
        }
      } else {
        this?._carousel?.snapToItem(index, true, false);
      }
    }
  };

  onGetCurrentLocationDoneFunc = (pos) => {
    this.region = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      latitudeDelta: this.location ? this.location.latitudeDelta : default_location.latitudeDelta,
      longitudeDelta: this.location
        ? this.location.longitudeDelta
        : default_location.longitudeDelta,
    };
    this.currentLocation = this.region;

    if (this.mapView) {
      this.forceUpdate();
      //navigate to current position
      this.mapView.animateToRegion(this.region, 500);
    }
  };

  mapReadyFunc = async () => {
    try {
      if (this.props.isFromExchange || this.props.isFromSpotDetail) {
        //go to this page from exchange screen show exchanged spots;
        setTimeout(() => {
          if (this.props.spot) {
            this.region = {
              ...default_location,
              latitude: this.props.spot.latitude,
              longitude: this.props.spot.longitude,
            };
            this.setState({
              spots: [this.props.spot],
              loading: false,
            });
          }
        }, 200);
      } else {
        await this.initData();
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  regionChangeCompleteFunc = (region) => {
    this.region = region;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
