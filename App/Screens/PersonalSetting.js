import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {
  Alert,
  DeviceEventEmitter,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { myAlert } from '../Components/MyAlert';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import setMember from '../../Common/gql/mutations/setMember.gql';
import checkNickName from '../../Common/gql/queries/checkNickName.gql';
import getMemberInfo from '../../Common/gql/queries/getMemberInfo.gql';
import getTagList from '../../Common/gql/queries/getTagList.gql';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import Divider from '../Components/Divider';
import MyImage from '../Components/MyImage';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, IS_IOS, WIDTH_SCALE_RATIO, IS_ANDROID } from '../Constant/constant';
import style, { COLOR, ptText, isUseRaleway } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { IMAGE, ICON } from '../../asset/image/ImagePath';
export default class PersonalSetting extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNickName = this.onChangeNickName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeHome = this.onChangeHome.bind(this);

    this.getMemberInfo = this.getMemberInfo.bind(this);
    this.setMemberInfo = this.setMemberInfo.bind(this);

    this.reqCityList = this.reqCityList.bind(this);
    this.oldInfo = {};

    this.state = {
      name: '',
      email: '',
      nickname: '',
      modifyHome: false,
      home: '',
      introduce: '',
      country: null,
      socialType: 0,
      picture: '',
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
          code: 'Others',
          name: 'Others',
          country_code: 'ot',
          language: 'Others',
        },
      ],
      isShowModal: false,
    };
  }

  // async getCountryList() {
  //   const variables = { language: RootStore.language };
  //   const result = await RootStore.client.query({
  //     query: getCountryList,
  //     variables,
  //   });
  //   const countrySelect = result.data.getCountryList.countrys.map(v => ({
  //     code: v.code,
  //     name: v.name === 'Taiwan, Province of China' ? 'Taiwan' : v.name,
  //     country_code: v.country_code,
  //     language: v.language,
  //   }));
  //   this.setState({ countrySelect });
  // }

  componentDidMount() {
    analytics().setCurrentScreen('Change-peronal-info');

    this.getMemberInfo();
    // this.getCountryList();
  }

  onClickHome() {
    this.setState({ modifyHome: true }, () => {
      this.refs.home.setFocus();
    });
  }

  onSubmitHome() {
    this.setState({ modifyHome: false }, () => {
      this.setMemberInfo();
    });
  }

  onChangeHome(home) {
    this.setState({ home });
  }

  async onSelect(param) {
    const variables = {
      home_tag_code: param.code,
    };

    const result = await RootStore.client.mutate({
      mutation: setMember,
      variables,
    });
    if (result.data.setMember.result) {
      this.getMemberInfo();
    }
  }

  async getMemberInfo() {
    if (!RootStore.auth.id) {
      return;
    }

    const result = await RootStore.client.query({
      query: getMemberInfo,
      variables: { id: RootStore.auth.id, language: RootStore.language },
    });
    // console.log('result.data.getMemberInfo', result.data.getMemberInfo.member);
    this.oldInfo = result.data.getMemberInfo.member;
    const name = result.data.getMemberInfo.member.name;
    const email = result.data.getMemberInfo.member.email;
    const nickname = result.data.getMemberInfo.member.nickname;
    const country = result.data.getMemberInfo.member.country
      ? result.data.getMemberInfo.member.country
      : null;
    const introduce = result.data.getMemberInfo.member.introduce;
    const socialType = result.data.getMemberInfo.member.social_type;
    const picture =
      result.data.getMemberInfo.member.picture !== null
        ? result.data.getMemberInfo.member.picture
        : RootStore.auth.picture;
    this.setState({
      name,
      email,
      nickname,
      modifyHome: false,
      country,
      introduce,
      socialType,
      picture,
    });
  }

  setMemberInfo() {
    return new Promise((resolve, reject) => {
      const variables = {
        name: this.state.name,
        nickname: this.state.nickname,
        introduce: this.state.introduce,
        country_code: this.state.country.country_code,
      };
      RootStore.client
        .mutate({ mutation: setMember, variables })
        // .then(res => res.json())
        .then((response) => {
          if (response.data && response.data.setMember && response.data.setMember.result) {
            resolve(response.data.setMember.result);
          } else {
            reject();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });

    // const result = await RootStore.client.mutate({ mutation: setMember, variables });
    // return result.data.setMember.result;
    // if (result.data.setMember.result) {
    //   Alert.alert(
    //     '',
    //     'Your update success',
    //     [
    //       {
    //         text: 'OK',
    //         onPress: () => {
    //           this.getMemberInfo().then(() => {
    //             DeviceEventEmitter.emit('refreshAfterUpdateProfile', {});
    //             Actions.myPage();
    //           });
    //         },
    //       },
    //     ],
    //     {
    //       cancelable: false,
    //     },
    //   );
    // } else {
    //   Alert.alert(
    //     '',
    //     'Server have problem, Please try again later..',
    //     [
    //       {
    //         text: 'OK',
    //         // onPress: () => {
    //         //   this.getMemberInfo().then(() => Actions.myPage());
    //         // },
    //       },
    //     ],
    //     {
    //       cancelable: false,
    //     },
    //   );
    // }
  }

  async reqCityList(param) {
    if (param === '') {
      return [];
    }

    const result = await RootStore.client.query({
      query: getTagList,
      variables: { types: [Const.TagType.City.code], name: param, limit: 3 },
    });
    return result.data.getTagList.map((v) => ({
      code: v.code,
      name: v.translations[0].name,
      ...v,
    }));
  }

  onChangeName(name) {
    this.setState({ name });
  }
  onChangeNickName(nickname) {
    this.setState({ nickname });
  }
  onChangeEmail(email) {
    this.setState({ email });
  }
  checkNickName(nickname) {
    // if have result mean duplicate, else result success
    return new Promise((resolve, reject) => {
      const variables = {
        nickname: nickname,
      };
      RootStore.client
        .mutate({ mutation: checkNickName, variables })
        // .then(res => res.json())
        .then((response) => {
          if (
            response.data &&
            response.data.checkNickName &&
            response.data.checkNickName.length > 0
          ) {
            resolve(response.data.checkNickName);
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async onClickChange() {
    // try {
    console.log('haha change nè 0409');
    const { email, password, name, nickname, country } = this.state;
    if (nickname === '') {
      myAlert('', RootStore.i18n.t('login.error-empty-nickname'));
    } else if (!country) {
      myAlert('', RootStore.i18n.t('my-page.error-empty-country'));
    } else if (
      this.oldInfo.name === name &&
      this.oldInfo.nickname === nickname &&
      this.oldInfo.country === country
    ) {
      myAlert('', 'Change completed');
    } else {
      const isDuplicateNickName = await this.checkNickName(this.state.nickname);
      if (this.newUnuploadImage) {
        await this.uploadImage(this.newUnuploadImage);
      }
      if (name === '') {
        myAlert('', RootStore.i18n.t('login.error-empty-name'));
      } else if (nickname === '') {
        myAlert('', RootStore.i18n.t('login.error-empty-nickname'));
      } else if (isDuplicateNickName) {
        myAlert('', RootStore.i18n.t('my-page.duplicate-nickname'));
      } else if (!country) {
        myAlert('', RootStore.i18n.t('my-page.error-empty-country'));
      } else {
        await this.setMemberInfo();
        myAlert('', 'Change completed', () => {
          this.getMemberInfo().then(() => {
            DeviceEventEmitter.emit('refreshAfterUpdateProfile', {});
          });
        });
      }
    }

    // } catch (error) {
    //   myAlert('', RootStore.i18n.t('my-page.duplicate-nickname'));
    // }
  }

  onClickGoBack() {
    if (!this.props.disabled) {
      Actions.pop();
    }
  }
  onClickImage = () => {
    const options = {
      title: 'Select Profile Image',
      takePhotoButtonTitle: 'Take a picture on your Camera',
      chooseFromLibraryButtonTitle: 'Choose a picture from your library',
      cancelButtonTitle: 'Cancel',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      // maxWidth: 1280,
      maxWidth: 1080,
      // quality: 0.8, //remove this line ==> uncomment this line will make image duplicate after choose.
      includeBase64: true,
      compressImageQuality: 0.5,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.newUnuploadImage = response;
        this.setState({
          picture: response.uri,
        });
        // this.uploadImage(response);
      }
    });
  };
  onCountryChange(value) {
    this.setState({
      country: value,
    });
  }

  uploadImage(photo) {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', {
        uri: photo.uri,
        type: 'image/jpeg', // or photo.type
        name: photo.fileName,
      });
      const url = `${RootStore.config.host}/member/registprofile`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8',
          Authorization: `Bearer ${RootStore.auth.token}`,
        },
        body: data,
      })
        .then((recv) => recv.json())
        .then((result) => {
          if (result.result) {
            resolve(result.result);
          } else {
            reject();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
    // const data = new FormData();
    // data.append('file', {
    //   uri: photo.uri,
    //   type: 'image/jpeg', // or photo.type
    //   name: photo.fileName,
    // });
    // const url = `${RootStore.config.host}/member/registprofile`;
    // const recv = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data; charset=utf-8',
    //     Authorization: `Bearer ${RootStore.auth.token}`,
    //   },
    //   body: data,
    // });
    // const result = await recv.json();
    // return result.result;
    // if (result.result) {
    //   this.getMemberInfo().then(() => {
    //     Actions.refresh();
    //     DeviceEventEmitter.emit('refreshAfterUpdateProfile', {});
    //   });
    // } else {
    //   Alert.alert(
    //     '',
    //     RootStore.i18n.t('my-page.image-fail'),
    //     [{ text: RootStore.i18n.t('global.update-ok') }],
    //     { cancelable: true },
    //   );
    // }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BaseHeaderApp
          color={COLOR.GREY80}
          title={RootStore.i18n.t('my-page.personal-settings')}
          isClose
          rightIconType={null}
          onRightPress={() => {
            this.onClickGoBack();
          }}
          leftIconStyle={{ tintColor: COLOR.appColor }}
        />
        <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }}>
          <View
            style={{
              alignItems: 'center',
              marginTop: 60 * HEIGHT_SCALE_RATIO,
              marginBottom: 56 * HEIGHT_SCALE_RATIO,
            }}>
            <MyTouchableOpacity
              onPress={() => {
                this.onClickImage();
              }}>
              <MyImage
                style={{
                  width: 96 * WIDTH_SCALE_RATIO,
                  height: 96 * WIDTH_SCALE_RATIO,
                  borderRadius: (96 * WIDTH_SCALE_RATIO) / 2,
                }}
                source={
                  this.state.picture ? { uri: this.state.picture } : IMAGE.DEFAULT_PROFILE_IMAGE
                }
              />
            </MyTouchableOpacity>
          </View>
          {/* input change data */}

          <View
            style={{
              justifyContent: 'flex-start',
              paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
              paddingBottom: 16 * WIDTH_SCALE_RATIO,
            }}>
            {/* Name */}
            <View style={{}}>
              <PText style={[ptText.SMALL1, styles.textTitleChange]}>
                {RootStore.i18n.t('login.name')}
              </PText>
              <TextInput
                ref={(input) => {
                  this.nameInput = input;
                }}
                onSubmitEditing={() => {
                  this.onChangeNickName.focus();
                }}
                value={this.state.name}
                placeholderTextColor={COLOR.GREY20}
                placeholder={this.state.name || 'Type your name here'}
                onChangeText={(text) => {
                  this.setState({ name: text });
                }}
                returnKeyType="next"
                autoCapitalize="none"
                style={[
                  ptText.BODY1,
                  style.textInput,
                  {
                    // backgroundColor: 'red',
                    color: COLOR.GREY80,
                    // height: 40 * HEIGHT_SCALE_RATIO,
                    paddingVertical: IS_IOS ? 4 * HEIGHT_SCALE_RATIO : 0,
                    paddingLeft: 4 * WIDTH_SCALE_RATIO,
                    lineHeight: IS_IOS ? -3 : null,
                  },
                ]}
              />
            </View>
            <Divider style={{ marginTop: 5 * HEIGHT_SCALE_RATIO }} />
            {/* Nickname */}
            <View style={{ marginTop: 16 * HEIGHT_SCALE_RATIO }}>
              <PText style={[ptText.SMALL1, styles.textTitleChange]}>
                {RootStore.i18n.t('my-page.nickname')}
              </PText>
              <TextInput
                ref={(input) => {
                  this.onChangeNickName = input;
                }}
                // onSubmitEditing={() => {
                //   this.onCountryChange;
                // }}
                placeholderTextColor={COLOR.GREY20}
                autoCapitalize="none"
                returnKeyType="next"
                value={this.state.nickname}
                onChangeText={(text) => {
                  this.setState({ nickname: text });
                }}
                style={[
                  ptText.BODY1,
                  style.textInput,
                  {
                    // backgroundColor: 'red',
                    color: COLOR.GREY80,
                    // height: 40 * HEIGHT_SCALE_RATIO,
                    paddingVertical: IS_IOS ? 4 * HEIGHT_SCALE_RATIO : 0,
                    paddingLeft: 4 * WIDTH_SCALE_RATIO,
                    lineHeight: IS_IOS ? -3 : null,
                  },
                ]}
              />
            </View>
            <Divider style={{ marginTop: 5 * HEIGHT_SCALE_RATIO }} />

            {/* Email */}
            <View style={{ marginTop: 16 * HEIGHT_SCALE_RATIO }}>
              <PText style={[ptText.SMALL1, styles.textTitleChange]}>
                {RootStore.i18n.t('login.email')}
              </PText>
              <TextInput
                editable={false}
                defaultValue={this.state.email}
                // onChangeText={this.onChangeEmail}
                returnKeyType="next"
                autoCapitalize="none"
                style={[
                  ptText.BODY1,
                  style.textInput,
                  {
                    // backgroundColor: 'red',
                    color: COLOR.GREY80,
                    // height: 40 * HEIGHT_SCALE_RATIO,
                    paddingVertical: IS_IOS ? 4 * HEIGHT_SCALE_RATIO : 0,
                    paddingLeft: 4 * WIDTH_SCALE_RATIO,
                    lineHeight: IS_IOS ? -3 : null,
                  },
                ]}
              />
            </View>
            <Divider style={{ marginTop: 5 * HEIGHT_SCALE_RATIO }} />

            {/* nationality */}
            <View
              style={{
                marginTop: 16 * HEIGHT_SCALE_RATIO,
                borderBottomWidth: 1,
                paddingBottom: 8 * HEIGHT_SCALE_RATIO,
                borderColor: COLOR.appBorderColor,
              }}>
              <PText style={[ptText.SMALL1, styles.textTitleChange]}>
                {RootStore.i18n.t('login.nationality')}
              </PText>

              <MyTouchableOpacity
                onPress={() => {
                  this.setState({
                    isShowModal: true,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <PText
                    style={[
                      ptText.BODY1,
                      {
                        color: 'black',
                        paddingHorizontal: 4 * WIDTH_SCALE_RATIO,
                        lineHeight: IS_IOS ? -3 : null,
                      },
                    ]}>
                    {this.state.country && this.state.country.name
                      ? this.state.country.name === 'Taiwan, Province of China'
                        ? 'Taiwan'
                        : this.state.country.name
                      : '거주지 없음'}
                  </PText>
                  <Image
                    source={ICON.DROPDOWN_ICON}
                    style={{
                      marginLeft: 8 * WIDTH_SCALE_RATIO,
                      width: 14 * WIDTH_SCALE_RATIO,
                      height: 14 * WIDTH_SCALE_RATIO,
                      tintColor: COLOR.appTextSubColor,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </MyTouchableOpacity>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <MyTouchableOpacity
              onPress={() => {
                this.onClickChange();
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 32 * HEIGHT_SCALE_RATIO,
                  borderRadius: 16 * WIDTH_SCALE_RATIO,
                  paddingHorizontal: 35 * WIDTH_SCALE_RATIO,
                  borderColor: COLOR.appColor,
                  borderWidth: 1,
                }}>
                <PText style={[ptText.BODY2, { color: COLOR.appColor }]}>
                  {RootStore.i18n.t('change-password.change')}
                </PText>
              </View>
            </MyTouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        <Modal
          backdropOpacity={0.3}
          animationIn="fadeInDown"
          isVisible={this.state.isShowModal}
          onRequestClose={() => {
            this.setState({ isShowModal: false });
          }}
          style={{
            margin: 0,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 8 * WIDTH_SCALE_RATIO,
              padding: 24 * WIDTH_SCALE_RATIO,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <PText style={ptText.BODY1}>Select a country</PText>
              <MyTouchableOpacity //No36. Remove this X icon
                onPress={() => {
                  this.setState({
                    isShowModal: false,
                  });
                }}>
                <Image
                  source={ICON.CLOSE_ICON}
                  style={{
                    width: 18 * WIDTH_SCALE_RATIO,
                    height: 18 * WIDTH_SCALE_RATIO,
                    tintColor: COLOR.appTextSubColor,
                  }}
                  resizeMode={'contain'}
                />
              </MyTouchableOpacity>
            </View>
            <FlatList
              keyExtractor={(item, index) => `key ${index}`}
              style={{
                marginTop: 8 * HEIGHT_SCALE_RATIO,
              }}
              showsVerticalScrollIndicator={false}
              data={this.state.countrySelect.map((v, i) => v.name)}
              renderItem={({ item, index }) => {
                return (
                  <MyTouchableOpacity
                    key={item}
                    style={{
                      width: '100%',
                      marginBottom: 8 * HEIGHT_SCALE_RATIO,
                    }}
                    onPress={() => {
                      this.setState({
                        country: this.state.countrySelect[index],
                        isShowModal: false,
                      });
                    }}>
                    <PText style={[ptText.BODY1, { color: 'black' }]}>{item}</PText>
                  </MyTouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTitleChange: {
    marginLeft: 4 * WIDTH_SCALE_RATIO,
    padding: 0 * HEIGHT_SCALE_RATIO,
    fontWeight: '400',
    color: COLOR.appTextSubColor,
    textTransform: 'uppercase',
  },
});
