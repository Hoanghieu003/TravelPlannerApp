import React from 'react';
import { Alert, DeviceEventEmitter, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import SplashScreen from 'react-native-splash-screen';
import Feather from 'react-native-vector-icons/dist/Feather';
import VersionCheck from 'react-native-version-check';
import Const from '../../Common/Const';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import globalUtils from '../Constants/globalUtils';
import style, { COLOR, ptColor } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { getMyLikeBlog, getMyLikeSpot } from '../Utils/likeAction';
import ModalContact from './ModalContact';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
import { ICON } from '../../asset/image/ImagePath';

class SideMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      version: '',

      contactUs: false,
      languageDropdown: false,
      languages: Object.values(Const.Language),
      language: RootStore.language,
    };
    this.onClickGoChangePassword = this.onClickGoChangePassword.bind(this);

    this.getLastVersion();
  }

  async getLastVersion() {
    const version = await VersionCheck.getCurrentVersion();
    this.setState({ version });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        language: RootStore.language,
      });
    }, 300);

    // SplashScreen.hide();
  }

  setLanguageDropdownAvailable = () => {
    this.setState({ languageDropdown: !this.state.languageDropdown });
  };

  onChangeLanguage(param) {
    this.setState({ language: param }, async () => {
      await store.update('language', param).then(() => {
        RootStore.setLanguage(param);
        setTimeout(() => {
          getMyLikeSpot();
          getMyLikeBlog();
          Actions.reset('mainStack');
        }, 100);
      });
    });
  }
  onClickGoChangePassword() {
    if (globalUtils.socialType !== Const.SocialType.Creatrip.code) {
      Alert.alert(
        '',
        RootStore.i18n.t('my-page.social-user'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: true },
      );
      return;
    } else {
      Actions.changePassword();
    }
  }

  onClickAlert() {
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
    Actions.alert();
  }
  onClickContactUs() {
    this.setState({ contactUs: !this.state.contactUs });
  }
  onClickAccountIntegration() {
    Actions.accountIntegration();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24 * WIDTH_SCALE_RATIO,
          justifyContent: 'space-between',
        }}>
        <ModalContact
          isVisible={this.state.contactUs}
          onBackdropPress={() => this.setState({ contactUs: false })}
          clickClose={() => {
            this.onClickContactUs();
          }}
        />
        <View style={{ marginTop: 77 * HEIGHT_SCALE_RATIO }}>
          <View style={{ alignItems: 'flex-end' }}>
            <MyTouchableOpacity onPress={() => Actions.drawerClose()}>
              <Image
                source={ICON.CLOSE_ICON}
                style={{
                  tintColor: COLOR.GREY20,
                  height: 16 * WIDTH_SCALE_RATIO,
                  width: 16 * WIDTH_SCALE_RATIO,
                }}
              />
            </MyTouchableOpacity>
          </View>
          <View
            style={{
              borderColor: COLOR.appBorderColor,
              borderTopWidth: 1.5 * WIDTH_SCALE_RATIO,
              marginTop: 23 * HEIGHT_SCALE_RATIO,
              justifyContent: 'center',
            }}>
            <MyTouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12 * HEIGHT_SCALE_RATIO,
              }}
              onPress={() => this.setLanguageDropdownAvailable()}>
              <Image source={ICON.LANGUAGE_ICON} resizeMode="contain" style={styles.icon} />
              <PText
                style={[style.textCaption, ptColor.GREY80, { marginLeft: 16 * WIDTH_SCALE_RATIO }]}>
                {RootStore.i18n.t('my-page.language')}
              </PText>
            </MyTouchableOpacity>
            {this.state.languageDropdown ? (
              <View
                style={{
                  borderColor: COLOR.appBorderColor,
                  borderTopWidth: 1 * WIDTH_SCALE_RATIO,
                }}>
                <View
                  style={{
                    marginTop: 16 * HEIGHT_SCALE_RATIO,
                    marginLeft: 30 * WIDTH_SCALE_RATIO,
                  }}>
                  {this.state.languages.map((v, i) => {
                    if (this.state.language === v.code) {
                      return (
                        <MyTouchableOpacity
                          style={{ marginBottom: 11 * HEIGHT_SCALE_RATIO }}
                          key={`key ${i}`}
                          onPress={() => {
                            this.onChangeLanguage(v.code);
                          }}>
                          <PText
                            key={`language-${i}`}
                            style={[
                              style.textCaption,
                              ptColor.GREY80,
                              {
                                fontWeight: '600',
                                paddingBottom: 8 * WIDTH_SCALE_RATIO,
                              },
                            ]}>
                            {v.view}
                          </PText>
                        </MyTouchableOpacity>
                      );
                    }
                    return (
                      <MyTouchableOpacity
                        style={{ marginBottom: 11 * HEIGHT_SCALE_RATIO }}
                        key={`key ${i}`}
                        onPress={() => this.onChangeLanguage(v.code)}>
                        <PText
                          key={`language-${i}`}
                          style={[style.textCaption, { paddingBottom: 8 * WIDTH_SCALE_RATIO }]}>
                          {v.view}
                        </PText>
                      </MyTouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              false
            )}
          </View>

          <View
            style={{
              borderColor: COLOR.appBorderColor,
              borderTopWidth: 1.5 * WIDTH_SCALE_RATIO,
              justifyContent: 'center',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                this.onClickContactUs();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12 * HEIGHT_SCALE_RATIO,
              }}>
              <Image source={ICON.CONTACT_ICON} resizeMode="contain" style={styles.icon} />
              <PText
                style={[style.textCaption, ptColor.GREY80, { marginLeft: 16 * WIDTH_SCALE_RATIO }]}>
                {RootStore.i18n.t('contact-us')}
              </PText>
            </MyTouchableOpacity>
          </View>
          {RootStore.auth.token ? (
            <View>
              <View
                style={{
                  borderColor: COLOR.appBorderColor,
                  borderTopWidth: 1.5 * WIDTH_SCALE_RATIO,
                  justifyContent: 'center',
                }}>
                <MyTouchableOpacity
                  onPress={() => {
                    this.onClickGoChangePassword();
                    Actions.drawerClose();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 12 * HEIGHT_SCALE_RATIO,
                  }}>
                  <Image source={ICON.PASSWORD_ICON} resizeMode="contain" style={styles.icon} />
                  <PText
                    style={[
                      style.textCaption,
                      ptColor.GREY80,
                      { marginLeft: 16 * WIDTH_SCALE_RATIO },
                    ]}>
                    {RootStore.i18n.t('my-page.change-password')}
                  </PText>
                </MyTouchableOpacity>
              </View>
              <View
                style={{
                  borderColor: COLOR.appBorderColor,
                  borderTopWidth: 1.5 * WIDTH_SCALE_RATIO,
                  justifyContent: 'center',
                }}>
                <MyTouchableOpacity
                  onPress={() => {
                    Actions.changePersonalSetting();

                    Actions.drawerClose();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 12 * HEIGHT_SCALE_RATIO,
                  }}>
                  <Image source={ICON.CHAT_ICON} resizeMode="contain" style={styles.icon} />
                  <PText
                    style={[
                      style.textCaption,
                      ptColor.GREY80,
                      { marginLeft: 16 * WIDTH_SCALE_RATIO },
                    ]}>
                    {RootStore.i18n.t('my-page.personal-settings')}
                  </PText>
                </MyTouchableOpacity>
              </View>

              <View
                style={{
                  borderColor: COLOR.appBorderColor,
                  borderTopWidth: 1.5 * WIDTH_SCALE_RATIO,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.onClickAccountIntegration();
                    Actions.drawerClose();
                  }}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 12,
                    marginBottom: 12,
                  }}>
                  <Image source={ICON.INTERGRATE_ICON} resizeMode="contain" style={styles.icon} />

                  <PText
                    style={[
                      style.textCaption,
                      ptColor.GREY80,
                      { marginLeft: 16 * WIDTH_SCALE_RATIO },
                    ]}>
                    {`${RootStore.i18n.t('link-account.header')}`}
                  </PText>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderColor: COLOR.appBorderColor,
                  borderTopWidth: 1.5 * WIDTH_SCALE_RATIO,
                  justifyContent: 'center',
                }}>
                <MyTouchableOpacity
                  onPress={() => {
                    DeviceEventEmitter.emit('onClickLogOut');
                    Actions.drawerClose();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 12 * HEIGHT_SCALE_RATIO,
                  }}>
                  <Image source={ICON.LOGOUT_ICON} style={styles.icon} />
                  <PText
                    style={[
                      style.textCaption,
                      ptColor.GREY80,
                      { marginLeft: 16 * WIDTH_SCALE_RATIO },
                    ]}>
                    {RootStore.i18n.t('global.logout')}
                  </PText>
                </MyTouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
        {this.state.languageDropdown ? null : (
          <View
            style={{
              width: '100%',
              flexDirection: 'column-reverse',
              top: 60 * HEIGHT_SCALE_RATIO,
              borderColor: COLOR.appBorderColor,
              borderTopWidth: 1.5 * WIDTH_SCALE_RATIO,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12 * HEIGHT_SCALE_RATIO,
              }}>
              <Feather name="info" size={18 * WIDTH_SCALE_RATIO} style={{ color: COLOR.GREY40 }} />
              <PText
                style={[style.textCaption, ptColor.GREY40, { marginLeft: 16 * WIDTH_SCALE_RATIO }]}>
                Version {this.state.version}
              </PText>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    tintColor: COLOR.GREY60,
    height: 16 * WIDTH_SCALE_RATIO,
    width: 16 * WIDTH_SCALE_RATIO,
  },
});

export default SideMenu;
