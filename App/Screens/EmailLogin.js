import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { Button, Input, Item } from 'native-base';
import React from 'react';
import { Alert, Dimensions, Image, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Api from '../../Common/Api';
import Const from '../../Common/Const';
import getMemberInfo from '../../Common/gql/queries/getMemberInfo.gql';
import getRecommendList from '../../Common/gql/queries/getRecommendList.gql';
import GoBackButton from '../Components/GoBackButton';
import PText from '../Components/PText';
import RootStore from '../Stores/RootStore';

const deviceWidth = Dimensions.get('window').width;
const LOGO = require('../../asset/image/creatrip_logo.png');

export default class EmailLogin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onClickLogin = this.onClickLogin.bind(this);

    this.getMemberCityTag = this.getMemberCityTag.bind(this);
    this.getDefaultCityTag = this.getDefaultCityTag.bind(this);

    this.onHandleKeyEventEmail = this.onHandleKeyEventEmail.bind(this);
    this.onHandleKeyEventPassword = this.onHandleKeyEventPassword.bind(this);

    this._scrollToInput = this._scrollToInput.bind(this);

    // logo size = 300, 122
    const rate = (deviceWidth * 0.3) / 300;
    this.logoWidth = 300 * rate;
    this.logoHeight = 122 * rate;
  }

  async onClickLogin() {
    if (this.state.email === '' || this.state.password === '') {
      Alert.alert(
        '',
        RootStore.i18n.t('login.login-fail'),
        [{ text: RootStore.i18n.t('global.update-ok') }],
        { cancelable: true },
      );
      return;
    }

    const param = { id: this.state.email, password: this.state.password };
    const result = await Api.post(Api.reqLoginWithEmail, param);

    if (result.result) {
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
      await this.getMemberCityTag();

      Actions.replace('mainStack');
    } else {
      Alert.alert(
        '',
        RootStore.i18n.t('login.login-fail'),
        [{ text: RootStore.i18n.t('global.update-ok') }],
        { cancelable: true },
      );
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
    const sort = cityTags.sort((a, b) => {
      return a.score > b.score;
    });
    sort.forEach((v) => {
      cityTagList.push(v.tag);
    });

    if (cityTagList.length === 0) {
      this.getDefaultCityTag();
    } else {
      RootStore.setCityTags(cityTagList);
    }
  }

  async getDefaultCityTag() {
    const result = await RootStore.client.query({
      query: getRecommendList,
      variables: { tagType: Const.TagType.City.code, language: RootStore.language },
    });
    const tagData = [];

    result.data.getRecommendList.recommends.forEach((v) => {
      tagData.push(v.city);
    });

    RootStore.setCityTags(tagData);
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

  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GoBackButton customStyle={{ padding: 10 }} />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.screen}
          scrollEnabled={false}
          extraHeight={200}>
          <Image source={LOGO} style={{ width: this.logoWidth, height: this.logoHeight }} />

          <View
            style={{
              width: '80%',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 0,
              marginTop: 80,
            }}>
            <Item>
              <Input
                ref={(email) => {
                  this.emailInput = email;
                }}
                onChangeText={(text) => this.setState({ email: text })}
                onSubmitEditing={this.onHandleKeyEventEmail}
                keyboardType="email-address"
                placeholder="email"
                value={this.state.email}
                autoCapitalize="none"
                style={{ width: '100%', fontSize: 16, borderBottomWidth: 0.5 }}
              />
            </Item>
          </View>

          <View
            style={{
              width: '80%',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 0,
            }}>
            <Item>
              <Input
                ref={(password) => {
                  this.passwordInput = password;
                }}
                onChangeText={(text) => this.setState({ password: text })}
                onSubmitEditing={this.onHandleKeyEventPassword}
                secureTextEntry={true}
                placeholder="password"
                value={this.state.password}
                autoCapitalize="none"
                style={{ width: '100%', fontSize: 16, borderBottomWidth: 0.5 }}
              />
            </Item>
          </View>

          <View
            style={{
              width: '80%',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 0,
              marginTop: 20,
            }}>
            <View
              style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
              <Button style={styles.rightButton} primary onPress={this.onClickLogin}>
                <PText uppercase={false}>{RootStore.i18n.t('login.login')}</PText>
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
