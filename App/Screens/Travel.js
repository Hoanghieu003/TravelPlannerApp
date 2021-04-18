import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import { ScrollableTab, Tab, TabHeading, Tabs } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Const from '../../Common/Const';
import Util from '../../Common/Util';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import Divider from '../Components/Divider';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import { getSelectedCity } from '../Constants/asyncStorage';
import style, { COLOR, headerHeight, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import City from './City';
import PlusInformation from './PlusInformation';
import Review from './Review';
import { TAB } from './Search';

const cityNameFromStorage = getSelectedCity();

const TRAVEL_TAB = {
  RESERVATIONS: 0,
  COUPONS: 1,
  REVIEWS: 2,
};
@observer
class Travel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paddingBottom: Util.getIOSPadding('bottom'),
      index: this.props.suggestScreen || TRAVEL_TAB.RESERVATIONS,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('Travel-reviews');
  }

  render() {
    const { paddingBottom } = this.state;
    return (
      <View style={[style.container, { paddingBottom }]}>
        <View style={{ height: headerHeight }} />
        {this.renderTabs()}
        <Divider style={{ marginTop: 0 * HEIGHT_SCALE_RATIO }} />
        {this.renderHeader()}
      </View>
    );
  }

  onOpenSearchFunc = () => {
    this.setState(
      {
        showSearch: true,
      },
      () => {
        if (this.baseHeaderWithSearchRef) {
          this.baseHeaderWithSearchRef.onTextUpdate();
          if (this.baseHeaderWithSearchRef.searchBarRef) {
            this.baseHeaderWithSearchRef.searchBarRef.setState({
              search: this.state.search,
              autoFocusState: true,
            });
          }
        }
      },
    );
  };

  renderTabs = () => {
    return (
      <Tabs
        locked
        renderTabBar={this.renderTabBar()}
        initialPage={this.props.suggestScreen}
        page={this.state.index}
        onChangeTab={this.onChangeTab()}
        tabBarUnderlineStyle={{
          backgroundColor: COLOR.appColor,
          height: 2 * HEIGHT_SCALE_RATIO,
        }}>
        <Tab
          heading={this.renderTabHeading(
            RootStore.i18n.t('home.reservation-discounts').toUpperCase(),
          )}
          tabStyle={{ backgroundColor: COLOR.WHITE }}
          textStyle={{ color: COLOR.GREY80 }}
          activeTabStyle={{ backgroundColor: COLOR.WHITE }}
          activeTextStyle={{ color: COLOR.GREY80, fontWeight: 'normal' }}>
          <City
            ref={(instance) => (this.reservationRef = instance)}
            postType={Const.PostType.Spot.code}
            parentCategory={this.props.parentCategory}
            childrenCategory={this.props.childrenCategory}
            typesOfSpot={Const.SpotListType.reservation.code}
            categoryType={Const.CategoryType.Reserve.code}
            showReservationSpotsOnly={true}
            tagsIsRecommend="false"
            reservations={true}
            isHome={'home'}
          />
        </Tab>
        <Tab
          heading={this.renderTabHeading(RootStore.i18n.t('home.main-coupon').toUpperCase())}
          tabStyle={{ backgroundColor: COLOR.WHITE }}
          textStyle={{ color: COLOR.GREY80 }}
          activeTabStyle={{ backgroundColor: COLOR.WHITE }}
          activeTextStyle={{ color: COLOR.GREY80, fontWeight: 'normal' }}>
          <City
            ref={(instance) => (this.couponRef = instance)}
            postType={Const.PostType.Spot.code}
            typesOfSpot={Const.SpotListType.coupon.code}
            parentCategory={this.props.parentCategory}
            childrenCategory={this.props.childrenCategory}
            categoryType={3}
            advertiseType={9}
            isCouponScreen={true}
            tagsIsRecommend={true}
            showReservationSpotsOnly={true}
            isHome={'home'}
          />
        </Tab>
        <Tab
          heading={this.renderTabHeading(RootStore.i18n.t('home.travel-info').toUpperCase())}
          tabStyle={{ backgroundColor: COLOR.WHITE }}
          textStyle={{ color: COLOR.GREY80 }}
          activeTabStyle={{ backgroundColor: COLOR.WHITE }}
          activeTextStyle={{ color: COLOR.GREY80, fontWeight: 'normal' }}>
          <Review
            ref={(instance) => (this.reviewRef = instance)}
            isFromTravelInfo={true}
            isHome={'home'}
            city={cityNameFromStorage}
            postType={Const.PostType.Blog.code}
          />
        </Tab>
        <Tab
          heading={this.renderTabHeading(RootStore.i18n.t('travel.tips').toUpperCase())}
          tabStyle={{ backgroundColor: COLOR.WHITE }}
          textStyle={{ color: COLOR.GREY80 }}
          activeTabStyle={{ backgroundColor: COLOR.WHITE }}
          activeTextStyle={{ color: COLOR.GREY80, fontWeight: 'normal' }}>
          <PlusInformation />
        </Tab>
      </Tabs>
    );
  };

  renderHeader = () => {
    const childCategory =
      this.state.index === TRAVEL_TAB.RESERVATIONS
        ? { code: TAB.RESERVATION.CODE, name: TAB.RESERVATION.NAME.toLowerCase() }
        : this.state.index === TRAVEL_TAB.COUPONS
        ? { code: TAB.COUPON.CODE, name: TAB.COUPON.NAME.toLowerCase() }
        : this.state.index === TRAVEL_TAB.REVIEWS
        ? { code: TAB.REVIEWS.CODE, name: TAB.REVIEWS.NAME.toLowerCase() }
        : null;
    return (
      <View style={{ position: 'absolute' }}>
        <BaseHeaderWithSearch
          ref={(instance) => (this.baseHeaderWithSearchRef = instance)}
          backgroundColorWhite
          // showSuggest
          showBack
          postType={Const.PostType.Blog.code}
          color={COLOR.appColor}
          isFromTravelInfo={true}
          childCategory={childCategory}
          initialSearchText={null}
          onChangeCity={this.onChangeCity()}
          onSearch={this.onSearch()}
          onChangeKeyword={null}
          onShowSearch={this.onOpenSearchFunc}
        />
      </View>
    );
  };

  renderTabHeading = (text: String) => {
    return (
      <TabHeading
        style={{
          backgroundColor: COLOR.WHITE,
          paddingLeft: 10 * WIDTH_SCALE_RATIO,
          paddingRight: 10 * WIDTH_SCALE_RATIO,
        }}>
        <PText style={[ptText.H4, { color: COLOR.GREY80 }]}>{text}</PText>
      </TabHeading>
    );
  };

  onChangeTab() {
    return ({ i }) => this.setState({ index: i });
  }

  onSearch() {
    return (search, city) => {
      if (this.state.index === TRAVEL_TAB.RESERVATIONS) {
        this.reservationRef.onRefreshRequest();
      } else if (this.state.index === TRAVEL_TAB.COUPONS) {
        this.couponRef.onRefreshRequest();
      } else if (this.state.index === TRAVEL_TAB.REVIEWS) {
        this.reviewRef.onRefreshRequest();
      }
    };
  }

  onChangeCity() {
    return (selectedCity) => {
      setTimeout(() => {
        if (this.state.index === TRAVEL_TAB.RESERVATIONS) {
          this.reservationRef.onRefreshRequest();
        } else if (this.state.index === TRAVEL_TAB.COUPONS) {
          this.couponRef.onRefreshRequest();
        } else if (this.state.index === TRAVEL_TAB.REVIEWS) {
          this.reviewRef.onRefreshRequest();
        }
      }, 200);
    };
  }

  renderTabBar() {
    return () => (
      <ScrollableTab
        style={{ height: 30 * HEIGHT_SCALE_RATIO, backgroundColor: COLOR.WHITE }}
        tabsContainerStyle={{ paddingHorizontal: 8 * WIDTH_SCALE_RATIO }}
      />
    );
  }
}

Travel.propTypes = {
  city: PropTypes.string,
  postType: PropTypes.number,
};

export default Travel;
