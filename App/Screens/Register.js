import analytics from '@react-native-firebase/analytics';
import { Icon, Input, Item } from 'native-base';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  DeviceEventEmitter,
  Image,
  Platform,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Modal from 'react-native-modal';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Api from '../../Common/Api';
import Const from '../../Common/Const';
import createMember from '../../Common/gql/mutations/createMember.gql';
import getMemberInfo from '../../Common/gql/queries/getMemberInfo.gql';
import getRecommendList from '../../Common/gql/queries/getRecommendList.gql';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import Divider from '../Components/Divider';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO, WIDTH, IS_IOS } from '../Constant/constant';
import { getSelectedCity } from '../Constants/asyncStorage';
import globalUtils from '../Constants/globalUtils';
import style, { COLOR, FS, ptShadow } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { ICON } from '../../asset/image/ImagePath';

const FormInputRegister = ({
  password,
  keyboardType,
  icon,
  placeholder,
  value,
  name,
  type,
  onChange,
  onFocus,
  focusValue,
}) => {
  return (
    <View
      style={{
        marginTop: 30 * HEIGHT_SCALE_RATIO,
        flexDirection: 'row',
        width: WIDTH * 0.75,
        alignItems: 'center',
      }}>
      <Image
        source={icon}
        style={{
          width: 30 * WIDTH_SCALE_RATIO,
          height: 24 * HEIGHT_SCALE_RATIO,
          marginTop: 4 * HEIGHT_SCALE_RATIO,
          marginRight: IS_IOS ? 10 * WIDTH_SCALE_RATIO : null,
        }}
        resizeMode={'contain'}
      />
      <TextInput
        onChangeText={(text) => onChange({ name, type, text })}
        secureTextEntry={password}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        autoCapitalize="none"
        style={[
          style.textInput,
          {
            fontFamily: 'Raleway-Regular',
            lineHeight: 18,
            paddingBottom: 8 * HEIGHT_SCALE_RATIO,
            borderBottomColor: COLOR.appBorderColor,
            borderBottomWidth: 1 * HEIGHT_SCALE_RATIO,
            width: '90%',
          },
        ]}
        placeholderTextColor={COLOR.appTextPlaceholderColor}
        borderColor={COLOR.appTextPlaceholderColor}
      />
    </View>
  );
};
export default class Register extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      needGuest: Platform.OS === 'ios',
      name: '',
      nickname: '',
      email: '',
      password: '',
      country: '',
      modalAlreadyUserName: false,
      titleModal: '',
      date: new Date(),
      loading: false,
      focusRow: null,
      countrySelect: [
        {
          code: 'cn',
          name: 'China',
          country_code: 'cn',
          language: 'zh-CN',
        },
        {
          code: 'tw',
          name: 'Taiwan',
          country_code: 'tw',
          language: 'zh-TW',
        },
        {
          code: 'hk',
          name: 'Hong Kong',
          country_code: 'hk',
          language: 'zh-HK',
        },
        {
          code: 'mo',
          name: 'Macao',
          country_code: 'mo',
          language: 'mo',
        },
        {
          code: 'sg',
          name: 'Singapore',
          country_code: 'sg',
          language: 'zh-SG',
        },
        {
          code: 'my',
          name: 'Malaysia',
          country_code: 'my',
          language: 'ms',
        },
        {
          code: 'id',
          name: 'Indonesia',
          country_code: 'id',
          language: 'id',
        },
        {
          code: 'ph',
          name: 'Philippines',
          country_code: 'ph',
          language: 'ph',
        },
        {
          code: 'th',
          name: 'Thailand',
          country_code: 'th',
          language: 'th',
        },
        {
          code: 'kr',
          name: 'South Korean',
          country_code: 'kr',
          language: 'ko',
        },
        {
          code: 'jp',
          name: 'Japan',
          country_code: 'jp',
          language: 'ja',
        },
        {
          code: 'vn',
          name: 'Vietnam',
          country_code: 'vn',
          language: 'vi',
        },
        {
          code: 'us',
          name: 'United States',
          country_code: 'us',
          language: 'en-us',
        },
        {
          code: 'ca',
          name: 'Canada',
          country_code: 'ca',
          language: 'en-ca',
        },
        {
          code: 'au',
          name: 'Australia',
          country_code: 'au',
          language: 'en-au',
        },
        {
          code: 'other',
          name: 'Other',
          country_code: 'other',
          language: 'other',
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    analytics().setCurrentScreen('Sign-up');

    // this.getCountryList();
  }

  // async getCountryList() {
  //   const variables = { language: RootStore.language };
  //   const result = await RootStore.client.query({
  //     query: getCountryList,
  //     variables,
  //   });
  //   console.log('country List', result.data.getCountryList.countrys);
  //   const countrySelect = result.data.getCountryList.countrys.map(v => ({
  //     code: v.code,
  //     name: v.name === 'Taiwan, Province of China' ? 'Taiwan' : v.name,
  //     country_code: v.country_code,
  //     language: v.language,
  //   }));
  //   this.setState({ countrySelect });
  // }
  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
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
  async onClickLogin() {
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

      this.getMemberCityTag()
        .then(async () => {
          Actions.replace('myPage');
          // Actions.replace('home');
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
              Actions.push('search', {
                isFromTravelInfo: true,
                isHome: 'home',
                city: cityNameFromStorage,
                postType: Const.PostType.Blog.code,
              });
              Actions.blogDetail({ blogCode: globalUtils.blogCode });
              if (globalUtils.isComment === false) {
                DeviceEventEmitter.emit('keepGoingBooking', {});
              }
            }, 500);
          }
        })
        .catch((err) => {
          console.log('Cuong ne: Register -> onClickLogin -> err', err);
        });
    } else {
      Alert.alert(
        '',
        RootStore.i18n.t('login.login-fail'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: true },
      );
    }
  }
  async onClickSignUp() {
    const { email, password, name, nickname } = this.state;
    if (name === '') {
      this.modalNoti(RootStore.i18n.t('login.error-empty-name'));
    } else if (nickname === '') {
      this.modalNoti(RootStore.i18n.t('login.error-empty-nickname'));
    } else if (email === '') {
      this.modalNoti(RootStore.i18n.t('login.error-empty-email'));
    } else if (!this.validateEmail(email)) {
      this.modalNoti(RootStore.i18n.t('login.error-incorect-email'));
      this.setState({
        email: '',
      });
    } else if (password === '') {
      this.modalNoti(RootStore.i18n.t('login.error-empty-password'));
    } else if (this.state.country === '') {
      this.modalNoti(RootStore.i18n.t('login.error-empty-country'));
    } else {
      this.setState({ loading: true });
      const variables = {
        password: this.state.password,
        id: this.state.email,
        email: this.state.email,
        nickname: this.state.nickname,
        name: this.state.name,
        birthday: this.state.date,
        country_code: this.state.country?.code,
        locale: RootStore.language,
      };
      const result = await RootStore.client.mutate({
        mutation: createMember,
        variables,
      });
      if (
        result &&
        result.data &&
        result.data.createMember &&
        result.data.createMember &&
        result.data.createMember.result
      ) {
        this.isSuccess = true;
        setTimeout(() => {
          this.onClickLogin();
        }, 500);
      } else {
        if (
          result &&
          result.data &&
          result.data.createMember &&
          result.data.createMember &&
          result.data.createMember.errorMessage
        ) {
          this.modalNoti(result.data.createMember.errorMessage); //have 2 type of errors: Nickname already exist or id already exist
        } else {
          this.modalNoti('Register fail');
        }
      }
      this.setState({ loading: false });
    }
  }

  onCountryChange(value) {
    this.setState({
      country: value,
    });
  }

  modalNoti = (titleModal) => {
    this.setState({ titleModal, modalAlreadyUserName: !this.state.modalAlreadyUserName }, () => {});
  };

  handleChange(event) {
    const { name, type, text } = event;
    let processedData = text;
    this.setState({ [name]: processedData });
  }
  handleFocus(event) {
    this.setState({ focusRow: event.name });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BaseHeaderWithSearch
          showBack
          leftIconStyle={{ tintColor: COLOR.appColor }}
          backgroundColorWhite
        />

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.block}>
            <FormInputRegister
              icon={ICON.ABOUT_ICON}
              placeholder={RootStore.i18n.t('login.name')}
              name="name"
              type="text"
              value={this.state.name}
              // focusValue={this.state.focusRow}
              onChange={this.handleChange}
              // onFocus={this.handleFocus}
            />
            <FormInputRegister
              icon={ICON.NICKNAME_ICON}
              placeholder={RootStore.i18n.t('my-page.nickname')}
              name="nickname"
              type="text"
              value={this.state.nickname}
              // focusValue={this.state.focusRow}
              onChange={this.handleChange}
              // onFocus={this.handleFocus}
            />
            <FormInputRegister
              icon={ICON.EMAIL_ICON}
              placeholder={RootStore.i18n.t('login.email')}
              name="email"
              keyboardType="email-address"
              type="text"
              value={this.state.email}
              // focusValue={this.state.focusRow}
              onChange={this.handleChange}
              // onFocus={this.handleFocus}
            />
            <FormInputRegister
              icon={ICON.LOCK_ICON2}
              placeholder={RootStore.i18n.t('login.password')}
              name="password"
              password
              type="text"
              value={this.state.password}
              // focusValue={this.state.focusRow}
              onChange={this.handleChange}
              // onFocus={this.handleFocus}
            />

            {/* -----New------ */}
            <View style={{ marginTop: 40 * HEIGHT_SCALE_RATIO }} />
            <Menu>
              <MenuTrigger
                style={[
                  style.textInput,
                  {
                    // backgroundColor: 'red',
                    // width: WIDTH * 0.3,
                    // maxWidth: WIDTH * 0.5,
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    // marginTop: 20 * HEIGHT_SCALE_RATIO,
                    paddingBottom: 10 * HEIGHT_SCALE_RATIO,
                    width: '100%',
                    paddingHorizontal: 20 * WIDTH_SCALE_RATIO,

                    justifyContent: 'center',
                    alignItem: 'center',
                  }}>
                  <Image
                    source={ICON.MAP_ICON}
                    style={{
                      // tintColor: COLOR.GREY20,
                      width: 34,
                      height: 28,
                      // backgroundColor: 'blue',
                      marginLeft: 3 * WIDTH_SCALE_RATIO,
                    }}
                    resizeMode={'contain'}
                  />
                  <PText
                    style={[
                      style.textSubTitle,
                      {
                        width: '90%',
                        marginLeft: 5 * WIDTH_SCALE_RATIO,
                        // paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
                        color: COLOR.GREY20,

                        // width: '90%',
                      },
                    ]}
                    numberOfLines={1}>
                    {this.state.country !== '' ? this.state.country.name : 'Select country'}
                  </PText>
                  {/* {selectedCityName === RootStore.i18n.t('home.search-city') && ( */}
                  <View
                    style={[
                      style.center,
                      {
                        alignSelf: 'center',
                        width: 16 * WIDTH_SCALE_RATIO,
                        height: 16 * WIDTH_SCALE_RATIO,
                      },
                    ]}>
                    <Icon
                      type="Entypo"
                      name="triangle-down"
                      color={COLOR.appTextSubColor}
                      style={[
                        style.textSubTitle,
                        {
                          color: style.textSubTitle.color,
                        },
                      ]}
                    />
                  </View>
                  {/* // )} */}
                </View>
                <View
                  style={{
                    backgroundColor: COLOR.appBorderColor,
                    height: 1 * HEIGHT_SCALE_RATIO,
                    width: WIDTH * 0.67,
                    marginLeft: 36 * WIDTH_SCALE_RATIO,
                  }}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  borderRadius: 10 * WIDTH_SCALE_RATIO,
                  // backgroundColor: 'red',
                  width: 130 * WIDTH_SCALE_RATIO,
                  maxHeight: 200 * HEIGHT_SCALE_RATIO,
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {this.state.countrySelect.map((item, index) => (
                    // <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MenuOption
                      value={item.name}
                      key={index}
                      onSelect={() => {
                        this.setState({ country: item });
                      }}>
                      <PText
                        numberOfLines={1}
                        style={[
                          style.textButton,
                          {
                            color: COLOR.appTextSubColor,
                            paddingVertical: 3,
                            paddingLeft: 10,
                            textAlign: 'left',
                          },
                        ]}>
                        {item.name}
                      </PText>
                    </MenuOption>
                    // </View>
                  ))}
                  {/* <FlatList
                        scrollEnabled={false}
                        keyExtractor={item => `${item.code}`}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                        data={this.state.countrySelect}
                        // contentContainerStyle={{ maxHeight: 200 * HEIGHT_SCALE_RATIO }}
                        renderItem={({ item, index }) => {
                          return (
                            <MenuOption>
                              <PText
                                numberOfLines={1}
                                style={[
                                  style.textButton,
                                  { color: COLOR.appTextSubColor, padding: 8 },
                                ]}
                              >
                                {item.name}
                              </PText>
                            </MenuOption>
                          );
                        }}
                      /> */}
                </ScrollView>
              </MenuOptions>
            </Menu>
            <View style={{ marginTop: 50 * HEIGHT_SCALE_RATIO }}>
              {this.state.loading ? (
                <ActivityIndicator size="large" color="#00afa0" style={{ alignSelf: 'center' }} />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.onClickSignUp();
                  }}>
                  <PText style={[styles.text, { textTransform: 'uppercase' }]}>
                    {RootStore.i18n.t('login.sign-up')}
                  </PText>
                </TouchableOpacity>
              )}
              <Modal isVisible={this.state.modalAlreadyUserName}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 300,
                        borderRadius: 10,
                      }}>
                      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                        <Image style={{ width: 30, height: 30 }} source={ICON.ATTENTION_ICON} />
                      </View>
                      <PText
                        style={{
                          paddingBottom: 30,
                          paddingTop: 10,
                          textAlign: 'center',
                          paddingHorizontal: 20,
                          // backgroundColor: 'red',
                        }}>
                        {this.state.titleModal}
                      </PText>

                      <TouchableOpacity
                        style={{ paddingBottom: 20 }}
                        onPress={() => {
                          this.modalNoti();
                          if (this.isSuccess) {
                            Actions.replace('login');
                          }
                        }}>
                        <View
                          style={{
                            width: 120,
                            height: 40,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderColor: COLOR.appColor,
                          }}>
                          <PText style={{ color: COLOR.appColor }}>OK</PText>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={{ marginTop: 50 }}>
              <TouchableOpacity onPress={() => Actions.replace('login')}>
                <PText style={style.textCaption}>
                  {RootStore.i18n.t('login.already-have-an-account')}
                </PText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    maxWidth: 320 * WIDTH_SCALE_RATIO,
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 20 * WIDTH_SCALE_RATIO,
    paddingRight: 20 * WIDTH_SCALE_RATIO,
    paddingTop: 10 * HEIGHT_SCALE_RATIO,
    paddingBottom: 0,
  },

  text: {
    width: 95 * WIDTH_SCALE_RATIO,
    height: 27 * HEIGHT_SCALE_RATIO,
    fontSize: FS(18),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 27 * HEIGHT_SCALE_RATIO,
    letterSpacing: 0,
    textAlign: 'center',
    color: COLOR.PRIMARY,
  },
});
