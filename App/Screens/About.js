import { Button } from 'native-base';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import VersionCheck from 'react-native-version-check';
import LanguageDropDown from '../Components/LanguageDropDown';
import PText from '../Components/PText';
import globalUtils from '../Constants/globalUtils';
import RootStore from '../Stores/RootStore';

export default class About extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      version: '',
    };

    this.getLastVersion = this.getLastVersion.bind(this);
    this.getLastVersion();
  }

  async getLastVersion() {
    const version = await VersionCheck.getCurrentVersion();
    this.setState({ version });
  }

  onClickMyPage() {
    if (RootStore.auth.isGuest) {
      this.checkLogin();
      return;
    }
    Actions.myPage();
  }

  onClickMyReserve() {
    if (RootStore.auth.isGuest) {
      this.checkLogin();
      return;
    }

    Actions.myReserve();
  }

  onClickMyLike() {
    if (RootStore.auth.isGuest) {
      this.checkLogin();
      return;
    }
    Actions.myLike();
  }

  async onClickLogOut() {
    if (!RootStore.auth.isGuest) {
      globalUtils.isLogin = false;
      await store.update('token', '');
      await store.update('id', '');
      await store.update('nickname', '');
      await store.update('picture', 'profile_default.svg');
      await store.update('home_tag_code', null);

      await RootStore.logout();
    }
    Actions.replace('welcome');
  }
  checkLogin() {
    Alert.alert(
      '',
      RootStore.i18n.t('global.require-login'),
      [
        {
          text: RootStore.i18n.t('global.close'),
          onPress: () => Actions.replace('welcome'),
        },
      ],
      { cancelable: false },
    );
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.categoryBox}>
          <Row size={12} style={styles.rowHeight}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickMyPage.bind(this)}
                style={styles.searchTextBox}>
                <PText
                  style={{
                    fontSize: RootStore.fontSize(2.8),
                    fontWeight: '400',
                    color: '#767676',
                  }}>
                  {RootStore.i18n.t('about.my-page')}
                </PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={styles.rowHeight}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickMyReserve.bind(this)}
                style={styles.searchTextBox}>
                <PText
                  style={{
                    fontSize: RootStore.fontSize(2.8),
                    fontWeight: '400',
                    color: '#767676',
                  }}>
                  {RootStore.i18n.t('about.my-reserve')}
                </PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={styles.rowHeight}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickMyLike.bind(this)}
                style={styles.searchTextBox}>
                <PText
                  style={{
                    fontSize: RootStore.fontSize(2.8),
                    fontWeight: '400',
                    color: '#767676',
                  }}>
                  {RootStore.i18n.t('about.my-like')}
                </PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={styles.dropdownBox}>
            <Col sm={12}>
              <LanguageDropDown />
            </Col>
          </Row>
          {RootStore.auth.isGuest && (
            <Button primary block onPress={this.onClickLogOut.bind(this)} style={{ marginTop: 80 }}>
              <PText
                uppercase={false}
                style={{ fontSize: RootStore.fontSize(2.8), fontWeight: '400' }}>
                {RootStore.i18n.t('global.login')}
              </PText>
            </Button>
          )}
          {!RootStore.auth.isGuest && (
            <Button light block onPress={this.onClickLogOut.bind(this)} style={{ marginTop: 80 }}>
              <PText
                uppercase={false}
                style={{ fontSize: RootStore.fontSize(2.8), fontWeight: '400' }}>
                {RootStore.i18n.t('global.logout')}
              </PText>
            </Button>
          )}
          <PText style={styles.testInfo}>{RootStore.config.name}</PText>
          <PText style={styles.versionInfo}> v. {this.state.version}</PText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryBox: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  borderRightBox: {
    borderColor: '#767676',
    borderRightWidth: 1,
  },
  rowHeight: {
    maxHeight: 50,
    height: 50,
    borderColor: '#767676',
    borderBottomWidth: 1,
  },
  dropdownBox: {
    marginTop: 80,
    maxHeight: 50,
    height: 50,
    borderColor: '#767676',
    borderWidth: 1,
    borderRadius: 4,
  },
  title: {
    fontSize: RootStore.fontSize(3.8),
    fontWeight: '400',
    color: '#767676',
  },
  searchTextBox: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  touchBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  testInfo: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: RootStore.fontSize(2.8),
    fontWeight: '400',
    color: '#ff0000',
  },
  versionInfo: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: RootStore.fontSize(2.2),
    fontWeight: '400',
    color: '#767676',
  },
});
