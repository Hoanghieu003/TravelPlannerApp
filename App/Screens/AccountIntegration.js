import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import appleAuth, {
  AppleAuthError,
  AppleAuthRealUserStatus,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import analytics from '@react-native-firebase/analytics';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import WebView from 'react-native-webview';
import Api from '../../Common/Api';
import getMemberInfo from '../../Common/gql/queries/getMemberInfo.gql';
import LineLogin from '../../forked_modules/react-native-line-sdk';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import Divider from '../Components/Divider';
import { myAlert } from '../Components/MyAlert';
import MyImage from '../Components/MyImage';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, IS_IOS, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import globalUtils from '../Constants/globalUtils';
import style, { COLOR, ptButton, ptColor, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { IMAGE } from '../../asset/image/ImagePath';

export default class AccountIntegration extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mainAccount: null,
      email: null,
      webViewLoginAplle: false,
      picture: null,
      facebook: [],
      google: [],
      line: [],
      apple: [],
    };
  }

  async componentDidMount() {
    analytics().setCurrentScreen('Account-Integration');
    await this.getMemberInfo();
  }

  async getMemberInfo() {
    if (!RootStore.auth.id) {
      return;
    }
    try {
      const result = await RootStore.client.query({
        query: getMemberInfo,
        variables: { id: RootStore.auth.id, language: RootStore.language },
      });
      const socialIntegrated = result.data?.getMemberInfo?.member?.social_infos;

      const mainAccount = result.data.getMemberInfo.member.social_type;
      const google = socialIntegrated.filter((e) => e.type === 2);
      const facebook = socialIntegrated.filter((e) => e.type === 1);
      const line = socialIntegrated.filter((e) => e.type === 4);
      const apple = socialIntegrated.filter((e) => e.type === 3);
      const email = result.data.getMemberInfo.member.email;
      const picture =
        result.data.getMemberInfo.member.picture !== null
          ? result.data.getMemberInfo.member.picture
          : RootStore.auth.picture;
      this.setState({
        mainAccount,
        email,
        google,
        facebook,
        line,
        apple,
        picture,
      });
    } catch (error) {
      myAlert('', 'Didmount Error');
      Actions.pop();
    }
  }

  renderAccountRow(accountType, account, actionIntegrate) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ marginTop: 16 * HEIGHT_SCALE_RATIO }}>
          <PText style={[ptText.SMALL1, styles.textTitleChange]}>{accountType}</PText>
          <PText
            editable={false}
            defaultValue={account}
            returnKeyType="next"
            autoCapitalize="none"
            style={[
              ptText.BODY1,
              style.textInput,
              {
                color: COLOR.GREY40,
                paddingVertical: IS_IOS ? 4 * HEIGHT_SCALE_RATIO : 0,
                paddingLeft: 4 * WIDTH_SCALE_RATIO,
                lineHeight: IS_IOS ? -3 : null,
              },
            ]}>
            {account ? account : `${RootStore.i18n.t('link-account.not-connected')}`}
          </PText>
        </View>
        {!account && (
          <MyTouchableOpacity onPress={actionIntegrate}>
            <View
              style={[
                ptButton.OUTLINE,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: ptButton.OUTLINE.borderRadius * 4,
                  width: ptButton.OUTLINE.width * 0.7,
                  height: ptButton.OUTLINE.height * 0.8,
                },
              ]}>
              <PText style={ptColor.PRIMARY}>{RootStore.i18n.t('link-account.connect')}</PText>
            </View>
          </MyTouchableOpacity>
        )}
      </View>
    );
  }
  async onClickLoginFacebook(response) {
    try {
      const param = { token: response.accessToken, type: 1 };
      const result = await Api.post(Api.reqLoginIntegrationWithFacebook, param);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;
      if (result.result) {
        await this.getMemberInfo();
      }
    } catch (error) {
      myAlert('', RootStore.i18n.t('link-account.cannot-connected'));
    }
  }
  async reqPermissions() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile']);
      if (result && result.isCancelled === false) {
        const data = await AccessToken.getCurrentAccessToken();
        this.onClickLoginFacebook(data);
      }
    } catch (err) {
      console.log('poi reqPermissions 3 err:', err);
    }
  }
  async onClickLoginGoogle(response) {
    try {
      const param = {
        token: response.idToken,
        type: 2,
      };
      const result = await Api.post(Api.reqLoginIntegrationWithGoogle, param);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;
      if (result.result) {
        await this.getMemberInfo();
      }
    } catch (error) {
      myAlert('', RootStore.i18n.t('link-account.cannot-connected'));
    }
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

  async actionLineLogin(idToken) {
    try {
      const param = { token: idToken, type: 4 };
      const result = await Api.post(Api.reqLoginIntegrationWithLine, param);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;
      if (result.result) {
        this.getMemberInfo();
      }
    } catch (error) {
      myAlert('', RootStore.i18n.t('link-account.cannot-connected'));
      console.log('poi onclickLoginfacebookl catch', error);
    }
  }

  async loginLine() {
    LineLogin.login()
      .then((result) => {
        this.actionLineLogin(result.idToken);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  async onLoginAppleID(token) {
    try {
      const param = {
        token: token,
        type: 3,
      };
      const result = await Api.post(Api.reqLoginIntegrationWithApple, param);
      globalUtils.isLogin =
        result && result.result && result.token && result.token !== '' ? true : false;

      if (result.result) {
        this.getMemberInfo();
      }
    } catch (err) {
      myAlert('', RootStore.i18n.t('link-account.cannot-connected'));
    }
  }
  async requestLoginWithApple() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });

      const { identityToken, realUserStatus /* etc */ } = appleAuthRequestResponse;

      if (identityToken) {
        this.onLoginAppleID(appleAuthRequestResponse.identityToken);
      } else {
        myAlert('...', 'Have not token');
      }
      if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }
    } catch (err) {
      if (err.code === AppleAuthError.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(err);
      }
    }
  }
  loginAppleWebView() {
    this.setState({ webViewLoginAplle: true });
  }

  onNavigationStateChange = (navState) => {
    if (navState && navState.url) {
      if (navState.url.includes('https://lambda.creatrip.com/en/login?social=apple#')) {
        let result = navState.url.split('id_token=');
        if (result) {
          this.onLoginAppleID(result[1]);
        }
      } else if (
        navState.url.includes('https://www.creatrip.com/') ||
        navState.url.includes('https://lambda.creatrip.com/')
      ) {
        this.webView.stopLoading();
        setTimeout(() => {
          this.setState({ webViewLoginAplle: false });
        }, 200);
      }
    }
  };
  render() {
    const checkFacebookLogin =
      this.state.facebook.length > 0 || this.state.mainAccount === 1
        ? this.state.facebook[0]?.email || `${RootStore.i18n.t('link-account.connected')}`
        : '';
    const checkGoogleLogin =
      this.state.google.length > 0 || this.state.mainAccount === 2
        ? this.state.google[0]?.email || `${RootStore.i18n.t('link-account.connected')}`
        : '';
    const checkLineLogin =
      this.state.line.length > 0 || this.state.mainAccount === 4
        ? this.state.line[0]?.email || `${RootStore.i18n.t('link-account.connected')}`
        : '';
    const checkAppleLogin =
      this.state.apple.length > 0 || this.state.mainAccount === 3
        ? this.state.apple[0]?.email || `${RootStore.i18n.t('link-account.connected')}`
        : '';
    return (
      <View style={styles.screen}>
        <BaseHeaderApp
          title={`${RootStore.i18n.t('link-account.header')}`}
          isClose
          color={COLOR.GREY80}
          rightIconType={null}
          leftIconStyle={{ tintColor: COLOR.PRIMARY }}
        />

        {this.renderWebViewToLoginApple()}

        <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }}>
          {this.renderAvatar()}
          {/* input change data */}
          <View
            style={{
              justifyContent: 'flex-start',
              paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
              paddingBottom: 16 * WIDTH_SCALE_RATIO,
            }}>
            {this.renderAccountRow(RootStore.i18n.t('login.email'), this.state.email)}
            <Divider style={{ marginTop: 5 * HEIGHT_SCALE_RATIO }} />
            {this.renderAccountRow('Facebook', checkFacebookLogin, () => this.reqPermissions())}
            <Divider style={{ marginTop: 5 * HEIGHT_SCALE_RATIO }} />
            {this.renderAccountRow('Google', checkGoogleLogin, () => this.loginGoogle())}
            <Divider style={{ marginTop: 5 * HEIGHT_SCALE_RATIO }} />

            {this.renderAccountRow(
              'Apple',
              checkAppleLogin,
              Platform.OS === 'ios'
                ? () => this.requestLoginWithApple()
                : () => this.loginAppleWebView(),
            )}
            <Divider style={{ marginTop: 5 * HEIGHT_SCALE_RATIO }} />
            {this.renderAccountRow('Line', checkLineLogin, () => this.loginLine())}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  renderAvatar() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: 60 * HEIGHT_SCALE_RATIO,
          marginBottom: 56 * HEIGHT_SCALE_RATIO,
        }}>
        <MyImage
          style={{
            width: 96 * WIDTH_SCALE_RATIO,
            height: 96 * WIDTH_SCALE_RATIO,
            borderRadius: (96 * WIDTH_SCALE_RATIO) / 2,
          }}
          source={this.state.picture ? { uri: this.state.picture } : IMAGE.DEFAULT_PROFILE_IMAGE}
        />
      </View>
    );
  }

  renderWebViewToLoginApple() {
    return (
      <Modal
        backdropColor={COLOR.WHITE}
        backdropOpacity={1}
        animationIn="fadeInDown"
        animationInTiming={0}
        animationOutTiming={500}
        visible={this.state.webViewLoginAplle}
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
                paddingLeft: this.state.canGoBack ? 0 * WIDTH_SCALE_RATIO : 10 * WIDTH_SCALE_RATIO,
              }}
              onPress={() => {
                this.setState({ webViewLoginAplle: false });
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
            onPress={() => {}}>
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
          javaScriptEnabled
          directionalLockEnabled
          thirdPartyCookiesEnabled
          startInLoadingState
          domStorageEnabled
          automaticallyAdjustContentInsets
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    zIndex: 999,
  },
  textTitleChange: {
    marginLeft: 4 * WIDTH_SCALE_RATIO,
    padding: 0 * HEIGHT_SCALE_RATIO,
    fontWeight: '400',
    color: COLOR.appTextSubColor,
    textTransform: 'uppercase',
  },
});
