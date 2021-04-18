/* eslint-disable max-len */
/* eslint-disable global-require */
import appleAuth, {
  AppleAuthError,
  AppleAuthRealUserStatus,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import analytics from '@react-native-firebase/analytics';
import { Input, Item } from 'native-base';
import React from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import WebView from 'react-native-webview';
import Api from '../../Common/Api';
import Config from '../../Common/Config';
import Const from '../../Common/Const';
import getMemberInfo from '../../Common/gql/queries/getMemberInfo.gql';
import getRecommendList from '../../Common/gql/queries/getRecommendList.gql';
import Util from '../../Common/Util';
import LineLogin from '../../forked_modules/react-native-line-sdk';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import { myAlert } from '../Components/MyAlert';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO, HEIGHT, IS_IOS } from '../Constant/constant';
import { getSelectedCity } from '../Constants/asyncStorage';
import globalUtils from '../Constants/globalUtils';
import style, { COLOR, ptText, heightBottomBar } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import TagStore from '../Stores/TagStore';
import { getMyLikeBlog, getMyLikeSpot } from '../Utils/likeAction';
import { getListCity } from '../Utils/tagAction';
import { IMAGE, ICON } from '../../asset/image/ImagePath';
import PFlatList from '../Components/PFlatList';
import { DotIndicator, SkypeIndicator } from 'react-native-indicators';


const deviceWidth = Dimensions.get('window').width;

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      needGuest: Platform.OS === 'ios',
      email: '',
      password: '',
      webviewVisible: false,
      isLoading: false,
    };
    this.onClickLogin = this.onClickLogin.bind(this);

    this.getMemberCityTag = this.getMemberCityTag.bind(this);
    this.getDefaultCityTag = this.getDefaultCityTag.bind(this);
    this.onClickLoginGoogle = this.onClickLoginGoogle.bind(this);
    this.onClickLoginFacebook = this.onClickLoginFacebook.bind(this);
    this.onClickEmailLoginMode = this.onClickEmailLoginMode.bind(this);
    this.onClickGuestLogin = this.onClickGuestLogin.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onHandleKeyEventEmail = this.onHandleKeyEventEmail.bind(this);
    this.onHandleKeyEventPassword = this.onHandleKeyEventPassword.bind(this);
    this.initGoogleLogin = this.initGoogleLogin.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginLine = this.loginLine.bind(this);
    this.backPressSubscriptions = new Set();

    //facebook login button:
    this.reqPermissions = this.reqPermissions.bind(this);
    // logo size = 300, 122
    const rate = (deviceWidth * 0.45) / 300;
    this.logoWidth = 300 * rate * 1.3;
    this.logoHeight = 122 * rate * 1.3;
    this.thirdPartyIconSize = 60 * rate;
    this.onMountLoginToken = this.onMountLoginToken.bind(this);
  }
  handleBackHard = () => {
    Actions.jump('giftStack');
    return true;
  };
  async componentDidMount() {
    console.log(NativeModules.LineLoginManager);

    analytics().setCurrentScreen('Login');

    this.initGoogleLogin();
    await this.onMountLoginToken();
  }

  onLoadNecessaryData = async () => {
    await getMyLikeSpot();
    await getMyLikeBlog();
    getListCity().then((res) => {
      res.unshift({
        code: null,
        cityCode: null,
        cityName: RootStore.i18n.t('home.search-city'),
        translations: [{ name: RootStore.i18n.t('home.search-city') }],
      });
      console.log('29148 riwohroiqhjroqwheoq jeo e19ue 92u 91 1');
      TagStore.setListCitiesArray(res);
    });
    setTimeout(() => {
      DeviceEventEmitter.emit('forceUpdateNewData', {});
    }, 200);
  };

  async onMountLoginToken() {
    if (!RootStore.auth.token || RootStore.auth.token === '') {
      return false;
    }

    const result = await Api.post(Api.reqTokenLogin);
    const isLogin = result.result;
    globalUtils.isLogin =
      result && result.result && result.token && result.token !== '' ? true : false;
    console.log('result ne', isLogin);
    if (isLogin) {
      await store.update('token', result.token);
      await store.update('code', result.code);
      await store.update('id', result.id);
      await store.update('level', result.level);
      await store.update('nickname', result.nickname);
      await store.update('picture', result.picture);
      await store.update('home_tag_code', result.home_tag_code);

      await RootStore.login(
        result.token,
        result.code,
        result.id,
        result.level,
        result.nickname,
        result.picture,
        result.home_tag_code,
      );
    }

    if (isLogin) {
      await this.onLoadNecessaryData();
      Actions.replace('myPage');
      // Actions.jump('giftScreen', {
      //   postType: Const.PostType.Spot.code,
      // });
    } else {
      Actions.replace('welcome');
    }
    return isLogin;
  }

  async onClickLogin() {
    this.setState({
      isLoading: true
    })
    if (this.state.email === '' || this.state.password === '') {
      return myAlert('', 'Please fill email and password.');
    }

    const param = { id: this.state.email, password: this.state.password };
    const result = await Api.post(Api.reqLoginWithEmail, param);
    globalUtils.isLogin =
      result && result.result && result.token && result.token !== '' ? true : false;
    if (result.result) {
      console.log('update data user', result);
      await store.update('token', result.token);
      await store.update('code', result.code);
      await store.update('id', result.id);
      await store.update('level', result.level);
      await store.update('nickname', result.nickname);
      await store.update('picture', result.picture);
      await RootStore.login(
        result.token,
        result.code,
        result.id,
        result.level,
        result.nickname,
        result.picture,
      );

      await this.onLoadNecessaryData();
      // Actions.replace('myPage');

      this.getMemberCityTag()
        .then(async () => {
          setTimeout(() => {
            this.setState({ isLoading: false })
          }, 500);
          // this.navigateAfterLoginSuccess();
          Actions.replace('myPage');
          if (globalUtils.isBackToSpotDetail) {
            setTimeout(() => {
              Actions.jump('giftStack');
              if (globalUtils.isComment === false) {
                DeviceEventEmitter.emit('keepGoingBooking', {});
              }
            }, 500);
          } else if (globalUtils.isBackToBlogDetail) {
            const cityNameFromStorage = await getSelectedCity();

            setTimeout(() => {
              Actions.pop();
              // Actions.push('search', {
              //   isFromTravelInfo: true,
              //   isHome: 'home',
              //   city: cityNameFromStorage,
              //   postType: Const.PostType.Blog.code,
              // });
              // Actions.blogDetail({ blogCode: globalUtils.blogCode });

              if (globalUtils.isComment === false) {
                // setTimeout(() => {
                //   // DeviceEventEmitter.emit('keepGoingBooking', {});
                // }, 500);
              }
            }, 500);
          } else {
            setTimeout(() => {
              Actions.jump('home');

            }, 500);
          }
        })
        .catch((err) => {
          console.log('xem lỗi', err);
        });
    } else {
      Alert.alert(
        '',
        RootStore.i18n.t('login.login-fail'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: true },
      );//
    }
  }

  onClickEmailLoginMode() {
    Actions.emailLogin();
  }

  onClickSignUp() {
    Actions.push('policy');
  }

  onHandleKeyEventEmail() {
    this.passwordInput._root.focus();
  }

  onHandleKeyEventPassword() {
    if (this.state.email !== '') {
      this.onClickLogin();
    } else {
      this.emailInput._root.focus();
    }
  }

  async getMemberCityTag() {
    const result = await RootStore.client.query({
      query: getMemberInfo,
      variables: { id: RootStore.auth.id, language: RootStore.language },
    });
    const tagData = result.data.getMemberInfo.member.member_tags;

    const cityTagList = [];
    const cityTags = tagData.filter((v) => v.tag.type === Const.TagType.City.code);
    const sort = cityTags.sort((a, b) => a.score > b.score);
    sort.forEach((v) => {
      cityTagList.push(v.tag);
    });

    if (cityTagList.length === 0) {
      this.getDefaultCityTag();
    } else {
      RootStore.setCityTags(cityTagList);
    }
  }

  async onClickLoginGoogle(response) {
    try {
      console.log('poi onClickLoginGoogle 1', response);

      const param = {
        token: response.idToken,
        type: 2,
        // platform: Platform.OS === 'ios' ? 'ios' : 'android',
        // save: true,
      };
      const result = await Api.post(Api.reqLoginWithGoogle, param);
      console.log('phat: Login -> onClickLoginGoogle -> param', param);
      console.log('poi onClickLoginGoogle result 2', result);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;
      if (result.result) {
        await store.update('token', result.token);
        await store.update('code', result.code);
        await store.update('id', result.id);
        await store.update('level', result.level);
        await store.update('nickname', result.nickname);
        await store.update('picture', result.picture);
        await store.update('home_tag_code', result.home_tag_code);

        await RootStore.login(
          result.token,
          result.code,
          result.id,
          result.level,
          result.nickname,
          result.picture,
          result.home_tag_code,
        );
        console.log('poi onClickLoginGoogle', response);
        await this.onLoadNecessaryData();
        // Actions.replace('myPage');

        this.getMemberCityTag()
          .then(async () => {
            Actions.replace('myPage');
            if (globalUtils.isBackToSpotDetail) {
              setTimeout(() => {
                Actions.jump('giftStack');
                if (globalUtils.isComment === false) {
                  DeviceEventEmitter.emit('keepGoingBooking', {});
                }
              }, 500);
            } else if (globalUtils.isBackToBlogDetail) {
              const cityNameFromStorage = await getSelectedCity();

              setTimeout(() => {
                Actions.pop();

                // Actions.push('search', {
                //   isFromTravelInfo: true,
                //   isHome: 'home',
                //   city: cityNameFromStorage,
                //   postType: Const.PostType.Blog.code,
                // });
                // Actions.blogDetail({ blogCode: globalUtils.blogCode });
                if (globalUtils.isComment === false) {
                  setTimeout(() => {
                    // DeviceEventEmitter.emit('keepGoingBooking', {});
                  }, 500);
                }
              }, 500);
            } else {
              Actions.jump('home');
            }

            // this.navigateAfterLoginSuccess();
          })
          .catch((err) => {
            console.log('xem lỗi', err);
          });
      }
    } catch (error) {
      myAlert('warning', 'login fail');
      console.log('poi onClickLoginGoogle catch', error);
    }
  }

  async getDefaultCityTag() {
    const result = await RootStore.client.query({
      query: getRecommendList,
      variables: {
        tagType: Const.TagType.City.code,
        language: RootStore.language,
      },
    });
    const tagData = [];

    result.data.getRecommendList.recommends.forEach((v) => {
      tagData.push(v.city);
    });

    RootStore.setCityTags(tagData);
  }

  async reqPermissions() {
    try {
      console.log('poi start login with facebook start reqPermissions 1');
      console.log('poi start login with facebook start reqPermissions 4: Config', Config);
      console.log('poi start login with facebook start reqPermissions 5', LoginManager);
      const result = await LoginManager.logInWithPermissions(['public_profile']);
      console.log('poi reqPermissions 2 result:', result);
      if (result && result.isCancelled === false) {
        const data = await AccessToken.getCurrentAccessToken();
        this.onClickLoginFacebook(data);
      }
    } catch (err) {
      console.log('poi reqPermissions 3 err:', err);
    }
  }

  async actionLineLogin(idToken) {
    try {
      const param = { token: idToken, type: 4 };
      const result = await Api.post(Api.reqLoginWithLine, param);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;
      if (result.result) {
        await store.update('token', result.token);
        await store.update('code', result.code);
        await store.update('id', result.id);
        await store.update('level', result.level);
        await store.update('nickname', result.nickname);
        await store.update('picture', result.picture);
        await store.update('home_tag_code', result.home_tag_code);

        await RootStore.login(
          result.token,
          result.code,
          result.id,
          result.level,
          result.nickname,
          result.picture,
          result.home_tag_code,
        );
        await this.onLoadNecessaryData();
        // Actions.replace('myPage');
        this.getMemberCityTag()
          .then(async () => {
            Actions.replace('myPage');
            if (globalUtils.isBackToSpotDetail) {
              setTimeout(() => {
                Actions.jump('giftStack');
                if (globalUtils.isComment === false) {
                  DeviceEventEmitter.emit('keepGoingBooking', {});
                }
              }, 500);
            } else if (globalUtils.isBackToBlogDetail) {
              setTimeout(async () => {
                Actions.pop();

                // const cityNameFromStorage = await getSelectedCity();
                // Actions.push('search', {
                //   isFromTravelInfo: true,
                //   isHome: 'home',
                //   city: cityNameFromStorage,
                //   postType: Const.PostType.Blog.code,
                // });
                // Actions.blogDetail({ blogCode: globalUtils.blogCode });
                if (globalUtils.isComment === false) {
                  // DeviceEventEmitter.emit('keepGoingBooking', {});
                }
              }, 500);
            } else {
              Actions.jump('home');
            }

            // this.navigateAfterLoginSuccess();
          })
          .catch((err) => {
            console.log('xem lỗi', err);
          });
      }
    } catch (error) {
      myAlert('warning', 'login fail');
      console.log('poi onclickLoginfacebookl catch', error);
    }
  }

  async loginLine() {
    LineLogin.login()
      .then((result) => {
        this.actionLineLogin(result.idToken);
      })
      .catch((err) => {
        console.log('bambi bambi error', err);
      });
  }

  async loginGoogle() {
    try {
      await GoogleSignin.hasPlayServices();

      const isLogin = await GoogleSignin.isSignedIn();
      console.log('phat: Login -> loginGoogle -> isLogin', isLogin);
      if (isLogin) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      setTimeout(async () => {
        const userInfo = await GoogleSignin.signIn();
        console.log('poi user info after login with google success:', userInfo);
        await this.onClickLoginGoogle(userInfo);
      }, 500);
    } catch (error) {
      console.log('poi login with google failed:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  async initGoogleLogin() {
    await GoogleSignin.configure({
      scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
      // iosClientId: '70723129664-otipbpe94t5cfjqpd90orumj6kmbjv4e.apps.googleusercontent.com',
      // webClientId: '70723129664-g95nq7u0f1j67flp2jnlk204mddi9uoc.apps.googleusercontent.com',
      iosClientId: '692502404613-l96h5bukthuohj582ffi4jbm44u6bb15.apps.googleusercontent.com',
      webClientId: '692502404613-7lrkddgi77debt22n29hi8to2h0vkk4c.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    });
  }

  async onClickLoginFacebook(response) {
    try {
      const param = { token: response.accessToken, type: 1 };
      const result = await Api.post(Api.reqLoginWithFacebook, param);
      console.log('update data user facebook', result);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;
      if (result.result) {
        await store.update('token', result.token);
        await store.update('code', result.code);
        await store.update('id', result.id);
        await store.update('level', result.level);
        await store.update('nickname', result.nickname);
        await store.update('picture', result.picture);
        await store.update('home_tag_code', result.home_tag_code);

        await RootStore.login(
          result.token,
          result.code,
          result.id,
          result.level,
          result.nickname,
          result.picture,
          result.home_tag_code,
        );
        await this.onLoadNecessaryData();
        // Actions.replace('myPage');
        this.getMemberCityTag()
          .then(async () => {
            Actions.replace('myPage');
            if (globalUtils.isBackToSpotDetail) {
              setTimeout(() => {
                Actions.jump('giftStack');
                if (globalUtils.isComment === false) {
                  DeviceEventEmitter.emit('keepGoingBooking', {});
                }
              }, 500);
            } else if (globalUtils.isBackToBlogDetail) {
              setTimeout(async () => {
                Actions.pop();

                // const cityNameFromStorage = await getSelectedCity();
                // Actions.push('search', {
                //   isFromTravelInfo: true,
                //   isHome: 'home',
                //   city: cityNameFromStorage,
                //   postType: Const.PostType.Blog.code,
                // });
                // Actions.blogDetail({ blogCode: globalUtils.blogCode });
                if (globalUtils.isComment === false) {
                  // DeviceEventEmitter.emit('keepGoingBooking', {});
                }
              }, 500);
            } else {
              Actions.jump('home');
            }

            // this.navigateAfterLoginSuccess();
          })
          .catch((err) => {
            console.log('xem lỗi', err);
          });
      }
    } catch (error) {
      myAlert('warning', 'login fail');
      console.log('poi onclickLoginfacebookl catch', error);
    }
  }

  async onClickGuestLogin() {
    const code = Util.generateUniqueID();
    await store.update('token', 'guest');
    await store.update('code', code);
    await store.update('id', 'guest');
    await store.update('nickname', 'guest');
    await store.update('picture', 'profile_default.svg');
    await store.update('home_tag_code', null);

    await RootStore.guestLogin();

    await Actions.replace('myPage');
    await this.onLoadNecessaryData();
    setTimeout(() => {
      Actions.jump('giftScreen');
    }, 555);
  }

  async onLoginAppleID(token) {
    try {
      console.log('poi onClickloginAppleID 1');

      const param = {
        token: token,
        type: 3,
      };
      const result = await Api.post(Api.reqLoginWithApple, param);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;

      if (result.result) {
        await store.update('token', result.token);
        await store.update('code', result.code);
        await store.update('id', result.id);
        await store.update('level', result.level);
        await store.update('nickname', result.nickname);
        await store.update('picture', result.picture);
        await store.update('home_tag_code', result.home_tag_code);

        await RootStore.login(
          result.token,
          result.code,
          result.id,
          result.level,
          result.nickname,
          result.picture,
          result.home_tag_code,
        );
        // console.log('poi onClickLoginGoogle', response);
        await this.onLoadNecessaryData();
        // Actions.replace('myPage');

        this.getMemberCityTag()
          .then(async () => {
            Actions.replace('myPage');
            if (globalUtils.isBackToSpotDetail) {
              setTimeout(() => {
                Actions.jump('giftStack');
                if (globalUtils.isComment === false) {
                  DeviceEventEmitter.emit('keepGoingBooking', {});
                }
              }, 500);
            } else if (globalUtils.isBackToBlogDetail) {
              const cityNameFromStorage = await getSelectedCity();

              setTimeout(() => {
                Actions.pop();

                // Actions.push('search', {
                //   isFromTravelInfo: true,
                //   isHome: 'home',
                //   city: cityNameFromStorage,
                //   postType: Const.PostType.Blog.code,
                // });
                // Actions.blogDetail({ blogCode: globalUtils.blogCode });
                if (globalUtils.isComment === false) {
                  setTimeout(() => {
                    // DeviceEventEmitter.emit('keepGoingBooking', {});
                  }, 500);
                }
              }, 500);
            } else {
              Actions.jump('home');
            }
            // this.navigateAfterLoginSuccess();
          })
          .catch((err) => {
            console.log('xem lỗi', err);
          });
      }
    } catch (err) {
      myAlert('Warning', 'login fail');
    }
  }
  async requestLoginWithApple() {
    console.log('bat dau login bang apple');
    // performs login request
    let user = null;
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });

      const { email, nonce, identityToken, realUserStatus /* etc */ } = appleAuthRequestResponse;

      if (identityToken) {
        this.onLoginAppleID(appleAuthRequestResponse.identityToken);
      } else {
        myAlert('...', 'have not token');
        // no token - failed sign-in?
      }
      if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }
      // use credentialState response to ensure the user is authenticated
      // if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      //   // user is authenticated
      // }
    } catch (err) {
      if (err.code === AppleAuthError.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(err);
      }
    }
  }

  onNavigationStateChange = (navState) => {
    if (navState && navState.url) {
      console.log('phat: MyWebView -> navState', navState.url);
      console.log('1803phat: MyWebView -> navState', navState.url.includes('bit.ly'));

      if (navState.url.includes('https://lambda.creatrip.com/en/login?social=apple#')) {
        let result = navState.url.split('id_token=');
        this.onLoginAppleID(result[1]);
        //goi api login truyen token len
      } else if (navState.url.includes('https://www.creatrip.com')) {
        this.webView.stopLoading();
        setTimeout(() => {
          this.setState({ webviewVisible: !this.state.webviewVisible });
        }, 300);
      }
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[{ flex: 1 }, style.center]}>
          {
            this.state.isLoading ? (
              <DotIndicator color={COLOR.appColor} size={5 * WIDTH_SCALE_RATIO} count={8} />
            ) : (
                <PText
                  style={[
                    style.textSubTitle,
                    {
                      position: 'relative',
                      textAlign: 'center',
                      alignSelf: 'center',
                      paddingTop: 24 * HEIGHT_SCALE_RATIO,
                      paddingBottom: 24 * HEIGHT_SCALE_RATIO,
                    },
                  ]}>
                  No results
                </PText>
              )}
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <Modal
            backdropColor="#fff"
            backdropOpacity={1}
            animationIn="fadeInDown"
            animationInTiming={0}
            animationOutTiming={500}
            visible={this.state.webviewVisible}
            style={{
              margin: 0,
              padding: 0,
              paddingVertical: 20 * HEIGHT_SCALE_RATIO,
              flex: 1,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {this.state.canGoBack && (
                  <MyTouchableOpacity
                    style={{
                      padding: 5 * WIDTH_SCALE_RATIO,
                      paddingLeft: 10 * WIDTH_SCALE_RATIO,
                    }}
                    onPress={() => {
                      console.log(
                        'phat: MyWebView -> render -> this.webView.goBack()',
                        this.webView.goBack(),
                      );

                      this.webView.goBack();
                    }}>
                    <MaterialCommunityIcons name="chevron-left" size={25 * WIDTH_SCALE_RATIO} />
                  </MyTouchableOpacity>
                )}

                <MyTouchableOpacity
                  style={{
                    padding: 5 * WIDTH_SCALE_RATIO,
                    paddingLeft: this.state.canGoBack
                      ? 0 * WIDTH_SCALE_RATIO
                      : 10 * WIDTH_SCALE_RATIO,
                  }}
                  onPress={() => {
                    this.setState({ webviewVisible: false });
                  }}>
                  <MaterialCommunityIcons name="close" size={25 * WIDTH_SCALE_RATIO} />
                </MyTouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  maxWidth: WIDTH - 30 * WIDTH_SCALE_RATIO * 4.5,
                }}>
                <Image
                  source={IMAGE.LOGO_PRIMARY}
                  style={{
                    alignSelf: 'center',
                    height: 25 * HEIGHT_SCALE_RATIO,
                    width: '100%',
                  }}
                  resizeMode="contain"
                />
                <PText
                  style={[
                    style.textSubTitle,
                    {
                      paddingLeft: 5 * WIDTH_SCALE_RATIO,
                      color: COLOR.appColor,
                    },
                  ]}
                  numberOfLines={1}>
                  {this.state.titleWebView}
                </PText>
              </View>

              <View
                style={{ padding: 5 * WIDTH_SCALE_RATIO, paddingRight: 10 * WIDTH_SCALE_RATIO }}
                onPress={() => { }}>
                <Feather name="more-horizontal" size={23 * WIDTH_SCALE_RATIO} color="transparent" />
              </View>
            </View>
            <WebView
              ref={(webView) => {
                this.webView = webView;
              }}
              onNavigationStateChange={this.onNavigationStateChange}
              source={{
                uri:
                  'https://appleid.apple.com/auth/authorize?client_id=com.creatrip.webClient&state=nhjiroefob&redirect_uri=https%3A%2F%2Flambda.creatrip.com%2Fen%2Flogin%3Fsocial%3Dapple&response_type=code%20id_token&response_mode=fragment',
              }}
              // https://lambda.creatrip.com/en/login?social=apple#state=nhjiroefob&code=cb27ffa7b141549c69d9fdc1b694c1372.0.nvrq.AGLjZks8__ZjKW8PcZ9tAw&id_token=eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmNyZWF0cmlwLndlYkNsaWVudCIsImV4cCI6MTU5MTI4NjEzNCwiaWF0IjoxNTkxMjg1NTM0LCJzdWIiOiIwMDA1MTAuNDA2NTQ0MDMyOTNiNGZkODkwNDk5YjhkN2Q0ZmUyOTAuMTU0NSIsImNfaGFzaCI6InNMc1pBTmhLa21VZmZEcHZPaHZuZnciLCJhdXRoX3RpbWUiOjE1OTEyODU1MzQsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.EG4ghF5nSCN1zvDyS52IWVL-r3IXYsOenooqaIdnjV49iSyuv-Pw-KrDEILvKF_MtCW4_KgEtm5MKusenDAI2Xix6oJKo0pMAoDorRKP0OxPKFF0D-rQUAlCVbsIRrYb0F6Yt-dj1IbjuFvGSux8lPCeubBfXqCMgtswgV9Q02opaLAtQayfWpxAT_vFogVmZsBZpAbuRpglrHpcimZjHrJg8OrB99FCNlJBal_mf_EHs_XbofHLHjnZ3tS6BBxdNWXt8O-4eRurWQhGUs_2OLegXZtxQf4pBHu7VM0rqyufMfEPDfzMJ_Vn0Pl5Fiefdp76XI8yK-PbB3tPjfcHDA
              // social=apple#
              // state=nhjiroefob
              // code=cb27ffa7b141549c69d9fdc1b694c1372.0.nvrq.AGLjZks8__ZjKW8PcZ9tAw
              // id_token=eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmNyZWF0cmlwLndlYkNsaWVudCIsImV4cCI6MTU5MTI4NjEzNCwiaWF0IjoxNTkxMjg1NTM0LCJzdWIiOiIwMDA1MTAuNDA2NTQ0MDMyOTNiNGZkODkwNDk5YjhkN2Q0ZmUyOTAuMTU0NSIsImNfaGFzaCI6InNMc1pBTmhLa21VZmZEcHZPaHZuZnciLCJhdXRoX3RpbWUiOjE1OTEyODU1MzQsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.EG4ghF5nSCN1zvDyS52IWVL-r3IXYsOenooqaIdnjV49iSyuv-Pw-KrDEILvKF_MtCW4_KgEtm5MKusenDAI2Xix6oJKo0pMAoDorRKP0OxPKFF0D-rQUAlCVbsIRrYb0F6Yt-dj1IbjuFvGSux8lPCeubBfXqCMgtswgV9Q02opaLAtQayfWpxAT_vFogVmZsBZpAbuRpglrHpcimZjHrJg8OrB99FCNlJBal_mf_EHs_XbofHLHjnZ3tS6BBxdNWXt8O-4eRurWQhGUs_2OLegXZtxQf4pBHu7VM0rqyufMfEPDfzMJ_Vn0Pl5Fiefdp76XI8yK-PbB3tPjfcHDA
              javaScriptEnabled
              directionalLockEnabled
              thirdPartyCookiesEnabled
              startInLoadingState
              domStorageEnabled
              automaticallyAdjustContentInsets
            />
          </Modal>
          <BaseHeaderApp
            // notifications={4}
            // notifications={0}
            // style={{ position: 'absolute' }}
            leftIconStyle={{ width: 0, height: 0 }}
            onRightPress2={() => {
              Actions.drawerOpen();
            }}
            // onRightPress={() => this.onClickAlert()}
            rightIconStyle={{ tintColor: COLOR.WHITE }}
            rightIconStyle2={{ tintColor: COLOR.GREY20 }}
          />
          <KeyboardAvoidingView style={{ flex: 1, width: '100%' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.block}>
                <Row size={12}>
                  <Col sm={12} style={{ alignItems: 'center' }}>
                    <Image
                      source={IMAGE.LOGO_PRIMARY}
                      style={{
                        width: this.logoWidth,
                        height: this.logoHeight,
                        resizeMode: 'contain',
                      }}
                    />
                  </Col>
                </Row>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={ICON.EMAIL_ICON}
                      style={{
                        width: 24 * WIDTH_SCALE_RATIO,
                        height: 24 * WIDTH_SCALE_RATIO,
                        tintColor: 'black',
                      }}
                      resizeMode={'contain'}
                    />
                    <Input
                      ref={(email) => {
                        this.emailInput = email;
                      }}
                      onChangeText={(text) => this.setState({ email: text })}
                      onSubmitEditing={this.onHandleKeyEventEmail}
                      keyboardType="email-address"
                      placeholder={RootStore.i18n.t('login.email')}
                      value={this.state.email}
                      autoCapitalize="none"
                      style={{
                        width: '100%',
                        fontSize: 12,
                        borderBottomColor: COLOR.GREY20,
                        borderBottomWidth: 0.5,
                        fontFamily:
                          RootStore.language === 'en' || RootStore.language === 'vi'
                            ? 'Raleway'
                            : 'Roboto',
                        marginLeft: 8 * WIDTH_SCALE_RATIO,
                        // paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
                      }}
                      placeholderTextColor={COLOR.GREY20}
                      borderColor={COLOR.appTextPlaceholderColor}
                    />
                  </View>

                  <View
                    style={{
                      marginTop: 8 * HEIGHT_SCALE_RATIO,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={ICON.LOCK_ICON2}
                      style={{
                        width: 24 * WIDTH_SCALE_RATIO,
                        height: 24 * WIDTH_SCALE_RATIO,
                        tintColor: 'black',
                      }}
                      resizeMode={'contain'}
                    />
                    <Input
                      ref={(password) => {
                        this.passwordInput = password;
                      }}
                      onChangeText={(text) => this.setState({ password: text })}
                      onSubmitEditing={this.onHandleKeyEventPassword}
                      secureTextEntry
                      placeholder={RootStore.i18n.t('login.password')}
                      value={this.state.password}
                      autoCapitalize="none"
                      style={{
                        width: '100%',
                        fontSize: 12,
                        borderBottomColor: COLOR.GREY20,
                        borderBottomWidth: 0.5,
                        fontFamily:
                          RootStore.language === 'en' || RootStore.language === 'vi'
                            ? 'Raleway'
                            : 'Roboto',
                        marginLeft: 8 * WIDTH_SCALE_RATIO,
                      }}
                      placeholderTextColor={COLOR.GREY20}
                      borderColor={COLOR.appTextPlaceholderColor}
                    />
                  </View>

                  <Row size={12} style={{ marginTop: 20 }}>
                    <Col sm={12} style={{ alignItems: 'center' }}>
                      <TouchableOpacity
                        style={styles.rightButton}
                        onPress={this.onClickLogin}
                      // onPress={this.onHandleKeyEventPassword}
                      >
                        <PText
                          uppercase
                          style={{
                            color: COLOR.appColor,
                            fontSize: 18,
                            textTransform: 'uppercase',
                            lineHeight: 27,
                          }}>
                          {RootStore.i18n.t('login.login')}
                        </PText>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </View>

                {/* login social  */}
                <View>
                  <View
                    size={20}
                    style={{
                      marginTop: 40,
                      justifyContent: 'space-evenly',
                      paddingHorizontal: 80 * WIDTH_SCALE_RATIO,
                      flexDirection: 'row',
                      width: deviceWidth,
                    }}
                    nowrap>
                    <View>
                      <TouchableOpacity onPress={this.loginGoogle}>
                        <Image
                          source={ICON.LOGIN_GOOGLE_ICON}
                          resizeMode={'contain'}
                          style={{
                            width: 40 * WIDTH_SCALE_RATIO,
                            height: 40 * WIDTH_SCALE_RATIO,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{}}>
                      <TouchableOpacity onPress={this.reqPermissions}>
                        <Image
                          source={ICON.LOGIN_FACEBOOK_ICON}
                          resizeMode={'contain'}
                          style={{
                            width: 40 * WIDTH_SCALE_RATIO,
                            height: 40 * WIDTH_SCALE_RATIO,
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{}}>
                      <TouchableOpacity onPress={this.loginLine}>
                        <Image
                          source={ICON.LOGIN_LINE_ICON}
                          resizeMode={'contain'}
                          style={{
                            width: 40 * WIDTH_SCALE_RATIO,
                            height: 40 * WIDTH_SCALE_RATIO,
                          }}
                        />
                      </TouchableOpacity>
                      {/* )} */}
                    </View>
                    <View>
                      {/* <AppleButton
            cornerRadius={5}
            style={{ backgroundColor: 'red' }}
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.CONTINUE}
            onPress={() => this.onAppleButtonPress()}
          /> */}
                      {/* {IS_IOS ? ( */}
                      <TouchableOpacity
                        onPress={() => {
                          if (Platform.OS === 'ios') {
                            this.requestLoginWithApple();
                          } else {
                            this.setState({
                              webviewVisible: true,
                            });
                          }
                        }}>
                        <Image
                          source={ICON.LOGIN_APPLE_ICON}
                          resizeMode={'contain'}
                          style={{
                            width: 40 * WIDTH_SCALE_RATIO,
                            height: 40 * WIDTH_SCALE_RATIO,
                          }}
                        />
                      </TouchableOpacity>
                      {/* ) : ( */}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10 * HEIGHT_SCALE_RATIO,
                      marginBottom: IS_IOS ? 20 * HEIGHT_SCALE_RATIO : null,

                      justifyContent: 'center',
                    }}>
                    <MyTouchableOpacity onPress={() => Actions.push('forgotPassword')}>
                      <PText
                        style={[
                          style.textCaption,
                          ptText.H4,
                          {
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            color: COLOR.GREY40,
                          },
                        ]}>
                        {RootStore.i18n.t('login.forgot-password')}
                      </PText>
                    </MyTouchableOpacity>
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={this.onClickSignUp}
                      // onPress={() => console.log("poi register ne nha")}
                      >
                        <View
                          style={{
                            height: this.thirdPartyIconSize,
                            paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                            // borderColor: COLOR.appColor,
                            // borderWidth: 1,
                            borderRadius: this.thirdPartyIconSize / 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <PText
                            style={{
                              color: COLOR.appColor,
                              fontSize: RootStore.fontSize(3),
                              textTransform: 'uppercase',
                            }}>
                            {RootStore.i18n.t('login.sign-up')}
                          </PText>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {/* {this.state.needGuest &&
      <TouchableOpacity onPress={this.onClickGuestLogin} style={{ position: 'absolute', right: 20, top: 10 }}>
        <PTextuppercase={false} style={{ fontSize: 14 }}>{RootStore.i18n.t('global.close')}</PText>
      </TouchableOpacity>
    } */}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}
// renderLoadingStatus(){
//   return (

//   );
// }
// renderLoginScreen(){
//   return (

//   );
// }
const styles = StyleSheet.create({
  block: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignSelf: 'center',
    // justifyContent: 'center',
    paddingLeft: 32 * WIDTH_SCALE_RATIO,
    paddingRight: 32 * WIDTH_SCALE_RATIO,
    paddingTop: 10 * HEIGHT_SCALE_RATIO,
    paddingBottom: heightBottomBar * 1.2,
  },
  rightButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
