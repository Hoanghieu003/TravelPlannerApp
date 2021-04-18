import analytics from '@react-native-firebase/analytics';
import { observer } from 'mobx-react';
import { Tab, TabHeading, Tabs } from 'native-base';
import React from 'react';
import {
  Alert,
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Feather from 'react-native-vector-icons/Feather';
import Const from '../../Common/Const';
import setMember from '../../Common/gql/mutations/setMember.gql';
import getMemberInfo from '../../Common/gql/queries/getMemberInfo.gql';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import { myAlert } from '../Components/MyAlert';
import MyImage from '../Components/MyImage';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import globalUtils from '../Constants/globalUtils';
import style, { COLOR, heightBottomBar } from '../Constants/styles';
import LikeStore from '../Stores/LikeStore';
import RootStore from '../Stores/RootStore';
import MyBenefit from './MyBenefit';
import MyLike from './MyLike';
import MyReserve from './MyReserve';
import { IMAGE } from '../../asset/image/ImagePath';
const deviceWidth = Dimensions.get('window').width;
const TAB = {
  REVIEWS: 2,
  MEMBER_BENEFIT: 1,
  MY_RESERVATION: 0,
};

@observer
class MyPage extends React.PureComponent {
  constructor(props) {
    super(props);
    if (RootStore.auth && (RootStore.auth.id || RootStore.auth.id === 'guest')) {
    } else {
      Actions.replace('welcome');
    }
    this.getMemberInfo = this.getMemberInfo.bind(this);
    this.setMemberInfo = this.setMemberInfo.bind(this);

    this.onClickLogOut = this.onClickLogOut.bind(this);
    this.onClickGoChangePersonalSetting = this.onClickGoChangePersonalSetting.bind(this);

    this.state = {
      scrollWithoutAnimation: false,

      countReserves: 0,
      countTravelInfo: 0,
      countReservationBenefits: 0,
      picture: '',
      scrollY: new Animated.Value(0),
      id: '',
      email: '',
      nickname: '',
      modifyNickname: false,
      home: '',
      modifyHome: false,
      introduce: '',
      modifyIntroduce: false,
      socialType: 0,
      modalSideBar: false,
      languageDropdown: false,
      languages: Object.values(Const.Language),
      language: RootStore.language,
      indexTab: this.props.selectTab ? this.props.selectTab : TAB.MY_RESERVATION,
      isDoneLoadingTabs: [this.props.selectTab ? this.props.selectTab : TAB.MY_RESERVATION],
    };

    const rate = (deviceWidth * 0.15) / 512;
    this.logoWidth = 512 * rate;
    this.logoHeight = 512 * rate;
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('refreshMyPage', this.onRefreshMyPage);
    DeviceEventEmitter.removeListener(
      'refreshAfterUpdateProfile',
      this.onRefreshAfterUpdateProfile,
    );
    DeviceEventEmitter.removeListener('onClickChangePassword', this.onClickGoChangePassword);
    DeviceEventEmitter.removeListener(
      'onClickChangePersonalSetting',
      this.onClickGoChangePersonalSetting,
    );
    DeviceEventEmitter.removeListener('onClickLogOut', this.onClickLogOut);
  }

  onRefreshMyPage = async () => {
    DeviceEventEmitter.emit('restartMyLike', {});
    DeviceEventEmitter.emit('restartMyBenefit', {});
  };

  onRefreshAfterUpdateProfile = async () => {
    await this.getMemberInfo();
  };

  async componentDidMount() {
    analytics().setCurrentScreen('My-Page');
    DeviceEventEmitter.addListener('refreshMyPage', this.onRefreshMyPage);
    DeviceEventEmitter.addListener('refreshAfterUpdateProfile', this.onRefreshAfterUpdateProfile);
    DeviceEventEmitter.addListener('onClickChangePassword', this.onClickGoChangePassword);
    DeviceEventEmitter.addListener(
      'onClickChangePersonalSetting',
      this.onClickGoChangePersonalSetting,
    );
    DeviceEventEmitter.addListener('onClickLogOut', this.onClickLogOut);
    setTimeout(
      () => {
        if (this.state.initTab === 0) {
          DeviceEventEmitter.emit('restartMyReserve', {});
        } else if (this.state.initTab === TAB.MEMBER_BENEFIT) {
          DeviceEventEmitter.emit('restartMyLike', {});
        } else if (this.state.initTab === TAB.REVIEWS) {
          DeviceEventEmitter.emit('restartMyBenefit', {});
        }
      },
      Platform.OS === 'android' ? 400 : 800,
    );
    await this.onRefreshAfterUpdateProfile();
  }

  async getMemberInfo() {
    if (!RootStore.auth.id) {
      return;
    }

    const result = await RootStore.client.query({
      query: getMemberInfo,
      variables: {
        id: RootStore.auth.id,
        language: RootStore.language,
        include_spot_count: true,
        include_blog_count: true,
      },
    });
    const info = result.data.getMemberInfo.member;
    const id = info.id;
    const email = info.email;
    const nickname = info && info.nickname ? info.nickname : info.name ? info.name : '';
    const home = info.country
      ? info.country.name === 'Taiwan, Province of China'
        ? 'Taiwan'
        : info.country.name
      : '거주지 없음';
    const introduce = info.introduce;
    const socialType = info.social_type;
    globalUtils.socialType = socialType;
    const picture = info && info.picture ? info.picture : RootStore.auth.picture;

    this.setState({
      id,
      email,
      picture,
      modifyNickname: false,
      nickname,
      modifyHome: false,
      home,
      modifyIntroduce: false,
      introduce,
      socialType,
    });
  }

  async setMemberInfo() {
    const variables = {
      nickname: this.state.nickname,
      introduce: this.state.introduce,
    };

    await RootStore.client.mutate({ mutation: setMember, variables });
  }

  async onClickLogOut() {
    if (RootStore.auth.isGuest) {
      Actions.replace('welcome');
    }
    if (!RootStore.auth.isGuest) {
      await store.update('token', '');
      await store.update('id', '');
      await store.update('nickname', '');
      await store.update('picture', 'profile_default.svg');
      await store.update('home_tag_code', null);
      // await this.setState({ socialType: 0 });
      globalUtils.isLogin = false;
      await RootStore.logout();
      LikeStore.setLikeSpotLists([]);
      LikeStore.setLikeBlogLists([]);
      DeviceEventEmitter.emit('forceUpdateNewData', {});

      Actions.replace('welcome');
      Actions.jump('home');
    }
  }

  onClickGoBenefit = () => {
    Actions.memberBenefit();
  };

  onClickGoChangePersonalSetting() {
    if (this.state.socialType !== Const.SocialType.Creatrip.code) {
      Alert.alert(
        '',
        RootStore.i18n.t('my-page.social-user'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: true },
      );
      return;
    } else {
      Actions.changePersonalSetting();
    }
  }

  openDrawer = () => {
    Actions.drawerOpen();
  };

  render() {
    if (RootStore.auth && (!RootStore.auth.id || RootStore.auth.id === 'guest')) {
      return <View style={{ flex: 1 }} />;
    }

    return (
      <View style={{ flex: 1 }}>
        <BaseHeaderApp
          leftIconStyle={{ width: 0, height: 0 }}
          onRightPress2={this.openDrawer}
          rightIconStyle={{ tintColor: COLOR.WHITE }}
          rightIconStyle2={{ tintColor: COLOR.GREY20 }}
        />

        <View
          style={{
            alignItems: 'center',
            marginBottom: 50 * HEIGHT_SCALE_RATIO,
          }}>
          <TouchableOpacity onPress={this.onClickGoChangePersonalSetting}>
            <MyImage
              style={{
                marginTop: 30 * HEIGHT_SCALE_RATIO,
                width: 92 * WIDTH_SCALE_RATIO,
                height: 92 * WIDTH_SCALE_RATIO,
                borderRadius: (92 * WIDTH_SCALE_RATIO) / 2,
              }}
              source={
                this.state.picture ? { uri: this.state.picture } : IMAGE.DEFAULT_PROFILE_IMAGE
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onClickGoChangePersonalSetting}
            style={{ alignItems: 'center' }}>
            <PText
              style={[
                style.textTitle,
                {
                  paddingTop: 8 * HEIGHT_SCALE_RATIO,
                  paddingBottom: 4 * HEIGHT_SCALE_RATIO,
                },
              ]}>
              {this.state.email}
            </PText>
            <MyTouchableOpacity
              onPress={() => {
                myAlert('Token', RootStore.auth.token);
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <PText
                  style={[style.textSubTitle, { width: WIDTH / 2.1, textAlign: 'right' }]}
                  numberOfLines={1}>
                  {this.state.nickname}
                </PText>
                <View
                  style={{
                    width: 2 * WIDTH_SCALE_RATIO,
                    height: style.textSubTitle.fontSize,
                    backgroundColor: COLOR.appBorderColor,
                    marginHorizontal: 8 * WIDTH_SCALE_RATIO,
                  }}
                />
                <PText numberOfLines={1} style={[style.textSubTitle, { width: WIDTH / 2.1 }]}>
                  {this.state.home}
                </PText>
              </View>
            </MyTouchableOpacity>
          </TouchableOpacity>
        </View>
        <Tabs
          ref={(instance) => (this.tabRef = instance)}
          tabContainerStyle={[
            {
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 * HEIGHT_SCALE_RATIO },
              shadowRadius: 3 * HEIGHT_SCALE_RATIO,
              shadowOpacity: 0.1,
              height: 60 * HEIGHT_SCALE_RATIO,
              borderTopWidth: 0,
              borderTopColor: 'transparent',
              borderBottomWidth: 0.5 * HEIGHT_SCALE_RATIO,
              borderBottomColor: COLOR.appTextPlaceholderColor,
              backgroundColor: 'transparent',
              marginBottom: 8 * HEIGHT_SCALE_RATIO,
            },
          ]}
          onChangeTab={this.onChangeTab}
          locked
          page={this.state.indexTab}
          scrollWithoutAnimation={this.state.scrollWithoutAnimation}
          prerenderingSiblingsNumber={1}
          tabBarActiveTextColor={COLOR.appColor}
          tabBarInactiveTextColor={COLOR.appTextPlaceholderColor}
          tabBarUnderlineStyle={{
            backgroundColor: COLOR.appColor,
            height: 2 * HEIGHT_SCALE_RATIO,
          }}>
          {this.renderTab(TAB.MY_RESERVATION, RootStore.i18n.t('about.my-reserve'))}
          {this.renderTab(TAB.MEMBER_BENEFIT, RootStore.i18n.t('about.my-coupon'))}
          {this.renderTab(TAB.REVIEWS, RootStore.i18n.t('about.my-like'))}
        </Tabs>
      </View>
    );
  }

  renderTab = (tabIndex, tabTitle) => {
    let tabBody = <View />;
    let iconName = 'calendar';
    if (tabIndex === TAB.MY_RESERVATION) {
      iconName = 'calendar';
      tabBody = (
        <MyReserve
          allowLoadData={
            !!(this.state.isDoneLoadingTabs.findIndex((e) => e === TAB.MY_RESERVATION) !== -1)
          }
        />
      );
    } else if (tabIndex === TAB.MEMBER_BENEFIT) {
      iconName = 'gift';
      tabBody = (
        <MyLike
          allowLoadData={
            !!(this.state.isDoneLoadingTabs.findIndex((e) => e === TAB.MEMBER_BENEFIT) !== -1)
          }
        />
      );
    } else {
      iconName = 'heart';
      tabBody = (
        <MyBenefit
          allowLoadData={
            !!(this.state.isDoneLoadingTabs.findIndex((e) => e === TAB.REVIEWS) !== -1)
          }
        />
      );
    }
    return (
      <Tab
        heading={
          <TabHeading style={{ flexDirection: 'column', backgroundColor: 'white' }}>
            <Feather
              name={iconName}
              size={16 * WIDTH_SCALE_RATIO}
              style={{
                color: this.state.indexTab === tabIndex ? COLOR.GREY80 : COLOR.GREY20,
              }}
            />

            <PText
              style={[
                style.textButtonOutLine,
                {
                  color: this.state.indexTab === tabIndex ? COLOR.GREY80 : COLOR.GREY20,
                },
              ]}>
              {tabTitle}
            </PText>
          </TabHeading>
        }>
        {tabBody}
        <View style={{ height: heightBottomBar }} />
      </Tab>
    );
  };

  onChangeTab = ({ i }) => {
    clearTimeout(this.clearTabChangeLoadData);
    if (this.state.isDoneLoadingTabs.findIndex((e) => e === i) !== -1) {
      this.setState({ indexTab: i });
    } else {
      this.clearTabChangeLoadData = setTimeout(() => {
        if (i === 0) {
          DeviceEventEmitter.emit('restartMyReserve', {});
        } else if (i === TAB.MEMBER_BENEFIT) {
          DeviceEventEmitter.emit('restartMyLike', {});
        } else if (i === TAB.REVIEWS) {
          DeviceEventEmitter.emit('restartMyBenefit', {});
        }
      }, 250);

      this.setState({
        indexTab: i,
        isDoneLoadingTabs: [...this.state.isDoneLoadingTabs, i],
      });
    }
  };
}

export default MyPage;
