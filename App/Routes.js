/* eslint-disable prettier/prettier */
import React from 'react';
import { BackHandler, DeviceEventEmitter, Dimensions, Platform } from 'react-native';
import {
  ActionConst,
  Actions,
  Overlay,
  Reducer,
  Router,
  Scene,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import Const from '../Common/Const';
import SideMenu from './Components/SideMenu';
import TabBarIcon from './Components/TabBarIcon';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from './Constant/constant';
import globalUtils from './Constants/globalUtils';
import { COLOR, heightBottomBar } from './Constants/styles';
import AboutScreen from './Screens/About';
import accountIntegrationScreen from './Screens/AccountIntegration';
import AlertScreen from './Screens/Alert';
import AlertAllScreen from './Screens/AlertAll';
import AlertAnnouncementScreen from './Screens/AlertAnnouncement';
import AlertEventScreen from './Screens/AlertEvent';
import AlertReservationScreen from './Screens/AlertReservation';
import BlogDetailScreen from './Screens/BlogDetail';
import BlogSpotLinkScreen from './Screens/BlogSpotLink';
import BlogSpotReserveScreen from './Screens/BlogSpotReserve';
import ChangePasswordScreen from './Screens/ChangePassword';
import CultureNews from './Screens/CultureNews';
import EmailLoginScreen from './Screens/EmailLogin';
import ExchangeScreen from './Screens/Exchange';
import FlightTimeScreen from './Screens/FlightTime';
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/Home';
import Load from './Screens/Load';
import LoginScreen from './Screens/Login';
import MapScreen from './Screens/Map/Map';
import MemberBenefitScreen from './Screens/MemberBenefit';
import MyLikeScreen from './Screens/MyLike';
import MyPageScreen from './Screens/MyPage';
import MyReserveScreen from './Screens/MyReserve';
import changePersonalSettingScreen from './Screens/PersonalSetting';
import PlusInformation from './Screens/PlusInformation';
import PolicyScreen from './Screens/Policy';
import ProxyShopping from './Screens/ProxyShopping';
import RegisterScreen from './Screens/Register';
import ReserveCompleteScreen from './Screens/ReserveComplete';
import ReserveCompletedScreen from './Screens/ReserveCompleted';
import ReserveDetailScreen from './Screens/ReserveDetail';
import ReservePaymentScreen from './Screens/ReservePayment';
import ReserveSpot from './Screens/ReserveSpot';
import ReviewScreen from './Screens/Review';
import SearchScreen from './Screens/Search';
import SpotBlogLinkScreen from './Screens/SpotBlogLink';
import SpotDetailScreen from './Screens/SpotDetail';
import TravelScreen from './Screens/Travel';
import { ICON } from '../asset/image/ImagePath';

const sizeIconTabbar = 30 * WIDTH_SCALE_RATIO;
export default class Routes extends React.PureComponent {
  constructor(props) {
    super(props);

    this.prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';
    this.currentScene = null;
    this.tabBarPosY = 0;
    if (
      Platform.OS === 'ios' &&
      (Dimensions.get('window').height === 2000 ||
        Dimensions.get('window').width === 812 ||
        Dimensions.get('window').height === 2000 ||
        Dimensions.get('window').width === 896)
    ) {
      this.tabBarPosY = -35;
    }
    this.reducerCreate = this.reducerCreate.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.getSceneStyle = this.getSceneStyle.bind(this);
    this.transitionConfig = this.transitionConfig.bind(this);

    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress() {
    if (this.currentScene === 'home') {
      BackHandler.exitApp();
    }
    // else if (this.currentScene === 'login') {
    //   if (globalUtils.isBackToSpotDetail) {
    //     Actions.jump('giftstack');
    //   }
    // }
    else {
      Actions.pop();
    }

    return true;
  }

  reducerCreate(params) {
    const defaultReducer = new Reducer(params);

    return (state, action) => {
      if (action.type === ActionConst.FOCUS) {
        this.currentScene = action.routeName;
      }

      return defaultReducer(state, action);
    };
  }

  stateHandler(prevState, newState, action) {}

  getSceneStyle() {
    return { backgroundColor: '#fff', shadowOpacity: 1, shadowRadius: 3 };
  }

  transitionConfig() {
    return {
      screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
    };
  }
  cleanBackAfterLogin() {
    globalUtils.isBackToSpotDetail = false;
    globalUtils.isBackToBlogDetail = false;
    globalUtils.isComment = false;
    globalUtils.spotCode = {};
    globalUtils.blogCode = {};
    globalUtils.spotDetail = {};
  }

  render() {
    return (
      <Router
        createReducer={this.reducerCreate}
        onStateChange={this.stateHandler}
        getSceneStyle={this.getSceneStyle}
        uriPrefix={this.prefix}>
        <Overlay key="overlay">
          <Scene
            key="modal"
            hideNavBar
            // transitionConfig={this.transitionConfig}
            hideTabBar
            headerMode="none">
            {/* <Scene key="load" component={Load} initial={true} headerMode="none" /> */}

            <Scene
              key="mainStack"
              drawer
              headerMode="none"
              contentComponent={SideMenu}
              drawerWidth={300}
              drawerPosition="right"
              hideDrawerButton
              hideNavBar>
              <Scene key="load" component={Load} initial={true} headerMode="none" />

              <Tabs
                key="menubar"
                routeName="menubar"
                tabBarPosition={'bottom'}
                showLabel={false}
                lazy={true}
                tabBarOnPress={(e) => {
                  if (e && e.navigation && e.navigation.state && e.navigation.state.key) {
                    DeviceEventEmitter.emit('closeSearchBar');
                    if (e.navigation.state.key === 'giftStack') {
                      Actions.jump('giftScreen', {
                        postType: Const.PostType.Spot.code,
                        typesOfSpot: Const.SpotListType.reservation.code,
                        categoryType: Const.CategoryType.Reserve.code,
                        showReservationSpotsOnly: true,
                      });
                      this.cleanBackAfterLogin();
                      // }

                      DeviceEventEmitter.emit('showBackInCity', false);
                    } else if (
                      e.navigation.state.key === 'homeStack' ||
                      e.navigation.state.key === 'home'
                    ) {
                      this.cleanBackAfterLogin();

                      Actions.jump('home');
                      // alert('Waiting for API');
                    } else if (
                      e.navigation.state.key === 'myPage' ||
                      e.navigation.state.key === 'aboutStack'
                    ) {
                      this.cleanBackAfterLogin();

                      if (globalUtils.isLogin) {
                        Actions.jump('myPage');
                      } else {
                        Actions.jump('aboutStack', { spotDetailRequire: false });
                      }
                      // alert('Waiting for API');
                    } else if (e.navigation.state.key === 'couponStack') {
                      this.cleanBackAfterLogin();

                      // if (globalUtils.isLogin) {
                      Actions.reset('couponScreen', {
                        postType: Const.PostType.Spot.code,
                        typesOfSpot: Const.SpotListType.coupon.code,
                        categoryType: 3,
                        showReservationSpotsOnly: true,
                        // isHome: 'home',
                      });
                      DeviceEventEmitter.emit('showBackInCity', true);
                      // } else {
                      //   Actions.jump('login', { atScreen: 'giftScreen' });
                      // }
                    } else {
                      this.cleanBackAfterLogin();

                      Actions.jump(e.navigation.state.key);
                    }
                  }
                }}
                tabBarStyle={{
                  borderTopWidth: 0,
                  position: 'absolute',
                  bottom: 0,
                  shadowColor: COLOR.appTextPlaceholderColor,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 5,
                  elevation: 10,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  height: heightBottomBar - 20 * HEIGHT_SCALE_RATIO,
                  backgroundColor: 'white',
                  marginBottom: this.tabBarPosY,
                  // paddingTop: getBottomSpace(),
                  width: WIDTH * 0.92,
                  marginHorizontal: WIDTH * 0.04,
                  // paddingHorizontal: 16,
                }}>
                {/* tab1 */}
                <Stack key="homeStack" iconName="home" icon={HomeIcon} hideNavBar>
                  <Scene key="travel" component={TravelScreen} />
                  <Scene key="review" component={ReviewScreen} />

                  <Scene key="cultureNews" component={CultureNews} />
                  <Scene key="home" component={HomeScreen} initial />
                  <Scene key="proxyShopping" component={ProxyShopping} hideTabBar />

                  <Scene key="exchange" component={ExchangeScreen} />
                  <Scene key="flightTime" component={FlightTimeScreen} hideTabBar />
                  <Scene key="plusInformation" component={PlusInformation} hideTabBar />

                  <Scene key="blogDetail" component={BlogDetailScreen} hideTabBar />
                  <Scene key="spotDetail" component={SpotDetailScreen} hideTabBar />
                  <Scene key="map" component={MapScreen} />
                  <Scene key="search" component={SearchScreen} hideTabBar />

                  <Scene key="reserveSpot" component={ReserveSpot} hideTabBar />
                  <Scene key="spotBlogLink" component={SpotBlogLinkScreen} hideTabBar />
                  <Scene key="blogSpotLink" component={BlogSpotLinkScreen} hideTabBar />
                  <Scene key="blogSpotReserve" component={BlogSpotReserveScreen} hideTabBar />
                </Stack>
                {/* tab2 */}
                {/* <Stack key="giftStack" iconName="list" icon={CategoryIcon} hideNavBar>
                  <Scene key="giftScreen" component={CityScreen} initial />
                  <Scene key="reserve" component={ReserveScreen} />
                  <Scene key="map" component={MapScreen} />
                  <Scene key="spotDetail" component={SpotDetailScreen} hideTabBar />

                  <Scene key="spotBlogLink" component={SpotBlogLinkScreen} hideTabBar />
                  <Scene key="blogDetail" component={BlogDetailScreen} hideTabBar />
                  <Scene key="reserveSpot" component={ReserveSpot} hideTabBar />
                  <Scene key="blogSpotLink" component={BlogSpotLinkScreen} hideTabBar />
                  <Scene key="blogSpotReserve" component={BlogSpotReserveScreen} hideTabBar />
                  <Scene key="reserveDetail" component={ReserveDetailScreen} hideTabBar />
                  <Scene key="reservePayment" component={ReservePaymentScreen} hideTabBar />
                  <Scene key="reserveComplete" component={ReserveCompleteScreen} hideTabBar />
                  <Scene key="reserveCompleted" component={ReserveCompletedScreen} hideTabBar />
                </Stack> */}
                {/* <Stack
                key="categoryStack"
                iconName="list"
                icon={CategoryIcon}
                hideNavBar
              >
                <Scene key="category" component={CategoryScreen} />
                <Scene key="exchange" component={ExchangeScreen} />
                <Scene key="search" component={SearchScreen} hideTabBar />
                <Scene key="city" component={CityScreen} hideTabBar />
                <Scene key="map" component={MapScreen} />

              </Stack>

              */}
                {/* tab3 */}
                {/* <Stack key="couponStack" iconName="gift" icon={MeetIcon} hideNavBar>
                  <Scene key="couponScreen" component={CityScreen} initial />
                  <Scene key="reserve" component={ReserveScreen} />
                  <Scene key="spotDetail" component={SpotDetailScreen} hideTabBar />
                  <Scene key="map" component={MapScreen} />

                  <Scene key="spotBlogLink" component={SpotBlogLinkScreen} hideTabBar />
                  <Scene key="blogDetail" component={BlogDetailScreen} hideTabBar />
                  <Scene key="reserveSpot" component={ReserveSpot} hideTabBar />
                  <Scene key="blogSpotLink" component={BlogSpotLinkScreen} hideTabBar />
                  <Scene key="blogSpotReserve" component={BlogSpotReserveScreen} hideTabBar />
                  <Scene key="reserveDetail" component={ReserveDetailScreen} hideTabBar />
                  <Scene key="reservePayment" component={ReservePaymentScreen} hideTabBar />
                  <Scene key="reserveComplete" component={ReserveCompleteScreen} hideTabBar />
                  <Scene key="reserveCompleted" component={ReserveCompletedScreen} hideTabBar />

                </Stack> */}
                {/* tab4 */}
                <Stack key="mapStack" iconName="map" icon={MapIcon} hideNavBar>
                  <Scene key="map" component={MapScreen} />
                  <Scene key="spotDetail" component={SpotDetailScreen} />
                </Stack>

                {/* tab5 */}

                <Stack key="aboutStack" iconName="user" icon={AboutIcon} hideNavBar>
                  <Scene key="myPage" initial component={MyPageScreen} />
                  <Scene key="changePassword" component={ChangePasswordScreen} hideTabBar />

                  <Scene key="alert" component={AlertScreen} hideTabBar />

                  <Scene key="alertAll" component={AlertAllScreen} hideTabBar />
                  <Scene key="alertReservation" component={AlertReservationScreen} hideTabBar />
                  <Scene key="alertAnnouncement" component={AlertAnnouncementScreen} hideTabBar />
                  <Scene key="alertEvent" component={AlertEventScreen} hideTabBar />
                  <Scene
                    key="changePersonalSetting"
                    component={changePersonalSettingScreen}
                    hideTabBar
                  />
                  <Scene key="accountIntegration" component={accountIntegrationScreen} hideTabBar />

                  {/* <Scene key="spotDetail" component={SpotDetailScreen} hideTabBar /> */}
                  <Scene key="spotBlogLink" component={SpotBlogLinkScreen} hideTabBar />
                  <Scene key="blogDetail" component={BlogDetailScreen} hideTabBar />
                  <Scene key="blogSpotLink" component={BlogSpotLinkScreen} hideTabBar />
                  <Scene key="blogSpotReserve" component={BlogSpotReserveScreen} hideTabBar />
                  <Scene key="reserveDetail" component={ReserveDetailScreen} hideTabBar />
                  <Scene key="reserveSpot" component={ReserveSpot} hideTabBar />
                  <Scene key="reservePayment" component={ReservePaymentScreen} hideTabBar />
                  <Scene key="reserveComplete" component={ReserveCompleteScreen} hideTabBar />
                  <Scene key="myPage" component={MyPageScreen} />

                  <Scene key="reserveCompleted" component={ReserveCompletedScreen} hideTabBar />

                  <Stack key="welcome" hideNavBar>
                    <Scene key="login" component={LoginScreen} />
                    <Scene key="emailLogin" component={EmailLoginScreen} />
                    <Scene key="policy" component={PolicyScreen} />
                    <Scene key="register" component={RegisterScreen} />
                    <Scene key="forgotPassword" component={ForgotPassword} />
                  </Stack>
                  <Scene key="about" component={AboutScreen} />
                  <Scene key="memberBenefit" component={MemberBenefitScreen} />

                  <Scene key="myReserve" component={MyReserveScreen} />
                  <Scene key="myLike" component={MyLikeScreen} />
                  <Scene key="spotDetail" component={SpotDetailScreen} hideTabBar />
                  <Scene key="spotBlogLink" component={SpotBlogLinkScreen} hideTabBar />
                  <Scene key="blogSpotLink" component={BlogSpotLinkScreen} hideTabBar />
                  <Scene key="blogSpotReserve" component={BlogSpotReserveScreen} hideTabBar />
                </Stack>
                {/* <Scene
                    key="changePassword"
                    component={ChangePasswordScreen}
                    hideTabBar
                  /> */}
              </Tabs>
              {/* <Scene key="myPage" component={MyPageScreen} /> */}
              {/* <Stack key="welcome" hideNavBar>
                <Scene key="login" component={LoginScreen} />
                <Scene key="emailLogin" component={EmailLoginScreen} />
                <Scene key="policy" component={PolicyScreen} />
                <Scene key="register" component={RegisterScreen} />
                <Scene key="forgotPassword" component={ForgotPassword} />
              </Stack> */}
            </Scene>
          </Scene>
        </Overlay>
      </Router>
    );
  }
}

class HomeIcon extends React.Component {
  render() {
    return (
      <TabBarIcon icon={ICON.TABBAR_HOME_ICON} size={sizeIconTabbar} focused={this.props.focused} />
    );
  }
}

class CategoryIcon extends React.Component {
  render() {
    return (
      <TabBarIcon icon={ICON.TABBAR_GIFT_ICON} size={sizeIconTabbar} focused={this.props.focused} />
    );
  }
}

class MeetIcon extends React.Component {
  render() {
    return (
      <TabBarIcon icon={ICON.TABBAR_MEET_ICON} size={sizeIconTabbar} focused={this.props.focused} />
    );
  }
}

class MapIcon extends React.Component {
  render() {
    return (
      <TabBarIcon icon={ICON.TABBAR_MAP_ICON} size={sizeIconTabbar} focused={this.props.focused} />
    );
  }
}

class AboutIcon extends React.Component {
  render() {
    return (
      <TabBarIcon
        icon={ICON.TABBAR_MYPAGE_ICON}
        size={sizeIconTabbar}
        focused={this.props.focused}
      />
    );
  }
}
